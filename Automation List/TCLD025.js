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
      const filterDropdown = await driver.findElement(By.id("filter"));

      await filterDropdown.findElement(By.css(`option[value="${category}"]`)).click();

      await driver.sleep(1000);
    }

    // Memanggil fungsi filter dengan kategori tertentu
    await filterByCategory("Dokumen Visi Misi");
    await driver.sleep(1000);
    console.log("dokumen berhasil di  filter");
  } finally {
    await driver.quit();
  }
})();
