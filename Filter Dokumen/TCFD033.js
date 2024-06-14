const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Buka halaman web
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    // Tunggu hingga elemen dropdown filter muncul
    await driver.wait(until.elementLocated(By.id("filter")), 10000);

    await driver.findElement(By.id("filter")).sendKeys("Dokumen Tata Kelola", Key.RETURN);

    // Tunggu beberapa saat untuk membiarkan hasil filter muncul
    await driver.sleep(3000);

    await driver.findElement(By.id("filter")).sendKeys("All", Key.RETURN);
    await driver.sleep(3000);

    // Dapatkan jumlah baris tabel yang terlihat setelah filter
    let visibleRows = await driver.findElements(By.css("#documentTableBody tr"));
    console.log("Jumlah baris tabel setelah filter:", visibleRows.length);
  } finally {
    // Tutup browser setelah selesai
    await driver.quit();
  }
})();
