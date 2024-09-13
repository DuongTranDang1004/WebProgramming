document.getElementById("monthly-btn").addEventListener("click", function() {
    // Set month btn active
    try { document.getElementById("monthly-btn").classList.add("active"); } catch {}
    try { document.getElementById("monthly-btn").classList.remove("inactive"); } catch {}
    // Set year btn inactive
    try { document.getElementById("yearly-btn").classList.remove("active"); } catch {}
    try { document.getElementById("yearly-btn").classList.add("inactive"); } catch {}
    // Show month
    try { document.getElementById("monthly").hidden = false; } catch {}
    // Hide year
    try { document.getElementById("yearly").hidden = true; } catch {}
});


document.getElementById("yearly-btn").addEventListener("click", function() {
    // Set year btn active
    try { document.getElementById("yearly-btn").classList.add("active"); } catch {}
    try { document.getElementById("yearly-btn").classList.remove("inactive"); } catch {}
    // Set year btn inactive
    document.getElementById("monthly-btn").classList.remove("active");
    document.getElementById("monthly-btn").classList.add("inactive");
    // Show year
    document.getElementById("yearly").hidden = false;
    // Hide month
    document.getElementById("monthly").hidden = true;
});


document.getElementById("basic-monthly").addEventListener("click", function() {
    window.location.href = "/instructors/payment?plan=basic-monthly";
});

document.getElementById("saving-monthly").addEventListener("click", function() {
    window.location.href = "/instructors/payment?plan=saving-monthly";
});

document.getElementById("premium-monthly").addEventListener("click", function() {
    window.location.href = "/instructors/payment?plan=premium-monthly";
});

document.getElementById("basic-yearly").addEventListener("click", function() {
    window.location.href = "/instructors/payment?plan=basic-yearly";
});

document.getElementById("saving-yearly").addEventListener("click", function() {
    window.location.href = "/instructors/payment?plan=saving-yearly";
});

document.getElementById("premium-yearly").addEventListener("click", function() {
    window.location.href = "/instructors/payment?plan=premium-yearly";
});