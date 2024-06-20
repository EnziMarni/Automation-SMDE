const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function filterByYear() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Masuk ke halaman login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Tunggu sampai halaman utama terbuka
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 20000);
    console.log("Login berhasil!");

    // Buka halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");
    await driver.sleep(1000);
    console.log("Berhasil akses halaman list dokumen");

    // Tunggu sampai elemen filter tahun muncul
    await driver.wait(until.elementLocated(By.id("yearFilter")), 10000);
    let yearFilterDropdown = await driver.findElement(By.id("yearFilter"));

    // Pilih opsi tahun yang diinginkan
    let yearOption = await driver.findElement(By.css("#yearFilter option[value='oldest']"));
    await yearOption.click();
    await driver.sleep(2000);

    console.log("Filter tahun berhasil dipilih.");
  } catch (error) {
    console.error("Error during filtering by year:", error);
  } finally {
    await driver.quit();
  }
}

filterByYear();
