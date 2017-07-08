import { OnTapPage } from './app.po';

describe('on-tap App', () => {
  let page: OnTapPage;

  beforeEach(() => {
    page = new OnTapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
