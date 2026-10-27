import { test } from '@playwright/test';
import BookingPage from '../support/pages/BookingPage';

test.describe('Booking.com - Testes de Pesquisa de Hospedagem', () => {
  let bookingPage: BookingPage;

  test.beforeEach(async ({ page }) => {
    bookingPage = new BookingPage(page);
    await bookingPage.acessarHome();
  });

  test('Realizar busca de hotel em um destino', async () => {
    await bookingPage.pesquisarDestino('Florianópolis');
    await bookingPage.validarResultadosPesquisa();
  });
});   