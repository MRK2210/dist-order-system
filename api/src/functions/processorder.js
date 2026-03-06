const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');
const nodemailer = require("nodemailer");

app.storageQueue('processorder', {
    queueName: 'orders',
    connection: 'AzureWebJobsStorage',

    handler: async (message, context) => {

        const order = message;

        const total =
            (order.Lassi * 35) +
            (order.Mattha * 20) +
            (order.ButterMilk *22);

        context.log("Processing order:", order);

        // Store in Cosmos DB
        const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
        const database = client.database("ordersdb");
        const container = database.container("orders");

        await container.items.create({
            id: Date.now().toString(),
            ...order,
            totalAmount: total,
            orderDate: new Date().toISOString()
        });

        context.log("Order stored in Cosmos DB");

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Send email
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: "New Distributor Order",
            text: `
New Order Received

Shop: ${order.shopName}
Mobile: ${order.mobile}

Lassi: ${order.lassi}
Mattha: ${order.Mattha}
Buttermilk: ${order.buttermilk}


Total Amount: ₹${total}
Order Time: ${new Date().toLocaleString()}
`
        });

        context.log("Order email notification sent");
    }
});