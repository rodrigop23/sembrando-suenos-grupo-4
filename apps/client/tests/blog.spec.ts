import { test, expect } from "@playwright/test";

test("debe navegar hacia la página de Actividades", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click("text=Blog");
  await expect(page).toHaveURL("http://localhost:3000/blog");
  await expect(page.locator("h1")).toContainText("Nuestro Blog");
});
