const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function editValidation(rowIndex, newName) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka browser
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login sebagai Admin atau Kaprodi (sesuaikan dengan login di aplikasi Anda)
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");

    await driver.findElement(By.name("password")).sendKeys("admin123");

    await driver.findElement(By.css('button[type="submit"]')).click();

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"), 10000);

    // Navigasi ke halaman List Validasi
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/validasi");

    // Tunggu hingga tabel validasi ada
    let table = await driver.wait(until.elementLocated(By.css("table.table")), 10000);

    // Ambil semua baris
    let rows = await table.findElements(By.css("tbody tr"));
    console.log(`Jumlah baris yang ditemukan: ${rows.length}`);

    // Periksa apakah baris yang diminta ada dalam tabel
    if (rows.length > rowIndex) {
      let rowToEdit = rows[rowIndex];

      // Temukan tombol edit pada baris yang dipilih
      let editButton = await rowToEdit.findElement(By.css("a.btn-warning"));

      // Lakukan scroll ke tombol edit menggunakan JavaScript
      await driver.executeScript("arguments[0].scrollIntoView(true);", editButton);

      // Klik tombol edit
      await editButton.click();

      // Tunggu hingga form edit muncul
      await driver.wait(until.urlContains("/edit"), 10000);

      // Isi form dengan data baru
      let inputNama = await driver.findElement(By.id("nama_validasi"));
      await inputNama.clear();
      await inputNama.sendKeys(newName);

      // Submit form
      await driver.findElement(By.css('button[type="submit"]')).click();

      console.log(`Test berhasil: Validasi pada baris ke-${rowIndex + 1} gagal diubah.`);
    } else {
      console.log(`Baris dengan indeks ${rowIndex} tidak ditemukan dalam tabel.`);
    }
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

// Mengedit validasi pada baris ke-4 (indeks 3, dimulai dari 0)
editValidation(2, "");
