exports =  function (uuid) {
    
  // await context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
  //     console.log("data:", response.body.text())
  //   })
    // console.log("uuid:",uuid);
  // dddadsasd.com
  
   //TODO before calling , you have to check if update-data-status has the the same task for same document KEY, if so, add it into queue , if no, send the notification.
       context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
         
         if(response){
             const bulkOperations = context.services.get("mongodb-atlas").db("test").collection("update-data-status").initializeOrderedBulkOp();
             bulkOperations.find({ _id:uuid}).upsert().updateOne({$set:{is_send : true}})
             bulkOperations.execute().then(() => {
            
           
             })

         }
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      // console.log("data:", response.body.text())
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