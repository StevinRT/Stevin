import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { http } from "@/lib/api";
import { CATEGORIES } from "@/data/menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ItemEditDialog from "@/components/admin/ItemEditDialog";
import { toast } from "sonner";

export default function MenuManager({ onChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [editing, setEditing] = useState(null); // item or "new"

  const load = async () => {
    setLoading(true);
    try {
      const res = await http.get("/admin/menu");
      setItems(res.data);
    } catch (e) {
      toast.error("Failed to load menu", { description: e?.response?.data?.detail });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let out = items;
    if (filterCat !== "All") out = out.filter((i) => i.category === filterCat);
    const q = query.trim().toLowerCase();
    if (q) out = out.filter((i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    return out;
  }, [items, query, filterCat]);

  const handleSaved = async () => {
    setEditing(null);
    await load();
    onChange?.();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    try {
      await http.delete(`/admin/menu/${item.id}`);
      toast.success(`Deleted ${item.name}`);
      await load();
      onChange?.();
    } catch (e) {
      toast.error("Delete failed", { description: e?.response?.data?.detail });
    }
  };

  return (
    <div data-testid="menu-manager">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or category"
            className="pl-10 h-10 rounded-full bg-card"
            data-testid="admin-menu-search"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="h-10 rounded-full bg-card border border-border px-4 text-sm font-sub"
          data-testid="admin-menu-filter-category"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <Button
          onClick={() => setEditing("new")}
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sub"
          data-testid="admin-menu-add-new"
        >
          <Plus className="h-4 w-4 mr-1" /> New item
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-muted/50 text-[11px] font-sub font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-4">Item</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price / Sizes</div>
          <div className="col-span-1">Active</div>
          <div className="col-span-1">Popular</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading && items.length === 0 ? (
          <div className="px-4 py-10 text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-10 text-sm text-muted-foreground" data-testid="admin-menu-empty">No items match.</div>
        ) : (
          filtered.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm border-t border-border"
              data-testid={`admin-item-row-${it.id}`}
            >
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-muted overflow-hidden flex items-center justify-center text-muted-foreground shrink-0">
                  {it.image_url ? (
                    <img
                      src={it.image_url.startsWith("http") ? it.image_url : `${process.env.REACT_APP_BACKEND_URL}${it.image_url}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{it.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate">#{it.position}</div>
                </div>
              </div>
              <div className="col-span-2 text-muted-foreground">{it.category}</div>
              <div className="col-span-2">
                {it.sizes && it.sizes.length > 0 ? (
                  <div className="text-xs font-sub space-y-0.5">
                    {it.sizes.map((s) => <div key={s.label}>{s.label.charAt(0)}: ₹{s.price}</div>)}
                  </div>
                ) : (
                  <div className="font-semibold">₹{it.base_price}</div>
                )}
              </div>
              <div className="col-span-1">
                {it.active ? <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Yes</Badge> : <Badge variant="outline">No</Badge>}
              </div>
              <div className="col-span-1">
                {it.popular ? <Badge className="bg-primary/20 text-primary hover:bg-primary/20">Yes</Badge> : <span className="text-xs text-muted-foreground">—</span>}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setEditing(it)}
                  data-testid={`admin-item-edit-${it.id}`}
                  aria-label={`Edit ${it.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(it)}
                  data-testid={`admin-item-delete-${it.id}`}
                  aria-label={`Delete ${it.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <ItemEditDialog
          item={editing === "new" ? null : editing}
          open={!!editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
