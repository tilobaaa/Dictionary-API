// jsHint esversion:6

const express = require('express');
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const randomWords = require('random-words');


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", (req,res)=>{

  const generatedWord = randomWords();
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + generatedWord;


  https.get(url, (response)=>{

    response.on("data",function(data){
  //     console.log(response.statusCode);
      const dictionary = JSON.parse(data);

      const words = dictionary[0].word;
      console.log(words);

      const meanings = dictionary[0].meanings[0].definitions[0].definition;
      console.log(meanings);

      const phonetics = dictionary[0].phonetic;
      console.log(phonetics);
      // const meanings = dictionary[0].meanings[0].definitions[0].definition;
      // const phonetics = dictionary[0].phonetic;

      res.render("home",{words:words, meanings:meanings, phonetics:phonetics});
    })
  })

})

app.post("/", (req,res)=>{
  const name = req.body.word;
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + name;

  https.get(url, (response)=>{
    response.on("data",function(data){
      console.log(response.statusCode);

      const dictionaryWord = JSON.parse(data);
      const word = dictionaryWord[0].word;
      const meaning = dictionaryWord[0].meanings[0].definitions[0].definition; 
      const phonetic = dictionaryWord[0].phonetic;
      // const wordAudio = dictionaryWord[0].phonetics[1].audio;

      undefined ? res.render("error", {word:"This is an invalid word, Click the button to redirect you to inpot a correct word"}) :  res.render("search", {word:word, meaning:meaning, phonetic:phonetic});




  })
})
})

app.listen(3000, function(){
  console.log("Server is running on server 3000");
})
