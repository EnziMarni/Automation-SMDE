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

    await driver.wait(until.elementLocated(By.id("documentTableBody")), 10000);

    let deleteButton = await driver.findElement(By.css("#documentTableBody tr:first-child form button[type='submit']"));

    // Scroll ke tombol delete jika perlu
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });", deleteButton);

    await driver.sleep(1000);

    await deleteButton.click();
    await driver.sleep(1000);

    await driver.switchTo().alert().accept();
    await driver.sleep(1000);

    await driver.get("http://127.0.0.1:8000/draft-dokumen");

    console.log("Dokumen berhasil dihapus.");
  } catch (error) {
    console.error("Error during document deletion:", error);
  } finally {
    await driver.quit();
  }
}

deleteDocument();
