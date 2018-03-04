var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');

const lafourchette_url = "https://www.lafourchette.com/search-refine";

var michelinJSON = "restaurantMichelin.json";
var restaurantLafourchette = "restaurantLaFourchette.json";
var rest = { "name" : "Agapé", "street" : "51 Rue Jouffroy-d'Abbans", "zipcode" : "75017", "city" : "Paris 17", "tel" : "01 42 27 20 18" };


function findRestaurant(restau){
  var urlRestau = lafourchette_url + "/" + restau.name;
  request({ uri: urlRestau, headers : {
        'Cookie': 's_fid=4EC152D34B7AE73F-367646DB1F862821; s_cc=true; __qca=P0-1553566540-1520076462709; ry_ry-l4f02rfr_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwiZXhwIjoxNTUxNjEyNDYzMTIxfQ%3D%3D; cto_lwid=85192d46-17a7-4e96-8da3-a95eff260a5c; PHPSESSID=2880b7fd55491b469af0b367890fe067; COOKIE_POLICY=1; datadome=AHrlqAAAAAMAiPEtV30pqZQAsL3qDA==; optimizelyEndUserId=oeu1520076526810r0.8289960805741401; _sdsat_landing_page=https://www.lafourchette.com/|1520076526847; _sdsat_session_count=1; AMCVS_20E8776A524455540A490D44%40AdobeOrg=1; __utmc=25724450; __55ft=(direct)_(none)_-; _sdsat_traffic_source=https://www.lafourchette.com/; s_sq=%5B%5BB%5D%5D; optimizelySegments=%7B%222094000590%22%3A%22none%22%2C%222105021233%22%3A%22search%22%2C%222108891003%22%3A%22false%22%2C%222113951034%22%3A%22gc%22%2C%222445220188%22%3A%22true%22%2C%222757962489%22%3A%22true%22%2C%226139290832%22%3A%22true%22%7D; __utmz=25724450.1520085279.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmv=25724450.|3=VisitorFrequency=frequent=1^4=Engagement=regular=1^5=Membership=new-visitor=1; CC=15100-b1b; _sdsat_cookie_CC=15100-b1b; optimizelyBuckets=%7B%228385409370%22%3A%228384861628%22%2C%228504435549%22%3A%228507067200%22%2C%229620901071%22%3A%229625440247%22%7D; LF_TUTO_RESERVATION_MODULE=1; c_m=undefinedTyped%2FBookmarkedTyped%2FBookmarkedundefined; LF_AUTOCOMPLETE_W_FORKATO=hasforkato; LF_NEW_AUTOCOMPLETE=1; AMCV_20E8776A524455540A490D44%40AdobeOrg=-1248264605%7CMCIDTS%7C17594%7CMCMID%7C60167032523389162527950108128529044514%7CMCAAMLH-1520681327%7C6%7CMCAAMB-1520784723%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1520187123s%7CNONE%7CMCAID%7CNONE; __utma=25724450.830802860.1520076528.1520179924.1520183631.6; __utmt=1; ry_ry-l4f02rfr_so_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwib3JpZ2luIjp0cnVlLCJyZWYiOm51bGwsImNvbnQiOm51bGx9; s_visit=1; s_dl=1; s_ev80=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648431%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691755%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923350%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638703%27%5D%5D; s_ev81=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648431%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691756%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923351%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638704%27%5D%5D; s_ev82=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648432%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691756%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923352%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638704%27%5D%5D; s_ev83=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278331%27%5D%2C%5B%27RVI%27%2C%271520088691756%27%5D%2C%5B%27DA%27%2C%271520179923352%27%5D%2C%5B%27RVI%27%2C%271520183638704%27%5D%5D; s_ev84=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278332%27%5D%2C%5B%27RVI%27%2C%271520088691757%27%5D%2C%5B%27DA%27%2C%271520179923352%27%5D%2C%5B%27RVI%27%2C%271520183638705%27%5D%5D; s_ev46=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278332%27%5D%2C%5B%27RVI%27%2C%271520088691758%27%5D%2C%5B%27DA%27%2C%271520179923353%27%5D%2C%5B%27RVI%27%2C%271520183638706%27%5D%5D; _sdsat_lt_pages_viewed=13; _sdsat_pages_viewed=13; mbox=PC#1520076526943-222769.26_28#1521393305|check#true#1520183765|session#1520183638370-369033#1520185565; prev_pn=DESKTOP%3Enull%3Esearch-intermediate-results%3Efr_FR; __utmb=25724450.9.9.1520183705252; _uetsid=_uet7638a0e0; optimizelyPendingLogEvents=%5B%5D; s_ppvl=DESKTOP%253EParis%253Erestaurant-card%253Efr_FR%2C13%2C13%2C779%2C1440%2C779%2C1440%2C900%2C2%2CP; s_ppv=DESKTOP%253Enull%253Esearch-intermediate-results%253Efr_FR%2C20%2C20%2C779%2C547%2C779%2C1440%2C900%2C2%2CL'
      }}, function(error, resp, html) {
      var $ = cheerio.load(html);
      var number_of_pages = 1;
      try{
          $("div[class = pagination]").each(function() {
              var link = $(this);
              var listPage = link.children();
              listPage = listPage[0].children;
              var lastPage = listPage[listPage.length - 2]
              number_of_pages = lastPage.children[0].attribs['data-page-number'];
          });
      }
      catch(e){
          console.log(e);
      }
      var i = 1;
      while(i <= number_of_pages){
          request({ uri: lafourchette_url + "?page=" + i, headers : {
            'Cookie' :'s_fid=4EC152D34B7AE73F-367646DB1F862821; s_cc=true; __qca=P0-1553566540-1520076462709; ry_ry-l4f02rfr_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwiZXhwIjoxNTUxNjEyNDYzMTIxfQ%3D%3D; cto_lwid=85192d46-17a7-4e96-8da3-a95eff260a5c; PHPSESSID=2880b7fd55491b469af0b367890fe067; COOKIE_POLICY=1; datadome=AHrlqAAAAAMAiPEtV30pqZQAsL3qDA==; optimizelyEndUserId=oeu1520076526810r0.8289960805741401; _sdsat_landing_page=https://www.lafourchette.com/|1520076526847; _sdsat_session_count=1; AMCVS_20E8776A524455540A490D44%40AdobeOrg=1; __utmc=25724450; __55ft=(direct)_(none)_-; _sdsat_traffic_source=https://www.lafourchette.com/; s_sq=%5B%5BB%5D%5D; optimizelySegments=%7B%222094000590%22%3A%22none%22%2C%222105021233%22%3A%22search%22%2C%222108891003%22%3A%22false%22%2C%222113951034%22%3A%22gc%22%2C%222445220188%22%3A%22true%22%2C%222757962489%22%3A%22true%22%2C%226139290832%22%3A%22true%22%7D; __utmz=25724450.1520085279.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmv=25724450.|3=VisitorFrequency=frequent=1^4=Engagement=regular=1^5=Membership=new-visitor=1; CC=15100-b1b; _sdsat_cookie_CC=15100-b1b; optimizelyBuckets=%7B%228385409370%22%3A%228384861628%22%2C%228504435549%22%3A%228507067200%22%2C%229620901071%22%3A%229625440247%22%7D; LF_TUTO_RESERVATION_MODULE=1; c_m=undefinedTyped%2FBookmarkedTyped%2FBookmarkedundefined; LF_AUTOCOMPLETE_W_FORKATO=hasforkato; LF_NEW_AUTOCOMPLETE=1; AMCV_20E8776A524455540A490D44%40AdobeOrg=-1248264605%7CMCIDTS%7C17594%7CMCMID%7C60167032523389162527950108128529044514%7CMCAAMLH-1520681327%7C6%7CMCAAMB-1520784723%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1520187123s%7CNONE%7CMCAID%7CNONE; __utma=25724450.830802860.1520076528.1520179924.1520183631.6; __utmt=1; ry_ry-l4f02rfr_so_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwib3JpZ2luIjp0cnVlLCJyZWYiOm51bGwsImNvbnQiOm51bGx9; s_visit=1; s_dl=1; s_ev80=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648431%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691755%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923350%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638703%27%5D%5D; s_ev81=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648431%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691756%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923351%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638704%27%5D%5D; s_ev82=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648432%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691756%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923352%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638704%27%5D%5D; s_ev83=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278331%27%5D%2C%5B%27RVI%27%2C%271520088691756%27%5D%2C%5B%27DA%27%2C%271520179923352%27%5D%2C%5B%27RVI%27%2C%271520183638704%27%5D%5D; s_ev84=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278332%27%5D%2C%5B%27RVI%27%2C%271520088691757%27%5D%2C%5B%27DA%27%2C%271520179923352%27%5D%2C%5B%27RVI%27%2C%271520183638705%27%5D%5D; s_ev46=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278332%27%5D%2C%5B%27RVI%27%2C%271520088691758%27%5D%2C%5B%27DA%27%2C%271520179923353%27%5D%2C%5B%27RVI%27%2C%271520183638706%27%5D%5D; _sdsat_lt_pages_viewed=13; _sdsat_pages_viewed=13; mbox=PC#1520076526943-222769.26_28#1521393305|check#true#1520183765|session#1520183638370-369033#1520185565; prev_pn=DESKTOP%3Enull%3Esearch-intermediate-results%3Efr_FR; __utmb=25724450.9.9.1520183705252; _uetsid=_uet7638a0e0; optimizelyPendingLogEvents=%5B%5D; s_ppvl=DESKTOP%253EParis%253Erestaurant-card%253Efr_FR%2C13%2C13%2C779%2C1440%2C779%2C1440%2C900%2C2%2CP; s_ppv=DESKTOP%253Enull%253Esearch-intermediate-results%253Efr_FR%2C20%2C20%2C779%2C547%2C779%2C1440%2C900%2C2%2CL'
            }
          }, function(error, resp, html){
              var $2 = cheerio.load(html);
              try{
                  $2("div[class = resultItem-information]").each(function(){
                      var link2 = $2(this);
                      var name = link2[0].children[0].children[0].children[0].data;
                      var href = link2[0].children[0].children[0].attribs.href;
                      var place = link2[0].children[1].children[0].data.replace("\n","");
                      place = place.substring(28,place.length-53);
                      if(place.includes(restau.zipcode) && name.includes(restau.name)){
                          var jsonRestaurant = '{ "originName" : "' + restau.name + '", "name" : "' + name + '", "place" : "' + place + '", "link" : "' + href + '" },\n';
                          fs.appendFileSync(restaurantLafourchette,jsonRestaurant);
                      }
                  });
              }
              catch(e){
                  console.log(e);
              }
          });
          i++;
      }
  });
}

