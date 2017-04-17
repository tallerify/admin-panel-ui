import { AdminUiPage } from './app.po';

describe('admin-ui App', () => {
  let page: AdminUiPage;

  beforeEach(() => {
    page = new AdminUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
