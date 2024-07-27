const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function addKategoriDokumen() {
  // Buka browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigasi ke halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login sebagai Admin atau Kaprodi
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");

    await driver.findElement(By.name("password")).sendKeys("admin123");

    await driver.findElement(By.css('button[type="submit"]')).click();

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 10000);

    // Navigasi ke halaman List Kategori Dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/kategori-dokumen-view");

    // Tunggu hingga tombol "Tambah Kategori Dokumen" ada dan klik tombol tersebut
    let addButton = await driver.findElement(By.css('button[data-bs-target="#addModal"]'));
    await driver.wait(until.elementIsVisible(addButton), 5000);
    await driver.wait(until.elementIsEnabled(addButton), 5000);

    await addButton.click();

    // Tunggu hingga modal tampil
    let modal = await driver.wait(until.elementLocated(By.id("addModal")), 5000);
    await driver.wait(until.elementIsVisible(modal), 5000);

    // Isi form modal dengan nama kategori baru
    let namaDokumenInput = await driver.findElement(By.id("nama_dokumen"));
    await driver.wait(until.elementIsVisible(namaDokumenInput), 5000);
    await namaDokumenInput.sendKeys("Kategori Baru");

    // Klik tombol "Save changes" untuk menambahkan kategori baru
    let saveButton = await driver.findElement(By.css('button[type="submit"].btn-primary'));
    await driver.wait(until.elementIsVisible(saveButton), 5000);
    await saveButton.click();

    // Tunggu hingga ada pesan sukses
    let successMessage = await driver.wait(until.elementLocated(By.css(".alert-success")), 10000);
    assert.ok(successMessage);

    console.log("Test berhasil: Kategori baru berhasil ditambahkan");
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

addKategoriDokumen();
