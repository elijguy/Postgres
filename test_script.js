const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv[2];
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
/*
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT id,first_name,last_name,birthdate from famous_people where first_name = $1 or last_name = $1;",[name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    var counter = 0;
    for(k in result.rows){
    k++
    counter = k;
    }
    console.log(`Found ${counter} person(s) by the name ${name}`);
    for(i in result.rows){
    console.log("-",result.rows[i].id+":",result.rows[i].first_name,result.rows[i].last_name,"born:",result.rows[i].birthdate); //output: 1
    }
    client.end();
  });
});*/

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT id,first_name,last_name,birthdate from famous_people where first_name = $1 or last_name = $1;",[name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    output(result.rows);
    client.end();
  });
});


var output = ((results) =>{
  console.log("Searching ...");
  var counter = 0;
  for(k in results){
    k++
    counter = k;
  }
  console.log(`Found ${counter} person(s) by the name ${name}`);
  for(i in results){
    console.log("-",results[i].id+":",results[i].first_name,results[i].last_name,"born:",results[i].birthdate); //output: 1
  }
});