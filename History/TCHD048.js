const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function viewDocumentHistory() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 20000);
    console.log("Login berhasil!");

    // Akses halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");
    await driver.sleep(1000);
    console.log("Berhasil akses halaman list dokumen");

    // Tunggu hingga elemen documentTableBody muncul
    await driver.wait(until.elementLocated(By.id("documentTableBody")), 30000);
    console.log("Elemen tabel dokumen ditemukan");

    // Cari ikon history dalam tabel
    let viewHistoryIcon = await driver.findElement(By.css("#documentTableBody tr:first-child a.btn.btn-link i.fa-history"));
    console.log("Ikon history ditemukan");

    // Scroll ke ikon history secara horizontal
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'nearest', inline: 'center' });", viewHistoryIcon);
    await driver.sleep(1000);

    // Klik ikon history
    await viewHistoryIcon.click();
    await driver.sleep(2000);

    console.log("View icon history berhasil diklik");
  } catch (error) {
    console.error("Error during viewing document history:", error);
  } finally {
    await driver.quit();
  }
}

viewDocumentHistory();
