exports =  function (a, b) {
  
  // await context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
  //     console.log("data:", response.body.text())
  //   })
  
       context.http.get({ url: "dddadsasd.com" }).then(response => {
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      console.log("data:", response.body.text())
      // const ejson_body = EJSON.parse(response.body.text());
      // return ejson_body;
    }).err(error => {
      console.log("error: ","don't do anyting");
    })

    
  // console.log("a:",a);
  // console.log("b:",b);
  // return a + b;
};