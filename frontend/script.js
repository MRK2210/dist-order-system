async function placeOrder() {

    const shopName = document.getElementById("shopName").value;
    const mobile = document.getElementById("mobile").value;

    const rice = Number(document.getElementById("rice").value);
    const sugar = Number(document.getElementById("sugar").value);
    const oil = Number(document.getElementById("oil").value);

    const order = {
        shopName,
        mobile,
        rice,
        sugar,
        oil
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