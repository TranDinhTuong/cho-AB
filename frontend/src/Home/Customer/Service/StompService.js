import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class StompService {
  constructor() {
    this.socket = new SockJS('http://localhost:9193/stomp-endpoint');
    this.stompClient = new Client({
      webSocketFactory: () => this.socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.connected = false;

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');
      this.connected = true;
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  subscribe(topic, callback) {
    return this.stompClient.subscribe('/topic/' + topic, (message) => {
      callback(JSON.parse(message.body));
    });
  }

  send(app, data) {
    this.stompClient.publish({
      destination: '/app/' + app,
      body: JSON.stringify(data),
    });
  }

  unsubscribeAll() {
    this.stompClient.deactivate();
  }
}

export default StompService;