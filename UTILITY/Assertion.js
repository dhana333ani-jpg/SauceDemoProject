import { expect } from "@playwright/test";

export async function elementToBeVisible(locator) {
    await expect(locator).toBeVisible();
}

export async function elementToHaveUrl(page, url){
    await expect(page).toHaveURL(url);
}

export async function elementvalueToBe(actualValue, expectedValue) {
    await expect(actualValue).toBe(expectedValue)
    
}

export async function elementToHaveText(locator, expectedText){
    await expect(locator).toHaveText(expectedText);
}