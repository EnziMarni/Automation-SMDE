const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function filterByNewestYear() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Masuk ke halaman login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/list-dokumen");
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.id("yearFilter")), 10000);

    // Temukan dropdown filter tahun
    let yearFilterDropdown = await driver.findElement(By.id("yearFilter"));
    await driver.sleep(2000);

    // Pilih opsi "Terbaru" dari dropdown filter tahun
    let yearOptionNewest = await driver.findElement(By.css("option[value='newest']"));
    await yearOptionNewest.click();
    await driver.sleep(2000);

    console.log("Filter 'Terbaru' berhasil dipilih.");
    await driver.sleep(2000);
  } catch (error) {
    console.error("Error during filtering by newest year:", error);
  } finally {
    await driver.quit();
  }
}

filterByNewestYear();
