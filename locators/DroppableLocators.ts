import { Page } from '@playwright/test';

export class DroppableLocators {
  constructor(private page: Page) {}

  get simpleTab() {
    return this.page.getByRole('tab', { name: 'Simple' });
  }

  get dragElement() {
    return this.page
      .getByRole('tabpanel', { name: 'Simple' })
      .locator('#draggable');
  }

  get dropTarget() {
    return this.page
      .getByRole('tabpanel', { name: 'Simple' })
      .locator('#droppable');
  }
}