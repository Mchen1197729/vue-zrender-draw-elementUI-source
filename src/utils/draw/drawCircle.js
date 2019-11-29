//画圆的函数:返回一个圆的实例对象
import zrender from 'zrender'

function drawCircle ({cx, cy, r, color, lineWidth, lineDash}) {
  return new zrender.Circle({
    draggable: true,
    shape: {cx, cy, r},
    style: {
      fill: 'none',
      lineWidth,
      stroke: color,
      lineDash,
      strokeNoScale: true //加上以后,线的粗细不会变,但是起点终点还是会改变
    }
  })
}

export default drawCircle
