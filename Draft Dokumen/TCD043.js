const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");

    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));
    console.log("Login berhasil!");

    // Navigasi ke halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");

    await driver.wait(until.elementLocated(By.css("#documentTableBody tr")));

    // Ambil baris pertama dari tabel dokumen
    let firstRow = await driver.findElement(By.css("#documentTableBody tr:first-child"));

    await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", firstRow);

    // Tunggu elemen terlihat
    await driver.wait(until.elementIsVisible(firstRow));

    // Klik tombol hapus di baris pertama
    let deleteButton = await firstRow.findElement(By.css('form button[type="submit"]'));
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'center'});", deleteButton);
    await driver.sleep(1000);
    await deleteButton.click();

    // Tunggu sampai konfirmasi muncul dan terima konfirmasi
    await driver.wait(until.alertIsPresent(), 2000);
    await driver.switchTo().alert().accept();

    console.log("Dokumen berhasil dihapus");
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/draft-dokumen");
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error}`);
  } finally {
    await driver.quit();
  }
}

deleteDocument();
