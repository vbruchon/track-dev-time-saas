import "server-only";

export const getDictionary = async (locale: string, file: string) => {
  const dictionaries = await import(`./${locale}/${file}.json`);
  return dictionaries.default;
};
