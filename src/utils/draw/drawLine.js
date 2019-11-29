// 画直线的函数：返回一个直线的实例对象
// (就是单纯的画直线的功能,至于如何操作这条直线交给其他的功能函数去处理)
import zrender from 'zrender'

//需要的参数有：1.坐标信息 2.是否是虚线(lineDash是一个数组或者null) 3.线宽
function drawLine ({x1, y1, x2, y2, color, lineWidth, lineDash}) {
  return new zrender.Line({
    draggable: true,
    shape: {x1, y1, x2, y2},
    style: {
      stroke: color, lineWidth, lineDash, strokeNoScale: true //加上以后,线的粗细不会变,但是起点终点还是会改变
    },
  })
}

export default drawLine
