import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { http } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function OutletManager({ onChange }) {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await http.get("/outlets");
      setOutlets(res.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const updateField = (id, key, value) => {
    setOutlets((prev) => prev.map((o) => (o.id === id ? { ...o, [key]: value } : o)));
  };

  const save = async (outlet) => {
    try {
      await http.put(`/admin/outlets/${outlet.id}`, {
        name: outlet.name,
        full_address: outlet.full_address,
        whatsapp: outlet.whatsapp.replace(/\D/g, ""),
        map_query: outlet.map_query,
        hours: outlet.hours,
      });
      toast.success(`Saved ${outlet.name}`);
      onChange?.();
    } catch (e) {
      toast.error("Save failed", { description: e?.response?.data?.detail });
    }
  };

  return (
    <div data-testid="outlet-manager">
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading outlets…</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {outlets.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl bg-card border border-border p-5 space-y-4"
              data-testid={`admin-outlet-${o.id}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{o.name}</h3>
                <code className="text-[10px] bg-muted px-2 py-1 rounded-full text-muted-foreground">{o.id}</code>
              </div>

              <Field label="Display name" testId={`outlet-${o.id}-name`} value={o.name} onChange={(v) => updateField(o.id, "name", v)} />
              <Field label="Full address" testId={`outlet-${o.id}-address`} value={o.full_address} onChange={(v) => updateField(o.id, "full_address", v)} />
              <Field label="WhatsApp (country code + number, no +)" testId={`outlet-${o.id}-whatsapp`} value={o.whatsapp} onChange={(v) => updateField(o.id, "whatsapp", v)} helper="Format: 919590012678" />
              <Field label="Google Maps query" testId={`outlet-${o.id}-mapquery`} value={o.map_query} onChange={(v) => updateField(o.id, "map_query", v)} helper="e.g. East+Fort+Thrissur+Kerala" />
              <Field label="Hours" testId={`outlet-${o.id}-hours`} value={o.hours} onChange={(v) => updateField(o.id, "hours", v)} />

              <Button
                onClick={() => save(o)}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sub"
                data-testid={`admin-outlet-save-${o.id}`}
              >
                <Save className="h-4 w-4 mr-2" /> Save changes
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, testId, helper }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-sub text-xs">{label}</Label>
      <Input value={value || ""} onChange={(e) => onChange(e.target.value)} className="rounded-xl" data-testid={testId} />
      {helper && <div className="text-[10px] text-muted-foreground font-sub">{helper}</div>}
    </div>
  );
}
