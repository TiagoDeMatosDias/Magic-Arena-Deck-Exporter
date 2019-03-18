# Magic Arena Deck Exporter


This Small nodejs application is used to extract your Magic Arena decks from the existing logfiles, in a human readable JSON format. 

# Deck Exporter

To use, simply open Magic Arena and go into the "Decks" screen, close the game and change the "log.htm" file to the most recent one created and run the main.js application.

This should output a human readable JSON formatted list of decks, including the number of cards and their names, to the "Output.txt" file located in the Output folder.

# Dictionary

You can make use the makeDictionary application in order to generate the Dictionary that is used to match the name of the card with the ID used in Magic Arena. 

In order to do this you will need to create up to 7 decks containing all cards in the game. These decks should be named "IDCheck", "IDCheck1", "IDCheck2", etc... Once those decks are created, you must use the ingame "Export" tool, on each deck and paste the contents in order to the "DictionaryExport.txt" file. Finally, restart the game and open the "Decks" screen, close the game and change the "log.htm" file to the most recent one created and run the makeDictionary.js application.

The current dictionary provided should contain the key-value pairs of all cards as of 18-03-2018, except for certain types of lands that come with the default decks. These lands are unable to be added to custom decks.

You will find the generated dictionary in the Dictionary folder, in the file titled "Dictionary.txt"
