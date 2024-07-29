const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input


const phone = process.env.phone;
const apiId = Number(process.env.id);
const apiHash = process.env.hash;
const stringSession=new StringSession(''); // fill this later with the value from session.save()
var client;

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 1,
  });
  await client.start({
    phoneNumber: async () => {
      console.log("res ph");
      return phone;
    },
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Hello!" });
})();
