const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function downloadDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));
    console.log("Login berhasil!");

    await driver.get("http://127.0.0.1:8000/list-dokumen");

    await driver.wait(until.elementLocated(By.id("documentTableBody")));

    // Baris dokumen yang filenya akan di  download
    let secondRow = await driver.findElement(By.css("#documentTableBody tr:nth-child(2)"));

    // Scroll horizontal dan vertikal ke kanan untuk melihat icon unduh
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center', inline: 'nearest' });", secondRow);

    // Scroll horizontal ke kanan
    await driver.executeScript("window.scrollBy(1000,0)");

    let downloadLink = await secondRow.findElement(By.css("a.btn.btn-link[download]"));

    await driver.wait(until.elementIsVisible(downloadLink), 1000);
    await driver.executeScript("arguments[0].click();", downloadLink);

    console.log("Unduh Dokumen Berhasil");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

downloadDocument();
