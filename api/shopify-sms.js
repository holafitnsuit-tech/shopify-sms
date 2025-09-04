import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const order = req.body;

    // Get phone number from order
    let phone = order?.shipping_address?.phone || "";
    let number = phone.replace(/^\+/, ""); // remove leading +

    // Convert 01XXXXXXXXX → 8801XXXXXXXXX
    if (number.startsWith("01")) {
      number = "88" + number;
    }

    // Custom SMS template with name + order number
    let message = `fitnsuit.com
Thanks ${order.customer?.first_name || "Customer"}
Order #${order.order_number} is processing.
📞 01576952688
💬 https://rb.gy/nscihy`;

    // Ensure message length never exceeds 134 chars
    if (message.length > 134) {
      message = message.substring(0, 134);
    }

    const apiKey = "CqGUEe5Vmqt8yPKo7K8t";
    const senderId = "8809617617772";

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
