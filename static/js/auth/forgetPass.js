async function forgetPass() {
    const email = document.getElementById("email").value;
    const resetData = await (await fetch("/api/forgetPass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    })).json();
    const forgetToken = resetData.forget;

    document.getElementById("incoming-email").hidden = false;
    document.getElementById("reset-password-link").href = `/auth/resetPass?forget=${forgetToken}`;
}