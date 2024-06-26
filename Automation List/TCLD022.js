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

      await driver.executeScript("window.scrollBy(10000,0)");
      console.log("Scroll ke kanan untuk menampilkan ikon edit");

      await driver.sleep(5000);

      // Pilih dokumen pertama di daftar dan klik tombol edit
      let editButton = await driver.findElement(By.css("a[href*='edit'] .fa-edit"));
      await driver.executeScript("arguments[0].scrollIntoView(true);", editButton);
      await driver.executeScript("arguments[0].style.display='block'; arguments[0].style.visibility='visible';", editButton);
      await driver.executeScript("arguments[0].click();", editButton);
      console.log("Klik tombol edit pada dokumen pertama di daftar");

      await driver.sleep(2000);

      let editPageTitle = await driver.findElement(By.css("h3.judul")).getText();
      console.log("Judul halaman edit:", editPageTitle);

      if (editPageTitle === "UPDATE DOKUMEN") {
        console.log("Berhasil mengakses halaman Edit Dokumen!");

        console.log("Berhasil akses halaman edit dokumen");
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
