var fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var log = fs.readFileSync("log/Log.htm").toString();


//outputs the logs without extra html stuff
function input(log){
  const dom = new JSDOM(log);
  var table = dom.window.document.querySelector("div").textContent;  
  var splitChars = /[\n\t\r]/g;  
  table = table.split(splitChars);  
  var filtered = table.filter(Boolean);
  var filtered = filtered.filter(function (el) {
      return el != "  ";
    });
    var filtered = filtered.filter(function (el) {
      return el !="    ";
    });
  return filtered;
}
//outputs the decklist in a JSON array
function decks(input){
  var output="";
  var endlist;
  for(var i = 0; i < input.length; i++){
    if(input[i].includes("<== Deck.GetDeckLists") ){
      endlist=true;      
    } else if(endlist == true && input[i]!="]"){  
      output = output + input[i];
    } else if (endlist == true && input[i]=="]"){
      output = output + input[i];
      endlist=false;
      break;
    } else{};
  }
  output = JSON.parse(output);
  return output;
}
//Reads and parses the dictionaryExport file that is used to construct the dictionary
function dictionary(){
  var dictionary = fs.readFileSync("Dictionary/DictionaryExport.txt").toString();
  var splitChars = /[\n\t]/g;  
  dictionary = dictionary.split(splitChars);  
  for(var i = 0 ; i< dictionary.length; i++){
    dictionary[i]= dictionary[i].substring(2, dictionary[i].search(/\)/g)+1);
  }
  return dictionary;
}
//Returns the name of a card based on the ID, in case the dictionary does not have it defined it returns ""
function returnName(id, dictionary){
  var name="";    
  for(var i = 0; i<dictionary.length; i++ ){
      if(dictionary[i].id == id){
          name = dictionary[i].name;
      }
  }  
  return name;
}

var input = input(log);
var decks = decks(input);
var dictionary = dictionary();
let writeStream = fs.createWriteStream('Dictionary/Dictionary.txt');
writeStream.write("[");
var x;
for(var i = 0; i < decks.length;i++){
  if(decks[i].name == "IDCheck"){
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[o], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
        x=o;
      }
    }
  } else if(decks[i].name == "IDCheck1"){
    writeStream.write("\"},\n");
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      x++;
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[x], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
      }
    }
  } else if(decks[i].name == "IDCheck2"){
    writeStream.write("\"},\n");
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      x++;
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[x], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
      }
    }
  } else if(decks[i].name == "IDCheck3"){
    writeStream.write("\"},\n");
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      x++;
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[x], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
      }
    }
  } else if(decks[i].name == "IDCheck4"){
    writeStream.write("\"},\n");
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      x++;
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[x], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
      }
    }
  } else if(decks[i].name == "IDCheck5"){
    writeStream.write("\"},\n");
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      x++;
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[x], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
      }
    }
  } else if(decks[i].name == "IDCheck6"){
    writeStream.write("\"},\n");
    for(var o = 0; o < decks[i].mainDeck.length; o++){
      x++;
      writeStream.write("{ \"id\": \"" + decks[i].mainDeck[o].id + "\", \"name\": \""+ dictionary[x], 'UTF-8'); 
      if(o!=decks[i].mainDeck.length-1) {
        writeStream.write("\"},\n");
      }else{
      }
    }
  }
}
writeStream.write("\"} ]");    
writeStream.on('finish', () => {  
    console.log('Wrote all data to file');
});
writeStream.end(); 