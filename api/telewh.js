export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const data = req.body;
  console.log("Update diterima:", data);

  if (data.message) {
    const chat_id = data.message.chat.id;
    const text = data.message.text || "";

    const reply = `Kamu bilang: ${text}`;

    // Kirim balasan ke Telegram
    await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: reply }),
      },
    );
  }

  res.status(200).json({ ok: true });
}
