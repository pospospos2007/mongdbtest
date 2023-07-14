// This function is the endpoint's request handler.
exports = function(payload, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    // const {arg1, arg2} = query;

    // Headers, e.g. {"Content-Type": ["application/json"]}
    // const contentTypes = headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    // const reqBody = body;

    // console.log("arg1, arg2: ", arg1, arg2);
    // console.log("Content-Type:", JSON.stringify(contentTypes));
    // console.log("Request body:", reqBody);

    // You can use 'context' to interact with other application features.
    // Accessing a value:
    // var x = context.values.get("value_name");

    // Querying a mongodb service:
    // const doc = context.services.get("mongodb-atlas").db("test").collection("test").findOne();

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    
    
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
    
    
    // Payload body is a JSON string, convert into a JavaScript Object
        // let data = JSON.parse(decodeBase64(payload.body.text()))
        // const data ={"timestamp" : 1689246131199, "_id":"64afcac2582316ae84184033"}

        // // Each record is a Base64 encoded JSON string
        // const documents = data.records.map((record) => {
        //     const document = JSON.parse(decodeBase64(record.data))
        //     return {
        //         ...document,
        //         _id: new BSON.ObjectId(document._id)
        //     }
        // })
        
        // let document = data;
        // document._id = new BSON.ObjectId(document.event.documentKey._id)

        // // Perform operations as a bulk
        // const bulkOp = context.services.get("mongodb-atlas").db("test").collection("test").initializeOrderedBulkOp()
        // documents.forEach((document) => {
        //     bulkOp.find({ _id:document._id }).upsert().updateOne(document)
        // })

        // bulkOp.find({ _id:data.event.documentKey._id }).upsert().updateOne(data.event._id._data)
          // bulkOp.find({ _id:data._id }).upsert().updateOne(data)
        //   bulkOp.find({ _id:document.event.documentKey._id }).upsert().updateOne({$set:document})
        //   // bulkOp.find({ _id:document._id }).upsert().updateOne(document)

        // response.addHeader(
        //     "Content-Type",
        //     "application/json"
        // )

        // bulkOp.execute().then(() => {
        //     // All operations completed successfully
        //     response.setStatusCode(200)
        //     response.setBody(JSON.stringify({
        //         requestId:  Math.floor(Math.random() * 1000),
        //         timestamp: (new Date()).getTime()
        //     }))
        //     return 
        // })
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
            
    
    return payload.body.text();
    // return data;
};
