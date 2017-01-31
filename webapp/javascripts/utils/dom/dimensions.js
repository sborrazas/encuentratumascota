module.exports = function (el) {
  return {
    height: el.offsetHeight,
    left: el.offsetLeft,
    top: el.offsetTop,
    width: el.offsetWidth
  };
};
