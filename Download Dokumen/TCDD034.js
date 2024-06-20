const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function downloadDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 20000);
    console.log("Login berhasil!");

    await driver.get("http://127.0.0.1:8000/list-dokumen");

    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    // Baris dokumen yang filenya akan di  download
    let secondRow = await driver.findElement(By.css("#documentTableBody tr:nth-child(2)"));

    // Scroll horizontal dan vertikal ke kanan untuk melihat icon unduh
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center', inline: 'nearest' });", secondRow);

    // Scroll horizontal ke kanan
    await driver.executeScript("window.scrollBy(1000,0)");
    await driver.sleep(1000);

    let downloadLink = await secondRow.findElement(By.css("a.btn.btn-link[download]"));

    await driver.wait(until.elementIsVisible(downloadLink), 2000);
    await driver.executeScript("arguments[0].click();", downloadLink);

    await driver.sleep(2000);

    console.log("Unduh Dokumen Berhasil");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

downloadDocument();
