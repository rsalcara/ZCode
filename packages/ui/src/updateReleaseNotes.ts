import type { Locale, PostUpdateReleaseNotesPayload } from "@zcode/shared";

export type LocalizedUpdateReleaseNotes = {
  title: string;
  markdown: string;
};

export function getLocalizedUpdateReleaseNotes(
  payload: PostUpdateReleaseNotesPayload | undefined,
  locale: Locale,
): LocalizedUpdateReleaseNotes | null {
  if (!payload) {
    return null;
  }

  const defaultReleaseNotes = {
    title: payload.title,
    markdown: payload.markdown,
  };

  // 更新源目前只提供中英两份文案：zh 退顶层默认；en 维持“zh 条目 → 顶层默认”的
  // 历史行为；其余界面语言（如 pt-BR）先退 en-US 条目，再按 en 的旧链条回退，
  // 避免 pt-BR 用户在缺少 en 条目时直接看到中文更新日志。
  const byLocale = payload.releaseNotesByLocale;
  if (locale === "zh-CN") {
    return byLocale?.["zh-CN"] ?? defaultReleaseNotes;
  }
  if (locale !== "en-US") {
    const localized = byLocale?.[locale] ?? byLocale?.["en-US"];
    if (localized) {
      return localized;
    }
  }
  return byLocale?.[locale] ?? byLocale?.["zh-CN"] ?? defaultReleaseNotes;
}

export function formatUpdateReleaseDate(
  releaseDate: string | undefined,
  locale: Locale,
): string | null {
  if (!releaseDate) {
    return null;
  }

  const date = new Date(releaseDate);
  if (Number.isNaN(date.getTime())) {
    return releaseDate;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    // update feed 的 releaseDate 通常是 UTC 零点。按用户本地时区格式化会让
    // 美洲等时区显示成前一天，hover 中只展示发布日期时应保持 feed 日期稳定。
    timeZone: "UTC",
  }).format(date);
}
