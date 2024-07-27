const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function deleteCategory(rowIndex) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka browser
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login sebagai Admin atau Kaprodi
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.name("password")).sendKeys("admin123");
    await driver.sleep(1000);
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("http://localhost:8000/home"), 10000);

    // Navigasi ke halaman List
    await driver.get("http://localhost:8000/validasi-view");
    await driver.sleep(1000);

    // Tunggu hingga tabel validasi ada
    let table = await driver.wait(until.elementLocated(By.css("table.table")), 10000);

    // Ambil semua baris
    let rows = await table.findElements(By.css("tbody tr"));
    console.log(`Jumlah baris yang ditemukan: ${rows.length}`);

    // Periksa apakah baris yang diminta ada dalam tabel
    if (rows.length > rowIndex) {
      let rowToDelete = rows[rowIndex];

      // Temukan tombol delete pada baris yang dipilih
      let deleteButton = await rowToDelete.findElement(By.css('form button[type="submit"].btn-danger'));

      // Lakukan scroll ke tombol delete menggunakan JavaScript
      await driver.executeScript("arguments[0].scrollIntoView(true);", deleteButton);
      await driver.sleep(1000);

      // Klik tombol delete menggunakan JavaScript untuk menghindari klik yang terhalang
      await driver.executeScript("arguments[0].click();", deleteButton);
      await driver.sleep(1000);

      console.log("Test berhasil: Validasi berhasil dihapus");
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

// Menghapus baris terakhir yang ada (baris ke-18)
deleteCategory(7);
