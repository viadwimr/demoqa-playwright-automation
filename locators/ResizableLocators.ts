import { Page } from '@playwright/test';

export class ResizableLocators {
  constructor(private page: Page) {}

  get resizableBox() {
    return this.page.locator('#resizable');
  }

  get resizeHandle() {
    return this.page.locator('#resizable .react-resizable-handle');
  }
}