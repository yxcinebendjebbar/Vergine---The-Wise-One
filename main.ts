import { Bot } from "grammy";
import { getQuote } from "./utils/quotes";
import { configDotenv } from "dotenv";

configDotenv();

const bot = new Bot(process.env.TOKEN as string);

bot.command("start", (ctx) => {
  ctx.reply("Welcome home, master!");
});

bot.command("chat", (ctx) => {
  ctx.reply("Speak thine heart's desires");
});

bot.command("quote", async (ctx) => {
  try {
    const quotes = await getQuote();
    quotes.map((quote) => ctx.reply(quote.q + " - " + quote.a));
  } catch (error) {
    console.error(error);
  }
});

setInterval(async () => {
  try {
    const quotes = await getQuote();
    quotes.map((quote) =>
      bot.api.sendMessage(
        process.env.CHAT_ID as string,
        quote.q + " - " + quote.a
      )
    );
  } catch (error) {
    console.error(error);
  }
}, 5400000);

bot.start();
