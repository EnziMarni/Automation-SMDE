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

    // Fungsi untuk memilih opsi di dropdown
    async function selectYearFilter(value, description) {
      let yearOption = await driver.findElement(By.css(`#yearFilter option[value='${value}']`));
      await yearOption.click();

      console.log(`Filter tahun ${description} berhasil dipilih.`);
    }

    // Pilih filter tahun terbaru
    await selectYearFilter("newest", "terbaru");

    // Pilih filter tahun terlama
    await selectYearFilter("oldest", "terlama");

    // Kembali ke filter semua tahun
    await selectYearFilter("all", "semua tahun");
  } catch (error) {
    console.error("Error during filtering by year:", error);
  } finally {
    await driver.quit();
  }
}

filterByYear();
