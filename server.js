
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var arrayWells = [];
for (var i = 1; i < 3; i++) {
  url = 'http://localhost:8080/well' + i + '.html';

    request(url, function(error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        //  console.log($)
        var json = {};
        // var arrayWells = [];
        //console.log(arrayWells)
        json.serialNum = $('table td').eq(2).text();
        // console.log($('table td').eq(2).text())
        json.wellNum = $('table td').eq(0).text();

        json.wellName = $('table td').eq(1).text();
        json.orgId = $('table td').eq(3).text();

        json.field = $('table td').eq(4).text();

        console.log(json.field)

        var sec = $('table td').eq(7).text();
        var twn = $('table td').eq(8).text();
        var rge = $('table td').eq(9).text();
        json.secTwnRge = sec + '-' + twn + '-' + rge
        $('table').eq(0).remove()
        json.permitDate = $('table td').eq(0).text();
        //console.log(json.permitDate)


        arrayWells.push(json)

        // $('table').eq(0).remove()
        // $('table').eq(0).remove()
        // $('table').eq(0).remove()
        // $('table').eq(0).remove()
        // console.log($('table td').eq(2).text());
        //console.log($('table td').eq(2).text())        arrayWells.push(json)
        console.log(arrayWells)
        if(i > 2) {
          fs.writeFile('output.json', JSON.stringify(arrayWells, null, 4), function(err){

          })

         }
  }})};
  // fs.writeFile('output.json', JSON.stringify(arrayWells, null, 4), function(err){
  //
  // })

app.listen('9002');
console.log("the magic happens on port 9001")
