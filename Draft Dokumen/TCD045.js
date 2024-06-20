const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocument() {
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

    // Akses halaman draft-dokumen
    await driver.get("http://127.0.0.1:8000/draft-dokumen");
    await driver.sleep(1000);
    console.log("Berhasil akses halaman draft");

    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    let deleteButton = await driver.findElement(By.css("#documentTableBody tr:first-child button[type='submit']"));

    // Scroll ke tombol delete
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", deleteButton);
    await driver.sleep(1000);

    // Klik tombol delete
    console.log("Mengklik tombol delete...");
    await deleteButton.click();
    await driver.sleep(1000);
    console.log("Menerima alert konfirmasi penghapusan...");
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
