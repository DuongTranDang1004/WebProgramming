function validateForm() {
  const name = document.forms["enq"]["name"].value;
  const phone = document.forms["enq"]["phone"].value;
  const contactMethod = document.forms["enq"]["contactMethod"].value;
  const days = document.querySelectorAll('input[name="contactDays"]:checked');
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
