import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag, AlertCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart, PARCEL_CHARGE_PER_ITEM } from "@/context/CartContext";
import { OUTLETS } from "@/data/menu";
import { buildOrderMessage, buildWhatsAppUrl, getOutletById } from "@/lib/whatsapp";
import { toast } from "sonner";

export default function CartDrawer() {
  const {
    items, addItem, decrementItem, removeItem, clearCart,
    itemCount, subtotal, parcel, grandTotal,
    isOpen, setIsOpen, closeCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("Pickup"); // Pickup | Delivery
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [outletId, setOutletId] = useState(""); // MUST be chosen before ordering
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim() || !/^[+0-9\s-]{7,}$/.test(phone.trim())) e.phone = "Enter a valid phone number";
    if (!outletId) e.outlet = "Please choose an outlet";
    if (orderType === "Delivery" && !address.trim()) e.address = "Delivery address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    if (!validate()) {
      toast.error("Please complete the order details", { description: "Outlet selection is required." });
      return;
    }
    const outlet = getOutletById(outletId);
    const message = buildOrderMessage({
      items, subtotal, parcel, grandTotal,
      customer: { name: name.trim(), phone: phone.trim(), orderType, address: address.trim(), note: note.trim() },
      outlet,
    });
    const url = buildWhatsAppUrl(outlet, message);
    window.open(url, "_blank", "noopener");
    toast.success(`Order sent to ${outlet.name} on WhatsApp`, {
      description: "We've opened WhatsApp — just hit send!",
    });
    // Keep cart so user can double-check; auto-close drawer
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col"
        data-testid="cart-drawer"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            {itemCount > 0 && (
              <span className="ml-auto text-xs font-sub font-normal text-muted-foreground">
                {itemCount} item{itemCount > 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" data-testid="cart-empty">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 font-sub">
              Add a refreshing shake or juice from our menu.
            </p>
            <Button
              onClick={closeCart}
              className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sub"
              data-testid="cart-empty-browse"
            >
              Browse menu
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" data-testid="cart-items-list">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                  data-testid={`cart-item-${it.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-sub text-[10px] text-muted-foreground uppercase tracking-wider">{it.category}</div>
                    <div className="font-semibold text-sm truncate">{it.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">₹{it.price} each</div>
                  </div>

                  <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                    <button
                      className="h-7 w-7 rounded-full bg-card hover:bg-background flex items-center justify-center"
                      onClick={() => decrementItem(it.id)}
                      data-testid={`cart-decrement-${it.id}`}
                      aria-label={`Decrease ${it.name}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold" data-testid={`cart-qty-${it.id}`}>
                      {it.qty}
                    </span>
                    <button
                      className="h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                      onClick={() => addItem(it)}
                      data-testid={`cart-increment-${it.id}`}
                      aria-label={`Increase ${it.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="w-14 text-right font-semibold text-sm">₹{it.price * it.qty}</div>

                  <button
                    className="text-muted-foreground hover:text-destructive p-1"
                    onClick={() => removeItem(it.id)}
                    data-testid={`cart-remove-${it.id}`}
                    aria-label={`Remove ${it.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <Separator className="my-4" />

              {/* Customer details */}
              <div className="space-y-4" data-testid="checkout-form">
                <h3 className="font-display text-lg font-semibold">Order details</h3>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-name" className="font-sub text-xs">Full Name *</Label>
                  <Input
                    id="cust-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya"
                    className="rounded-xl"
                    data-testid="input-customer-name"
                  />
                  {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3"/>{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-phone" className="font-sub text-xs">Phone Number *</Label>
                  <Input
                    id="cust-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="rounded-xl"
                    data-testid="input-customer-phone"
                  />
                  {errors.phone && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3"/>{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="font-sub text-xs">Order Type</Label>
                  <RadioGroup
                    value={orderType}
                    onValueChange={setOrderType}
                    className="grid grid-cols-2 gap-2"
                    data-testid="order-type-group"
                  >
                    {["Pickup", "Delivery"].map((t) => (
                      <label
                        key={t}
                        className={`cursor-pointer rounded-xl border p-3 flex items-center gap-2 transition-all ${
                          orderType === t ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                        }`}
                        data-testid={`order-type-${t.toLowerCase()}`}
                      >
                        <RadioGroupItem value={t} className="sr-only" />
                        <span className={`w-4 h-4 rounded-full border-2 ${orderType === t ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                        <span className="font-sub text-sm font-medium">{t}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {orderType === "Delivery" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="cust-addr" className="font-sub text-xs">Delivery Address *</Label>
                    <Textarea
                      id="cust-addr"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Building / street / landmark"
                      className="rounded-xl min-h-[72px]"
                      data-testid="input-customer-address"
                    />
                    {errors.address && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3"/>{errors.address}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="font-sub text-xs flex items-center gap-1">
                    Choose Outlet *
                    <span className="text-[10px] text-muted-foreground font-normal">(required)</span>
                  </Label>
                  <RadioGroup
                    value={outletId}
                    onValueChange={(v) => { setOutletId(v); setErrors((e) => ({...e, outlet: undefined})); }}
                    className="grid grid-cols-2 gap-2"
                    data-testid="outlet-select-group"
                  >
                    {OUTLETS.map((o) => (
                      <label
                        key={o.id}
                        className={`cursor-pointer rounded-xl border-2 p-3 transition-all ${
                          outletId === o.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                        }`}
                        data-testid={`outlet-option-${o.id}`}
                      >
                        <RadioGroupItem value={o.id} className="sr-only" />
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border-2 ${outletId === o.id ? "border-primary bg-primary" : "border-muted-foreground"}`} />
                          <span className="font-sub text-sm font-semibold">{o.name}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1 ml-6">{o.fullAddress.split(",")[0]}</div>
                      </label>
                    ))}
                  </RadioGroup>
                  {errors.outlet && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3"/>{errors.outlet}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-note" className="font-sub text-xs">Note (optional)</Label>
                  <Textarea
                    id="cust-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. no sugar, extra cornflakes"
                    className="rounded-xl min-h-[60px]"
                    data-testid="input-customer-note"
                  />
                </div>
              </div>
            </div>

            {/* Totals + CTA */}
            <div className="border-t border-border bg-card px-5 py-4 space-y-3" data-testid="cart-footer">
              <div className="space-y-1 text-sm font-sub">
                <Row label="Subtotal" value={`₹${subtotal}`} />
                <Row
                  label={`Parcel (₹${PARCEL_CHARGE_PER_ITEM} × ${itemCount})`}
                  value={`₹${parcel}`}
                  dataTestId="cart-parcel-row"
                />
                <Row label={<b className="font-display text-base">Total</b>} value={<b className="text-lg" data-testid="cart-grand-total">₹{grandTotal}</b>} />
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
                className="w-full h-12 rounded-full bg-whatsapp text-white hover:bg-whatsapp/90 font-sub font-semibold text-base"
                data-testid="place-order-whatsapp"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Place Order via WhatsApp
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-xs text-muted-foreground hover:text-destructive font-sub"
                data-testid="cart-clear"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, dataTestId }) {
  return (
    <div className="flex items-center justify-between" data-testid={dataTestId}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
