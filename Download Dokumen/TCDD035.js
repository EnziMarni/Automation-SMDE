const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function cancelDownload() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 20000);
    console.log("Login berhasil!");

    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    // Baris dokumen yang filenya akan di-download
    let thirdRow = await driver.findElement(By.css("#documentTableBody tr:nth-child(2)"));

    // Scroll horizontal dan vertikal ke kanan untuk melihat icon unduh
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center', inline: 'nearest' });", thirdRow);

    // Scroll horizontal ke kanan
    await driver.executeScript("window.scrollBy(1000,0)");

    let downloadLink = await thirdRow.findElement(By.css("a.btn.btn-link[download]"));

    await driver.wait(until.elementIsVisible(downloadLink));
    await driver.executeScript("arguments[0].click();", downloadLink);

    console.log("Unduhan dibatalkan..");

    await driver.close();

    console.log("Unduhan dibatalkan.");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

cancelDownload();
