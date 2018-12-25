import utils from "../utils";
import audio from "./audio";

const progress = {
  progressBarEl: undefined,
  isDragging: false,
};

progress.init = (...args) => {
  const params = Array.from(args);

  params.forEach((param) => {
    const el = utils.getElement(param);

    if (!el) {
      return;
    }

    const nodeName = el.nodeName.toLowerCase();

    if (nodeName === "progress") {
      progress.progressBarEl = el;
    }
  });

  const { progressBarEl } = progress;

  if (!progressBarEl) {
    console.error("progressBarEl을 찾을 수 없습니다.");
    return;
  }

  progressBarEl.addEventListener("mouseup", handleMouseClick);
  progressBarEl.addEventListener("mousedown", handleMouseClick);
  progressBarEl.addEventListener("mouseleave", handleMouseLeave);
  progressBarEl.addEventListener("mousemove", handleMouseMove);
};

progress.updateProgressBar = (pageX = 0) => {
  const { audioEl } = audio;
  const { progressBarEl } = progress;
  const { offsetLeft, clientWidth } = progressBarEl;
  const progressPos = pageX - offsetLeft;
  const percentToPos = (progressPos / clientWidth) * 100;

  progressBarEl.value = percentToPos.toFixed(1);
  audioEl.currentTime = percentToPos * 0.01 * audioEl.duration;
};

const handleMouseClick = ({ pageX }) => {
  progress.isDragging = !progress.isDragging;
  progress.updateProgressBar(pageX);
};
const handleMouseLeave = () => {
  progress.isDragging = false;
};
const handleMouseMove = ({ pageX }) => {
  const { isDragging, updateProgressBar } = progress;

  if (isDragging) {
    updateProgressBar(pageX);
  }
};

export default progress;
