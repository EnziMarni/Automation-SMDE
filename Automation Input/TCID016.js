const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function input() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

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

    await driver.get("http://127.0.0.1:8000/input-dokumen");
    await driver.wait(until.urlIs("http://127.0.0.1:8000/input-dokumen"));

    // Tunggu sampai elemen unik di halaman Pilih Tipe Dokumen muncul
    await driver.wait(until.elementLocated(By.css(".card-header")));
    let pageTitle = await driver.findElement(By.css(".card-header")).getText();

    if (pageTitle === "Pilih Tipe Dokumen") {
      console.log("Berhasil mengakses halaman Pilih Tipe Dokumen!");

      // Pilih tipe dokumen
      await driver.findElement(By.id("inputType")).sendKeys(Key.ARROW_DOWN, Key.ENTER);

      let inputType = await driver.findElement(By.id("inputType")).getAttribute("value");

      // Klik tombol Lanjutkan
      await driver.findElement(By.id("submitInputType")).click();
      await driver.sleep(1000);

      // Tunggu sampai halaman input dokumen sesuai dengan tipe yang dipilih
      if (inputType === "file") {
        await driver.wait(until.urlContains("http://127.0.0.1:8000/input-dokumen/file"), 1000);
        console.log("Berhasil mengakses halaman Input Dokumen File!");
      } else if (inputType === "link") {
        await driver.wait(until.urlContains("input-dokumen-link"), 1000);
        console.log("Berhasil mengakses halaman Input Dokumen Link!");
      } else {
        throw new Error("Tipe dokumen tidak valid!");
      }

      // Isi formulir tambahan untuk input dokumen
      await driver.findElement(By.name("judul_dokumen")).sendKeys("Dokumen testing");

      await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("123");

      // Pilih kategori dokumen
      await driver.findElement(By.name("kategori_dokumen")).sendKeys();

      // Pilih validasi dokumen
      await driver.findElement(By.name("validasi_dokumen")).sendKeys();

      // Isi tahun dokumen
      await driver.findElement(By.name("tahun_dokumen")).sendKeys("ABCD");
      await driver.sleep(1000);

      // Isi formulir Input Dokumen File
      let filePath = path.resolve("D:\\Automation_SMDE\\Testing Javascript\\Automation Home\\Dokumen Internal.pdf");
      await driver.findElement(By.id("formFile")).sendKeys(filePath);
      await driver.sleep(1000);

      // Klik checkbox "All"
      let checkboxAll = await driver.findElement(By.css('input.form-check-input[value="All"]'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", checkboxAll);
      await driver.sleep(1000);
      await checkboxAll.click();
      console.log("Checkbox 'All' berhasil dichecklist!");

      // Mengisi tags
      await driver.findElement(By.id("tags")).sendKeys("123", Key.RETURN);

      // Klik tombol "Cancel"
      await driver.findElement(By.css("a.btn.btn-secondary")).click();
      console.log("Batal mengirim form!");
    } else {
      throw new Error("Tidak berhasil mengakses halaman Input Dokumen!");
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
