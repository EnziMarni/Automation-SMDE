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

    // Akses halaman draft-dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/draft-dokumen");
    await driver.wait(until.elementLocated(By.css("table.table tbody tr")));
    console.log("Berhasil akses halaman draft");

    let deleteButton = await driver.findElement(By.css("table.table tbody tr:first-child button[type='submit']"));

    // Scroll ke tombol delete
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", deleteButton);

    // Klik tombol delete
    console.log("Mengklik tombol delete...");
    await deleteButton.click();

    // Menunggu dan menerima alert konfirmasi
    await driver.wait(until.alertIsPresent(), 5000);
    await driver.switchTo().alert().accept();

    console.log("Dokumen berhasil dihapus dari draft.");
  } catch (error) {
    console.error("Error during document deletion:", error);
  } finally {
    await driver.quit();
  }
}

deleteDocument();
