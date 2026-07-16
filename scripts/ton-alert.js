const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const tonApiKey = process.env.TON_API_KEY;

async function run() {
  try {
    const res = await fetch(
      'https://tonapi.io/v2/rates?tokens=ton&currencies=usd',
      {
        headers: {
          'Authorization': `Bearer ${tonApiKey}`
        }
      }
    );
    const data = await res.json();
    const price = data.rates.TON.prices.USD;

    const now = new Date().toUTCString();
    const message = `🔷 *TON Price* at ${now}:\n💰 *$${price}* USD`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    console.log(`✅ Sent: $${price} at ${now}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

run();