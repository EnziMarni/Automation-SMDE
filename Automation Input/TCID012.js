const { Builder, By, Key, until } = require("selenium-webdriver");

(async function input() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    // Tunggu sampai halaman home
    await driver.wait(until.titleIs("Sistem Manajemen Dokumen Elektronik"), 15000);
    console.log("Login berhasil!");

    await driver.sleep(3000);

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    // Akses setiap menu navigasi
    const menus = [
      { id: "v-pills-profile-tab", title: "Input Dokumen" },
      { id: "v-pills-list-dokumen-tab", title: "List Dokumen" },
      { id: "v-pills-list-dokumen-user-tab", title: "Dokumen Saya" },
      { id: "v-pills-draft-dokumen-tab", title: "Deleted Dokumen" },
      { id: "v-pills-kategori-tab", title: "List Kategori" },
      { id: "v-pills-role-tab", title: "List Role" },
      { id: "v-pills-user-tab", title: "List User" },
      { id: "v-pills-validasi-tab", title: "List Validasi" },
    ];

    for (const menu of menus) {
      try {
        let element = await driver.findElement(By.id(menu.id));
        await driver.executeScript("arguments[0].scrollIntoView(true);", element);
        await driver.sleep(500); // Memberi waktu untuk scroll
        await element.click();
        await driver.sleep(2000); // Waktu untuk memuat halaman setelah navigasi
        console.log(`Navigasi ke ${menu.title} berhasil!`);
      } catch (error) {
        console.error(`Navigasi ke ${menu.title} gagal:`, error);
      }
    }
  } catch (error) {
    console.error("Login gagal atau navigasi gagal:", error);
  } finally {
    await driver.quit();
  }
})();
