import { test, expect } from "@playwright/test";

test("debe renderizar el título y descripción correctamente", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  await expect(page.locator("h1")).toContainText(
    "Impulsando el Cambio Positivo"
  );

  await expect(
    page.getByText(
      "Somos una Organización Juvenil dedicada a generar participación social y buenas prácticas para promover el bienestar y el desarrollo de las personas."
    )
  ).toContainText(
    "Somos una Organización Juvenil dedicada a generar participación social y buenas prácticas para promover el bienestar y el desarrollo de las personas."
  );
});

test("debe renderizar la sección de Misión", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(
    page.getByRole("heading", { name: "Nuestra Misión" })
  ).toContainText("Nuestra Misión");

  // Primera tarjeta
  await expect(page.getByText("Prevención de Enfermedades")).toContainText(
    "Prevención de Enfermedades"
  );
  await expect(
    page.getByText(
      "Desarrollamos campañas de prevención para promover la salud y el bienestar en nuestra comunidad."
    )
  ).toContainText(
    "Desarrollamos campañas de prevención para promover la salud y el bienestar en nuestra comunidad."
  );
});

test("debe renderizar la sección de Proyectos", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(
    page.getByRole("heading", { name: "Nuestros Proyectos" })
  ).toContainText("Nuestros Proyectos");

  // Primera tarjeta
  await expect(page.getByText("Campaña de Salud Mental")).toContainText(
    "Campaña de Salud Mental"
  );
  await expect(page.getByText("Concientización y apoyo")).toContainText(
    "Concientización y apoyo"
  );
});

test("debe renderizar la sección de CTA", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(
    page.getByRole("heading", { name: "¿Listo para hacer la diferencia?" })
  ).toContainText("¿Listo para hacer la diferencia?");

  await expect(
    page.getByText(
      "Únete a nuestra misión de crear un impacto positivo en la sociedad. Juntos podemos lograr grandes cambios."
    )
  ).toContainText(
    "Únete a nuestra misión de crear un impacto positivo en la sociedad. Juntos podemos lograr grandes cambios."
  );

  const button = page.getByRole("link", { name: "Hazte Voluntario" });
  const href = await button.getAttribute("href");
  expect(href).toBe("https://www.instagram.com/sembrandosuenos.peru");

  const secondButton = page.getByRole("link", { name: "Haz una Donación" });
  const secondHref = await secondButton.getAttribute("href");
  expect(secondHref).toBe("https://www.instagram.com/p/DCdCrkVtPLb/?hl=es");
});
