var https = require('https');
var url = require('url');

const testAuth = (z , bundle) => {

  var string = bundle.authData.password;
  var buffer = new Buffer(string);
  var toBase64 = buffer.toString('base64');//converting password into base64

  return z.request({
      url: 'https://{{bundle.authData.subdomain}}/api/login.json',
      method:'POST',
      body:JSON.stringify({
        "ms_request":{
          "user":
          {
            "api_key":"Your API KEY",//hardcoded API key
            "username":bundle.authData.username,//authData is provided by bundle object
            "password":toBase64,//accepting base64 password.
          }
        }
      }),
    }).then((response) => {

      if (response.status === 401) {
        throw new Error('The API Key you supplied is invalid');
      }
      if (response["json"]["ms_errors"]) {

        z.console.log(bundle.inputData.password.toString('base64'));
        throw new Error('Authentication Error!');
      } else {
        return response["json"]["ms_response"]
      }
    });
};

module.exports = {
  type: 'custom',//authentication type
  fields: [
    //UI feilds for connect account
    {key: 'subdomain', label: 'Domain', required: true, type: 'string'},
    {key: 'username', label: 'Username', required: true, type: 'string'},
    {key: 'password', label: 'Password', required: true, type: 'password'}
  ],
  test: testAuth,
  connectionLabel: '{{bundle.authData.username}}'
};
