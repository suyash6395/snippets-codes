var url = require('url');
require('dotenv').config();//dotenv module used for .env file sotres secret info(api key)...[dotenv module used locally]

const Auth = (z , bundle) => {

  var string = bundle.authData.password;//accepting password as string which is encrypted by authData.
  var buffer = new Buffer(string);
  var toBase64 = buffer.toString('base64');//converting password into base64
   const promise = z.request({
      url: 'https://{{bundle.authData.subdomain}}/api/login.json',//subdomain is a module checks for correct domain(nodejs)
      method:'POST',
      body:JSON.stringify({
        "ms_request":{
          "user":
          {
            "api_key":'{{process.env.API_KEY}}',// API key storing on zapier 
            "username":bundle.authData.username,
            "password":toBase64,//accepting base64 password.
          }
        }
      }),
    });

    return promise.then((response) => {



      return response

    });
};

const getSessionKey = (z , bundle) => { //

  var string = bundle.authData.password;
  var buffer = new Buffer(string);
  var toBase64 = buffer.toString('base64');//converting password into base64

    const promise = z.request({
      url: 'https://{{bundle.authData.subdomain}}/api/login.json',
      method:'POST',
      body:JSON.stringify({
        "ms_request":{
          "user":
          {
            "api_key":'{{process.env.API_KEY}}',// API key
            "username":bundle.authData.username,
            "password":toBase64,//accepting base64 password.
          }
        }
      }),
    });

    return promise.then((response) => {

      //if (response.status === 401) {
        //throw new Error('Invalid username or passowrd');
     if(response["json"]["ms_errors"])

      {
        throw new Error("Invalid username or Password");
      }else
      {
      return response["json"]["ms_response"]["user"];//returning response(session_id,session_hash,user_) to getSessionKey
      }


    });
};
   module.exports = {
   type: 'session',//authentication type used in zapier
  fields: [
    //UI feilds for connect account
    {key: 'subdomain', label: 'Domain', required: true, type: 'string'},
    {key: 'username', label: 'Username', required: true, type: 'string'},
    {key: 'password', label: 'Password', required: true, type: 'password'}
  ],
  test: Auth,
  sessionConfig: {//sessionConfig accepting params which is returned from login request.
   perform: getSessionKey
 },
  connectionLabel: '{{bundle.authData.username}}'
};
