import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class WikiElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getTituloPrincipal(): Locator {
    return this.page.locator('#firstHeading');
  }

  getInfoBox(): Locator {
    return this.page.locator('.infobox');
  }

  getLinkTolkien(): Locator {
    return this.page.locator('a[title="J. R. R. Tolkien"]');
  }
}
