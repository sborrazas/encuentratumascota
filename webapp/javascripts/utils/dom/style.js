module.exports = {
  set: function (node, name, value) {
    node.style[name] = value;
  },
  getContentBox: function (node) {
    return { width: node.offsetWidth, height: node.offsetHeight };
  }
};
