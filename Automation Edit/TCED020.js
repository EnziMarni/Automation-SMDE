const { Builder, By, Key, until } = require("selenium-webdriver");

async function clickCancelButton() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Buka halaman login
    await driver.get("http://127.0.0.1:8000/login");

    // Isi formulir login
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");

    await driver.findElement(By.id("password")).sendKeys("admin123", Key.RETURN);

    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"));

    console.log("Login berhasil!");

    // Cek apakah modal notifikasi muncul dan tutup
    try {
      let modalCloseButton = await driver.findElement(By.css(".modal.show .btn-close"));
      await modalCloseButton.click();
      console.log("Modal notifikasi ditutup!");
    } catch (error) {
      console.log("Modal notifikasi tidak ditemukan, melanjutkan proses...");
    }

    await driver.sleep(1000);
    // Tunggu halaman List Dokumen Saya dimuat
    await driver.get("http://127.0.0.1:8000/list-dokumen-user");
    await driver.sleep(1000);

    // Scroll ke kanan untuk menampilkan icon edit
    await driver.executeScript("window.scrollBy(10000,0)");
    console.log("Scroll ke kanan untuk menampilkan ikon edit");

    // Penundaan sebelum mengklik tombol edit
    await driver.sleep(2000);

    // Pilih dokumen pertama di daftar dan klik tombol edit
    let editButton = await driver.findElement(By.css("a[href*='edit'] .fa-edit"));
    await driver.executeScript("arguments[0].scrollIntoView();", editButton);
    await editButton.click();
    console.log("Klik tombol edit pada dokumen pertama di daftar");

    // Penundaan sebelum mengklik tombol Cancel
    await driver.sleep(2000);

    // Temukan tombol "Cancel" dan klik menggunakan Actions
    let cancelButton = await driver.findElement(By.css('a[href*="list-dokumen-user"].btn.btn-secondary'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", cancelButton);
    await driver.sleep(1000);

    // Gunakan Actions untuk klik tombol Cancel
    let actions = driver.actions({ async: true });
    await actions.move({ origin: cancelButton }).click().perform();
    console.log("Tombol Cancel diklik!");

    // Tunggu redirection setelah klik tombol Cancel
    await driver.wait(until.urlIs("http://127.0.0.1:8000/list-dokumen-user"));
    console.log("Berhasil diarahkan ke halaman List Dokumen User setelah klik Cancel");
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  } finally {
    await driver.quit();
  }
}

clickCancelButton();
