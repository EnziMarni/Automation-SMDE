const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function editDocument() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login ke aplikasi
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    // Navigasi ke halaman List Dokumen
    await driver.findElement(By.id("v-pills-messages-tab")).click();
    console.log("Navigasi ke halaman List Dokumen");

    await driver.wait(until.elementLocated(By.css("h3.judul")), 30000);
    console.log("Elemen 'h3.judul' ditemukan di halaman List Dokumen");

    let listPageTitle = await driver.findElement(By.css("h3.judul")).getText();
    console.log("Judul halaman:", listPageTitle);

    if (listPageTitle.toLowerCase() === "list dokumen") {
      console.log("Berhasil mengakses halaman List Dokumen!");

      // Scroll ke kanan untuk menampilkan icon edit
      await driver.executeScript("window.scrollBy(10000,0)");
      console.log("Scroll ke kanan untuk menampilkan ikon edit");

      await driver.sleep(2000);

      // Pilih dokumen pertama di daftar dan klik tombol edit
      let editButton = await driver.findElement(By.css("a[href*='edit'] .fa-edit"));
      await driver.executeScript("arguments[0].scrollIntoView();", editButton);
      await editButton.click();
      console.log("Klik tombol edit pada dokumen pertama di daftar");

      await driver.sleep(2000);

      let editPageTitle = await driver.findElement(By.css("h3.judul")).getText();
      console.log("Judul halaman edit:", editPageTitle);

      if (editPageTitle === "UPDATE DOKUMEN") {
        console.log("Berhasil mengakses halaman Edit Dokumen!");

        // Isi formulir Edit Dokumen
        await driver.findElement(By.name("judul_dokumen")).clear();
        await driver.findElement(By.name("judul_dokumen")).sendKeys("Dokumen Internal");

        await driver.sleep(1000);
        await driver.findElement(By.name("deskripsi_dokumen")).clear();
        await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("Deskripsi Internal");

        await driver.sleep(1000);
        await driver.findElement(By.name("kategori_dokumen")).sendKeys("Dokumen Tata Kelola", Key.ENTER);

        await driver.sleep(1000);
        await driver.findElement(By.name("validasi_dokumen")).sendKeys("Direktur", Key.ENTER);

        await driver.sleep(1000);
        await driver.findElement(By.name("tahun_dokumen")).clear();
        await driver.findElement(By.name("tahun_dokumen")).sendKeys("2024");

        await driver.sleep(1000);
        let filePath = path.resolve("D:\\Automation_SMDE\\Testing Javascript\\Automation Home\\Kartu Pendaftaran DTS.pdf");
        let fileInput = await driver.findElement(By.id("editFile"));
        await fileInput.sendKeys(filePath);

        await driver.sleep(1000);
        let tagsInput = await driver.findElement(By.id("tags"));
        await tagsInput.clear();
        await tagsInput.sendKeys("edited_tag", Key.RETURN);

        await driver.sleep(1000);
        let updateButton = await driver.findElement(By.css("button[type='submit']"));
        await driver.executeScript("arguments[0].click();", updateButton);

        console.log("Dokumen berhasil diedit!");
      } else {
        throw new Error("Tidak berhasil mengakses halaman Edit Dokumen!");
      }
    } else {
      throw new Error("Tidak berhasil mengakses halaman List Dokumen!");
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
