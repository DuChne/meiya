function format(shijianchuo) {
  var date = new Date(shijianchuo*1000),
  Y = date.getFullYear() + '-',
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
  D = date.getDate() + ' ',
  h = date.getHours() + ':',
  m = date.getMinutes() + ':',
  s = date.getSeconds();
  return Y + M + D + h + m + s;
}

module.exports = {
  format,
}