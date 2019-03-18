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
//Reads and parses the dictionary
function dictionary(){
  var dictionary = fs.readFileSync("Dictionary/Dictionary.txt").toString();
  dictionary = JSON.parse(dictionary);  
  return dictionary;
}

//Returns the name of a card based on the ID, in case the dictionary does not have it defined it returns "Unknown"
function returnName(id, dictionary){
  var name="Unknown";    
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

let writeStream = fs.createWriteStream('Output/Output.txt');
writeStream.write("[ " , 'UTF-8');  
for(var i = 0; i < decks.length;i++){
  writeStream.write("{ \"Deck Name\": \"" + decks[i].name + "\"\n" , 'UTF-8');  
  for(var o = 0; o < decks[i].mainDeck.length; o++){
  writeStream.write("{ \"Quantity\": \"" + decks[i].mainDeck[o].quantity + "\", \"Name\": \""+ returnName(decks[i].mainDeck[o].id, dictionary) +"\" }"  + "\n", 'UTF-8');
  }
  if(i==decks.length-1){
    writeStream.write("}" , 'UTF-8');  

  } else{
    writeStream.write("},\n", 'UTF-8');  
  }
}
writeStream.write("] " , 'UTF-8');  
writeStream.on('finish', () => {  
    console.log('Wrote all data to file');
});
writeStream.end(); 