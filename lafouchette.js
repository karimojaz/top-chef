const url = "https://m.lafourchette.com/fr_FR/search?date=2018-03-20&hour=20:00&pax=2&searchText=";
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var array_of_title = [];
var array_of_restaurant = [];


function michelin(path){
  fs.readFile(path, 'utf8', function(err, data){
    if(err) throw err;
    array_of_title = JSON.parse(data);
  });
}

function GetURL(){
  var i = 0;
  while( i < array_of_title.length){
    var options = {
      url : 'https://m.lafourchette.com/fr_FR/search?date=2018-03-20&hour=20:00&pax=2&searchText='
      headers : {
        "Cookie" : "COOKIE_POLICY=true; s_visit=1; s_dl=1; c_m=undefinedTyped%2FBookmarkedTyped%2FBookmarkedundefined; s_ev80=%5B%5B%27DA%253Afiltered-search%27%2C%271520076462320%27%5D%5D; s_ev81=%5B%5B%27DA%253Afiltered-search%27%2C%271520076462320%27%5D%5D; s_ev82=%5B%5B%27DA%253Afiltered-search%27%2C%271520076462320%27%5D%5D; s_ev83=%5B%5B%27DA%27%2C%271520076462321%27%5D%5D; s_ev84=%5B%5B%27DA%27%2C%271520076462322%27%5D%5D; s_ev46=%5B%5B%27DA%27%2C%271520076462322%27%5D%5D; s_fid=4EC152D34B7AE73F-367646DB1F862821; s_cc=true; _ga=GA1.3.132900604.1520076462; _gid=GA1.3.598189289.1520076462; __qca=P0-1553566540-1520076462709; ry_ry-l4f02rfr_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwiZXhwIjoxNTUxNjEyNDYzMTIxfQ%3D%3D; ry_ry-l4f02rfr_so_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwib3JpZ2luIjp0cnVlLCJyZWYiOm51bGwsImNvbnQiOm51bGx9; cto_lwid=85192d46-17a7-4e96-8da3-a95eff260a5c; datadome=AHrlqAAAAAMAiPEtV30pqZQAsL3qDA==; optimizelyEndUserId=oeu1520076526810r0.8289960805741401; optimizelySegments=%7B%222094000590%22%3A%22none%22%2C%222105021233%22%3A%22direct%22%2C%222108891003%22%3A%22false%22%2C%222113951034%22%3A%22gc%22%2C%222445220188%22%3A%22true%22%2C%226139290832%22%3A%22true%22%7D; optimizelyBuckets=%7B%228385409370%22%3A%228384861628%22%2C%228504435549%22%3A%228507067200%22%7D; AMCVS_20E8776A524455540A490D44%40AdobeOrg=1; AMCV_20E8776A524455540A490D44%40AdobeOrg=-1248264605%7CMCIDTS%7C17594%7CMCMID%7C60167032523389162527950108128529044514%7CMCAAMLH-1520681327%7C6%7CMCAAMB-1520681327%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1520083727s%7CNONE%7CMCAID%7CNONE; __utma=25724450.830802860.1520076528.1520076528.1520076528.1; __utmc=25724450; __utmz=25724450.1520076528.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=25724450.|3=VisitorFrequency=non-frequent=1^4=Engagement=regular=1^5=Membership=new-visitor=1; __55ft=(direct)_(none)_-; s_sq=%5B%5BB%5D%5D; __utmt=1; s_ppvl=DESKTOP%253Enull%253Ehomepage-country%253Efr_FR%2C18%2C18%2C779%2C1440%2C779%2C1440%2C900%2C2%2CP; mbox=session#1520076526943-222769#1520079087|PC#1520076526943-222769.26_28#1521286827|check#true#1520077287; __utmb=25724450.18.9.1520077226900; s_ppv=DESKTOP%253Enull%253Ehomepage-country%253Efr_FR%2C39%2C18%2C1668%2C1440%2C779%2C1440%2C900%2C2%2CP; _gat_UA-37509898-15=1; _uetsid=_uetdad1a087; prev_pn=MOBILE%3Enull%3Esearch-results%3Efr_FR"
      }
    };

    var options.url = url + encodeURIComponent(array_of_title[i]);
    var restaurant = {"id":"", "name":array_of_title[i], "deal":""};
    request(options, function(error, response, html){
    if(!error){
            var $ = cheerio.load(html);
            console.log($.text());
            $('.restaurantResult-promotion ng-binding ng-scope restaurantResult-promotion--special').filter(function(){
            var data = $(this);
            restaurant.deal=data.text();
            restaurants.push(restaurant);
            console.log(data.text());
    });
  }
  else
    console.log(error);
});
  }
}

michelin('michelin.json');
setTimeout(GetURL, 1000);
