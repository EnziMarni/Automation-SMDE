const { Builder, By, Key, until } = require("selenium-webdriver");

/**
 * This script tests the login process and clicking the 'Approve All' button
 * according to the ISO/IEC/IEEE 29119 standards.
 *
 * Test Case ID: TCAU069
 * Test Objective: Verify that the 'Approve All' button can be successfully clicked after logging in.
 * Pre-conditions: The user must have valid login credentials.
 * Post-conditions: The 'Approve All' button should be clicked successfully.
 *
 * Steps:
 * 1. Navigate to the login page.
 * 2. Fill out the login form with valid credentials.
 * 3. Verify successful login.
 * 4. Navigate to the user list page.
 * 5. Verify the user list page loads successfully.
 * 6. Locate and click the 'Approve All' button.
 */

async function clickApproveAllButton() {
  // Start the timer for execution
  console.time("Execution Time");

  // Initialize the WebDriver instance
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Navigate to the login page
    await driver.get("http://127.0.0.1:8000/login");

    // Step 2: Fill out the login form with valid credentials
    await driver.findElement(By.id("email")).sendKeys("kaprodi@example.com");
    await driver.findElement(By.id("password")).sendKeys("kaprodi123", Key.RETURN);

    // Step 3: Verify successful login
    await driver.wait(until.urlIs("http://127.0.0.1:8000/home"), 10000);
    console.log("Login berhasil!");

    // Step 4: Navigate to the user list page
    await driver.get("http://127.0.0.1:8000/list-user");

    // Step 5: Verify the user list page loads successfully
    await driver.wait(until.elementLocated(By.css("table.table")), 10000);
    console.log("Halaman list user berhasil dimuat");

    // Step 6: Locate and click the 'Approve All' button
    let approveAllButton = await driver.findElement(By.xpath("//button[contains(text(), 'Approve All')]"));

    // Scroll to the 'Approve All' button to ensure it's visible
    await driver.executeScript("arguments[0].scrollIntoView(true);", approveAllButton);

    // Wait briefly to ensure the element is visible
    await driver.sleep(1000);

    // Click the 'Approve All' button
    await approveAllButton.click();
    console.log("Tombol 'Approve All' berhasil diklik");
  } catch (error) {
    // Detailed error handling and logging
    console.error("Error during clicking 'Approve All' button:", error);
  } finally {
    // Ensure the driver is quit and the timer is stopped
    await driver.quit();
    console.timeEnd("Execution Time");
  }
}

clickApproveAllButton();
