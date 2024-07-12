const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function cancelDownload() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.sleep(1000);

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 20000);
    console.log("Login berhasil!");
    await driver.sleep(1000);

    await driver.get("http://127.0.0.1:8000/list-dokumen");
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    // Baris dokumen yang filenya akan di-download
    let thirdRow = await driver.findElement(By.css("#documentTableBody tr:nth-child(2)"));
    await driver.sleep(1000);

    // Scroll horizontal dan vertikal ke kanan untuk melihat icon unduh
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center', inline: 'nearest' });", thirdRow);
    await driver.sleep(1000);

    // Scroll horizontal ke kanan
    await driver.executeScript("window.scrollBy(1000,0)");
    await driver.sleep(1000);

    let downloadLink = await thirdRow.findElement(By.css("a.btn.btn-link[download]"));
    await driver.sleep(1000);

    await driver.wait(until.elementIsVisible(downloadLink), 2000);
    await driver.executeScript("arguments[0].click();", downloadLink);

    console.log("Unduhan dibatalkan..");

    await driver.sleep(500);
    await driver.close();

    console.log("Unduhan dibatalkan.");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

cancelDownload();
