// "z" is a object provided by Zapier. 
**converting response string to array** 
var ob =  JSON.parse(response.content); //accepting response as string and converting to object
           z.console.log("is ob array",Array.isArray(ob)); // to check whether it is array
           const bb = Array.prototype.slice.call(ob); // converting object  "ob" in array
           z.console.log("is bb array",Array.isArray(bb)); 
           z.console.log ("p1",response);
           return bb; // returning array present in "bb" 
           
//normal returning using json parse.
return promise.then((response) => JSON.parse(response.content));

//returning response in array.
return response["json"]["ms_response"]["xyz"];
           
