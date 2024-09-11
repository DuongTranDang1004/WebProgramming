document.addEventListener('DOMContentLoaded', async () => {
    const instructorId = localStorage.getItem('id');
    try {
        const response = await fetch(`/api/instructors/${instructorId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch instructor data: ${response.statusText}`);
        }
        const data = await response.json();

        // Populate form fields with the fetched data
        document.getElementById('firstName').value = data.firstName || '';
        document.getElementById('lastName').value = data.lastName || '';
        document.getElementById('address').value = data.address || '';
        document.getElementById('city').value = data.city || '';
        document.getElementById('zipcode').value = data.zipcode || '';
        document.getElementById('country').value = data.country || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('schoolOrCompanyName').value = data.schoolOrCompanyName || '';
        document.getElementById('jobTitle').value = data.jobTitle || '';
        document.getElementById('specialization').value = data.specialization || '';
        document.getElementById('profilePicture').value = data.profilePicture || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('biography').value = data.Bio || "";
    } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Failed to load profile data.');
    }
});

document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const instructorId = localStorage.getItem('id');
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zipcode: document.getElementById('zipcode').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value,
        schoolOrCompanyName: document.getElementById('schoolOrCompanyName').value,
        jobTitle: document.getElementById('jobTitle').value,
        specialization: document.getElementById('specialization').value,
        profilePicture: document.getElementById('profilePicture').value,
        email: document.getElementById('email').value,
        Bio: document.getElementById('biography').value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/instructors/${instructorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        alert('Profile updated successfully!');
        console.log('Updated profile data:', data);
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
});