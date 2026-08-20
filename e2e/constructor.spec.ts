import { test, expect, type Locator, type Page } from '@playwright/test';

const HAR_PATH = './e2e/hars/burger.har';
const API_URL_GLOB = '**/api/**';

const ORDER_NUMBER = '34567';

const INGREDIENTS = {
  bunR2D3: {
    id: '692889f16bf770001bfeb4cd',
    name: 'Флюоресцентная булка R2-D3',
    price: 988,
  },
  bunN200i: {
    id: '692889f16bf770001bfeb4cc',
    name: 'Краторная булка N-200i',
    price: 1255,
  },
  main: {
    id: '692889f16bf770001bfeb4d1',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
  },
  modalIngredient: {
    id: '692889f16bf770001bfeb4d6',
    name: 'Хрустящие минеральные кольца',
    calories: 986,
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
  },
};

function constructor(page: Page): Locator {
  return page.getByTestId('burger-constructor');
}

function ingredientCard(page: Page, ingredient: { id: string }): Locator {
  return page.getByTestId(`ingredient-${ingredient.id}`);
}

async function openConstructor(page: Page, auth = false): Promise<void> {
  if (auth) {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'Bearer test-access-token');
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });
  }

  await page.routeFromHAR(HAR_PATH, {
    url: API_URL_GLOB,
    update: false,
  });

  await page.goto('/');
  await expect(constructor(page)).toBeVisible();
}

async function dragIngredientTo(
  page: Page,
  ingredient: { id: string },
  target: Locator
): Promise<void> {
  await ingredientCard(page, ingredient).dragTo(target);
}

test.describe('Constructor page', () => {
  test('should drag ingredients into the constructor', async ({ page }) => {
    await openConstructor(page);

    await expect(page.getByTestId('constructor-bun-placeholder')).toHaveCount(2);
    await expect(page.getByTestId('constructor-filling-placeholder')).toBeVisible();

    const bunPlaceholder = page.getByTestId('constructor-bun-placeholder').first();
    await dragIngredientTo(page, INGREDIENTS.bunR2D3, bunPlaceholder);

    await expect(page.getByTestId('constructor-bun-top')).toContainText(
      INGREDIENTS.bunR2D3.name
    );
    await expect(page.getByTestId('constructor-bun-bottom')).toContainText(
      INGREDIENTS.bunR2D3.name
    );
    await expect(page.getByTestId('constructor-total')).toHaveText(
      String(INGREDIENTS.bunR2D3.price * 2)
    );

    await dragIngredientTo(
      page,
      INGREDIENTS.main,
      page.getByTestId('constructor-filling-placeholder')
    );

    await expect(
      page.getByTestId(`constructor-ingredient-${INGREDIENTS.main.id}`)
    ).toContainText(INGREDIENTS.main.name);
    await expect(page.getByTestId('constructor-total')).toHaveText(
      String(INGREDIENTS.bunR2D3.price * 2 + INGREDIENTS.main.price)
    );

    await dragIngredientTo(page, INGREDIENTS.bunN200i, constructor(page));

    await expect(page.getByTestId('constructor-bun-top')).toContainText(
      INGREDIENTS.bunN200i.name
    );
    await expect(page.getByTestId('constructor-bun-top')).not.toContainText(
      INGREDIENTS.bunR2D3.name
    );
    await expect(page.getByTestId('constructor-total')).toHaveText(
      String(INGREDIENTS.bunN200i.price * 2 + INGREDIENTS.main.price)
    );
  });

  test('should open the ingredient details modal', async ({ page }) => {
    await openConstructor(page);

    await ingredientCard(page, INGREDIENTS.modalIngredient).click();

    const modal = page.getByTestId('ingredient-modal');
    await expect(modal).toBeVisible();

    await expect(
      modal.getByTestId(`ingredient-name-${INGREDIENTS.modalIngredient.id}`)
    ).toHaveText(INGREDIENTS.modalIngredient.name);
    await expect(
      page.getByTestId(`ingredient-image-${INGREDIENTS.modalIngredient.id}`)
    ).toBeVisible();

    const facts = page.getByTestId('ingredient-facts');
    await expect(facts.getByTestId('fact-calories')).toContainText(
      String(INGREDIENTS.modalIngredient.calories)
    );
    await expect(facts.getByTestId('fact-proteins')).toContainText(
      String(INGREDIENTS.modalIngredient.proteins)
    );
    await expect(facts.getByTestId('fact-fat')).toContainText(
      String(INGREDIENTS.modalIngredient.fat)
    );
    await expect(facts.getByTestId('fact-carbohydrates')).toContainText(
      String(INGREDIENTS.modalIngredient.carbohydrates)
    );
  });

  test('should close the ingredient modal via the close button', async ({ page }) => {
    await openConstructor(page);

    await ingredientCard(page, INGREDIENTS.modalIngredient).click();
    await expect(page.getByTestId('ingredient-modal')).toBeVisible();

    await page.getByTestId('modal-close').click();

    await expect(page.getByTestId('ingredient-modal')).not.toBeVisible();
  });

  test('should create an order and show its number in the modal', async ({ page }) => {
    await openConstructor(page, true);

    const bunPlaceholder = page.getByTestId('constructor-bun-placeholder').first();
    await dragIngredientTo(page, INGREDIENTS.bunR2D3, bunPlaceholder);
    await dragIngredientTo(
      page,
      INGREDIENTS.main,
      page.getByTestId('constructor-filling-placeholder')
    );

    await page.getByTestId('order-button').click();

    const modal = page.getByTestId('order-details-modal');
    await expect(modal).toBeVisible();

    await expect(modal.getByTestId('order-caption')).toBeVisible();
    await expect(page.getByTestId('order-number')).toHaveText(ORDER_NUMBER);
    await expect(modal.getByTestId('order-status')).toBeVisible();

    await page.getByTestId('modal-close').click();

    await expect(page.getByTestId('order-details-modal')).not.toBeVisible();
    await expect(page.getByTestId('constructor-bun-placeholder')).toHaveCount(2);
  });
});
