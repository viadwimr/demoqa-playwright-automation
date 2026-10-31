import { expect, Page } from '@playwright/test';
import { ResizableLocators } from '../locators/ResizableLocators';

export class ResizablePage {
  private locators: ResizableLocators;

  constructor(private page: Page) {
    this.locators = new ResizableLocators(page);
  }

  async open() {
    await this.page.goto('/resizable');
  }

  async getSize() {
    return this.locators.resizableBox.evaluate(element => {
      const rect = element.getBoundingClientRect();

      return {
        width: rect.width,
        height: rect.height
      };
    });
  }

  async resizeTo(width: number, height: number) {
    const box = this.locators.resizableBox;
    const handle = this.locators.resizeHandle;

    await expect(box).toBeVisible();
    await expect(handle).toBeVisible();

    await handle.scrollIntoViewIfNeeded();
    await handle.evaluate(element => {
      element.scrollIntoView({ block: 'center', inline: 'center' });
    });

    await this.page.waitForTimeout(500);

    const initialSize = await this.getSize();
    await handle.hover();
    const handleRect = await handle.boundingBox();

    if (!handleRect) {
      throw new Error('Resizable handle is not available.');
    }

    const startX = handleRect.x + handleRect.width / 2;
    const startY = handleRect.y + handleRect.height / 2;
    const targetX = startX + (width - initialSize.width);
    const targetY = startY + (height - initialSize.height);

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + 2, startY + 2, { steps: 5 });
    await this.page.mouse.move(targetX, targetY, { steps: 30 });
    await this.page.waitForTimeout(100);
    await this.page.mouse.up();

    await expect.poll(
      async () => await this.getSize(),
      { timeout: 10_000 }
    ).toEqual({ width, height });
  }
}