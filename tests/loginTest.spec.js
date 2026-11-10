
import { expect, test } from "@playwright/test";
import ExcelJS from "exceljs";
import LoginPage2 from "../POM/LoginPage2.js";
import AddtoCardPage from "../POM/AddtoCardPage.js";
import CheckOutPage from "../POM/CheckOutPage.js";
import CheckInformation from "../POM/CheckInformation.js";
import OverviewPage from "../POM/OverviewPage.js";
import OrderCompletePage from "../POM/OrderCompletePage.js";
import LogOutPage from "../POM/logOutPage.js";

test("Login by DDT 2", async ({ page }) => {
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

        const login = new LoginPage2(page);
        await login.loginPage2(data.Username, data.Password);
        const addcard=new AddtoCardPage(page);
        await addcard.AddCard();
        const checkout=new CheckOutPage(page);
        await checkout.checkOut()
        const checkinfo=new CheckInformation(page);
        await checkinfo.checkInfo(data.First_Name, data.Last_Name, data.Zip_code, data.Exp_price);
        const overview=new OverviewPage(page);
        await overview.overView(data.Exp_price);
        const ordercomplete=new OrderCompletePage(page);
        await ordercomplete.orderComplete();
        await page.waitForTimeout(2000);
        const logout=new LogOutPage(page);
        await logout.logOut();
    }
});
