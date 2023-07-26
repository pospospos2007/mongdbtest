exports =  function (a, b) {
  
   context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      console.log("data:", response.data)
      // const ejson_body = EJSON.parse(response.body.text());
      // return ejson_body;
    })
    
  console.log("a:",a);
  console.log("b:",b);
  // return a + b;
};