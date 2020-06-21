var twit = require(`twit`);

require("dotenv").config();

const Bot = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

function BotInit() {
  var query = {
    //Aqui vai o que você quer buscar
    q: "#random",
    result_type: "recent",
  };
  // Este método busca os tweets mais recentes baseado na sua query
  Bot.get("search/tweets", query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log("bot não pode achar os ultimos tweets");
    } else {
      var id = {
        id: data.statuses[0].id_str,
      };
    }
    // Neste método será retweetado o tweet localizado
    Bot.post("statuses/retweet/:id", id, BotRetweeted);

    function BotRetweeted(error, response) {
      if (error) {
        console.log("não retwito: " + error);
      } else {
        console.log("Bot retweeto: " + id.id);
      }
    }
  }
}

// setInterval(BotRetweet, 30 * 60 * 1000);
BotInit();
