const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function editKategoriDokumen() {
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
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 1000);

    // Navigasi ke halaman List Kategori Dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/kategori-dokumen-view");

    // Cari tombol Edit pada kategori yang ingin diubah (misalnya kategori pertama dalam tabel)
    let editButton = await driver.findElement(By.css("a.btn-warning"));
    await editButton.click();

    // Isi form dengan nama kategori yang baru
    let inputField = await driver.findElement(By.id("nama_dokumen"));
    await inputField.clear(); // Hapus teks yang ada

    await inputField.sendKeys("");

    // Klik tombol "Update" untuk menyimpan perubahan
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log("Test gagal : Edit kategori tidak bisa kosong");
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

editKategoriDokumen();
