const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function viewDocumentHistory() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");

    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 20000);
    console.log("Login berhasil!");

    // Akses halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");

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

    console.log("View icon history berhasil diklik");
  } catch (error) {
    console.error("Error during viewing document history:", error);
  } finally {
    await driver.quit();
  }
}

viewDocumentHistory();
