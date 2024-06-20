const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function viewDocumentHistory() {
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

    // Akses halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");
    await driver.sleep(1000);
    console.log("Berhasil akses halaman list dokumen");

    // Tunggu hingga elemen documentTableBody muncul
    await driver.wait(until.elementLocated(By.id("documentTableBody")), 30000);
    console.log("Elemen tabel dokumen ditemukan");

    // Cari tombol "Lihat Riwayat" dalam tabel
    let viewHistoryButton = await driver.findElement(By.css("#documentTableBody tr:first-child a.btn.btn-link i.fa-history"));
    console.log("Tombol 'Lihat Riwayat' ditemukan");

    // Scroll ke tombol "Lihat Riwayat"
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'nearest', inline: 'center' });", viewHistoryButton);
    await driver.sleep(1000);

    // Klik tombol "Lihat Riwayat"
    await viewHistoryButton.click();
    await driver.wait(until.elementLocated(By.css("button.btn.btn-secondary[data-bs-dismiss='modal']")), 10000);

    await driver.sleep(3000);

    console.log("Tombol 'Lihat Riwayat' berhasil diklik");
  } catch (error) {
    console.error("Error during viewing document history:", error);
  } finally {
    await driver.quit();
  }
}

viewDocumentHistory();
