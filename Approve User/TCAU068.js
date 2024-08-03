const { Builder, By, Key, until } = require("selenium-webdriver");

/**
 * This script tests the login, navigation to user list, and editing a user
 * according to the ISO/IEC/IEEE 29119 standards.
 *
 * Test Case ID: TCAU068
 * Test Objective: Verify that a user can log in, navigate to the user list, and edit a user successfully.
 * Pre-conditions: The user must have valid login credentials and there must be users in the list.
 * Post-conditions: The user should be able to edit a user's details successfully.
 *
 * Steps:
 * 1. Navigate to the login page.
 * 2. Fill out the login form with valid credentials.
 * 3. Verify successful login.
 * 4. Navigate to the user list page.
 * 5. Verify the user list page loads successfully.
 * 6. Find a user and edit their details.
 */

async function editUser() {
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

    // Step 6: Find a user and edit their details
    let rows = await driver.findElements(By.css("tbody tr"));
    if (rows.length > 0) {
      // Click the edit button for the first user
      let editButton = await rows[1].findElement(By.css("td:nth-child(6) a.btn-primary"));
      await editButton.click();

      // Wait until the edit page loads
      await driver.wait(until.elementLocated(By.css("form")), 10000);

      // Edit user data (e.g., change the name)
      let nameField = await driver.findElement(By.id("name"));
      await nameField.clear();
      await nameField.sendKeys("Mahasiswa");

      // Save the changes
      let saveButton = await driver.findElement(By.css("button.btn-primary"));
      await driver.sleep(1000); // Allow time for the changes to be registered
      await saveButton.click();

      console.log("User berhasil diedit");
    } else {
      console.log("Tidak ada pengguna untuk diedit");
    }
  } catch (error) {
    // Detailed error handling and logging
    console.error("Error during editing user:", error);
  } finally {
    // Ensure the driver is quit and the timer is stopped
    await driver.quit();
    console.timeEnd("Execution Time");
  }
}

editUser();
