const {Translate} = require('@google-cloud/translate').v2;
const express =require('express');
const app=express();
const path=require('path');
const { brotliDecompressSync } = require('zlib');
const server=require('http').Server(app);
const io=require('socket.io')(server);
let fs = require("fs");

let projectId = "week12lab-366011";

// Instantiates a client
const translate = new Translate({projectId});
//port
const port = 8080;
server.listen(port, ()=> {
    console.log("Click on: http://localhost:" + port);
});

//angular
app.use(express.static(path.join(__dirname,"dist","translate-app")));


//socket.io
io.on('connection',(socket) => {
    console.log("new connection made from client with id:" + socket.id);
    socket.on('onNewText',(data) =>{// write 
        translateMyText(data.text, data.targetLanguage).then((theTranslation) => {
        let resultObj = {
            targetLanguage: data.targetLanguage,
            originalText: data.text,
            translatedText: theTranslation,
        };
        console.log(resultObj)
        io.emit("onTranslateText", resultObj);
    });
});
});












async function translateMyText(theText, targetLanguage) {
  // The text to translate
  const text = theText;

  // The target language
  const target = targetLanguage;

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
  return translation;
}

