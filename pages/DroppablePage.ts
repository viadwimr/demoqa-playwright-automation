import { expect, Page } from '@playwright/test';
import { DroppableLocators } from '../locators/DroppableLocators';

export class DroppablePage {
  private locators: DroppableLocators;

  constructor(private page: Page) {
    this.locators = new DroppableLocators(page);
  }

  async open() {
    await this.page.goto('/droppable', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await this.locators.simpleTab.click();
  }

  async dragAndDrop() {
    const source = this.locators.dragElement;
    const target = this.locators.dropTarget;

    await expect(source).toBeVisible();
    await expect(target).toBeVisible();

    await expect.poll(async () => source.evaluate(element => element.classList.contains('ui-draggable')), {
      timeout: 15_000
    }).toBe(true);

    await expect.poll(async () => target.evaluate(element => element.classList.contains('ui-droppable')), {
      timeout: 15_000
    }).toBe(true);

    await source.scrollIntoViewIfNeeded();
    await target.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);

    await expect(source).toHaveClass(/ui-draggable/);
    await expect(target).toHaveClass(/ui-droppable/);

    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    if (!sourceBox || !targetBox) {
      throw new Error('Source or target is not visible');
    }

    const startX = sourceBox.x + sourceBox.width / 2;
    const startY = sourceBox.y + sourceBox.height / 2;
    const endX = targetBox.x + targetBox.width / 2;
    const endY = targetBox.y + targetBox.height / 2;

    await this.page.evaluate(({ startX, startY, endX, endY }) => {
      const source = document.elementFromPoint(startX, startY);
      if (!source) return;

      const fireMouse = (element: Element | Document, type: string, x: number, y: number) => {
        element.dispatchEvent(new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          button: 0,
          buttons: type === 'mouseup' ? 0 : 1,
          clientX: x,
          clientY: y,
          view: window
        }));
      };

      fireMouse(source, 'mousedown', startX, startY);
      for (let step = 1; step <= 30; step++) {
        fireMouse(
          document,
          'mousemove',
          startX + ((endX - startX) * step) / 30,
          startY + ((endY - startY) * step) / 30
        );
      }
      fireMouse(document, 'mouseup', endX, endY);
    }, { startX, startY, endX, endY });
  }

  async verifyDropSuccess() {
    await expect(this.locators.dropTarget).toContainText('Dropped!');
    await expect(this.locators.dropTarget).toHaveCSS(
      'background-color',
      'rgb(70, 130, 180)'
    );
  }
}
