const init = () => {
  initPlayer();
  dragProgress();
  document.querySelector(".player").addEventListener("timeupdate", initProgressBar);
};


const initPlayer = () => {
  const playBtn = document.querySelector(".play-btn");
  const player = document.querySelector(".player");
  let isPlaying = false;

  const handleToggleBtn = () => {
    if (isPlaying) {
      player.pause();
      isPlaying = !isPlaying;
      playBtn.innerText = "PLAY";
    } else {
      player.play();
      isPlaying = !isPlaying;
      playBtn.innerText = "PAUSE";
    }
  };

  playBtn.addEventListener("click", () => {
    handleToggleBtn();
  });
};

const initProgressBar = () => {
  const player = document.querySelector(".player");
  let length = player.duration;
  let currentTime = player.currentTime;
  let totalTime = showTime(length);
  let playingTime = showTime(currentTime);
  document.querySelector(".progress-bar").value = (player.currentTime / player.duration) * 100;
  document.querySelector(".playing-time").innerText = playingTime;
};

const showTime = (length) => {
  let min = Math.floor(length / 60);
  let sec = Math.floor(length - min * 60);
  const times = (time) => {
    const s = "00" + time;
    return s.substr(s.length - 2, 2);
  };
  return `${times(min)}:${times(sec)}`;
};

const dragProgress = () => {
  let progress = document.querySelector(".progress-bar");
  let isDragging = false;

  progress.addEventListener("mousedown", (e) => {
    isDragging = !isDragging;
    updateBar(e.pageX);
  });

  progress.addEventListener("mouseleave", (e) => {
    isDragging = false;
  });

  progress.addEventListener("mouseup", (e) => {
    isDragging = !isDragging;
    updateBar(e.pageX);
  });

  progress.addEventListener("mousemove", (e) => {
    isDragging && updateBar(e.pageX);
  });
};

const updateBar = (pos) => {
  const player = document.querySelector(".player");
  let progress = document.querySelector(".progress-bar");
  let position = pos - progress.offsetLeft;
  let percent = (position / progress.clientWidth) * 100;
  progress.value = percent.toFixed(1);
  player.currentTime = percent * 0.01 * player.duration;
};

window.addEventListener("load", () => {
  init();
});







// ================================================================================


(function () {
  const ryan = document.querySelector('#ryan');
  const face = document.querySelectorAll('.ears, .eyes, .muzzle');
  const player = document.querySelector(".player")
  const progress = document.querySelector('.progress-bar')
  const fauxInput = document.createElement('div');
  const span = document.createElement('span');
  let timer = null;

  function rotate3d(x, y, z, rad) {
    const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`;
    for (let i = 0; i < face.length; i++) {
      face[i].style.transform = value;
    }
  }

  function focus(event) {
    event.classList.add('focused');
    copyStyles(event);

    event.value !== 0 ? look(event) : lookAway(event)
  }

  function reset(event) {
    event.target.classList.remove('focused');
    ryan.classList.remove('playing');

    clearTimeout(timer);
    timer = setTimeout(() => {
      ryan.classList.remove('look-away', 'down', 'up');
      rotate3d(0, 0, 0, 0);
    }, 1);
  }

  function copyStyles(el) {
    const props = window.getComputedStyle(el, null);

    if (fauxInput.parentNode === document.body) {
      document.body.removeChild(fauxInput);
    }

    fauxInput.style.visibility = 'hidden';
    fauxInput.style.position = 'absolute';
    fauxInput.style.top = Math.min(el.offsetHeight * -2, -999) + 'px';

    for (let i = 0; i < props.length; i++) {
      if (['visibility', 'display', 'opacity', 'position', 'top', 'left', 'right', 'bottom'].indexOf(props[i]) !== -1) {
        continue;
      }
      fauxInput.style[props[i]] = props.getPropertyValue(props[i]);
    }

    document.body.appendChild(fauxInput);
  }

  function look(event) {
    const el = event;
    const length = el.value
    
    const player = document.querySelector(".player");
    let progress = document.querySelector(".progress-bar");
    // let position = progress.pageX - progress.offsetLeft;
    let position = progress.value
    let percent = (position / progress.clientWidth) * 100;
    player.currentTimes = position / progress.clientWidth * player.duration * 3;
    span.innerText = length || '.';

    const ryanRect = ryan.getBoundingClientRect();
    const inputRect = el.getBoundingClientRect();
    const caretRect = span.getBoundingClientRect()
    const caretPos = caretRect.left + player.currentTimes;
    const distCaret = ryanRect.left + ryanRect.width / 1.5 - inputRect.left - caretPos;
    const distInput = ryanRect.top + ryanRect.height / 1.5 - inputRect.top;
    const y = Math.atan2(-distCaret, Math.abs(distInput) * 2);
    const x = Math.atan2(distInput, Math.abs(distInput) * 2 / Math.cos(y));
    const angle = Math.max(Math.abs(x), Math.abs(y));
    // console.log(caretPos)

    rotate3d(x / angle, y / angle, y / angle / 2, angle);
  }

  function lookAway(event) {
    const el = event.target;
    const ryanRect = ryan.getBoundingClientRect();
    const inputRect = el.getBoundingClientRect();
    const distInput = ryanRect.top + ryanRect.height / 2 - inputRect.top;

    ryan.classList.add('look-away', distInput < 0 ? 'up' : 'down');

    clearTimeout(timer);
    timer = setTimeout(() => {
      ryan.classList.add('playing');
    }, 300);
  }

  fauxInput.appendChild(span);

  player.addEventListener("timeupdate", () => {
    dragProgress();
    focus(progress)
  });
  player.addEventListener("timeupdate", ()=>{
    dragProgress()
    look(progress)
  });


})();