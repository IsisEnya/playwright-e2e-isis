import { Page, expect } from '@playwright/test';
import WikiElements from '../elements/WikiElements';
import BasePage from './BasePage';

export default class WikiPage extends BasePage {
  readonly wikiElements: WikiElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.wikiElements = new WikiElements(page);
  }

  async acessarPaginaSenhorDosAneis(): Promise<void> {
    await this.page.goto(
      'https://pt.wikipedia.org/wiki/O_Senhor_dos_An%C3%A9is'
    );
  }

  async validarElementosPagina(): Promise<void> {
    await expect(this.wikiElements.getTituloPrincipal()).toHaveText(
      'O Senhor dos Anéis'
    );
    await expect(this.wikiElements.getInfoBox()).toBeVisible();
  }

  async clicarNoAutor(): Promise<void> {
    await this.wikiElements.getLinkTolkien().click();
  }
}
