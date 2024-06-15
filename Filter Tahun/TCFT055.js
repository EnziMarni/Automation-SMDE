const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function filterByOldestYear() {
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

    let yearFilterDropdown = await driver.findElement(By.id("yearFilter"));

    // Pilih opsi "Terlama" dari dropdown filter tahun
    let yearOptionOldest = await driver.findElement(By.css("option[value='oldest']"));
    await yearOptionOldest.click();
    await driver.sleep(2000);

    console.log("Filter 'Terlama' berhasil dipilih.");
  } catch (error) {
    console.error("Error during filtering by oldest year:", error);
  } finally {
    await driver.quit();
  }
}

filterByOldestYear();
