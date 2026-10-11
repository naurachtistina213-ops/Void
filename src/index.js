export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") return new Response("ok");

    const update = await request.json();
    const msg = update.message;

    if (msg && (msg.new_chat_members || msg.left_chat_member)) {
      ctx.waitUntil(
        fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/deleteMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: msg.chat.id,
            message_id: msg.message_id,
          }),
        })
      );
    }

    return new Response("ok");
  },
};