function getURL(){
    var jsonMichelin = fs.readFileSync(michelinJSON);
    var jsonMichelin = JSON.parse(jsonMichelin);
    var restaurantMichelin = jsonMichelin.restaurantGuide;

    var jsonContent = '{"restaurantFourchette":[';
    fs.writeFileSync(restaurantLafourchette,jsonContent);
    var i = 0;
    while(i < (restaurantMichelin.length)){
        try{
          findRestaurant(restaurantMichelin[i]);
        }
        catch(e){
           console.log(e);
        }
        i++;
    }
}


function getPromo(restaurant){

    var urlRestaurant = "https://www.lafourchette.com/" + restaurant.link;
    request({ uri: "https://www.lafourchette.com/" + restaurant.link, headers : {
      'Cookie' : 's_fid=4EC152D34B7AE73F-367646DB1F862821; s_cc=true; __qca=P0-1553566540-1520076462709; ry_ry-l4f02rfr_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwiZXhwIjoxNTUxNjEyNDYzMTIxfQ%3D%3D; cto_lwid=85192d46-17a7-4e96-8da3-a95eff260a5c; PHPSESSID=2880b7fd55491b469af0b367890fe067; COOKIE_POLICY=1; datadome=AHrlqAAAAAMAiPEtV30pqZQAsL3qDA==; optimizelyEndUserId=oeu1520076526810r0.8289960805741401; _sdsat_landing_page=https://www.lafourchette.com/|1520076526847; _sdsat_session_count=1; AMCVS_20E8776A524455540A490D44%40AdobeOrg=1; __utmc=25724450; __55ft=(direct)_(none)_-; _sdsat_traffic_source=https://www.lafourchette.com/; s_sq=%5B%5BB%5D%5D; optimizelySegments=%7B%222094000590%22%3A%22none%22%2C%222105021233%22%3A%22search%22%2C%222108891003%22%3A%22false%22%2C%222113951034%22%3A%22gc%22%2C%222445220188%22%3A%22true%22%2C%222757962489%22%3A%22true%22%2C%226139290832%22%3A%22true%22%7D; __utmz=25724450.1520085279.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmv=25724450.|3=VisitorFrequency=frequent=1^4=Engagement=regular=1^5=Membership=new-visitor=1; CC=15100-b1b; _sdsat_cookie_CC=15100-b1b; optimizelyBuckets=%7B%228385409370%22%3A%228384861628%22%2C%228504435549%22%3A%228507067200%22%2C%229620901071%22%3A%229625440247%22%7D; LF_TUTO_RESERVATION_MODULE=1; c_m=undefinedTyped%2FBookmarkedTyped%2FBookmarkedundefined; LF_AUTOCOMPLETE_W_FORKATO=hasforkato; LF_NEW_AUTOCOMPLETE=1; AMCV_20E8776A524455540A490D44%40AdobeOrg=-1248264605%7CMCIDTS%7C17594%7CMCMID%7C60167032523389162527950108128529044514%7CMCAAMLH-1520681327%7C6%7CMCAAMB-1520784723%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1520187123s%7CNONE%7CMCAID%7CNONE; __utma=25724450.830802860.1520076528.1520179924.1520183631.6; __utmt=1; ry_ry-l4f02rfr_so_realytics=eyJpZCI6InJ5XzU1QkIxRDA0LUE4RTctNDBBNi05QUY3LTE0NTlERDlBNzc4NiIsImNpZCI6bnVsbCwib3JpZ2luIjp0cnVlLCJyZWYiOm51bGwsImNvbnQiOm51bGx9; s_visit=1; s_dl=1; s_ev80=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648431%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691755%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923350%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638703%27%5D%5D; s_ev81=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648431%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691756%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923351%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638704%27%5D%5D; s_ev82=%5B%5B%27DA%253Afiltered-search%27%2C%271520083648432%27%5D%2C%5B%27NS%253AGoogle%2520-%2520France%27%2C%271520085278330%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520088691756%27%5D%2C%5B%27DA%253Arestaurant-card%27%2C%271520179923352%27%5D%2C%5B%27RVI%253Ahomepage-country%27%2C%271520183638704%27%5D%5D; s_ev83=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278331%27%5D%2C%5B%27RVI%27%2C%271520088691756%27%5D%2C%5B%27DA%27%2C%271520179923352%27%5D%2C%5B%27RVI%27%2C%271520183638704%27%5D%5D; s_ev84=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278332%27%5D%2C%5B%27RVI%27%2C%271520088691757%27%5D%2C%5B%27DA%27%2C%271520179923352%27%5D%2C%5B%27RVI%27%2C%271520183638705%27%5D%5D; s_ev46=%5B%5B%27DA%27%2C%271520083648432%27%5D%2C%5B%27NS%27%2C%271520085278332%27%5D%2C%5B%27RVI%27%2C%271520088691758%27%5D%2C%5B%27DA%27%2C%271520179923353%27%5D%2C%5B%27RVI%27%2C%271520183638706%27%5D%5D; _sdsat_lt_pages_viewed=13; _sdsat_pages_viewed=13; mbox=PC#1520076526943-222769.26_28#1521393305|check#true#1520183765|session#1520183638370-369033#1520185565; prev_pn=DESKTOP%3Enull%3Esearch-intermediate-results%3Efr_FR; __utmb=25724450.9.9.1520183705252; _uetsid=_uet7638a0e0; optimizelyPendingLogEvents=%5B%5D; s_ppvl=DESKTOP%253EParis%253Erestaurant-card%253Efr_FR%2C13%2C13%2C779%2C1440%2C779%2C1440%2C900%2C2%2CP; s_ppv=DESKTOP%253Enull%253Esearch-intermediate-results%253Efr_FR%2C20%2C20%2C779%2C547%2C779%2C1440%2C900%2C2%2CL'
      }
    },function(error, resp, html) {
        var $ = cheerio.load(html);
        var promotion = '\n{ "originName" : "' + restaurant.originName + '", "name" : "' + restaurant.name + '", "place" : "' + restaurant.place + '", "link" : "' + restaurant.link + '", "promotion" : [ ' ;
        $("div[class = 'saleType saleType--specialOffer']").each(function(){
            var link = $(this);
            promotion += '{ '
            try{
                promotion += '"promotionTitle" : "' + link[0].children[0].children[0].data + '",'
            }
            catch(e)
            {
                console.log(e);
            }
            try{
              promotion += '"promotionDetail" : "' + link[0].children[1].children[0].data + '",';
            }
            catch(e)
            {
              console.log(e);
            }
            try
            {
                var promotionDescription = "";
                for(var i = 0; i < link[0].children[3].children[0].children.length; i++){
                    if(link[0].children[3].children[0].children[i].type == 'text'){
                       promotionDescription += link[0].children[3].children[0].children[i].data;
                    }
                }
                promotion += '"promotionDescription" : "' + promotionDescription + '" ';
            }
            catch(e)
            {
                console.log("}");
            }
            promotion += '}, ';
        });
        promotion += ' ], "event" : [ ';

        $("div[class = 'saleType saleType--event']").each(function(){
            var link = $(this);
            promotion += '{ "eventTitle" : "' + link[0].children[0].children[0].data + '", "eventDetail" : "' + link[0].children[1].children[0].data + '", "eventDetail2" : "' + link[0].children[2].children[0].data + '" }, ';
        });
        promotion += ' ]}, ';
        fs.appendFileSync("promolafourchette.json",promotion);
    });
}


function getAllPromo(){
    var finalJSON = JSON.parse(fs.readFileSync(restaurantLafourchette));

    var restaurant = finalJSON.restaurantFourchette;
    fs.writeFileSync("promolafourchette.json",'{"promotions": [');

    for(var i =0; i < restaurant.length; i++){
        getPromotion(restaurant[i]);
    }
}

getURL();
getAllPromo();
