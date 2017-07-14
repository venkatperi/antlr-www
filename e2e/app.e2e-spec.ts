import { Antlr4Page } from './app.po';

describe('antlr4 App', () => {
  let page: Antlr4Page;

  beforeEach(() => {
    page = new Antlr4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
