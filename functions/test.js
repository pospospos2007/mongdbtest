// This function is the endpoint's request handler.
  const { v4: uuidv4 } = require('uuid');
exports = function(payload, response) {
    
     /* Using Buffer in Realm causes a severe performance hit
    this function is ~6 times faster
    */
    const decodeBase64 = (s) => {
        var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length
        var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        for(i=0;i<64;i++){e[A.charAt(i)]=i}
        for(x=0;x<L;x++){
            c=e[s.charAt(x)];b=(b<<6)+c;l+=6
            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a))}
        }
        return r
    }
    
     response.addHeader(
            "Content-Type",
            "application/json"
        )
        
        console.log("payload:",payload.body.text() );
    // Payload body is a JSON string, convert into a JavaScript Object
        let data = JSON.parse(payload.body.text())
    
    // Get AccessKey from Request Headers
    const firehoseAccessKey = payload.headers["X-Amz-Firehose-Access-Key"]

    // Check shared secret is the same to validate Request source
    if(firehoseAccessKey == context.values.get("FIREHOSE_ACCESS_KEY")[0]) {
    
    
        // const data ={"timestamp" : 1689246131199, "_id":"64afcac2582316ae84184033"}

        // Each record is a Base64 encoded JSON string
        const documents = data.records.map((record) => {
            const document = JSON.parse(decodeBase64(record.data))
            return {
                ...document,
                _id: new BSON.ObjectId(document.event.documentKey._id )
            }
        })
     
        // // Perform operations as a bulk
        const bulkOp = context.services.get("mongodb-atlas").db("test").collection("dpt-products-details-qa").initializeOrderedBulkOp()
        const bulkOp2 = context.services.get("mongodb-atlas").db("test").collection("update-data-status").initializeOrderedBulkOp()
        documents.forEach((document) => {
          
            if(document.event.operationType=='update' || document.event.operationType=='insert'){
              let obj = document;
              delete obj.event.fullDocument._id;
              bulkOp.find({ _id:document._id }).upsert().updateOne({$set:obj.event.fullDocument})
              // bulkOp2.find({ _id:Math.random() * 1000 }).upsert().updateOne({$set:payload.headers})
              
              let obj2 = document;
              let uuid = uuidv4();
              obj2.event.fullDocument["document_id"] = new BSON.ObjectId(document.event.documentKey._id )
              delete obj2.event.fullDocument._id;
              obj2.event.fullDocument["is_send"]= false;
              obj2.event.fullDocument["created_time"] =  (new Date()).getTime();
              obj2.event.fullDocument["operation_type"] =  document.event.operationType;
              obj2.event.fullDocument["_id"] = uuid;
              bulkOp2.insert(obj2.event.fullDocument)
              
              const functionName = "test2";
              const args = [uuid];
              context.functions.execute(functionName, ...args)
              
            }else if (document.event.operationType=='delete'){
              bulkOp.find({ _id:document._id }).delete();
              
              let obj2 = document;
              let uuid = uuidv4();
              obj2.event.fullDocument["document_id"] = new BSON.ObjectId(document.event.documentKey._id )
              delete obj2.event.fullDocument._id;
              obj2.event.fullDocument["is_send"]= false;
              obj2.event.fullDocument["created_time"] =  (new Date()).getTime();
              obj2.event.fullDocument["operation_type"] =  document.event.operationType;
              obj2.event.fullDocument["_id"] = uuid;
              bulkOp2.insert(obj2.event.fullDocument)
              
              const functionName = "test2";
              const args = [uuid];
              context.functions.execute(functionName, ...args)
              
              // bulkOp2.find({ _id:Math.random() * 1000 }).upsert().updateOne({$set:payload.headers})
              
            }
            
        })

     console.log("444:",'444');

       
      // bulkOp2.execute(function(err, result) {
      //       // insertedIds = insertedIds.concat(getInsertedIds(result));
      //       // console.log(insertedIds);
      //       const functionName = "test2";
      //       // result.getInsertedIds[0]
      //       const args = [2, 3];
      //       context.functions.execute(functionName, ...args)
      //   });
        
     
        bulkOp2.execute().then(() => {
            
           
        })
        
        
        
          

        bulkOp.execute().then(() => {
            // All operations completed successfully
            response.setStatusCode(200)
            response.setBody(JSON.stringify({
                requestId: data.requestId,
                timestamp: (new Date()).getTime()
            }))
            return 
        })
        // .catch((error) => {
        //     // Catch any error with execution and return a 500 
        //     response.setStatusCode(500)
        //     response.setBody(JSON.stringify({
        //         requestId:  Math.floor(Math.random() * 1000),
        //         timestamp: (new Date()).getTime(),
        //         errorMessage: error
        //     }))
        //     return 
        // })
            
    
    // return payload.body.text();
    // return data;
    
    } else {
      

        
        
        // context.http.get({ url: "https://api.github.com/users/mapbox" }).then(response => {
      // The response body is encoded as raw BSON.Binary. Parse it to JSON.
      // console.log(response.data)
      // const ejson_body = EJSON.parse(response.body.text());
      // return ejson_body;
    // })
        
 
    
        
        // Validation error with Access Key
        response.setStatusCode(401)
        response.setBody(JSON.stringify({
            requestId: data.requestId,
            timestamp: (new Date()).getTime(),
            errorMessage: "Invalid X-Amz-Firehose-Access-Key"
        }))
        return
    }
};
