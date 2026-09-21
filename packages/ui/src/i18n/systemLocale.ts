import type { Locale } from "@zcode/shared";

/**
 * Resolve navigator.language para o Locale suportado mais próximo.
 * Usada como fallback onde a detecção de idioma do host não está disponível.
 */
export function resolveNavigatorLocale(): Locale {
  const language =
    typeof navigator !== "undefined" ? (navigator.language?.toLowerCase() ?? "") : "";
  if (language.startsWith("zh")) return "zh-CN";
  if (language.startsWith("pt")) return "pt-BR";
  return "en-US";
}
