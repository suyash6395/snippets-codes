**Performing a request using various feilds
//z is object provided by zapier
const promise = z.request({ 
      url:'https://{{bundle.authData.subdomain}}/api/events.json',
      params:{
        sessionid:bundle.authData.session_id,
        sessionhash:bundle.authData.session_hash,
        user_id:bundle.authData.id,//must be int
      },
      method: 'POST',
      body: JSON.stringify({ // converting body request into string.
        "ms_request":{
          "event":{
            "title": bundle.inputData.title,
            "location": bundle.inputData.location,
            "start_datetime": bundle.inputData.start_datetime,
            "end_datetime": bundle.inputData.end_datetime,
            "privacy":  bundle.inputData.privacy,
            "events_members_ids":[""],//must be in array
            "personal_note":bundle.inputData.personal_note,
            "agenda":bundle.inputData.agenda,
            "conversation_id":bundle.inputData.conversation_id,
            }
        }
      }),
      headers: {
        'content-type': 'application/json'
      },

    });
    
