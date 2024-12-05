const lktMqtt = {
  // MQTT client
  mqttClient: null,

  //MQTT info
  // 각자 상황에 맞는 host, port, topic 을 사용합니다.

  //   mqtt_host: "localhost",
  mqtt_host: "192.168.26.24",
  mqtt_port: "1981",
  mqtt_clientId: "clientID-" + parseInt(Math.random() * 100), // 랜덤 클라이언트 ID
  mqtt_topic_sub: "lktomni/DAS-01", // 구독
  mqtt_topic_pub: "lktomni", // 발행
  username: "maersk", // 사용자 이름
  password: "maersk123#@!", // 비밀번호

  //'maersk', 'maersk123#@!'

  onrecvfunc: null,

  // MQTT 클라이언트 연결
  fncStartMqtt(paramOnMessageArrived) {
    if (this.mqttClient != null && this.mqttClient.isConnected()) {
      return;
      //this.mqttClient = null;
    }

    this.mqttClient = new Paho.MQTT.Client(
      this.mqtt_host,
      Number(this.mqtt_port),
      this.mqtt_clientId
    );

    // this.mqttClient.onConnectionLost = this.onConnectionLost;
    //    this.mqttClient.onMessageArrived = this.onMessageArrived;
    this.mqttClient.onMessageArrived = paramOnMessageArrived;

    lktMqtt.onrecvfunc = paramOnMessageArrived;

    this.mqttClient.connect({
      onSuccess: this.onConnect.bind(this),
      onFailure: this.onFailure.bind(this),
      username: this.username, // 사용자 이름 추가
      password: this.password // 비밀번호 추가
    });
  },

  // 연결 성공 시 실행되는 function
  onConnect: () => {
    console.log("Connected to MQTT broker." + lktMqtt.mqtt_topic_sub);
    lktMqtt.mqttClient.subscribe(lktMqtt.mqtt_topic_sub); // this를 lktMqtt로 참조
  },

  // 연결 실패 시 실행되는 function
  onFailure() {
    console.log("connet : onFailure..");
  },

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost : " + responseObject.errorMessage);

      // 연결 재시도
      // if (lktMqtt.mqttClient != null) lktMqtt.fncStartMqtt(lktMqtt.onrecvfunc);

      //fncConnMqtt();
    }
  },

  // 메시지 받는 부분
  onMessageArrived(message) {
    console.log("onMessageArrived : " + message.payloadString);

    // mqtt 받은 메시지
    // 받은 메시지를 각 화면에서 사용하려면 각 화면에서 아래 function 선언하여 사용
  },

  // 메시지 보내기
  // 각 화면에서 메시지를 보내려면 각 화면에서 아래 function 선언하여 사용
  fncMqttDoSend(sendMsg) {
    console.log("mqtt send:" + sendMsg);
    lktMqtt.mqttClient.send(lktMqtt.mqtt_topic_pub, sendMsg);
  }
};

export default lktMqtt;
