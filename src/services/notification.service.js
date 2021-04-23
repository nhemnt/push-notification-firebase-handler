import axios from 'axios';

class NotificationService {
  constructor(){
    this.baseUrl = 'https://fcm.googleapis.com';
    this.serverKey = process.env.REACT_APP_serverKey
  }
  
  sendNotification(payload) {
    debugger
    return axios.post(`${this.baseUrl}/fcm/send`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${this.serverKey}`
      }
  })
  }
}

export default new NotificationService();