const { Builder, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("superuser@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("superuser", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    // Akses setiap menu navigasi
    const menus = [
      { id: "v-pills-home-tab", title: "Home" },
      { id: "v-pills-profile-tab", title: "Input Dokumen" },
    ];

    for (const menu of menus) {
      await driver.findElement(By.id(menu.id)).click();
      await driver.sleep(2000); // Tunggu sebentar agar halaman dapat dimuat
      console.log(`Navigasi ke ${menu.title} berhasil!`);
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
