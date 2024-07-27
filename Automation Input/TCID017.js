const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function input() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");

    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"));
    console.log("Login berhasil!");

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/input-dokumen");
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/input-dokumen"));

    // Tunggu sampai elemen unik di halaman Pilih Tipe Dokumen muncul
    await driver.wait(until.elementLocated(By.css(".card-header")));
    let pageTitle = await driver.findElement(By.css(".card-header")).getText();

    if (pageTitle === "Pilih Tipe Dokumen") {
      console.log("Berhasil mengakses halaman Pilih Tipe Dokumen!");

      // Pilih tipe dokumen "link"
      await driver.findElement(By.id("inputType")).sendKeys(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER);

      // Klik tombol Lanjutkan
      await driver.findElement(By.id("submitInputType")).click();

      await driver.wait(until.urlContains("https://apps.srpcenter.com/TA/Enzi2024/input-dokumen/link"));
      console.log("Berhasil mengakses halaman Input Dokumen Link!");

      // Isi formulir tambahan untuk input dokumen
      await driver.findElement(By.name("judul_dokumen")).sendKeys("Repository Project TA");

      await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("Ini adalah Repository");

      // Pilih kategori dokumen
      await driver.findElement(By.name("kategori_dokumen")).sendKeys(Key.ARROW_DOWN, Key.ENTER);

      // Pilih validasi dokumen
      await driver.findElement(By.name("validasi_dokumen")).sendKeys(Key.ARROW_DOWN, Key.ENTER);

      // Isi tahun dokumen
      await driver.findElement(By.name("tahun_dokumen")).sendKeys("2023");

      // Isi formulir Input Dokumen Link
      await driver.findElement(By.name("dokumen_link")).sendKeys("https://github.com/EnziMarni/Project-Tugas-Akhir/tree/revisi");
      await driver.sleep(1000);

      // Klik checkbox "All"
      let checkboxAll = await driver.findElement(By.css('input.form-check-input[value="All"]'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", checkboxAll);
      await driver.sleep(1000);
      await checkboxAll.click();

      // Mengisi tags
      await driver.findElement(By.id("tags")).sendKeys("repository", Key.RETURN);

      console.log("Form berhasil dikirim!");
    } else {
      throw new Error("Tidak berhasil mengakses halaman Pilih Tipe Dokumen!");
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
