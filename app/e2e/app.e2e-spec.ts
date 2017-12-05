import { ContecKwiraPage } from './app.po';

describe('contec-kwira App', () => {
  let page: ContecKwiraPage;

  beforeEach(() => {
    page = new ContecKwiraPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
