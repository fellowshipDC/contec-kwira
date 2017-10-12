import { WebMappingPage } from './app.po';

describe('web-mapping App', () => {
  let page: WebMappingPage;

  beforeEach(() => {
    page = new WebMappingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
