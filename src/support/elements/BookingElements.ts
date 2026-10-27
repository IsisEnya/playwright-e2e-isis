import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class BookingElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getBotaoCookies(): Locator {
    return this.page.locator('#onetrust-accept-btn-handler, button:has-text("Aceitar"), button:has-text("Accept")').first();
  }

  getCampoDestino(): Locator {
    return this.page.locator('input[name="ss"], input[placeholder*="Para onde você vai?"]');
  }

  getPrimeiraSugestaoDestino(): Locator {
    // Seletor genérico robusto para as opções da lista de autocompletar do Booking
    return this.page.locator('#autocomplete-result-0, [data-testid="autocomplete-result"] div').first();
  }

  getBotaoPesquisar(): Locator {
    return this.page.locator('button[type="submit"], button:has-text("Pesquisar")');
  }
}