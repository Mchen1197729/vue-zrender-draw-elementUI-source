//设置自定义事件(作画)的触发规则
import store from '../../store'

let {isStarted} = store.state

function drawRule (picture) {
  /**
   *设置触发自定义事件的规则
   * 1.鼠标按下的必须是左键 <== e.button === 0
   * 2.按下鼠标和抬起鼠标的距离必须非常近
   * 3.按下鼠标后不能移动鼠标
   */
  let beforeX, beforeY, nowX, nowY, isDown, isMoved, isMidDown
  picture.addEventListener('mousedown', (e) => {
    //作画结束
    if (isStarted) {
      store.dispatch('drawEnd')
      return
    }
    if (e.button === 0) {
      //确定起点(作画开始)
      beforeX = e.offsetX
      beforeY = e.offsetY
      isDown = true
    }
    if (e.button === 1) {
      isMidDown = true
      //派发正在画图的事件
      store.dispatch('moveMapBegin', {beginX: e.offsetX, beginY: e.offsetY})
    }
  })

  picture.addEventListener('mousemove', (e) => {
    //只监听在拖动鼠标作画的事件过程(交给mutations去判断)
    //派发正在画图的事件
    store.dispatch('drawIng', {currentX: e.offsetX, currentY: e.offsetY})
    if (isMidDown) {
      //派发正在画图的事件
      store.dispatch('moveMapIng', {currentX: e.offsetX, currentY: e.offsetY})
    }
  })

  picture.addEventListener('mouseup', (e) => {
    nowX = e.offsetX
    nowY = e.offsetY
    if (!isMoved && nowX - beforeX >= -1 && nowX - beforeX <= 1 && nowY - beforeY >= -1 && nowY - beforeY <= 1) {
      //分发开始画图的事件
      store.dispatch('drawBegin', {beginX: e.offsetX, beginY: e.offsetY})
    }
    isDown = isMoved = isMidDown = false
  })
}

export default drawRule
