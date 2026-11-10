import {test} from "@playwright/test";
import loginPage from "../POM/loginPage.js";
import excel from "exceljs";

test("Login", async({page})=>{
    let book = new excel.Workbook();
    await book.xlsx.readFile("TestData/Book1.xlsx"); // Use relative path so Jenkins can find it inside the workspace!
    const sheet = book.getWorksheet("Sheet1");

    // Read the username and password from Row 2 (Row 1 is headers)
    const usernameVal = sheet.getRow(2).getCell(2).value; // Adjust cell number based on your columns
    const passwordVal = sheet.getRow(2).getCell(3).value; // Adjust cell number based on your columns

    await page.goto("https://www.saucedemo.com/");
    let login = new loginPage(page);
    
    // Pass the actual variables extracted from Excel
    await login.loginToSauce(usernameVal, passwordVal);
    await page.waitForTimeout(2000);
});