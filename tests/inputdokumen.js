const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");
const fs = require("fs");

async function takeScreenshot(driver, filepath) {
  let image = await driver.takeScreenshot();
  fs.writeFileSync(filepath, image, "base64");
}

describe("Document Upload Test", function () {
  this.timeout(60000); // Timeout 60 detik
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should allow a user to upload a document and see it in the list", async function () {
    // Navigate to the login page
    await driver.get("http://localhost:8000/login");

    // Perform login
    await driver.findElement(By.name("email")).sendKeys("superuser@example.com");
    await driver.findElement(By.name("password")).sendKeys("superuser", Key.RETURN);

    // Wait for navigation to complete
    await driver.wait(until.urlIs("http://localhost:8000/home"), 10000);

    // Navigate to the document upload page
    await driver.get("http://localhost:8000/input-dokumen");

    // Fill in the form
    await driver.findElement(By.name("judul_dokumen")).sendKeys("Dokumen Automation Testing");
    await driver.findElement(By.name("deskripsi_dokumen")).sendKeys("Deskripsi Dokumen Test");
    await driver.findElement(By.name("kategori_dokumen")).sendKeys("Dokumen Strategi");
    await driver.findElement(By.name("validasi_dokumen")).sendKeys("Ketua Jurusan");
    await driver.findElement(By.name("tahun_dokumen")).sendKeys("2024");

    // Attach a file
    const filePath = path.resolve("D:/Automation_SMDE/Testing Javascript/tests/Kartu Pendaftaran DTS.pdf");
    await driver.findElement(By.name("dokumen_file")).sendKeys(filePath);

    // Add tags
    await driver.findElement(By.name("tags")).sendKeys("Test,Automated");

    // Scroll to the submit button
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);

    // Use JavaScript to click the submit button
    await driver.executeScript("arguments[0].click();", submitButton);

    // Take a screenshot after submit
    await takeScreenshot(driver, "after_submit.png");
    console.log("Submit button clicked, waiting for navigation to list-dokumen...");

    await driver.wait(until.urlIs("http://localhost:8000/list-dokumen"), 10000);

    // Navigate to the list-dokumen page
    await driver.get("http://localhost:8000/list-dokumen");

    // Assert the document is in the list
    const documentTitle = await driver.findElement(By.xpath("//td[contains(text(), 'Dokumen Test')]")).getText();
    assert.strictEqual(documentTitle, "Dokumen Test");
  });
});
