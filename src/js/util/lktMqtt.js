const lktMqtt = {
  // MQTT client
  mqttClient: null,

  //MQTT info
  // 각자 상황에 맞는 host, port, topic 을 사용합니다.
  mqtt_host: "127.0.0.1",
  mqtt_port: "1883",
  mqtt_clientId: "clientID-" + parseInt(Math.random() * 100), // 랜덤 클라이언트 ID
  mqtt_topic: "testTopic",

  // MQTT 클라이언트 연결
  fncStartMqtt() {
    this.mqttClient = new Paho.MQTT.Client(
      this.mqtt_host,
      Number(this.mqtt_port),
      this.mqtt_clientId
    );

    this.mqttClient.onConnectionLost = this.onConnectionLost;
    this.mqttClient.onMessageArrived = this.onMessageArrived;

    this.mqttClient.connect({
      onSuccess: this.onConnect,
      onFailure: this.onFailure
    });
  },

  // 연결 성공 시 실행되는 function
  onConnect() {
    console.log("connet : onConnect..");

    this.mqttClient.subscribe(mqtt_topic);
  },

  // 연결 실패 시 실행되는 function
  onFailure() {
    console.log("connet : onFailure..");
  },

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost : " + responseObject.errorMessage);

      // 연결 재시도
      fncConnMqtt();
    }
  },

  // 메시지 받는 부분
  onMessageArrived(message) {
    console.log("onMessageArrived : " + message.payloadString);

    // mqtt 받은 메시지
    // 받은 메시지를 각 화면에서 사용하려면 각 화면에서 아래 function 선언하여 사용
    fncMqttAction(message.payloadString);
  },

  // 메시지 보내기
  // 각 화면에서 메시지를 보내려면 각 화면에서 아래 function 선언하여 사용
  fncMqttDoSend(sendMsg) {
    console.log("mqtt send:" + sendMsg);
    this.mqttClient.send(this.mqtt_topic, sendMsg);
  }
};

export default lktMqtt;
