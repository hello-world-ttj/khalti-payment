# Khalti Service

A Node.js module for interacting with the Khalti payment gateway, enabling seamless payment initiation and status lookup.

## Installation

You can install the `khalti-payment` package via npm:

```bash
npm install khalti-payment
```

## Usage

## Import the Module

```javascript
const { khaltiService, khaltiCallback } = require("khalti-service");
```

## Initiating a Payment

To initiate a payment through Khalti's ePayment API, use the `khaltiService` function with the required payload and configuration parameters:

```javascript
const payload = {
  return_url: "https://example.com/payment/success", // callback url to server
  website_url: "https://example.com",
  amount: 1000, // Amount in paisa (10*100)
  purchase_order_id: "ORD-123456",
  purchase_order_name: "Example Order",
};

const config = {
  KHALTI_GATEWAY_URL: "https://khalti.com",
  KHALTI_SECRET_KEY: "your-secret-key",
};

khaltiService(payload, config)
  .then((data) => {
    console.log("Payment initiated successfully:", data);
  })
  .catch((error) => {
    console.error("Error initiating payment:", error);
  });
```

## Handling Khalti Callback

To handle Khalti callback for payment status lookup (e.g., in an Express route), use the `khaltiCallback` function:

```javascript
const express = require("express");
const { khaltiCallback } = require("khalti-payment");

const app = express();

// Example route for handling Khalti callback
app.get("/khalti/callback", async (req, res) => {
  try {
    const config = {
      KHALTI_GATEWAY_URL: "https://khalti.com",
      KHALTI_SECRET_KEY: "your-secret-key",
    };

    const paymentStatus = await khaltiCallback(req, config);
    console.log("Payment status lookup:", paymentStatus);
    res.sendStatus(200); // Respond to Khalti callback with success status
  } catch (error) {
    console.error("Error handling Khalti callback:", error);
    res.sendStatus(500); // Respond to Khalti callback with error status
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Configuration

- `payload`: An object containing payment initiation parameters (`return_url`, `website_url`, `amount`, `purchase_order_id`, `purchase_order_name`).

- `config`: An object containing Khalti gateway URL (`KHALTI_GATEWAY_URL`) and secret key (`KHALTI_SECRET_KEY`).

For more details, documentation, and advanced usage examples, visit the [GitHub repository](https://github.com/hello-world-ttj/khalti-payment), [Khalti documentation](https://docs.khalti.com/)
