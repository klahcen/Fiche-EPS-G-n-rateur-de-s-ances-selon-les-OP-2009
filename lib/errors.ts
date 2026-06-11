export function parseApiError(raw: string): string {
  if (raw.includes("not_found_error") || /^model:/.test(raw.trim())) {
    return "Modèle IA introuvable ou obsolète. Mettez à jour `ANTHROPIC_MODEL` dans `.env` (ex. `claude-sonnet-4-5-20250929`).";
  }

  if (raw.includes("credit balance is too low")) {
    return "Votre solde de crédits Anthropic est insuffisant. Ajoutez des crédits sur [console.anthropic.com](https://console.anthropic.com/settings/billing) puis réessayez.";
  }

  if (raw.includes("invalid x-api-key") || raw.includes("authentication")) {
    return "Clé API Anthropic invalide. Vérifiez `ANTHROPIC_API_KEY` dans votre fichier `.env.local`.";
  }

  if (raw.includes("ANTHROPIC_API_KEY non configurée")) {
    return "Clé API non configurée. Créez un fichier `.env.local` avec `ANTHROPIC_API_KEY=votre_clé`.";
  }

  try {
    const jsonStart = raw.indexOf("{");
    if (jsonStart !== -1) {
      const parsed = JSON.parse(raw.slice(jsonStart));
      const msg = parsed?.error?.message ?? parsed?.message;
      if (typeof msg === "string") return parseApiError(msg);
    }
  } catch {
    // not JSON, fall through
  }

  return raw.length > 200 ? `${raw.slice(0, 200)}…` : raw;
}
