import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ",
  );
  await page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
  await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
  await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
  await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page.getByText("เข้าสู่ระบบสำเร็จ")).toBeVisible();
  // await expect( page.getByText("เข้าสู่ระบบสำเร็จ", { exact: true })).toBeVisible();
});
