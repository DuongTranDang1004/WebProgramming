// Get plan name from query string
const planName = new URLSearchParams(window.location.search).get("plan");
const plan = {
    "basic-monthly": {
        name: "Basic",
        price: 0,
        billing: "monthly"
    },
    "saving-monthly": {
        name: "Saving",
        price: 20,
        billing: "monthly"
    },
    "premium-monthly": {
        name: "Premium",
        price: 50,
        billing: "monthly"
    },
    "basic-yearly": {
        name: "Basic",
        price: 0,
        billing: "yearly"
    },
    "saving-yearly": {
        name: "Saving",
        price: 200,
        billing: "yearly"
    },
    "premium-yearly": {
        name: "Premium",
        price: 500,
        billing: "yearly"
    }
}

document.getElementById("plan-name").innerText = `${plan[planName].name} ${plan[planName].billing}`;
document.getElementById("price").innerText = `$${plan[planName].price}`;