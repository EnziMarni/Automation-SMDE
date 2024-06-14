const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function deleteDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/list-dokumen");

    // Tunggu hingga halaman selesai dimuat
    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    // Temukan tombol delete pertama dan klik
    let deleteButton = await driver.findElement(By.css("#documentTableBody tr:first-child form button[type='submit']"));

    // Scroll ke tombol delete jika perlu
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", deleteButton);

    // Tunggu sejenak untuk memastikan elemen dapat diklik
    await driver.sleep(1000);

    // Klik tombol delete
    await deleteButton.click();
    await driver.sleep(1000);

    // Tunggu konfirmasi dialog dan tekan OK
    await driver.switchTo().alert().accept();
    await driver.sleep(1000);

    console.log("Dokumen berhasil dihapus.");
  } catch (error) {
    console.error("Error during document deletion:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

deleteDocument();
