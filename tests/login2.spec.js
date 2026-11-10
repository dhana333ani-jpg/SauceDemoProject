
import { expect, test } from "@playwright/test";  // this is test runner
import ExcelJS from "exceljs";
import LoginPage from "../POM/loginPage.js";

test("Login by DDT", async ({ page }) => {
    const book = new ExcelJS.Workbook();

    await book.xlsx.readFile(
        "C:/Users/Dell/Desktop/SauceDemoProject/TestData/Book1.xlsx"
    );

    const sheet = book.getWorksheet("Sheet1");

    // Automatically detect headers
    const headers = sheet.getRow(1).values
        .slice(1)
        .map(header => String(header).trim());

    // Automatically detect and process all data rows
    for (let rowNum = 2; rowNum <= sheet.rowCount; rowNum++) {
        const row = sheet.getRow(rowNum);

        // Skip empty rows
        if (row.values.slice(1).every(value =>
            value === null || value === undefined || value === ""
        )) {
            continue;
        }

        const data = {};

        headers.forEach((header, index) => {
            if (header) {
                data[header] = String(row.getCell(index + 1).text).trim();
            }
        });

        console.log(`Test data from row ${rowNum}:`, data);

        await page.goto(data.URL);

        const login = new LoginPage(page);

        await login.loginToSauce(data.Username, data.Password);
        await login.AddCard();
        await login.orderProduct(data.First_Name, data.Last_Name, data.Zip_code, data.Exp_price);
        await login.logOut();
        await page.waitForTimeout(3000)

    }
});
