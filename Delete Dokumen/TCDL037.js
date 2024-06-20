const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function cancelDeleteDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Tunggu sampai berhasil login dan halaman home terbuka
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 20000);
    console.log("Login berhasil!");

    // Navigasi ke halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    // Tunggu sampai elemen list dokumen terlihat
    await driver.wait(until.elementLocated(By.css("#documentTableBody tr")), 20000);

    // Ambil baris pertama dari tabel dokumen
    let firstRow = await driver.findElement(By.css("#documentTableBody tr:first-child"));

    // Scroll horizontal dan vertikal ke kanan untuk melihat ikon hapus
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", firstRow);

    // Tunggu elemen terlihat
    await driver.wait(until.elementIsVisible(firstRow), 2000);

    // Klik tombol hapus di baris pertama
    let deleteButton = await firstRow.findElement(By.css('form button[type="submit"]'));
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", deleteButton);
    await driver.sleep(1000); // Waktu tunggu tambahan jika diperlukan
    await deleteButton.click();
    await driver.sleep(1000);

    // Tunggu sampai konfirmasi muncul dan batalkan konfirmasi
    await driver.wait(until.alertIsPresent(), 2000);
    await driver.switchTo().alert().dismiss();
    await driver.sleep(1000);

    console.log("Penghapusan dokumen dibatalkan");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

cancelDeleteDocument();
