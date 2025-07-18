/**
 * Scrolls to an element with the given ID with smooth behavior
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (default: 20px)
 */
export const scrollToElement = (elementId: string, offset: number = 20): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Scrolls to the units sort bar with appropriate offset
 */
export const scrollToSortBar = (): void => {
  scrollToElement('units-sort-bar', 80);
};