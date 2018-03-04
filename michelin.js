var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
//The first page will not change so I will put this url in a const.
const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
const urlMich = 'https://restaurant.michelin.fr'

//I try to implement the JSON file
var jsonFile = "restaurantMichelin.json";
var jsonContent = '{"restaurantGuide" : [';
fs.writeFileSync(jsonFile,jsonContent);

var number_of_pages = 1;


function RestaurantMichelin(){
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

      for(var i = 1; i < number_of_pages; i++){
        var url_pageX = url + "/page-" + i;
        request({ uri: url, } , function(error, resp, html){
            $ = cheerio.load(html);
            $("a[class = poi-card-link]").each(function(){
                var link = $(this);
                var ref = link.attr("href");
                var urlRestaurant = urlMich + ref;

                //this could give us acces to the adress where we can find our informations
                request({ uri: urlRestaurant, }, function(error, resp, html) {
                    var $2 = cheerio.load(html);
                    var name; var street; var zipCode;
                    var city; var tel;

                    name = $2("h1[itemprop=name]").text().replace("\n","");
                    name = name.substring(6, name.length-4);
                    name.replace("\"","");

                    //I choose try catch because some restaurant don't have street or zipcode
                    try{
                        street = $2("div[class=thoroughfare]")[0].children[0].data;
                    }catch(e){
                        console.log(e);
                    }

                    try{
                        zipCode = $2("span[class=postal-code]")[0].children[0].data;
                    }
                    catch(e){
                        console.log(e);
                    }

                    city = $2("span[class=locality]")[0].children[0].data;
                    tel = $2("div[class=tel]").text();

                    var jsonFinal = '{ "name" : "' + name + '", "street" : "' + street + '", "zipcode" : "' + zipCode + '", "city" : "' + city + '", "tel" : "' + tel + '" },\n';
                    fs.appendFileSync(jsonFile,jsonFinal);
                });
              });
            });
          }
        }
    else{
      console.log(error);
    }
  });
}

RestaurantMichelin();
