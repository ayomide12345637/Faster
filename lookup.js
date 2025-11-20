import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  const { accountNumber, bankCode } = req.body;

  if (!accountNumber || !bankCode) {
    return res.status(400).json({ error: "Missing accountNumber or bankCode" });
  }

  try {
    const response = await axios.post(
      "https://api-d.squadco.com/payout/account/lookup",
      {
        account_number: accountNumber,
        bank_code: bankCode
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SQUAD_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err?.response?.data || err.message
    });
  }
}