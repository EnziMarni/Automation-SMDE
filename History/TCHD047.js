const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function viewDocumentHistory() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));
    console.log("Login berhasil!");

    // Akses halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    console.log("Berhasil akses halaman list dokumen");

    // Tunggu hingga elemen documentTableBody muncul
    await driver.wait(until.elementLocated(By.id("documentTableBody")));
    console.log("Elemen tabel dokumen ditemukan");

    // Cari ikon history dalam tabel
    let viewHistoryIcon = await driver.findElement(By.css("#documentTableBody tr:first-child a.btn.btn-link i.fa-history"));
    console.log("Ikon history ditemukan");

    // Scroll ke ikon history secara horizontal
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'nearest', inline: 'center' });", viewHistoryIcon);

    console.log("View icon history berhasil");
  } catch (error) {
    console.error("Error during viewing document history:", error);
  } finally {
    await driver.quit();
  }
}

viewDocumentHistory();
