// This file is responsible for upgrading '.bookmarks' HTML elements with a search filter.
export const tryUpgradeBookmarksPage = () => {
  const bookmarksElement = document.getElementById('bookmarks-page') as HTMLElement;

  const bookmarksPage = new BookmarksPage(bookmarksElement);
  bookmarksPage.upgrade();
};

class BookmarksPage {
  private readonly element: Element;
  private readonly filterBookmarksInputElement: HTMLInputElement;
  private readonly noBookmarksElement: HTMLDivElement;
  private readonly bookmarksCountElement: HTMLHeadingElement;
  private readonly bookmarkElements: Element[];
  private readonly categoryPillElements: HTMLButtonElement[];
  private selectedCategory?: string = undefined;

  constructor(element: Element) {
    this.element = element;
    this.filterBookmarksInputElement = document.getElementById('bookmarks-filter') as HTMLInputElement;
    this.noBookmarksElement = document.getElementById('bookmarks-filter-empty') as HTMLDivElement;
    this.bookmarksCountElement = document.getElementById('bookmarks-count') as HTMLHeadingElement;
    this.bookmarkElements = Array.from(element.querySelectorAll('ol > li'));
    this.categoryPillElements = Array.from(element.querySelectorAll('.category-pill'));
  }

  upgrade() {
    this.filterBookmarksInputElement?.addEventListener('input', () => this.filterBookmarksAndCategories());

    this.categoryPillElements.forEach(pill => {
      pill.addEventListener('click', () => this.onCategoryPillClick(pill));
    });
  }

  private filterBookmarksAndCategories() {
    const query = this.filterBookmarksInputElement?.value.trim().toLowerCase() ?? '';
    const matchingCategories = new Set<string>();

    let visibleCount = 0;

    this.bookmarkElements.forEach(item => {
      const matchesQuery = query === '' || this.matchesQuery(item, query);
      const matchesCategory = this.matchesCategory(item);
      const matches = matchesQuery && matchesCategory;

      (item as HTMLElement).hidden = !matches;

      if (matches) { visibleCount++; }

      if (matchesQuery) {
        const category = (item as HTMLElement).dataset.category;
        if (category) { matchingCategories.add(category); }
      }
    });

    this.bookmarksCountElement.innerHTML = `${visibleCount}`;

    visibleCount === 0 ?
      this.noBookmarksElement.classList.remove('bookmarks-filter-empty') :
      this.noBookmarksElement.classList.add('bookmarks-filter-empty');

    this.categoryPillElements.forEach(pill => {
      const category = pill.dataset.category;
      const enabled = query === '' || (category !== undefined && matchingCategories.has(category));
      pill.disabled = !enabled;
    });
  }

  private matchesQuery(item: Element, query: string): boolean {
    const text = item.textContent?.toLowerCase() ?? '';

    return text.includes(query);
  }

  private onCategoryPillClick(selectedCategoryPillElement: HTMLButtonElement) {
    const category = selectedCategoryPillElement.dataset.category;
    const wasSelected = this.selectedCategory === category;

    // Toggle.
    this.selectedCategory = wasSelected ? undefined : category;

    this.categoryPillElements.forEach(element => {
      element.classList.toggle('category-pill-active', element === selectedCategoryPillElement && this.selectedCategory !== undefined);
    });

    if (wasSelected) {
      selectedCategoryPillElement.blur(); // Fixes select still looking selected.
    }

    this.filterBookmarksAndCategories();
  }

  private matchesCategory(item: Element): boolean {
    if (this.selectedCategory === undefined) { return true; }

    return (item as HTMLElement).dataset.category === this.selectedCategory;
  }
}
