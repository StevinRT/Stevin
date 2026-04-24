import { OUTLETS } from "@/data/menu";
import { PARCEL_CHARGE_PER_ITEM } from "@/context/CartContext";

export function buildOrderMessage({ items, subtotal, parcel, grandTotal, customer, outlet }) {
  const lines = [];
  lines.push("*New Order — PJ Ours*");
  lines.push("");
  lines.push(`*Outlet:* ${outlet.name}`);
  lines.push(`*Name:* ${customer.name}`);
  lines.push(`*Phone:* ${customer.phone}`);
  lines.push(`*Order Type:* ${customer.orderType}`);
  if (customer.orderType === "Delivery" && customer.address) {
    lines.push(`*Address:* ${customer.address}`);
  }
  if (customer.note) lines.push(`*Note:* ${customer.note}`);
  lines.push("");
  lines.push("*Items:*");
  items.forEach((i) => {
    lines.push(`• ${i.name} × ${i.qty}  —  ₹${i.price * i.qty}`);
  });
  lines.push("");
  lines.push(`Subtotal: ₹${subtotal}`);
  lines.push(`Parcel Charge (₹${PARCEL_CHARGE_PER_ITEM} × ${items.reduce((s,i)=>s+i.qty,0)}): ₹${parcel}`);
  lines.push(`*Total: ₹${grandTotal}*`);
  lines.push("");
  lines.push("_Sent from pj-ours.com_");
  return lines.join("\n");
}

export function getOutletById(id) {
  return OUTLETS.find((o) => o.id === id);
}

export function buildWhatsAppUrl(outlet, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${outlet.whatsapp}?text=${encoded}`;
}
