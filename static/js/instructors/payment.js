// Get plan name from query string
const planName = new URLSearchParams(window.location.search).get("plan");
const plan = {
    "basic-monthly": {
        name: "Basic",
        price: 0,
        billing: "Monthly",
    },
    "saving-monthly": {
        name: "Saving",
        price: 20,
        billing: "Monthly",
    },
    "premium-monthly": {
        name: "Premium",
        price: 30,
        billing: "Monthly",
    },
    "basic-yearly": {
        name: "Basic",
        price: 0,
        billing: "Yearly",
    },
    "saving-yearly": {
        name: "Saving",
        price: 200,
        billing: "Yearly",
    },
    "premium-yearly": {
        name: "Premium",
        price: 300,
        billing: "Yearly",
    }
}


document.getElementById("plan-name").innerText = `${plan[planName].name} ${plan[planName].billing}`;
document.getElementById("price").innerText = `$${plan[planName].price}`;

document.getElementById("pay-btn").addEventListener("click", async () => {
    const data = {
        instructorId: localStorage.getItem("id"),
        planName: plan[planName].name,
        planType: plan[planName].billing,
        paymentMethod: "Card",
        cardNumber: document.getElementById("card-number").value.toString(),
    }
    const response = await fetch("/api/memberships/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status === 200) {
        alert("Payment successful!");
        window.location.href = "/instructors/home";
    } else {
        const message = await response.json();
        alert("Payment failed!");
    }
});