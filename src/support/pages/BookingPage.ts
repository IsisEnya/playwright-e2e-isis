import { Page, expect } from '@playwright/test';
import BookingElements from '../elements/BookingElements';
import BasePage from './BasePage';

export default class BookingPage extends BasePage {
  readonly bookingElements: BookingElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.bookingElements = new BookingElements(page);
  }

  async acessarHome(): Promise<void> {
    await this.page.goto('https://www.booking.com/');

    // Tenta fechar o aviso de cookies caso ele apareça
    try {
      const botaoCookies = this.bookingElements.getBotaoCookies();
      if (await botaoCookies.isVisible({ timeout: 3000 })) {
        await botaoCookies.click();
      }
    } catch (e) {
      // Ignora se não houver banner de cookies
    }
  }

  async fecharPopUpLoginSeExistir(): Promise<void> {
    try {
      // O Booking costuma usar um botão de "X" ou "Fechar" nos modais de login/genius
      const botaoFechar = this.page.locator('button[aria-label="Ignorar a entrada na conta."], button[aria-label="Dismiss sign-in info."], .a83d0fb3c2 svg').first();
      if (await botaoFechar.isVisible({ timeout: 2000 })) {
        await botaoFechar.click();
      }
    } catch (e) {
      // Ignora se o pop-up não aparecer
    }
  }

  async pesquisarDestino(destino: string): Promise<void> {
    const campo = this.bookingElements.getCampoDestino();
    await campo.click();
    
    // Fecha o pop-up de login caso ele tenha pulado na tela após o clique
    await this.fecharPopUpLoginSeExistir();

    await campo.fill(destino);

    // Clica na primeira sugestão do autocompletar
    const sugestao = this.bookingElements.getPrimeiraSugestaoDestino();
    await sugestao.waitFor({ state: 'visible', timeout: 5000 });
    await sugestao.click();

    // Clica no botão de pesquisar
    await this.bookingElements.getBotaoPesquisar().click();
  }

  async validarResultadosPesquisa(): Promise<void> {
    await expect(this.page).toHaveURL(/searchresults/);
  }
}