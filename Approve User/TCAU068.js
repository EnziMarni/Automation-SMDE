const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");

async function editUser() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.sleep(1000);
    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);
    await driver.sleep(1000);
    console.log("Login berhasil!");

    await driver.get("http://127.0.0.1:8000/list-user");
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.css("table.table")), 10000);
    await driver.sleep(1000);
    console.log("Halaman list user berhasil dimuat");

    // Cari baris tabel yang berisi user dengan jabatan Mahasiswa
    let rows = await driver.findElements(By.css("tbody tr"));
    await driver.sleep(1000);
    for (let row of rows) {
      let jabatan = await row.findElement(By.css("td:nth-child(3)")).getText();
      await driver.sleep(1000);

      if (jabatan === "Mahasiswa") {
        let editButton = await row.findElement(By.css("td:nth-child(5) a.btn-primary"));
        await driver.sleep(1000);
        await editButton.click();
        console.log("Berhasil mengakses halaman edit pengguna");

        // Tunggu sampai halaman edit dimuat
        await driver.wait(until.elementLocated(By.id("name")), 10000);
        await driver.sleep(1000);

        // Edit nama pengguna
        let nameInput = await driver.findElement(By.id("name"));
        await nameInput.clear();
        await driver.sleep(1000);
        await nameInput.sendKeys("Nama Mahasiswa");

        // Edit email pengguna
        let emailInput = await driver.findElement(By.id("email"));
        await emailInput.clear();
        await driver.sleep(1000);
        await emailInput.sendKeys("mahasiswa_edit@example.com");

        // Edit jabatan pengguna
        let jabatanSelect = await driver.findElement(By.id("jabatan"));
        await jabatanSelect.sendKeys("Mahasiswa", Key.ENTER);
        await driver.sleep(1000);

        // Simpan perubahan
        await driver.findElement(By.css("button.btn-primary")).click();
        console.log("Berhasil mengedit pengguna");
        break;
      }
    }
  } catch (error) {
    console.error("Error during editing user:", error);
  } finally {
    await driver.quit();
  }
}

editUser();
