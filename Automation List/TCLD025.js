const { Builder, By, Key, until } = require("selenium-webdriver");

(async function list() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Login
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/login");
    await driver.findElement(By.id("email")).sendKeys("sekjur@example.com");
    await driver.findElement(By.id("password")).sendKeys("sekjur123", Key.RETURN);

    // Akses halaman list dokumen
    await driver.get("https://apps.srpcenter.com/TA/Enzi2024/list-dokumen");

    // Fungsi untuk melakukan filter berdasarkan kategori
    async function filterByCategory(category) {
      const filterDropdown = await driver.findElement(By.id("filter"));

      await filterDropdown.findElement(By.css(`option[value="${category}"]`)).click();
    }

    // Memanggil fungsi filter dengan kategori tertentu
    await filterByCategory("Dokumen Visi Misi");

    console.log("dokumen berhasil di  filter");
  } finally {
    await driver.quit();
  }
})();
