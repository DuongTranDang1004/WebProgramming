// Function to fetch the country list and populate the dropdown
async function populateCountryDropdown() {
  try {
    // Fetch the list of countries from the API
    const response = await fetch("https://datahub.io/core/country-list");
    const countries = await response.json();

    // Get the country dropdown element
    const countryDropdown = document.getElementById("country");
    console.log(countryDropdown);

    // Clear any existing options
    countryDropdown.innerHTML = "";

    // Populate the dropdown with the country options
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.Code; // Country code for the option value
      option.textContent = country.Name; // Country name for the display text
      countryDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Call the function to populate the dropdown when the page loads
document.addEventListener("DOMContentLoaded", populateCountryDropdown);
