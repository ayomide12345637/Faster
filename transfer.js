import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  const { amount, bankCode, accountNumber, accountName, narration } = req.body;

  if (!amount || !bankCode || !accountNumber || !accountName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const reference = `12A9CFQX-${Date.now()}`;

  try {
    const response = await axios.post(
      "https://api-d.squadco.com/payout/transfer",
      {
        amount: Number(amount),
        bank_code: bankCode,
        account_number: accountNumber,
        account_name: accountName,
        narration: narration || "Payout",
        reference: reference
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SQUAD_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      success: true,
      reference,
      data: response.data
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err?.response?.data || err.message
    });
  }
}