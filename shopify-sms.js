const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.json());

app.post('/api/shopify-sms', async (req, res) => {
  const order = req.body;
  const phone = order?.shipping_address?.phone || '';
  const message = `Thank you, ${order.customer.first_name}! Your order #${order.order_number} has been received.`;

  const apiKey = "CqGUEe5Vmqt8yPKo7K8t";
  const senderId = "8809617617772";
  const number = phone.replace(/^\+/, ''); // remove + if exists

  const url = `https://bulksmsbd.net/api/smsapi?api_key=${apiKey}&senderid=${senderId}&number=${number}&message=${encodeURIComponent(message)}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log("SMS Sent:", data);
    res.status(200).send('OK');
  } catch (err) {
    console.error("SMS Error:", err);
    res.status(500).send('Error');
  }
});

// For local test
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
