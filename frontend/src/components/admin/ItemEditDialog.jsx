import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, Plus, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { http } from "@/lib/api";
import { CATEGORIES } from "@/data/menu";
import { toast } from "sonner";

const emptyItem = {
  category: CATEGORIES[0],
  name: "",
  base_price: 0,
  sizes: [],
  image_url: "",
  active: true,
  popular: false,
  popular_order: 0,
};

export default function ItemEditDialog({ item, open, onClose, onSaved }) {
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (item) {
      setForm({
        ...emptyItem,
        ...item,
        sizes: (item.sizes || []).map((s) => ({ ...s })),
      });
    } else {
      setForm(emptyItem);
    }
  }, [item, open]);

  const isEdit = !!item;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const addSize = () => {
    set("sizes", [...form.sizes, { label: "", price: form.base_price || 0 }]);
  };
  const updateSize = (idx, key, value) => {
    const next = form.sizes.map((s, i) => (i === idx ? { ...s, [key]: key === "price" ? Number(value) : value } : s));
    set("sizes", next);
  };
  const removeSize = (idx) => set("sizes", form.sizes.filter((_, i) => i !== idx));

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await http.post("/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set("image_url", res.data.url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error("Upload failed", { description: e?.response?.data?.detail || e.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    if (form.base_price == null || isNaN(Number(form.base_price))) { toast.error("Base price required"); return; }
    setSaving(true);
    try {
      const payload = {
        category: form.category,
        name: form.name.trim(),
        base_price: Number(form.base_price),
        sizes: form.sizes
          .filter((s) => s.label && !isNaN(Number(s.price)))
          .map((s) => ({ label: s.label, price: Number(s.price) })),
        image_url: form.image_url || null,
        active: !!form.active,
        popular: !!form.popular,
        popular_order: Number(form.popular_order) || 0,
      };
      if (isEdit) {
        await http.put(`/admin/menu/${item.id}`, payload);
        toast.success(`Updated ${payload.name}`);
      } else {
        await http.post("/admin/menu", payload);
        toast.success(`Created ${payload.name}`);
      }
      onSaved?.();
    } catch (e) {
      toast.error("Save failed", { description: e?.response?.data?.detail || e.message });
    } finally {
      setSaving(false);
    }
  };

  const imgPreview = form.image_url
    ? (form.image_url.startsWith("http") ? form.image_url : `${process.env.REACT_APP_BACKEND_URL}${form.image_url}`)
    : null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto" data-testid="item-edit-dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? `Edit — ${item.name}` : "New menu item"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label className="font-sub text-xs">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="rounded-xl"
                data-testid="admin-item-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-sub text-xs">Category</Label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full h-10 rounded-xl bg-card border border-border px-3 text-sm font-sub"
                data-testid="admin-item-category"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-sub text-xs">Base price (₹)</Label>
              <Input
                type="number"
                value={form.base_price}
                onChange={(e) => set("base_price", e.target.value)}
                className="rounded-xl"
                data-testid="admin-item-base-price"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-sub text-xs">Popular order (lower = first)</Label>
              <Input
                type="number"
                value={form.popular_order}
                onChange={(e) => set("popular_order", e.target.value)}
                disabled={!form.popular}
                className="rounded-xl"
                data-testid="admin-item-popular-order"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-sub">
              <Switch checked={form.active} onCheckedChange={(v) => set("active", v)} data-testid="admin-item-active" />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm font-sub">
              <Switch checked={form.popular} onCheckedChange={(v) => set("popular", v)} data-testid="admin-item-popular" />
              Show in Popular
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-sub text-xs">Size variants (leave empty for single-price item)</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full h-7 text-xs"
                onClick={addSize}
                data-testid="admin-item-add-size"
              >
                <Plus className="h-3 w-3 mr-1" /> Add size
              </Button>
            </div>
            {form.sizes.length === 0 && (
              <div className="text-xs text-muted-foreground italic">
                Single-price item. Add sizes (e.g. Small / Medium / Large) if needed.
              </div>
            )}
            {form.sizes.map((s, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`admin-item-size-row-${i}`}>
                <Input
                  value={s.label}
                  onChange={(e) => updateSize(i, "label", e.target.value)}
                  placeholder="Label (e.g. Small)"
                  className="rounded-xl flex-1"
                />
                <Input
                  type="number"
                  value={s.price}
                  onChange={(e) => updateSize(i, "price", e.target.value)}
                  placeholder="Price"
                  className="rounded-xl w-28"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-destructive hover:bg-destructive/10"
                  onClick={() => removeSize(i)}
                  aria-label="Remove size"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="font-sub text-xs">Image</Label>
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden flex items-center justify-center text-muted-foreground">
                {imgPreview ? (
                  <img src={imgPreview} alt="" className="w-full h-full object-cover" data-testid="admin-item-image-preview" />
                ) : (
                  <ImageIcon className="h-6 w-6" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files?.[0])}
                  data-testid="admin-item-image-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full h-9"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  data-testid="admin-item-image-upload"
                >
                  {uploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Upload className="h-4 w-4 mr-1" />}
                  {uploading ? "Uploading…" : "Upload photo"}
                </Button>
                {form.image_url && (
                  <button
                    type="button"
                    onClick={() => set("image_url", "")}
                    className="text-xs text-destructive font-sub"
                    data-testid="admin-item-image-clear"
                  >
                    Remove image
                  </button>
                )}
                <div className="text-[11px] text-muted-foreground font-sub">JPEG / PNG / WEBP up to 5 MB</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" className="rounded-full" onClick={onClose} data-testid="admin-item-cancel">
            Cancel
          </Button>
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={saving}
            onClick={handleSave}
            data-testid="admin-item-save"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
