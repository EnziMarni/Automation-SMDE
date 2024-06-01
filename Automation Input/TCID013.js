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

    // Tunggu sampai elemen unik di halaman Input Dokumen muncul
    await driver.wait(until.elementLocated(By.css("h3.judul")), 10000);
    let pageTitle = await driver.findElement(By.css("h3.judul")).getText();

    if (pageTitle === "FORM INPUT DOKUMEN") {
      console.log("Berhasil mengakses halaman Input Dokumen!");

      // Isi formulir Input Dokumen
      await driver.findElement(By.name("judul_dokumen")).sendKeys("Contoh Judul Dokumen");
      await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("Ini adalah deskripsi dokumen contoh.");
      await driver.findElement(By.name("kategori_dokumen")).sendKeys(Key.ARROW_DOWN, Key.ENTER); // Memilih opsi pertama di dropdown
      await driver.findElement(By.name("validasi_dokumen")).sendKeys(Key.ARROW_DOWN, Key.ENTER); // Memilih opsi pertama di dropdown
      await driver.findElement(By.name("tahun_dokumen")).sendKeys("2024");

      // Gunakan path absolut yang benar untuk file
      let filePath = path.resolve("D:\\Automation_SMDE\\Testing Javascript\\Automation Home\\Kartu Pendaftaran DTS.pdf");
      await driver.findElement(By.id("formFile")).sendKeys(filePath);

      // Tambahkan tags
      await driver.findElement(By.id("tags")).sendKeys("tag1, tag2, tag3", Key.RETURN);

      // Gunakan JavaScript untuk klik tombol submit
      let submitButton = await driver.findElement(By.css("button[type='submit']"));
      await driver.executeScript("arguments[0].click();", submitButton);

      // Tunggu sampai muncul pesan sukses atau redirect

      console.log("Form berhasil dikirim!");
    } else {
      throw new Error("Tidak berhasil mengakses halaman Input Dokumen!");
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();