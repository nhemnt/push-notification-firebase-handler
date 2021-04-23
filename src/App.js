import React, { useState, useEffect } from 'react';
import TokenDataService from './services/token.service';
import NotificationService from './services/notification.service';
function App() {
  const [tokens, setTokens] = useState([]);
  const [body, setBody] = useState({
    notificationBody: '',
    notificationTitle: '',
    dataBody: '',
    dataTitle: '',
    dataKey1: '',
    dataKey2: ''

  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setBody(current => {
      return {
        ...current,
        [name]: value
      }
    })
  }
  useEffect(() => {
    TokenDataService.getAll().on("value", function (data) {
      setTokens(data.val())
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }, [])

  if (!Object.keys(tokens).length) return 'Loading or no token available ....';

  const getTokenDetailsArr = () => Object.values(tokens);
  
  const getTokenArr = (tokenDetail) => Object.entries(tokenDetail)
  
  const getNotificationPayload = (token) => {
    return  {
      "to" : token,
      "notification" : {
          "body" : body.notificationBody,
          "title":  body.notificationTitle,
      },
      "data" : {
          "body" :  body.dataBody,
          "title":  body.dataTitle,
          "key_1" :  body.dataKey1,
          "key_2" :  body.dataKey2,
      }
     }
  }


  const sendNotification = (token) => {
    const payload = getNotificationPayload(token)
    NotificationService.sendNotification(payload);
  }

  const sendNotificationToAll = () => {
    getTokenDetailsArr().forEach((tokenDetail) => {
      getTokenArr(tokenDetail).forEach(([, token]) => {
        sendNotification(token);
      })
    })
  }

  return (
    <div className="container">
      {getTokenDetailsArr().map(tokenDetail => (
        <>
          {getTokenArr(tokenDetail).map(([userName, token]) => (
            <pre>
              {userName} - <button className="btn-secondary" onClick={() => sendNotification(token)}> send notification</button>
            </pre >
          ))}
        </>
      ))}
      

      <div className="container">
      <form>
          <div class="form-group">
            <label >Notification Body</label>
            <input className="form-control" name="notificationBody" value={body.notificationBody} onChange={onChange} />
          </div>
          <div class="form-group">
            <label >Notification Title</label>
            
        <input className="form-control" name="notificationTitle" value={body.notificationTitle} onChange={onChange} />
        </div>
        <div class="form-group">
            <label >Data Body</label>
            <input  className="form-control" name="dataBody" value={body.dataBody} onChange={onChange}/>
        </div>
        <div class="form-group">
            <label >Data Title</label>
            
        <input className="form-control" name="dataTitle" value={body.dataTitle} onChange={onChange}/>
       
        </div>
        <div class="form-group">
            <label >Data Key 1</label>
            <input className="form-control" name="dataKey1" value={body.dataKey1} onChange={onChange}/>
          </div>
          <div class="form-group">
            <label >Data Key 2</label>
            <input className="form-control"name="dataKey2" value={body.dataKey2} onChange={onChange}/>
        </div>
      </form>
      </div>
      <button className="btn-primary text-center mt-2" onClick={sendNotificationToAll}>
        send notification to all
      </button>
    </div>
  );
}

export default App;
