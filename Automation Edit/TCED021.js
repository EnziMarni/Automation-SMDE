const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function editDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);

    console.log("Login berhasil!");

    await driver.sleep(3000);

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Tunggu halaman List Dokumen Saya dimuat
    await driver.get("http://127.0.0.1:8000/list-dokumen-user");
    await driver.sleep(1000);

    // Scroll ke kanan untuk menampilkan icon edit
    await driver.executeScript("window.scrollBy(10000,0)");
    console.log("Scroll ke kanan untuk menampilkan ikon edit");
    await driver.sleep(1000);

    // Pilih dokumen pertama di daftar dan klik tombol edit
    let editButton = await driver.findElement(By.css("a[href*='edit'] .fa-edit"));
    await driver.executeScript("arguments[0].scrollIntoView();", editButton);
    await editButton.click();
    console.log("Klik tombol edit pada dokumen pertama di daftar");

    // Scroll ke bawah untuk menampilkan tombol "Update Into A Link"
    console.log("Scroll dinamis ke bawah untuk menampilkan tombol 'Update Into A Link'");
    let isVisible = false;
    let scrollAttempts = 0;

    while (!isVisible && scrollAttempts < 10) {
      try {
        let updateLinkButton = await driver.findElement(By.partialLinkText("Update Into A Link"));
        await driver.executeScript("arguments[0].scrollIntoView();", updateLinkButton);
        isVisible = await updateLinkButton.isDisplayed();
        if (isVisible) {
          await driver.sleep(500); // Penundaan tambahan untuk memastikan tombol benar-benar terlihat
        }
      } catch (error) {
        await driver.executeScript("window.scrollBy(0, 200);");
        scrollAttempts++;
        await driver.sleep(500);
      }
    }

    if (!isVisible) {
      throw new Error("Tombol 'Update Into A Link' tidak ditemukan setelah scroll dinamis.");
    }

    // Klik tombol 'Update Into A Link' menggunakan JavaScript untuk menghindari ElementClickInterceptedError
    let updateLinkButton = await driver.findElement(By.partialLinkText("Update Into A Link"));
    await driver.executeScript("arguments[0].click();", updateLinkButton);
    console.log("Tombol 'Update Into A Link' diklik!");

    // Penundaan sebelum mengisi formulir edit dokumen
    await driver.sleep(3000);

    // Isi formulir edit dokumen
    await driver.findElement(By.name("judul_dokumen")).clear();
    await driver.findElement(By.name("judul_dokumen")).sendKeys("Updated Judul Dokumen");

    await driver.findElement(By.name("deskripsi_dokumen")).clear();
    await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("Updated Deskripsi Dokumen");

    // Pilih kategori
    await driver.findElement(By.id("kategoriDokumen")).click();
    await driver.findElement(By.css('#kategoriDokumen option[value="Dokumen Keuangan"]')).click();

    // Pilih validasi
    await driver.findElement(By.id("validasiDokumen")).click();
    await driver.findElement(By.css('#validasiDokumen option[value="Ketua Jurusan"]')).click();

    // Set tahun dokumen
    await driver.findElement(By.name("tahun_dokumen")).clear();
    await driver.findElement(By.name("tahun_dokumen")).sendKeys("2023");

    // Isi field untuk link
    await driver.findElement(By.name("dokumen_link")).clear();
    await driver.findElement(By.name("dokumen_link")).sendKeys("https://github.com/EnziMarni/TA-FINAL-BANGET");
    await driver.sleep(1000);

    // Klik checkbox "Ketua Jurusan"
    let checkboxKetuaJurusan = await driver.findElement(By.css('input.form-check-input[value="Ketua Jurusan"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkboxKetuaJurusan);
    await driver.sleep(1000);
    await checkboxKetuaJurusan.click();
    console.log("Checkbox Ketua Jurusan berhasil dichecklist!");
    await driver.sleep(1000);

    // Tambahkan tags
    await driver.findElement(By.name("tags")).clear();
    await driver.findElement(By.name("tags")).sendKeys("tag1,tag2");

    // Submit formulir
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log("Dokumen berhasil diperbarui");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  } finally {
    await driver.quit();
  }
}

editDocument();
