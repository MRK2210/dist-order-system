async function placeOrder() {

    const shopName = document.getElementById("shopName").value;
    const mobile = document.getElementById("mobile").value;

    const rice = Number(document.getElementById("Lassi").value);
    const sugar = Number(document.getElementById("Mattha").value);
    const oil = Number(document.getElementById("ButterMilk").value);

    const order = {
        shopName,
        mobile,
        lassi,
        Mathha,
        buttermilk
        
    };

    console.log("Sending order:", order);

    try {

        const response = await fetch("https://distorder-api.azurewebsites.net/api/placeorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });

        const result = await response.text();

        alert(result);

    } catch (error) {

        console.error("Error:", error);
        alert("Order failed");

    }
}