// 公用正则表达

// 数字类
let numberRegex = {
  integer_gt0: /^[1-9]\d*$/,//大于0的整数
  integer: /^(0|\+?[1-9][0-9]*)$/,//大于等于0的正整数
  integer_0_100: /^(?:0|[1-9][0-9]?|100)$/,//[0-100]之间的正整数
  decimal_2: /^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,//至多包含两位小数的正数
  decimal_1: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,1}|\d+)$/,//包含一位小数的正数
  regex_bankNum: /^([1-9]{1})(\d{15}|\d{18})$/,//15位或18位数字
  regex_qianwan: /^[+]{0,1}(\d{1,9})$|^[+]{0,1}(\d+\.\d+)$/
};

// 字符串类
let strRegex = {
  name: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,//中英文数字_-不限制长度
  limited_name: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}/,//中英文数字-_（字符长度为2-16位）
};

let phone = /^[1][3,4,5,6,7,8][0-9]{9}$/;

let emoji = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig


export default {
  numberRegex,
  strRegex,
  phone,
  emoji
}
