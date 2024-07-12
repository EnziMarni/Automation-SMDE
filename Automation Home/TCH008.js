const { Builder, By, Key, until } = require("selenium-webdriver");

(async function home() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/home");
    await driver.sleep(2000);
  } catch (error) {
    console.error("Login gagal: silahkan login terlebih dahulu", error);
  } finally {
    await driver.sleep(2000);
    console.log("Akses Halaman home gagal, silahkan login terlebih dahulu");
    await driver.quit();
  }
})();
