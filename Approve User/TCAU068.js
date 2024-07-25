const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function editUser() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("kaprodi@example.com");
    await driver.findElement(By.id("password")).sendKeys("kaprodi123", Key.RETURN);

    // Tunggu hingga login berhasil dan diarahkan ke halaman home
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));

    console.log("Login berhasil!");

    // Buka halaman daftar pengguna
    await driver.get("http://127.0.0.1:8000/list-user");

    await driver.wait(until.elementLocated(By.css("table.table")));

    console.log("Halaman list user berhasil dimuat");

    // Cari baris tabel pertama yang berisi pengguna
    let rows = await driver.findElements(By.css("tbody tr"));
    if (rows.length > 0) {
      // Klik tombol edit pada pengguna pertama
      let editButton = await rows[0].findElement(By.css("td:nth-child(6) a.btn-primary"));
      await editButton.click();

      // Tunggu hingga halaman edit dimuat
      await driver.wait(until.elementLocated(By.css("form")));

      // Edit data pengguna (misalnya mengubah nama)
      let nameField = await driver.findElement(By.id("name"));
      await nameField.clear();
      await nameField.sendKeys("Nama Pengguna Baru");

      // Simpan perubahan
      let saveButton = await driver.findElement(By.css("button.btn-primary"));
      await driver.sleep(1000);
      await saveButton.click();

      console.log("User berhasil diedit");
    } else {
      console.log("Tidak ada pengguna untuk diedit");
    }
  } catch (error) {
    console.error("Error during editing user:", error);
  } finally {
    await driver.quit();
  }
}

editUser();
