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
        
        // console.log("data: ",  payload.body.text())
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
        const bulkOp = context.services.get("mongodb-atlas").db("test").collection("dpt-promotion-detail-qa").initializeOrderedBulkOp()
        documents.forEach((document) => {
          
            if(document.event.operationType=='update' || document.event.operationType=='insert'){
              let obj = document;
              delete obj.event.fullDocument._id;
              bulkOp.find({ _id:document._id }).upsert().updateOne({$set:obj.event.fullDocument})
              
            
              
            }else if (document.event.operationType=='delete'){
              bulkOp.find({ _id:document._id }).delete();
              
              
            }else{
              console.log("operation type: ",  document.event.operationType)
            }
            
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

    
    } else {
    
        
 
    
        
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
