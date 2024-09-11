function nextStep(step) {
    document.querySelectorAll('.step').forEach(stepElement => {
        stepElement.classList.add('hidden');
    });
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function prevStep(step) {
    document.querySelectorAll('.step').forEach(stepElement => {
        stepElement.classList.add('hidden');
    });
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function addNewCourse() {
    const name = document.querySelector('#step-1 input').value;
    const category = document.querySelector('#step-2 select').value;
    const description = document.querySelector('#step-4 textarea').value;
    const thumbnailImage = document.querySelector('#step-3 input').value;
    const price = 0; // You can update this as needed
    // const instructorId = localStorage.getItem('instructorId');
    const instructorId = localStorage.getItem('id');

    const data = {
        name,
        category,
        description,
        thumbnailImage,
        price,
        instructorId
    };

    // Check if all required fields are filled
    if (!name || !category || !description || !instructorId) {
        alert("Please fill out all required fields.");
        return;
    }

    // Send data to API
    fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data._id) {
                window.location.href = `createCourse.html?courseId=${data._id}`;
            } else {
                alert("Error: Unable to retrieve course ID.");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}