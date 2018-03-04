var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
//The first page will not change so I will put this url in a const.
const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';

//I try to implement the JSON file
var jsonFile = "restaurantMichelin.json";
var jsonContent = '{"table of restaurant" : [';
fs.writeFileSync(jsonFile,jsonContent);

var number_of_pages = 1;


function NumberOfPages(){
  request({ uri: url, }, function(error, resp, html){
    if(!error){
      var $ = cheerio.load(html);

      //This is to find the number of the last page
      $("div[class = item-list-first]").each(function(){
          var link = $(this);
          var listPage = link.children().children().children();
          var lastPage = listPage[listPage.length -2];
          number_of_pages = lastPage.children[0].attribs['attr-page-number'];
      });
      console.log(number_of_pages);
    }
    else{
      console.log(error);
    }
  });
}


NumberOfPages();
