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

    // Buka halaman list dokumen
    await driver.get("http://localhost:8000/list-dokumen");
    await driver.sleep(1000);

    // Tunggu hingga dropdown filter tahun muncul dan dapat diklik
    await driver.wait(until.elementLocated(By.id("yearFilter")), 10000);

    // Temukan dropdown filter tahun
    let yearFilterDropdown = await driver.findElement(By.id("yearFilter"));

    // Pilih opsi "Terbaru" dari dropdown filter tahun
    await yearFilterDropdown.click();
    let yearOptionNewest = await driver.findElement(By.css("option[value='newest']"));
    await driver.sleep(2000);
    await yearOptionNewest.click();
    await driver.sleep(2000);

    console.log("Filter 'Terbaru' berhasil dipilih.");

    // Pilih opsi "Terlama" dari dropdown filter tahun
    await yearFilterDropdown.click();
    await driver.sleep(2000);
    let yearOptionOldest = await driver.findElement(By.css("option[value='oldest']"));
    await yearOptionOldest.click();
    await driver.sleep(2000);

    console.log("Filter 'Terlama' berhasil dipilih.");

    // Kembali ke pilihan filter tahun (pilih opsi default "Tahun Dokumen")
    await yearFilterDropdown.click();
    await driver.sleep(2000);
    let yearOptionAll = await driver.findElement(By.css("option[value='all']"));
    await yearOptionAll.click();
    await driver.sleep(2000);

    console.log("Filter 'Tahun Dokumen' berhasil dipilih.");
  } catch (error) {
    console.error("Error during filtering by year:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

filterByYear();
