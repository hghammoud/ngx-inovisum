import { NgxInovisumDemoPage } from './app.po';

describe('ngx-inovisum-demo App', () => {
  let page: NgxInovisumDemoPage;

  beforeEach(() => {
    page = new NgxInovisumDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
