export default {
  getElement: (el) => {
    // Element or String
    let _el;

    if (el.nodeType) {
      _el = el;
    } else if (typeof el === "string") {
      _el = document.querySelector(el);

      if (!_el) {
        console.log(`${el}을 찾을 수 없습니다.`);
        return false;
      }
    } else {
      console.log(`${el}은 허용하지 않는 type입니다.`);
      return false;
    }

    return _el;
  },
  getFormattedTime: (time) => {
    const s = "00" + time;
    return s.substr(s.length - 2, 2);
  },
};
