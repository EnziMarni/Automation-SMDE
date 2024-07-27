const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function filterByYear() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Masuk ke halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");

    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    // Tunggu sampai halaman utama terbuka
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));
    console.log("Login berhasil!");

    // Buka halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    console.log("Berhasil akses halaman list dokumen");

    // Tunggu sampai elemen filter tahun muncul
    await driver.wait(until.elementLocated(By.id("yearFilter")));
    let yearFilterDropdown = await driver.findElement(By.id("yearFilter"));

    // Pilih opsi tahun yang diinginkan
    let yearOption = await driver.findElement(By.css("#yearFilter option[value='oldest']"));
    await yearOption.click();

    console.log("Filter tahun berhasil dipilih.");
  } catch (error) {
    console.error("Error during filtering by year:", error);
  } finally {
    await driver.quit();
  }
}

filterByYear();
