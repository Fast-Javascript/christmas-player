const init = () => {
  initPlayer()
  dragProgress()
}






const initPlayer = () => {
  const playBtn = document.querySelector('.play-btn')
  const player = document.querySelector('.player')
  let isPlaying = false
  const handleToggleBtn = () => {
    if (isPlaying) {
      player.pause()
      isPlaying = !isPlaying
      playBtn.innerText = 'PLAY'
    } else {
      player.play()
      isPlaying = !isPlaying
      playBtn.innerText = 'PAUSE'
    }
  }
  playBtn.addEventListener('click', () => handleToggleBtn())
}






const initProgressBar = () => {
  const player = document.querySelector('.player')
  let length = player.duration
  let currentTime = player.currentTime
  let totalTime = showTime(length)
  let playingTime = showTime(currentTime)
  document.querySelector('.progress-bar').value = player.currentTime / player.duration * 100
  document.querySelector('.playing-time').innerText = playingTime
}








const showTime = (length) => {
  let min = Math.floor(length / 60)
  let sec = Math.floor(length - min * 60)
  const times = (time) => {
    const s = '00' + time
    return s.substr(s.length - 2, 2)
  }
  return `${times(min)}:${times(sec)}`
}






const dragProgress = () => {
  let progress = document.querySelector('.progress-bar')
  let isDragging = false

  progress.addEventListener('mousedown', (e) => {
    isDragging = !isDragging
    updateBar(e.pageX)
  })

  progress.addEventListener('mouseleave', (e)=> {
    isDragging = false
  })

  progress.addEventListener('mouseup', (e) => {
    isDragging = !isDragging
    updateBar(e.pageX)
  })

  progress.addEventListener('mousemove', e => {
    isDragging && updateBar(e.pageX)
  })
}






const updateBar = (pos) => {
  const player = document.querySelector('.player')
  let progress = document.querySelector('.progress-bar')
  let position = pos - progress.offsetLeft
  let percent = position / progress.clientWidth * 100
  progress.value = percent.toFixed(1)
  player.currentTime = percent * 0.01 * player.duration
}






window.addEventListener('load', () => init())