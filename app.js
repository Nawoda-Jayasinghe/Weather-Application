const express = require('express');
const bodyParser = require("body-parser");
const https = require('https'); // native node https module to perfome a get request

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// app.get("/", function(req,res){
//     res.send("Server is up and running"); // here we have to send curren weather data
//     //make a get request to server and fetch data as jason and pass it to get weather data
// })
/*
app.get("/", function(req,res){

    //const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=00100a0365a1b67e7a59536dd6290f77";
    const query = "London"; //by updating this query, we can change the city name
    const appID = "00100a0365a1b67e7a59536dd6290f77";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appID+"&units="+unit;

    https.get(url, function(response){
        console.log(response);
        //response.statusCode
        //401 unothorized http request - wrong appid
        
        response.on("data", function(data){ //data gets here
            // console.log(data); //this is bytes. have to onvert to js

            const weatherData = JSON.parse(data); //now we converted it to javascript
            console.log(weatherData);


            //taking data and make a string(opposite of hat happened above)
            // const object = {
            //     name: "Nawoda",
            //     favouriteFood : "Noodles"
            // }
            // console.log(JSON.stringify(object));

            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon= weatherData.weather[0].icon;
            //now have to create the image url
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

            //send the data we got to the browser
            res.write("<h1>The temperature in London is "+temp+ " Celcius.</h1>");
            res.write("The weather is curently "+weatherDescription);
            res.write("<img src=" +imageURL + ">");
            res.send();
        })
    }); 
    //url which we checked using the postman which contains the api key with parameters.
    //include https also
    //res.send("Server is up and running"); //cannot have tow sends. only can send once
})
*/

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    // console.log("Received form data post request");
    //console.log(req.body.cityName);

    
        const query = req.body.cityName; 
        const appID = "00100a0365a1b67e7a59536dd6290f77";
        const unit = "metric"
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appID+"&units="+unit;
    
        https.get(url, function(response){
            console.log(response);
           
            
            response.on("data", function(data){ 
    
                const weatherData = JSON.parse(data); 
                console.log(weatherData);
    
    
                const temp = weatherData.main.temp;
                console.log(temp);
    
                const weatherDescription = weatherData.weather[0].description;
                console.log(weatherDescription);
    
                const icon= weatherData.weather[0].icon;
            
                const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    
                res.write("<h1>The temperature in "+query+ " is "+temp+ " Celcius.</h1>");
                res.write("The weather is curently "+weatherDescription);
                res.write("<img src=" +imageURL + ">");
                res.send();
            })
        }); 
        
    
})

app.listen(3000,function(){
    console.log("Server running on port 3000");
})