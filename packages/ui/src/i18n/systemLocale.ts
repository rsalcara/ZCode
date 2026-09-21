import { readNavigatorLanguage, readSafeLocalStorage } from "@/lib/browserEnvironment.js";
import { DEFAULT_LOCALE, type Locale } from "@zcode/shared";

/** localStorage key único da preferência de idioma da UI (IntlProvider persiste aqui). */
export const LOCALE_PREFERENCE_STORAGE_KEY = "zcode-locale-preference";

/**
 * Lê a preferência de idioma persistida; null quando ausente ou indisponível
 * (alguns ambientes lançam em localStorage — modo privado, iframes restritos).
 */
export function readStoredLocalePreference(): string | null {
  return readSafeLocalStorage(LOCALE_PREFERENCE_STORAGE_KEY);
}

/**
 * 把 navigator 语言标签映射到受支持的 Locale。
 * zh* → zh-CN，pt* → pt-BR，其余 → en-US；这是所有宿主共用的兜底映射，
 * 新增界面语言时只需要改这里（desktop main 进程有防御性副本，见 docs/i18n.md）。
 */
export function resolveNavigatorLocaleTag(language: string): Locale {
  const lower = language.toLowerCase();
  if (lower.startsWith("zh")) return "zh-CN";
  if (lower.startsWith("pt")) return "pt-BR";
  return "en-US";
}

/**
 * 依据 navigator.language 解析当前系统语言；无 navigator（SSR/测试）时
 * 回退 DEFAULT_LOCALE。用于宿主系统语言探测不可用的场合。
 */
export function resolveNavigatorLocale(): Locale {
  const language = readNavigatorLanguage();
  if (!language) {
    return DEFAULT_LOCALE;
  }
  return resolveNavigatorLocaleTag(language);
}
