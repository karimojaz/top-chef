const lafourchette_urlmobile = "https://m.lafourchette.com/api/restaurant/search?sort=QUALITY&offer=0&search_text=";
const lafourchette_url = "https://www.lafourchette.com/restaurant/card/";
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var array_of_title = [];
var array_of_restaurant = [];
const https = require('https');


function michelin(path){
  fs.readFile(path, 'utf8', function(err, path){
    if(err) throw err;
    array_of_title = JSON.parse(path);
  });
}

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

function Display()
{
	console.log(array_of_restaurant);

	var json = JSON.stringify(array_of_restaurant);
	fs.writeFile('lafourchette.json', json, 'utf8', (err) => {
	  if (err) throw err;
	});
}


michelin('michelin.json');
console.log(array_of_title);
setTimeout(getURL(getRestaurant), 1000);
setTimeout(Display, 3000);
