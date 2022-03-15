const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "8bffefcd51b87dd95cd28e8a912a5734";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;


  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData= JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.render("result", {cName: query, temp: temp, weatherDescription: weatherDescription, imageURL: imageURL});
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running at port 3000!");
});
             