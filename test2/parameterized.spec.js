import fs from "fs";
import path from "path";
import { test } from "@playwright/test";
import { parse } from "csv-parse/sync";

const records = parse(fs.readFileSync(path.join(__dirname, "input.csv")), {
  columns: true,
  skip_empty_lines: true,
});

for (const record of records) {
  test(`Login ${record.test_case_id}`, async ({ page }) => {
    await page.goto(
      "https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ",
    );
    console.log(record.test_case_id, record.username, record.password);
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
    await page
      .getByRole("textbox", { name: "ตัวอย่าง:" })
      .fill(record.username);
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
    await page
      .getByRole("textbox", { name: "รหัส PIN 4 หลัก" })
      .fill(record.password);
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(
      page.getByRole("heading", { name: "ยอดเงินคงเหลือ" }),
    ).toBeVisible();
  });
}
