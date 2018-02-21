//The first page will not change so I will put this url in a const.
const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//This, gives us the first page and the number of page
request(url, function(error, response, html){
  //First we will check to make sure no errors occurred when making the request
  if(!error){
    //Next, we will utilize the cheerio library on the returned html which will essentially give us jQuery functionality
    var $ = cheerio.load(html);
    //We define variables that we need to capture
    $('.poi_card-display-title').filter(function(){
      var data = $(this);
      var title = data.text();
      titles.push(title.trim());
    });
    $('.mr-pager-item').filter(function(){
      var data = $(this);
      nb_pages = data.children().first().text();
    });
  }
  else
    console.log(error);
    console.log("numb of pages " + number_of_pages);
  });
