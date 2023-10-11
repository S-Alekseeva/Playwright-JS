// @ts-check
const { test, expect, chromium } = require("@playwright/test");
import { validUser, invalidUser } from "../User";

test("authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(validUser.email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(validUser.password);
  await page.getByTestId("login-submit-btn").click();
  const header = await page.locator("h2").first();
  await expect(header).toHaveText("Моё обучение");
  await page.screenshot({ path: "screenshotAccount.png", fullPage: true });
});

test("unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(invalidUser.email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(invalidUser.password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("data-testid=login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "screenshotError.png", fullPage: true });
});
