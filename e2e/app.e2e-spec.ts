import { WebtopPage } from './app.po';

describe('webtop App', () => {
  let page: WebtopPage;

  beforeEach(() => {
    page = new WebtopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
