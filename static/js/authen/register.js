document.getElementById("register-btn").addEventListener("click", async (event) => {
  if(document.getElementById("learner").checked) registerLearner();
  else registerInstructor();
});


async function registerLearner() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    zipcode: document.getElementById("zipcode").value,
    country: document.getElementById("country").value
  }
  // Check if all fields are filled
  for (const key in data) {
    if (data[key] == "") {
      alert("Please fill in all fields");
      return;
    }
  }
  // Check if password and confirm password match
  if (document.getElementById("password").value != document.getElementById("retype-password").value) {
    alert("Passwords do not match");
    return;
  }
  // Send to API
  const result = await fetch("/api/learners/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (result.ok) {
    alert("Registration successful");
    window.location.href = "/auth/login";
  } else {
    alert("Registration failed");
    console.log(await result.json());
  }
}

async function registerInstructor() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    zipcode: document.getElementById("zipcode").value,
    country: document.getElementById("country").value,
    companyOrSchoolName: document.getElementById("school-name").value,
    jobTitle: document.getElementById("job-title").value,
    specialization: document.getElementById("specialization").value,
  }
  // Check if all fields are filled
  for (const key in data) {
    if (data[key] == "") {
      alert("Please fill in all fields");
      return;
    }
  }
  // Check if password and confirm password match
  if (document.getElementById("password").value != document.getElementById("retype-password").value) {
    alert("Passwords do not match");
    return;
  }
  // Send to API
  const result = await fetch("/api/instructors/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (result.ok) {
    alert("Registration successful");
    window.location.href = "/auth/login";
  } else {
    alert("Registration failed");
    console.log(await result.json());
  }
}

let showInstructorFields = false;
function toggleInstructorFields() {
  if (showInstructorFields) {
    document.getElementById("instructor-fields").hidden = true;
    showInstructorFields = false;
  } else {
    document.getElementById("instructor-fields").hidden = false;
    showInstructorFields = true;
  }  
}