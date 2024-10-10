import * as sounds from "@/assets/sounds";

let sound = {
  install: function ($Vue) {
    let Vue = $Vue.config.globalProperties;

    let audio = new Audio();

    let sound = {
      play(name) {
        if (!audio || !name) {
          return;
        }
        audio.src = sounds[name];
        audio.play();
      }
    };

    Vue.$sound = sound;
  }
};

export default sound;
