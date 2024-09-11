$(document).ready(function() {
    $('#tabs li').click(function() {
        var tab_id = $(this).attr('id');

        $('#tabs li').removeClass('active-tab');
        $('.tab-content').addClass('hidden');

        $(this).addClass('active-tab');
        $('#' + tab_id.replace('tab-', '')).removeClass('hidden');
    });
});

const instructorID = localStorage.getItem('id');

function fetchMembershipDetails() {
    const apiUrl = `http://localhost:3000/memberships/instructor/${instructorID}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const planDetails = data[0];  // Assuming the first plan is the active one
            const planDetailsElement = document.getElementById('plan-details');
            let cardNumber = "";
            if (planDetails.paymentMethod == "Card") {
                cardNumber = planDetails.cardNumber.slice(-4);
            }
            
            // Build the HTML for the plan details
            const htmlContent = `
                <h2 class="text-xl font-semibold mb-4">Current plan</h2>
                <p class="mb-4">${planDetails.planName} - Instructor</p>
                <h3 class="text-lg font-semibold mb-2">Active subscriptions</h3>
                <p class="mb-4">Billed ${planDetails.planType}</p>
                <p class="mb-4"><strong>Commission Fee:</strong> ${planDetails.commissionFee * 100}%</p>
                <p class="mb-4"><strong>Price:</strong> $${planDetails.price}</p>
                <p class="mb-4">Last charged ${new Date(planDetails.startDate).toLocaleDateString()}</p>
                <p class="mb-4">Estimated payment scheduled for ${new Date(planDetails.endDate).toLocaleDateString()}</p>
                <h3 class="text-lg font-semibold mb-2">Payment method</h3>
                <p class="mb-4">${planDetails.paymentMethod} •••• ${cardNumber} <a href="#" class="text-blue-600 hover:underline">Update</a></p>
                <h3 class="text-lg font-semibold mb-2">Need a break?</h3>
                <p class="text-blue-600"><a href="#" class="hover:underline">I want to end my subscription</a></p>
            `;
            
            // Inject the HTML into the DOM
            planDetailsElement.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching membership details:', error);
        });
}

// Call the function when the page loads
window.onload = fetchMembershipDetails;