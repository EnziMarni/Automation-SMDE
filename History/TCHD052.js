const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function viewDocumentHistory() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");

    // Login
    await driver.findElement(By.id("email")).sendKeys("mahasiswa@example.com");

    await driver.findElement(By.id("password")).sendKeys("mahasiswa123", Key.RETURN);

    await driver.wait(until.urlIs("https://apps.srpcenter.com/TA/Enzi2024/home"));
    console.log("Login berhasil!");

    // Akses halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen-user");

    console.log("Berhasil akses halaman list dokumen");

    // Tunggu hingga elemen documentTableBody muncul
    await driver.wait(until.elementLocated(By.id("documentTableBody")), 30000);
    console.log("Elemen tabel dokumen ditemukan");

    // Cari tombol "Lihat Riwayat" dalam tabel
    let viewHistoryButton = await driver.findElement(By.css("#documentTableBody tr:first-child a.btn.btn-link i.fa-history"));
    console.log("Tombol 'Lihat Riwayat' ditemukan");

    // Scroll ke tombol "Lihat Riwayat"
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'nearest', inline: 'center' });", viewHistoryButton);
    await driver.sleep(1000);

    // Klik tombol "Lihat Riwayat"
    await viewHistoryButton.click();
    await driver.sleep(1000);
    console.log("Tombol 'Lihat Riwayat' berhasil diklik");

    // Tunggu hingga tombol "Lihat Riwayat" pada modal muncul dan klik
    let lihatRiwayatButton = await driver.findElement(By.css("button[data-bs-toggle='modal'][data-bs-target='#historyModal']"));
    console.log("Tombol 'Lihat Riwayat' di halaman riwayat ditemukan");

    // Scroll ke tombol "Lihat Riwayat" pada halaman riwayat
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'nearest', inline: 'center' });", lihatRiwayatButton);
    await driver.sleep(1000);

    // Klik tombol "Lihat Riwayat"
    await lihatRiwayatButton.click();
    await driver.sleep(1000);
    console.log("Tombol 'Lihat Riwayat' pada halaman riwayat berhasil diklik");

    // Verifikasi modal riwayat ditampilkan
    let historyModal = await driver.findElement(By.id("historyModal"));
    await driver.wait(until.elementIsVisible(historyModal), 1000);
    console.log("Modal riwayat berhasil ditampilkan");

    await driver.wait(until.elementLocated(By.css("button.btn.btn-secondary[data-bs-dismiss='modal']")), 1000);

    let closeButton = await driver.findElement(By.css("button.btn.btn-secondary[data-bs-dismiss='modal']"));

    await closeButton.click();

    await driver.wait(until.elementLocated(By.css("a.btn.btn-primary[href*='list-dokumen']")), 1000);

    let backToListButton = await driver.findElement(By.css("a.btn.btn-primary[href*='list-dokumen']"));

    await backToListButton.click();

    console.log("View icon history berhasil, ikon diklik, tombol Lihat Riwayat diklik, modal ditutup, dan kembali ke daftar dokumen.");
  } catch (error) {
    console.error("Error during viewing document history:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

viewDocumentHistory();
