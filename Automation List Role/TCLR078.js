const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function editRoleBarisKesembilan() {
  // Buka browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigasi ke halaman login
    await driver.get("http://localhost:8000/login");

    // Login sebagai Admin atau Kaprodi
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");
    await driver.findElement(By.name("password")).sendKeys("admin123");
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Tunggu hingga halaman beranda ditampilkan
    await driver.wait(until.urlIs("http://localhost:8000/home"), 10000);

    // Navigasi ke halaman List Role
    await driver.get("http://localhost:8000/jabatan-view");

    // Cari tombol Edit pada baris ke-9
    let editButtons = await driver.findElements(By.css("a.btn-warning"));
    if (editButtons.length >= 9) {
      let editButtonBarisKesembilan = editButtons[8]; // Index 8 untuk baris ke-9 (index mulai dari 0)

      // Scroll to the edit button to ensure it is visible
      await driver.executeScript("arguments[0].scrollIntoView(true);", editButtonBarisKesembilan);

      // Ensure the element is visible and enabled
      await driver.wait(until.elementIsVisible(editButtonBarisKesembilan), 10000);
      await driver.wait(until.elementIsEnabled(editButtonBarisKesembilan), 10000);

      // Click the edit button using JavaScript
      await driver.executeScript("arguments[0].click();", editButtonBarisKesembilan);
    } else {
      throw new Error("Tombol Edit untuk baris ke-9 tidak ditemukan.");
    }

    // Isi form
    let inputField = await driver.findElement(By.id("nama_jabatan"));
    await inputField.clear(); // Hapus teks yang ada
    await driver.sleep(1000);
    await inputField.sendKeys("Role Baru Diedit");
    await driver.sleep(1000);

    // Klik tombol "Update" untuk menyimpan perubahan
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    // Tunggu hingga ada pesan sukses
    let successMessage = await driver.wait(until.elementLocated(By.css(".alert-success")), 10000);
    assert.ok(successMessage, "Pesan sukses tidak muncul.");

    console.log("Test berhasil: Role baris ke-9 berhasil diedit");
  } catch (error) {
    console.error("Test gagal:", error);
  } finally {
    // Tutup browser
    await driver.quit();
  }
}

editRoleBarisKesembilan();
