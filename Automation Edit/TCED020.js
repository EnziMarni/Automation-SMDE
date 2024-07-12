const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");

(async function editDocument() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login ke aplikasi
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    // Navigasi ke halaman List Dokumen
    await driver.findElement(By.id("v-pills-messages-tab")).click();
    console.log("Navigasi ke halaman List Dokumen");

    // Tunggu sampai elemen unik di halaman List Dokumen muncul
    await driver.wait(until.elementLocated(By.css("h3.judul")), 30000);
    console.log("Elemen 'h3.judul' ditemukan di halaman List Dokumen");

    let listPageTitle = await driver.findElement(By.css("h3.judul")).getText();
    console.log("Judul halaman:", listPageTitle);

    if (listPageTitle.toLowerCase() === "list dokumen") {
      console.log("Berhasil mengakses halaman List Dokumen!");

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

        // Scroll ke bawah untuk memastikan tombol "Cancel" terlihat di layar
        await driver.executeScript("window.scrollBy(0, 500)");

        await driver.sleep(5000);

        await driver.wait(until.elementLocated(By.css("button.btn.btn-secondary")), 15000);

        let cancelButton = await driver.findElement(By.css("button.btn.btn-secondary"));

        await cancelButton.click();
        console.log("Update dokumen dibatalkan!");
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
