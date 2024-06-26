const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    // Akses halaman Input Dokumen
    await driver.findElement(By.id("v-pills-profile-tab")).click();

    await driver.wait(until.elementLocated(By.css("h3.judul")), 10000);
    let pageTitle = await driver.findElement(By.css("h3.judul")).getText();

    if (pageTitle === "FORM INPUT DOKUMEN") {
      console.log("Berhasil mengakses halaman Input Dokumen!");

      // Isi formulir Input Dokumen
      await driver.findElement(By.name("judul_dokumen")).sendKeys("");
      await driver.sleep(1000);
      await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("");
      await driver.sleep(1000);
      await driver.findElement(By.name("kategori_dokumen")).sendKeys();
      await driver.sleep(1000);
      await driver.findElement(By.name("validasi_dokumen")).sendKeys();
      await driver.sleep(1000);
      await driver.findElement(By.name("tahun_dokumen")).sendKeys("");
      await driver.sleep(1000);

      let filePath = path.resolve("");
      await driver.findElement(By.id("formFile")).sendKeys(filePath);
      await driver.sleep(1000);

      await driver.findElement(By.id("tags")).sendKeys("", Key.RETURN);
      await driver.sleep(1000);

      let submitButton = await driver.findElement(By.css("button[type='submit']"));
      await driver.executeScript("arguments[0].click();", submitButton);
      await driver.sleep(1000);

      console.log("Form Gagal disubmit!");
    } else {
      throw new Error("Tidak berhasil mengakses halaman Input Dokumen!");
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
