import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Only GET allowed" });

  try {
    const response = await axios.get(
      "https://api-d.squadco.com/payout/list",
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