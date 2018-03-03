//The first page will not change so I will put this url in a const.
const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
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
      console.log("Page number " + number_of_pages);
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

function Display()
{
	console.log(array_of_title);
	var json = JSON.stringify(array_of_title);
	fs.writeFile('michelin.json', json, 'utf8', (err) => {
	  if (err) throw err;
  });
}

NumberOfPages();
setTimeout(Scrape, 5000);
setTimeout(Display,30000);
