export async function takeScreenshot(locator) {
    let date=Date.now();
    await locator.screenshot({path:`./Screenshot/scr${date}.png`})   
}