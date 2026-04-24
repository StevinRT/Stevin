"""
PJ Ours backend API tests — covers iteration-2 features:
admin auth + JWT, menu CRUD, outlet update, object-storage upload+serve,
size variants, public menu/outlets/popular.
"""
import io
import os
import struct
import zlib
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://pj-cafe-drinks.preview.emergentagent.com"
ADMIN_PASSWORD = "pjours@2026"

# Categories expected to have size variants
SIZE_CATEGORIES = {"Juice", "Fusion Shake", "Avil Milk", "Milk Shake", "Desserts", "Mocktail"}
NO_SIZE_CATEGORIES = {"Ice Cream Shakes", "Falooda", "Ice Cream", "Fruit Soda", "Mojito"}


def _png_bytes():
    # Minimal 1x1 red PNG
    sig = b"\x89PNG\r\n\x1a\n"
    def chunk(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    ihdr = chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0))
    raw = b"\x00" + b"\xff\x00\x00"
    idat = chunk(b"IDAT", zlib.compress(raw))
    iend = chunk(b"IEND", b"")
    return sig + ihdr + idat + iend


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 20
    assert data["expires_in"] > 0
    return data["token"]


@pytest.fixture(scope="session")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# ---------------- Public endpoints ----------------
class TestPublicEndpoints:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_menu_returns_175_items(self, api):
        r = api.get(f"{BASE_URL}/api/menu", timeout=30)
        assert r.status_code == 200
        items = r.json()
        assert len(items) == 175, f"expected 175 items, got {len(items)}"
        assert all(it["active"] is True for it in items)

    def test_juice_items_have_sml_sizes(self, api):
        items = api.get(f"{BASE_URL}/api/menu", timeout=30).json()
        juices = [i for i in items if i["category"] == "Juice"]
        assert len(juices) > 0
        for j in juices:
            labels = [s["label"] for s in j["sizes"]]
            assert len(j["sizes"]) == 3, f"{j['name']} has {len(j['sizes'])} sizes"
            # Labels can be S/M/L or Small/Medium/Large
            norm = [l[0].upper() for l in labels]
            assert norm == ["S", "M", "L"], f"{j['name']} labels={labels}"
            for s in j["sizes"]:
                assert isinstance(s["price"], (int, float)) and s["price"] > 0

    def test_size_categories_all_have_sizes(self, api):
        items = api.get(f"{BASE_URL}/api/menu", timeout=30).json()
        for cat in SIZE_CATEGORIES:
            cat_items = [i for i in items if i["category"] == cat]
            assert cat_items, f"no items for category {cat}"
            for it in cat_items:
                assert len(it["sizes"]) == 3, f"{cat}/{it['name']} has sizes={it['sizes']}"

    def test_no_size_categories_empty_sizes(self, api):
        items = api.get(f"{BASE_URL}/api/menu", timeout=30).json()
        for cat in NO_SIZE_CATEGORIES:
            cat_items = [i for i in items if i["category"] == cat]
            assert cat_items, f"no items for category {cat}"
            for it in cat_items:
                assert it["sizes"] == [], f"{cat}/{it['name']} unexpectedly has sizes={it['sizes']}"

    def test_outlets(self, api):
        r = api.get(f"{BASE_URL}/api/outlets", timeout=15)
        assert r.status_code == 200
        outlets = r.json()
        assert len(outlets) == 2
        whatsapps = {o["whatsapp"] for o in outlets}
        assert "919590012678" in whatsapps
        assert "917012611090" in whatsapps
        ids = {o["id"] for o in outlets}
        assert {"eastfort", "westfort"}.issubset(ids)

    def test_popular_limit(self, api):
        r = api.get(f"{BASE_URL}/api/popular?limit=5", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert len(items) <= 5
        for it in items:
            assert it["popular"] is True and it["active"] is True
        # sorted by popular_order ascending
        orders = [it["popular_order"] for it in items]
        assert orders == sorted(orders)

    def test_categories(self, api):
        r = api.get(f"{BASE_URL}/api/categories", timeout=15)
        assert r.status_code == 200
        assert "categories" in r.json()


# ---------------- Admin auth ----------------
class TestAdminAuth:
    def test_login_wrong_password(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"password": "WRONG-XYZ"}, timeout=15)
        assert r.status_code == 401

    def test_login_right_password(self, admin_token):
        assert admin_token  # fixture succeeds

    def test_me_without_token(self, api):
        r = api.get(f"{BASE_URL}/api/admin/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_token(self, api, auth_headers):
        r = api.get(f"{BASE_URL}/api/admin/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.json().get("role") == "admin"

    def test_admin_put_unauth(self, api):
        r = api.put(f"{BASE_URL}/api/admin/menu/nonexistent-id", json={"name": "x"}, timeout=15)
        assert r.status_code == 401


# ---------------- Menu CRUD ----------------
class TestMenuCRUD:
    def test_create_update_delete(self, api, auth_headers):
        # Create
        payload = {
            "category": "Juice",
            "name": "TEST_AutoItem",
            "base_price": 99.0,
            "sizes": [
                {"label": "Small", "price": 99.0},
                {"label": "Medium", "price": 149.0},
                {"label": "Large", "price": 199.0},
            ],
            "active": True,
            "popular": False,
        }
        r = api.post(f"{BASE_URL}/api/admin/menu", headers=auth_headers, json=payload, timeout=30)
        assert r.status_code == 200, r.text
        created = r.json()
        item_id = created["id"]
        assert created["name"] == "TEST_AutoItem"
        assert len(created["sizes"]) == 3
        assert created["base_price"] == 99.0

        # GET via admin list — verify persisted
        r2 = api.get(f"{BASE_URL}/api/admin/menu", headers=auth_headers, timeout=30)
        assert r2.status_code == 200
        assert any(x["id"] == item_id for x in r2.json())

        # Update
        r3 = api.put(
            f"{BASE_URL}/api/admin/menu/{item_id}",
            headers=auth_headers,
            json={"name": "TEST_AutoItem_Updated", "base_price": 110.0},
            timeout=30,
        )
        assert r3.status_code == 200
        upd = r3.json()
        assert upd["name"] == "TEST_AutoItem_Updated"
        assert upd["base_price"] == 110.0

        # Verify persisted
        r4 = api.get(f"{BASE_URL}/api/admin/menu", headers=auth_headers, timeout=30)
        fetched = [x for x in r4.json() if x["id"] == item_id][0]
        assert fetched["name"] == "TEST_AutoItem_Updated"

        # Delete
        r5 = api.delete(f"{BASE_URL}/api/admin/menu/{item_id}", headers=auth_headers, timeout=30)
        assert r5.status_code == 200
        assert r5.json().get("ok") is True

        # Verify removed
        r6 = api.get(f"{BASE_URL}/api/admin/menu", headers=auth_headers, timeout=30)
        assert not any(x["id"] == item_id for x in r6.json())

    def test_update_nonexistent_returns_404(self, api, auth_headers):
        r = api.put(
            f"{BASE_URL}/api/admin/menu/does-not-exist-xyz",
            headers=auth_headers,
            json={"name": "x"},
            timeout=15,
        )
        assert r.status_code == 404


# ---------------- Outlet update ----------------
class TestOutletUpdate:
    def test_update_outlet_hours(self, api, auth_headers):
        # Read original
        orig = [o for o in api.get(f"{BASE_URL}/api/outlets").json() if o["id"] == "eastfort"][0]
        original_hours = orig["hours"]
        try:
            new_hours = "TEST_HOURS 9am-9pm"
            r = api.put(
                f"{BASE_URL}/api/admin/outlets/eastfort",
                headers=auth_headers,
                json={"hours": new_hours},
                timeout=15,
            )
            assert r.status_code == 200
            assert r.json()["hours"] == new_hours

            # Verify via public GET
            outlets = api.get(f"{BASE_URL}/api/outlets").json()
            ef = [o for o in outlets if o["id"] == "eastfort"][0]
            assert ef["hours"] == new_hours
            # WhatsApp untouched
            assert ef["whatsapp"] == "919590012678"
        finally:
            # Restore
            api.put(
                f"{BASE_URL}/api/admin/outlets/eastfort",
                headers=auth_headers,
                json={"hours": original_hours},
                timeout=15,
            )


# ---------------- Upload + serve ----------------
class TestUpload:
    def test_upload_png_and_serve(self, api, auth_headers):
        png = _png_bytes()
        files = {"file": ("test.png", io.BytesIO(png), "image/png")}
        r = api.post(f"{BASE_URL}/api/admin/upload", headers=auth_headers, files=files, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["url"].startswith("/api/files/")
        assert data["size"] == len(png)
        path = data["path"]

        # Public serve
        r2 = api.get(f"{BASE_URL}/api/files/{path}", timeout=60)
        assert r2.status_code == 200
        assert r2.headers.get("content-type", "").startswith("image/")
        # Bytes round-trip
        assert r2.content[:8] == b"\x89PNG\r\n\x1a\n"

    def test_upload_txt_rejected(self, api, auth_headers):
        files = {"file": ("bad.txt", io.BytesIO(b"hello"), "text/plain")}
        r = api.post(f"{BASE_URL}/api/admin/upload", headers=auth_headers, files=files, timeout=30)
        assert r.status_code == 400

    def test_upload_unauthenticated(self, api):
        files = {"file": ("t.png", io.BytesIO(_png_bytes()), "image/png")}
        r = api.post(f"{BASE_URL}/api/admin/upload", files=files, timeout=30)
        assert r.status_code == 401
