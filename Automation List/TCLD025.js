const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("http://127.0.0.1:8000/login");
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Akses halaman list dokumen
    await driver.get("http://127.0.0.1:8000/list-dokumen");

    // Fungsi untuk melakukan filter berdasarkan kategori
    async function filterByCategory(category) {
      // Mendapatkan elemen dropdown filter
      const filterDropdown = await driver.findElement(By.id("filter"));

      // Memilih opsi kategori sesuai dengan parameter
      await filterDropdown.findElement(By.css(`option[value="${category}"]`)).click();

      // Tunggu sejenak untuk memastikan hasil filter diterapkan
      await driver.sleep(1000);
    }

    // Memanggil fungsi filter dengan kategori tertentu
    await filterByCategory("Dokumen Visi Misi");
    console.log("dokumen berhasil di  filter");

    // Lakukan operasi selanjutnya setelah filter selesai
  } finally {
    await driver.quit();
  }
})();
