// Function 1: Input validations for contact page forms
function validateForm() {
  const name = document.forms["enq"]["name"].value;
  const phone = document.forms["enq"]["phone"].value;
  const contactMethod = document.forms["enq"]["contactMethod"].value;
  const days = document.querySelectorAll('input[name="days"]:checked');
  const message = document.forms["enq"]["message"].value;

  // Name validation: at least 3 letters
  if (name.length < 3) {
    alert("Name must contain at least 3 letters.");
    return false;
  }

  // Phone validation: if phone is required and selected as contact method
  if (contactMethod === "phone" && (phone.length < 9 || phone.length > 11)) {
    alert("Please enter a valid phone number (9 to 11 digits).");
    return false;
  }

  // Contact Days validation: at least one checkbox must be selected
  if (days.length === 0) {
    alert("Please select at least one contact day.");
    return false;
  }

  // Message validation: between 50 and 500 characters
  if (message.length < 50 || message.length > 500) {
    alert("Message must contain between 50 and 500 letters.");
    return false;
  }

  return true;
}

// Function 2: Serialize form data and fetch the API to submit form
async function submitForm() {
  // Prevent form submission if validation fails
  if (!validateForm()) {
    return false;
  }

  // Gather form data
  const formData = new FormData(document.forms["enq"]);

  // Convert form data to a JSON object
  const data = {
    contactPurpose: formData.get("contactPurpose"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    preferredContactMethod: formData.get("contactMethod"),
    contactDays: Array.from(
      document.querySelectorAll('input[name="days"]:checked')
    ).map((checkbox) => checkbox.value), // This should be an array
    message: formData.get("message"),
    status: "pending", // Make sure to include this field
    replyMessage:
      "Thank you for reaching out. We will get back to you shortly.",
  };

  // Log the request body to check the output before sending it to the API
  console.log("Request body:", data);

  // Send the data using Fetch API
  try {
    const response = await fetch("/contactForms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send data as JSON
    });

    // Check if the request was successful
    if (response.ok) {
      alert("Your message has been sent successfully!");
      // Reset the form or redirect as needed
      document.forms["enq"].reset();
    } else {
      const errorResponse = await response.json();
      alert("Failed to send message: " + errorResponse.message);
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    alert("An error occurred. Please try again later.");
  }

  return false; // Prevent default form submission
}
