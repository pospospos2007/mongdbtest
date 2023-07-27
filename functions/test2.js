exports =  function (a, b) {
    
  // await context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
  //     console.log("data:", response.body.text())
  //   })
  
  // dddadsasd.com
       context.http.get({ url: "dddadsasd.com1" }).then(response => {
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      console.log("a:",a);
      console.log("data:", response.body.text())
      // const ejson_body = EJSON.parse(response.body.text());
      // return ejson_body;
      
      //TODO Update state of record
    })
    // .error(error => {
    //   console.log("error: ","don't do anyting");
    // })

    

  // console.log("b:",b);
  // return a + b;
};