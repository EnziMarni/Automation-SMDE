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
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 10000);

    // Navigasi ke halaman List Kategori Dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/kategori-dokumen-view");

    // Cari semua tombol Edit
    let editButtons = await driver.findElements(By.css("a.btn-warning"));
    if (editButtons.length >= 17) {
      let editButtonBarisKedelapanBelas = editButtons[16]; // Index 17 untuk baris ke-18 (index mulai dari 0)

      // Scroll to the edit button to ensure it is visible
      await driver.executeScript("arguments[0].scrollIntoView(true);", editButtonBarisKedelapanBelas);

      // Ensure the element is visible and enabled
      await driver.wait(until.elementIsVisible(editButtonBarisKedelapanBelas), 10000);
      await driver.wait(until.elementIsEnabled(editButtonBarisKedelapanBelas), 10000);

      // Click the edit button using JavaScript
      await driver.executeScript("arguments[0].click();", editButtonBarisKedelapanBelas);

      // Isi form dengan nama kategori yang baru
      let inputField = await driver.findElement(By.id("nama_dokumen"));
      await inputField.clear(); // Hapus teks yang ada

      await inputField.sendKeys("Kategori Baru Diedit");

      // Klik tombol "Update" untuk menyimpan perubahan
      await driver.findElement(By.css('button[type="submit"]')).click();

      // Tunggu hingga ada pesan sukses
      let successMessage = await driver.wait(until.elementLocated(By.css(".alert-success")), 10000);
      assert.ok(successMessage, "Pesan sukses tidak muncul.");

      console.log("Test berhasil: Kategori dokumen berhasil diedit");
    } else {
      throw new Error("Tombol Edit untuk baris ke-18 tidak ditemukan.");
    }
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

editKategoriDokumen();
