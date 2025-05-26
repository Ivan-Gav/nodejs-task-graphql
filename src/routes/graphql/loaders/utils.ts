export const groupBy = <T, K extends string | number>(
  list: T[],
  getKey: (item: T) => K,
): Record<K, T[]> => {
  return list.reduce(
    (acc, item) => {
      const key = getKey(item);
      (acc[key] ||= []).push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
};
