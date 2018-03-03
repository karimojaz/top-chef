const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
const lafourchette_urlmobile = "https://m.lafourchette.com/api/restaurant/search?sort=QUALITY&offer=0&search_text=";
const lafourchette_url = "https://www.lafourchette.com/restaurant/card/";
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const https = require('https');
var array_of_title = [];
var number_of_pages = 1;

//This, gives us the first page and the number of page
function NumberOfPages(){
  request(url, function(error, response, html){
    //First we will check to make sure no errors occurred when making the request
    if(!error){
      //Next, we will utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);
      //We define variables that we need to capture
      $('.poi_card-display-title').filter(function(){
        var data = $(this);
        var title = data.text();
        array_of_title.push(title.trim());
      });
      $('.mr-pager-item').filter(function(){
        var data = $(this);
        number_of_pages = data.children().first().text();
      });
    }
    else
      console.log(error);
    });
}

//Now I'm going to implement the function to scrap
function Scrape()
{
  //I have to put a loop to craw all pages
	for(var i = 2; i <= number_of_pages; i++)
	{
  	var url_pageX = url + "/page-" + i;

    //I do the same function that before, but with the new URLs
    request(url_pageX, function(error, response, html){
  	if(!error){
  		var $ = cheerio.load(html);
  		$('.poi_card-display-title').filter(function(){
  			var data = $(this);
  			var title = data.text();
  			array_of_title.push(title.trim());
  		});
  	}
  	else
  		console.log(error);
    });
  }
}

/*function Display()
{
	console.log(array_of_title);
	var json = JSON.stringify(array_of_title);
	fs.writeFile('michelin.json', json, 'utf8', (err) => {
	  if (err) throw err;
  });
}*/

function getURL(callback){
      https.get(lafourchette_urlmobile + encodeURI('agape'), (res) => {
      var data = '';

      res.on('data', (d) => {
       data += d;
      });

      res.on('end', () => {
              var obj = JSON.parse(data);
              callback(obj.items[0].id);
      });

      }).on('error', (e) => {
        console.error(e);
      });
}

function getRestaurant(restaurantId){
        const options = {
                host: 'www.lafourchette.com',
                path: '/restaurant/card/' + restaurantId,
                headers: {
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
                }
        }
        https.get(options, (resp) => {
                var data = '';

                resp.on('data', (d) => {
                        data += d;
                });

                resp.on('end', () => {
                        //console.log(data);
                });

        }).on("error", (err) => {
                console.log("Error: " + err.message);
        });
}

NumberOfPages();
setTimeout(Scrape(), 5000);
setTimeout(getURL(getRestaurant), 1000);
