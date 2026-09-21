import { readNavigatorLanguage } from "@/lib/browserEnvironment.js";
import { DEFAULT_LOCALE, type Locale } from "@zcode/shared";

/**
 * 把 navigator 语言标签映射到受支持的 Locale。
 * zh* → zh-CN，pt* → pt-BR，其余 → en-US；这是所有宿主共用的兜底映射，
 * 新增界面语言时只需要改这里。
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
