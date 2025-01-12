import { Bot } from "grammy";
import { getQuote } from "./utils/quotes";
import { configDotenv } from "dotenv";
import express from "express";

configDotenv();

const bot = new Bot(process.env.TOKEN as string);

bot.command("start", (ctx) => {
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

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.get("/send-quote", async (req, res) => {
  try {
    const quotes = await getQuote();
    quotes.map((quote) =>
      bot.api.sendMessage(
        process.env.CHAT_ID as string,
        `${quote.q} - ${quote.a}`
      )
    );
    res.status(200).send("Quote sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send quote.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  bot.start();
});
