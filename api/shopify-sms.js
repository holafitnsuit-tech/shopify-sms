import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const order = req.body;
    const phone = order?.shipping_address?.phone || "";
    const message = `Thank you, ${order.customer?.first_name || "Customer"}! Your order #${order.order_number} has been received.`;

    const apiKey = "CqGUEe5Vmqt8yPKo7K8t";
    const senderId = "8809617617772";
    const number = phone.replace(/^\+/, "");

    const url = `https://bulksmsbd.net/api/smsapi?api_key=${apiKey}&senderid=${senderId}&number=${number}&message=${encodeURIComponent(
      message
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.text();
      console.log("SMS Sent:", data);
      res.status(200).json({ success: true, response: data });
    } catch (err) {
      console.error("SMS Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
