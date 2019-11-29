//画矩形的函数：返回一个矩形的实例对象
// // (就是单纯的画矩形的功能,至于如何操作这个矩形交给其他的功能函数去处理)
import zrender from 'zrender'

function drawRect ({x, y, width, height, color, lineWidth, lineDash}) {
  return new zrender.Rect({
    draggable: true,
    shape: {x, y, width, height},
    style: {
      stroke: color, lineWidth, fill: 'none', //内部为透明色
      lineDash,
      strokeNoScale: true //加上以后,线的粗细不会变,但是起点终点还是会改变
    }
  })
}

export default drawRect
