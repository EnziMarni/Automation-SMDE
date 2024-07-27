const { Builder, By, Key, until } = require("selenium-webdriver");

(async function list() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login ke aplikasi
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");

    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    // Akses halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");

    // Tunggu sampai elemen 'h3' terlihat
    await driver.wait(until.elementLocated(By.tagName("h3")));
    console.log("Elemen 'h3' ditemukan di halaman List Dokumen");

    let listPageTitle = await driver.findElement(By.tagName("h3")).getText();
    console.log("Judul halaman:", listPageTitle);

    if (listPageTitle.toLowerCase() === "list dokumen") {
      console.log("Berhasil mengakses halaman List Dokumen!");

      // Scroll ke kanan untuk menampilkan ikon edit
      await driver.executeScript("window.scrollBy(0, 1000)");
      await driver.executeScript("window.scrollBy(1000, 0)");
      console.log("Scroll ke kanan untuk menampilkan ikon edit");

      await driver.sleep(1000);

      // Pilih dokumen pertama di daftar dan klik tombol edit
      let editButton = await driver.findElement(By.css("a[href*='edit'] .fa-edit"));
      await driver.executeScript("arguments[0].scrollIntoView(true);", editButton);
      await driver.executeScript("arguments[0].style.display='block'; arguments[0].style.visibility='visible';", editButton);
      await driver.executeScript("arguments[0].click();", editButton);
      console.log("Klik tombol edit pada dokumen pertama di daftar");

      await driver.sleep(1000);

      // Get the title of the edit page
      let editPageTitle = await driver.findElement(By.tagName("h3")).getText();
      console.log("Judul halaman edit:", editPageTitle);

      if (editPageTitle === "EDIT DOKUMEN FILE" || editPageTitle === "EDIT DOKUMEN LINK") {
        console.log("Berhasil mengakses halaman Edit Dokumen!");
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
