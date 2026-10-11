export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('Bot is running!', { status: 200 });
    }

    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secretToken !== env.SECRET_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const update = await request.json();

      if (update.message && update.message.new_chat_members) {
        const chatId = update.message.chat.id;
        const messageId = update.message.message_id;

        const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/deleteMessage`;
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId
          })
        });
      }
    } catch (e) {
      console.error(e);
    }

    return new Response('OK', { status: 200 });
  }
};
