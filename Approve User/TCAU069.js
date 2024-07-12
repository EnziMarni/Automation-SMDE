const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function approveAllMahasiswa() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://localhost:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    // Tunggu sampai halaman home dimuat
    await driver.wait(until.urlIs("http://localhost:8000/home"), 10000);

    // Buka halaman list user
    await driver.get("http://localhost:8000/list-user");

    // Tunggu sampai tabel user dimuat
    await driver.wait(until.elementLocated(By.css("table.table")), 10000);

    // Cari baris tabel yang berisi user dengan jabatan Mahasiswa dan belum disetujui
    let rows = await driver.findElements(By.css("tbody tr"));
    for (let i = 0; i < rows.length; i++) {
      let jabatan = await rows[i].findElement(By.css("td:nth-child(3)")).getText();
      let approved = await rows[i].findElement(By.css("td:nth-child(4)")).getText();

      // Periksa jika pengguna adalah Mahasiswa dan belum diapprove
      if (jabatan === "Mahasiswa" && approved === "Tidak Diizinkan") {
        let approveButton = await rows[i].findElement(By.css("form button.btn-success"));
        await approveButton.click();
        console.log("User Mahasiswa berhasil di-approve");

        // Tunggu sebentar agar halaman merespons
        await driver.sleep(2000);

        // Refresh kembali elemen untuk menghindari StaleElementReferenceError
        rows = await driver.findElements(By.css("tbody tr"));
      }
    }

    console.log("Semua Mahasiswa yang belum diapprove berhasil di-approve");
  } catch (error) {
    console.error("Error during approving all Mahasiswa:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

approveAllMahasiswa();
