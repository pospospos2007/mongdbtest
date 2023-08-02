exports = async function (uuid) {
    
  // await context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
  //     console.log("data:", response.body.text())
  //   })
    // console.log("uuid:",uuid);
  // dddadsasd.com


  const collection = context.services.get("mongodb-atlas").db("test").collection("update-data-status");
  const item = await collection.findOne({ document_id:'62848b5a24d99ab49659ffad',is_send:false});

console.log("data: ", item);

   //TODO before calling , you have to check if update-data-status has the the same task for same document KEY, if so, add it into queue , if no, send the notification.
    //   context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
         
    //     if(response){
    //         const bulkOperations = context.services.get("mongodb-atlas").db("test").collection("update-data-status").initializeOrderedBulkOp();
    //         bulkOperations.find({ _id:uuid}).upsert().updateOne({$set:{is_send : true}})
    //         bulkOperations.execute().then(() => {
            
           
    //         })

    //     }
         
    // })

};
