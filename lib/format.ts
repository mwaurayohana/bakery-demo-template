export const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

export function normalizeKenyanPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("254") && digits.length === 12) {
    return `+${digits}`;
  }

  if (digits.startsWith("0") && digits.length === 10) {
    return `+254${digits.slice(1)}`;
  }

  if (digits.startsWith("7") && digits.length === 9) {
    return `+254${digits}`;
  }

  return null;
}

export function isValidPaymentAmount(amount: unknown) {
  return typeof amount === "number" && Number.isFinite(amount) && amount > 0;
}
