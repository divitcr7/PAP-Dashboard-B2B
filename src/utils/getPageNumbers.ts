export const getPageNumbers = (
  current: number,
  total: number
): (number | string)[] => {
  if (total <= 0) return [];
  if (total === 1) return [1];

  const pages = new Set<number>();
  pages.add(1);

  if (total >= 2 && current !== 2) pages.add(2);
  if (current > 2) pages.add(current - 1);
  if (current > 1 && current <= total) pages.add(current);
  if (current < total - 1) pages.add(current + 1);
  if (total >= 2 && current !== total - 1) pages.add(total - 1);
  if (total > 1) pages.add(total);

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  const finalPages: (number | string)[] = [];

  for (let i = 0; i < sortedPages.length; i++) {
    if (i > 0 && sortedPages[i] - sortedPages[i - 1] > 1) {
      finalPages.push("...");
    }
    finalPages.push(sortedPages[i]);
  }

  return finalPages;
};
