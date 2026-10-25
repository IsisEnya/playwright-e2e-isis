import { test, expect } from '@playwright/test';
import WikiPage from '../support/pages/WikiPage';

test.describe('Wikipédia - O Senhor dos Anéis', () => {
  let wikiPage: WikiPage;

  test.beforeEach(async ({ page }) => {
    wikiPage = new WikiPage(page);
    await wikiPage.acessarPaginaSenhorDosAneis();
  });

  test('Validar informações principais e navegação para o autor', async ({
    page
  }) => {
    await wikiPage.validarElementosPagina();
    await wikiPage.clicarNoAutor();
    await expect(page).toHaveURL(/J\._R\._R\._Tolkien/);
  });
});
