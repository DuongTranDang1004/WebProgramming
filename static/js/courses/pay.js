const learnerId = localStorage.getItem("id");

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const price = params.get('price').replace(/\./g, ''); // Remove thousand separators
    const isCert = params.get('isCertificate') === 'true'; // Ensure isCert is a boolean

    console.log('Query Params:', {
        courseId: params.get('courseId'),
        instructorId: params.get('instructorId'),
        courseName: params.get('courseName'),
        price: parseFloat(price), // Convert to number
        imgUrl: params.get('courseImg'),
        isCert
    });

    return {
        courseId: params.get('courseId'),
        instructorId: params.get('instructorId'),
        courseName: params.get('courseName'),
        price: parseFloat(price),
        imgUrl: params.get('courseImg'),
        isCert
    };
}

function formatPrice(price) {
    let formattedPrice = price.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
    formattedPrice += ' đ';
    return formattedPrice;
}

function loadCheckoutData() {
    const { courseName, price, imgUrl, isCert } = getQueryParams();
    const coursePrice = price;
    const certificatePrice = !isCert ? ((coursePrice * 20)/100) : 0;
    const certificateName = isCert ? `${courseName} Certificate` : '';
    const totalPrice = coursePrice - certificatePrice; // Total price should be coursePrice
    const formattedCertificatePrice = formatPrice(certificatePrice);
    const formattedTotalPrice = formatPrice(totalPrice);

    console.log('Checkout Data:', {
        courseName,
        coursePrice,
        certificatePrice,
        certificateName,
        totalPrice,
        formattedCertificatePrice,
        formattedTotalPrice
    });

    document.getElementById('order-details').innerHTML = `
        <h2 class="text-2xl font-semibold mb-4">Order Details</h2>
        <div class="flex justify-between items-center">
            <div class="flex items-center">
                <img class="h-10 w-10 rounded-md" src="${imgUrl}" alt="Course Thumbnail">
                <div class="ml-4">
                    <h3 class="text-lg font-semibold">${courseName}</h3>
                    ${certificateName ? `<p class="text-sm text-gray-600">${certificateName}</p>` : ''}
                </div>
            </div>
            <span class="text-lg">${formatPrice(coursePrice)}</span>
        </div>
    `;

    document.getElementById('summary').innerHTML = `
        <h2 class="text-xl font-bold mb-6">Summary</h2>
        <div class="flex justify-between mb-4">
            <span class="text-gray-700 text-lg">Original Price:</span>
            <span class="font-medium text-lg text-gray-700">${formatPrice(coursePrice)}</span>
        </div>
        ${!isCert ? `
            <div class="flex justify-between mb-4">
                <span class="text-gray-700 text-lg">Save Money Without Certificate:</span>
                <span class="font-medium text-lg text-gray-700">${formattedCertificatePrice}</span>
            </div>
        ` : ''}
        <div class="flex justify-between mb-6">
            <span class="text-lg font-semibold text-gray-700">Total:</span>
            <span class="text-lg font-semibold text-gray-700">${formattedTotalPrice}</span>
        </div>
        <p class="text-sm text-gray-500 mb-6">By completing your purchase, you agree to these <a href="#" class="text-blue-600 underline">Terms of Service</a>.</p>
        <button id="completeCheckoutBtn" class="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
            Complete Checkout
        </button>
        <p class="text-center text-sm text-gray-500 mt-4">30-Day Money-Back Guarantee</p>
    `;
}

async function handleCheckout() {
    const { courseId, instructorId, isCert } = getQueryParams();
    const coursePrice = parseFloat(new URLSearchParams(window.location.search).get('price').replace(/\./g, ''));
    const certificatePrice = !isCert ? ((coursePrice * 20)/100) : 0;
    const totalAmount = coursePrice - certificatePrice; // Total amount should be coursePrice

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        alert('Please select a payment method.');
        return;
    }

    const transactionData = {
        learnerId,
        courseId,
        instructorId,
        transactionDate: new Date().toISOString(),
        paymentMethod: paymentMethod.value, // Ensure this is a string
        transactionItems: [
            {
                courseId,
                certificateName: isCert ? `${getQueryParams().courseName} Certificate` : '',
                certificatePrice: isCert ? ((coursePrice * 20)/100) : 0
            }
        ],
        totalAmount
    };

    console.log('Transaction Data:', transactionData);

    try {
        const response = await fetch(`/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
            // Log response body for debugging
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert(`Checkout successful! ${data.message}`);
        window.location.href = `/learners/myCourses/${learnerId}`;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Checkout failed. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutData();
    
    // Check if the button exists before adding the event listener
    const completeCheckoutBtn = document.getElementById('completeCheckoutBtn');
    if (completeCheckoutBtn) {
        completeCheckoutBtn.addEventListener('click', handleCheckout);
    } else {
        console.error('Button with ID "completeCheckoutBtn" not found.');
    }
});
