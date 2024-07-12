const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);
    console.log("Login berhasil!");

    // Akses halaman draft-dokumen
    await driver.get("http://127.0.0.1:8000/draft-dokumen");
    await driver.wait(until.elementLocated(By.css("table.table tbody tr")), 10000);
    console.log("Berhasil akses halaman draft");

    let deleteButton = await driver.findElement(By.css("table.table tbody tr:first-child button[type='submit']"));

    // Scroll ke tombol delete
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", deleteButton);
    await driver.sleep(1000);

    // Klik tombol delete
    console.log("Mengklik tombol delete...");
    await deleteButton.click();

    // Menunggu dan menerima alert konfirmasi
    await driver.wait(until.alertIsPresent(), 5000);
    await driver.switchTo().alert().accept();
    await driver.sleep(1000);

    console.log("Dokumen berhasil dihapus dari draft.");
  } catch (error) {
    console.error("Error during document deletion:", error);
  } finally {
    await driver.quit();
  }
}

deleteDocument();
