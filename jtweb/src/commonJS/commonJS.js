/**
 * Created by dianying-h5 on 2017/11/14.
 */
export const formatTime = (data) => {
  let time = new Date().getTime() - data;
  data = Number(data);
  if ((time=time/1000) < 3) {
    return "刚刚";
  }
  if (time/60 < 1) {
    return parseInt(time) + "秒前";
  }
  if (time/60/60 < 1) {
    return parseInt(time/60) + "分钟前"
  }
  if (time/60/60/24 < 1) {
    return parseInt(time/60/60) + "小时前"
  }
  let y = new Date(data).getFullYear();
  let m = new Date(data).getMonth() + 1;
  let d = new Date(data).getDate();
  return y + "/" + m + "/" + d;
};
