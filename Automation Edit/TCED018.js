const { Builder, By, Key, until } = require("selenium-webdriver");

async function editDocument() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");

    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 10000);

    console.log("Login berhasil!");

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Tunggu halaman List Dokumen Saya dimuat
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");

    // Scroll ke kanan untuk menampilkan icon edit
    await driver.executeScript("window.scrollBy(10000,0)");
    console.log("Scroll ke kanan untuk menampilkan ikon edit");

    // Penundaan sebelum mengklik tombol edit
    await driver.sleep(1000);

    // Pilih dokumen pertama di daftar dan klik tombol edit
    let editButton = await driver.findElement(By.css("a[href*='edit'] .fa-edit"));
    await driver.executeScript("arguments[0].scrollIntoView();", editButton);
    await editButton.click();
    console.log("Klik tombol edit pada dokumen pertama di daftar");

    // Isi formulir edit dokumen
    await driver.findElement(By.name("judul_dokumen")).clear();
    await driver.findElement(By.name("judul_dokumen")).sendKeys("Repository Update");
    await driver.sleep(500);

    // Pilih kategori
    await driver.findElement(By.id("kategoriDokumen")).click();
    await driver.findElement(By.css('#kategoriDokumen option[value="Dokumen Pendidikan"]')).click();
    await driver.sleep(500);

    // Pilih validasi
    await driver.findElement(By.id("validasiDokumen")).click();
    await driver.findElement(By.css('#validasiDokumen option[value="Ketua Jurusan"]')).click();
    await driver.sleep(500);

    // Set tahun dokumen
    await driver.findElement(By.name("tahun_dokumen")).clear();
    await driver.findElement(By.name("tahun_dokumen")).sendKeys("2023");
    await driver.sleep(500);

    // Cek apakah dokumen adalah file atau link
    let isLink = false;
    try {
      await driver.findElement(By.name("dokumen_link"));
      isLink = true;
    } catch (err) {}

    if (isLink) {
      // Isi field untuk link
      await driver.findElement(By.name("dokumen_link")).clear();
      await driver.findElement(By.name("dokumen_link")).sendKeys("https://github.com/EnziMarni/Project-Tugas-Akhir/tree/revisi");
    } else {
      // Unggah file
      let fileInput = await driver.findElement(By.name("edit_dokumen_file"));
      fileInput.sendKeys("D:\\Automation_SMDE\\Testing Javascript\\Automation Home\\Dokumen Internal.pdf");
    }
    await driver.sleep(1000);

    // Klik checkbox "All"
    let checkboxAll = await driver.findElement(By.css('input.form-check-input[value="Ketua Jurusan"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkboxAll);
    await driver.sleep(1000);
    await checkboxAll.click();
    console.log("Checkbox berhasil dichecklist!");
    await driver.sleep(1000);

    // Tambahkan tags
    await driver.findElement(By.name("tags")).clear();
    await driver.findElement(By.name("tags")).sendKeys("tag1,tag2");
    await driver.sleep(1000);

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
