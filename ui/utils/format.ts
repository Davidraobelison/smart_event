/** Formate un montant en euros */
export function formatCurrency(amount: number, locale = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formate une date ISO en date lisible */
export function formatDate(iso: string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Formate une date ISO en date courte */
export function formatDateShort(iso: string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso));
}

/** Retourne "il y a X" relatif */
export function formatRelative(iso: string, locale = "fr-FR"): string {
  const diff = Date.now() - new Date(iso).getTime();
  const rtf  = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const secs  = Math.round(diff / 1000);
  const mins  = Math.round(secs / 60);
  const hours = Math.round(mins / 60);
  const days  = Math.round(hours / 24);

  if (secs  < 60)  return rtf.format(-secs,  "second");
  if (mins  < 60)  return rtf.format(-mins,  "minute");
  if (hours < 24)  return rtf.format(-hours, "hour");
  return rtf.format(-days, "day");
}

/** Tronque un texte à N caractères */
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** Initiales depuis un nom complet */
export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
