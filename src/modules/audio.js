import utils from "../utils";
import progress from "./progress";

const playTimeEl = document.querySelector(".playing-time");
const audio = {
  isPlaying: false,
  playBtnEl: undefined,
  audioEl: undefined,
};

audio.init = (...args) => {
  const params = Array.from(args);

  params.forEach((param, index) => {
    const el = utils.getElement(param);

    if (!el) {
      return;
    }

    const nodeName = el.nodeName.toLowerCase();

    if (nodeName === "button") {
      audio.playBtnEl = el;
    } else if (nodeName === "audio") {
      audio.audioEl = el;
    }
  });

  const { audioEl, playBtnEl } = audio;

  if (!(audioEl && playBtnEl)) {
    console.error("audioEl과 playBtnEl을 찾을 수 없습니다.");
    return;
  }

  playBtnEl.addEventListener("click", togglePlayBtn);
  audioEl.addEventListener("timeupdate", timeUpdate);
};

audio.getTime = (type = "current") => {
  let totalTime;
  const { audioEl } = audio;

  switch (type) {
    case "current":
      totalTime = audioEl.currentTime;
      break;
    case "total":
      totalTime = audioEl.duration;
      break;
    default:
      console.error(`${type}은 허용하지 않는 type입니다.`);
      return false;
  }

  const min = utils.getFormattedTime(Math.floor(totalTime / 60));
  const sec = utils.getFormattedTime(Math.floor(totalTime - min * 60));

  return getTimeTemplate(min, sec);
};

const getTimeTemplate = (min = 0, sec = 0) => {
  return `${min}:${sec}`;
};

const togglePlayBtn = () => {
  const isPlaying = !audio.isPlaying;
  const audioEl = audio.audioEl;
  const playBtnEl = audio.playBtnEl;

  if (isPlaying) {
    playBtnEl.innerText = "PAUSE";
    audioEl.play();
  } else {
    playBtnEl.innerText = "PLAY";
    audioEl.pause();
  }

  audio.isPlaying = isPlaying;
};
const timeUpdate = () => {
  const { audioEl, getTime } = audio;
  const { currentTime, duration } = audioEl;

  progress.progressBarEl.value = (currentTime / duration) * 100;
  playTimeEl.innerText = getTime();
};

export default audio;
