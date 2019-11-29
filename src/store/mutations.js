import {
  DRAW_BEGIN,
  DRAW_ING,
  DRAW_END,
  INIT_ZR_SUCCESS,
  INIT_CANVAS_SUCCESS,
  INIT_GROUP_SUCCESS,
  SELECT_LINE_TYPE,
  SELECT_SHAPE,
  SELECT_COLOR,
  SELECT_LINE_WIDTH,
  /*------直线-------*/
  DRAW_LINE_BEGIN,
  DRAW_LINE_ING,
  DRAW_LINE_END,
  /*------矩形-------*/
  DRAW_RECT_BEGIN,
  DRAW_RECT_ING,
  DRAW_RECT_END,
  /*------圆-------*/
  DRAW_CIRCLE_BEGIN,
  DRAW_CIRCLE_ING,
  DRAW_CIRCLE_END,
  /*------水平线-------*/
  DRAW_H_LINE_BEGIN,
  DRAW_H_LINE_ING,
  DRAW_H_LINE_END,
  /*------竖直线-------*/
  DRAW_V_LINE_BEGIN,
  DRAW_V_LINE_ING,
  DRAW_V_LINE_END,
  /*------------------*/
  CLEAR_MAP,
  IMPORT_IMAGE,
  CREATE_IMAGE,
  CREATE_FILE,
  OPEN_LEGAL_FILE,
  TRANSFORM_TYPE,
  CURRENT_TRANSFORM_SHAPE,
  SCALE_BIG_ONE,
  SCALE_SMALL_ONE,
  ROTATE_LEFT_ONE,
  ROTATE_RIGHT_ONE,
  COPY_ONE,
  DELETE_ONE,
  INIT_MENU_CONTAINER,
  CLOSE_CONTEXT_MENU,
  ROTATE_ONE,
  CHANGE_ONE_COLOR,
  SCALE_BIG_MAP,
  SCALE_SMALL_MAP, MOVE_UP_MAP, MOVE_DOWN_MAP, MOVE_LEFT_MAP, MOVE_RIGHT_MAP, MOVE_MAP, MOVE_MAP_ING,
} from './mutation-types'

import {Message} from 'element-ui'

import store from './index'
import D from '../utils/draw/index'
import download from '../utils/download'
import zrender from 'zrender'

export default {
  //1.初始化zrender实例对象&canvas对象
  [INIT_ZR_SUCCESS] (state, {zr}) {
    state.zr = zr
    zr.on('contextmenu', (e) => {
      //e.target就是当前被右键点击的元素
      if (e.target) {
        let {offsetX, offsetY} = e
        //打开变换操作的下拉框
        state.transformContainerShow = true
        store.commit(CURRENT_TRANSFORM_SHAPE, {currentTransformShape: e.target})
        //显示转换的菜单栏
        state.isContextMenuShow = true
        //判断鼠标点击的位置是否过于靠近页面底部
        if (offsetY > 300) {
          state.menuContainer.style.top = offsetY - 150 + 'px'
        } else {
          state.menuContainer.style.top = offsetY + 50 + 'px'
        }
        state.menuContainer.style.left = offsetX + 10 + 'px'
      }
    })
  },
  //2.初始化组实例对象
  [INIT_GROUP_SUCCESS] (state, {group}) {
    state.group = group
    let {zr} = state
    //将组添加到zrender实例中
    zr.add(group)
  },
  //2.1初始化canvas实例
  [INIT_CANVAS_SUCCESS] (state, {curCanvas}) {
    state.curCanvas = curCanvas
  },
  //3.确定作画的起始位置
  [DRAW_BEGIN] (state, {beginX, beginY}) {
    //如果菜单栏显示,则不能作画
    if (state.transformContainerShow) return
    if (state.lineType === 'Line') {
      store.commit(DRAW_LINE_BEGIN, {beginX, beginY})
    } else if (state.lineType === 'Rectangle') {
      store.commit(DRAW_RECT_BEGIN, {beginX, beginY})
    } else if (state.lineType === 'Circle') {
      store.commit(DRAW_CIRCLE_BEGIN, {beginX, beginY})
    } else if (state.lineType === 'HLine') {
      store.commit(DRAW_H_LINE_BEGIN, {beginX, beginY})
    } else if (state.lineType === 'VLine') {
      store.commit(DRAW_V_LINE_BEGIN, {beginX, beginY})
    }
  },
  //4.正在作画
  [DRAW_ING] (state, {currentX, currentY}) {
    if (state.lineType === 'Line') {
      store.commit(DRAW_LINE_ING, {currentX, currentY})
    } else if (state.lineType === 'Rectangle') {
      store.commit(DRAW_RECT_ING, {currentX, currentY})
    } else if (state.lineType === 'Circle') {
      store.commit(DRAW_CIRCLE_ING, {currentX, currentY})
    } else if (state.lineType === 'HLine') {
      store.commit(DRAW_H_LINE_ING, {currentX, currentY})
    } else if (state.lineType === 'VLine') {
      store.commit(DRAW_V_LINE_ING, {currentX, currentY})
    }
  },
  //5.作画结束
  [DRAW_END] (state) {
    if (state.lineType === 'Line') {
      store.commit(DRAW_LINE_END)
    } else if (state.lineType === 'Rectangle') {
      store.commit(DRAW_RECT_END)
    } else if (state.lineType === 'Circle') {
      store.commit(DRAW_CIRCLE_END)
    } else if (state.lineType === 'HLine') {
      store.commit(DRAW_H_LINE_END)
    } else if (state.lineType === 'VLine') {
      store.commit(DRAW_V_LINE_END)
    }
  },
  //6.选择线型
  [SELECT_LINE_TYPE] (state, {lineDash}) {
    state.lineDash = lineDash
  },
  //7.选择形状
  [SELECT_SHAPE] (state, {lineType}) {
    state.lineType = lineType
  },
  //8.选择线宽
  [SELECT_LINE_WIDTH] (state, {lineWidth}) {
    state.lineWidth = lineWidth
  },
  //9.选择颜色
  [SELECT_COLOR] (state, {color}) {
    state.color = color
  },
  /*----------------------直线------------------------*/
  [DRAW_LINE_BEGIN] (state, {beginX, beginY}) {
    let {color, lineWidth, lineDash, curShape, group, curArgs} = state
    //判断起点是否已经确定
    if (!state.isStarted) {
      // curArgs.x1 = beginX
      // curArgs.x2 = beginX
      // curArgs.y1 = beginY
      // curArgs.y2 = beginY
      curArgs.x1 = state.getDot(beginX, beginY).x0
      curArgs.x2 = state.getDot(beginX, beginY).x0
      curArgs.y1 = state.getDot(beginX, beginY).y0
      curArgs.y2 = state.getDot(beginX, beginY).y0
      state.curShape = D.drawLine({
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x2,
        y2: curArgs.y2,
        color,
        lineWidth,
        lineDash
      })
      //将当前的形状添加到组中
      group.add(state.curShape)
      state.isStarted = true //已经确定了起点
    } else {
      //最终确定线的终点
      // curArgs.x2 = beginX
      // curArgs.y2 = beginY
      curArgs.x2 = state.getDot(beginX, beginY).x0
      curArgs.y2 = state.getDot(beginX, beginY).y0
      curShape.attr('shape', {
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x2,
        y2: curArgs.y2
      })
      state.isStarted = false
    }
  },
  [DRAW_LINE_ING] (state, {currentX, currentY}) {
    let {curArgs, isStarted} = state
    if (isStarted) {
      // curArgs.x2 = currentX
      // curArgs.y2 = currentY
      curArgs.x2 = state.getDot(currentX, currentY).x0
      curArgs.y2 = state.getDot(currentX, currentY).y0
      state.curShape.attr('shape', {
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x2,
        y2: curArgs.y2
      })
    }
  },
  [DRAW_LINE_END] (state) {
    state.isStarted = false
  },
  /*----------------------直线------------------------*/
  /*----------------------矩形------------------------*/
  [DRAW_RECT_BEGIN] (state, {beginX, beginY}) {
    let {color, lineWidth, lineDash, curShape, group, curArgs} = state
    //判断起点是否已经确定
    if (!state.isStarted) {
      // curArgs.x = beginX
      // curArgs.width = 0
      // curArgs.y = beginY
      // curArgs.height = 0
      curArgs.x = state.getDot(beginX, beginY).x0
      curArgs.width = 0
      curArgs.y = state.getDot(beginX, beginY).y0
      curArgs.height = 0
      state.curShape = D.drawRect({
        x: curArgs.x,
        y: curArgs.y,
        width: curArgs.width,
        height: curArgs.height,
        color, lineWidth, lineDash
      })
      //将当前的形状添加到组中
      group.add(state.curShape)
      state.isStarted = true //已经确定了起点
    } else {
      //最终确定线的终点
      // curArgs.width = beginX - curArgs.x
      // curArgs.height = beginY - curArgs.y
      curArgs.width = state.getDot(beginX, beginY).x0 - curArgs.x
      curArgs.height = state.getDot(beginX, beginY).y0 - curArgs.y
      curShape.attr('shape', {
        x: curArgs.x,
        y: curArgs.y,
        width: curArgs.width,
        height: curArgs.height
      })
      state.isStarted = false
    }
  },
  [DRAW_RECT_ING] (state, {currentX, currentY}) {
    let {curArgs, isStarted} = state
    if (isStarted) {
      // curArgs.width = currentX - curArgs.x
      // curArgs.height = currentY - curArgs.y
      curArgs.width = state.getDot(currentX, currentY).x0 - curArgs.x
      curArgs.height = state.getDot(currentX, currentY).y0 - curArgs.y
      state.curShape.attr('shape', {
        x: curArgs.x,
        y: curArgs.y,
        width: curArgs.width,
        height: curArgs.height
      })
    }
  },
  [DRAW_RECT_END] (state) {
    state.isStarted = false
  },
  /*----------------------矩形------------------------*/
  /*----------------------圆圆------------------------*/
  [DRAW_CIRCLE_BEGIN] (state, {beginX, beginY}) {
    let {color, lineWidth, lineDash, curShape, group, curArgs} = state
    //判断起点是否已经确定
    if (!state.isStarted) {
      // curArgs.cx = beginX
      // curArgs.cy = beginY
      // curArgs.r = 0
      curArgs.cx = state.getDot(beginX, beginY).x0
      curArgs.cy = state.getDot(beginX, beginY).y0
      curArgs.r = 0
      state.curShape = D.drawCircle({
        cx: curArgs.cx,
        cy: curArgs.cy,
        r: curArgs.r,
        color, lineWidth, lineDash
      })
      //将当前的形状添加到组中
      group.add(state.curShape)
      state.isStarted = true //已经确定了起点
    } else {
      //最终确定线的终点
      curArgs.r = Math.sqrt((state.getDot(beginX, beginY).x0 - curArgs.cx) ** 2 + (state.getDot(beginX, beginY).y0 - curArgs.cy) ** 2)
      curShape.attr('shape', {
        cx: curArgs.cx,
        cy: curArgs.cy,
        r: curArgs.r,
      })
      state.isStarted = false
    }
  },
  [DRAW_CIRCLE_ING] (state, {currentX, currentY}) {
    let {curArgs, isStarted} = state
    if (isStarted) {
      curArgs.r = Math.sqrt((state.getDot(currentX, currentY).x0 - curArgs.cx) ** 2 + (state.getDot(currentX, currentY).y0 - curArgs.cy) ** 2)
      state.curShape.attr('shape', {
        cx: curArgs.cx,
        cy: curArgs.cy,
        r: curArgs.r,
      })
    }
  },
  [DRAW_CIRCLE_END] (state) {
    state.isStarted = false
  },
  /*----------------------圆圆------------------------*/
  /*----------------------水平线------------------------*/
  [DRAW_H_LINE_BEGIN] (state, {beginX, beginY}) {
    let {color, lineWidth, lineDash, curShape, group, curArgs} = state
    //判断起点是否已经确定
    if (!state.isStarted) {
      // curArgs.x1 = beginX
      // curArgs.x2 = beginX
      // curArgs.y1 = beginY
      curArgs.x1 = state.getDot(beginX, beginY).x0
      curArgs.x2 = state.getDot(beginX, beginY).x0
      curArgs.y1 = state.getDot(beginX, beginY).y0
      state.curShape = D.drawLine({
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x2,
        y2: curArgs.y1,
        color, lineWidth, lineDash
      })
      //将当前的形状添加到组中
      group.add(state.curShape)
      state.isStarted = true //已经确定了起点
    } else {
      //最终确定线的终点
      curArgs.x2 = state.getDot(beginX, beginY).x0
      curShape.attr('shape', {
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x2,
        y2: curArgs.y1
      })
      state.isStarted = false
    }
  },
  [DRAW_H_LINE_ING] (state, {currentX, currentY}) {
    let {curArgs, isStarted} = state
    if (isStarted) {
      curArgs.x2 = state.getDot(currentX, currentY).x0
      state.curShape.attr('shape', {
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x2,
        y2: curArgs.y1  //纵坐标不变
      })
    }
  },
  [DRAW_H_LINE_END] (state) {
    state.isStarted = false
  },
  /*----------------------水平线------------------------*/
  /*----------------------竖直线------------------------*/
  [DRAW_V_LINE_BEGIN] (state, {beginX, beginY}) {
    let {color, lineWidth, lineDash, curShape, group, curArgs} = state
    //判断起点是否已经确定
    if (!state.isStarted) {
      // curArgs.x1 = beginX
      // curArgs.y1 = beginY
      // curArgs.y2 = beginY
      curArgs.x1 = state.getDot(beginX, beginY).x0
      curArgs.y1 = state.getDot(beginX, beginY).y0
      curArgs.y2 = state.getDot(beginX, beginY).y0
      state.curShape = D.drawLine({
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x1,
        y2: curArgs.y2,
        color, lineWidth, lineDash
      })
      //将当前的形状添加到组中
      group.add(state.curShape)
      state.isStarted = true //已经确定了起点
    } else {
      //最终确定线的终点
      curArgs.y2 = state.getDot(beginX, beginY).y0
      curShape.attr('shape', {
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x1,
        y2: curArgs.y2
      })
      state.isStarted = false
    }
  },
  [DRAW_V_LINE_ING] (state, {currentX, currentY}) {
    let {curArgs, isStarted} = state
    if (isStarted) {
      curArgs.y2 = state.getDot(currentX, currentY).y0
      state.curShape.attr('shape', {
        x1: curArgs.x1,
        y1: curArgs.y1,
        x2: curArgs.x1,
        y2: curArgs.y2
      })
    }
  },
  [DRAW_V_LINE_END] (state) {
    state.isStarted = false
  },
  /*----------------------竖直线------------------------*/
  /*-------------------------------------------------------*/
  //10.清除画布
  [CLEAR_MAP] (state) {
    state.group.removeAll()
    //一定要重新添加组,否则元素还在zrender实例上
    state.zr.add(state.group)
  },
  //11.导入图片
  [IMPORT_IMAGE] (state, {url, width, height}) {
    state.curShape = D.drawImage({
      url, x: 0, y: 0, width, height
    })
    state.group.add(state.curShape)
  },
  //12.生成图片
  [CREATE_IMAGE] (state) {
    if (!state.curCanvas) return
    console.log('有元素')
    //myDownload(state.curCanvas.toDataURL(), 'image.png', 'image/png')
  },
  //13.生成文件
  [CREATE_FILE] (state) {
    let allShapeList = []
    //组的遍历也是按顺序进行的
    state.group.eachChild(sub => {
      // 保存到额时候不需要判断sub的类型,
      // 只有导入文件去画图的时候才需要根据具体的类型来选择具体的构造函数来画出相应的形状
      let {draggable, scale, position, rotation, origin, shape, style} = sub
      allShapeList.push({draggable, scale, position, rotation, origin, shape, style})
    })
    //美化生成的文件的格式(利用JSON.stringify()函数的第三个参数)
    download(JSON.stringify(allShapeList, null, 2), 'shape.json', 'text/plain')
  },
  //14.打开合法文件
  [OPEN_LEGAL_FILE] (state, {shapeData}) {
    //遍历数组
    shapeData.forEach(sub => {
      //需要判断类别
      let {draggable, scale, position, rotation, origin, shape, style} = sub
      if (sub.shape.r) {
        //圆
        state.group.add(new zrender.Circle({draggable, scale, position, rotation, origin, shape, style}))
      } else if (sub.shape.width) {
        //矩形
        state.group.add(new zrender.Rect({draggable, scale, position, rotation, origin, shape, style}))
      } else if (sub.style.image) {
        //图片
        state.group.add(new zrender.Image({draggable, scale, position, rotation, origin, shape, style}))
      } else if (sub.shape.x1) {
        //线
        state.group.add(new zrender.Line({draggable, scale, position, rotation, origin, shape, style}))
      }
    })
    state.zr.add(state.group)
  },
  //15.当前进行变换的元素
  [CURRENT_TRANSFORM_SHAPE] (state, {currentTransformShape}) {
    state.currentTransformShape = currentTransformShape
    //判断形状的类型来确定变换的中心点
    if (state.currentTransformShape.shape.x1) {
      //是直线
      let {x1, y1, x2, y2} = state.currentTransformShape.shape
      state.currentTransformShape.attr('origin', [(x1 + x2) / 2, (y1 + y2) / 2])
    } else if (state.currentTransformShape.shape.width) {
      //是矩形
      let {x, y, width, height} = state.currentTransformShape.shape
      state.currentTransformShape.attr('origin', [x + width / 2, y + height / 2])
    } else if (state.currentTransformShape.style.width) {
      //是图片
      let {x, y, width, height} = state.currentTransformShape.style
      state.currentTransformShape.attr('origin', [x + width / 2, y + height / 2])
    } else if (state.currentTransformShape.shape.cx) {
      //是圆
      let {cx, cy} = state.currentTransformShape.shape
      state.currentTransformShape.attr('origin', [cx, cy])
    }
  },
  //16.分发具体的变换事件
  [TRANSFORM_TYPE] (state, {type}) {
    //判断当前进行变换的种类
    switch (type) {
      case '放大':
        store.commit(SCALE_BIG_ONE)
        break
      case '缩小':
        store.commit(SCALE_SMALL_ONE)
        break
      case '左旋':
        store.commit(ROTATE_LEFT_ONE)
        break
      case '右旋':
        store.commit(ROTATE_RIGHT_ONE)
        break
      case '复制':
        store.commit(COPY_ONE)
        break
      case '删除':
        store.commit(DELETE_ONE)
        break
    }
  },
  //16.1 单个放大
  [SCALE_BIG_ONE] (state) {
    let [scaleItemX, scaleItemY] = state.currentTransformShape.scale
    state.currentTransformShape.attr('scale', [(scaleItemX * 10 + 1) / 10, (scaleItemY * 10 + 1) / 10])
    state.group.add(state.currentTransformShape)
    state.zr.add(state.group)
  },
  //16.2 单个缩小
  [SCALE_SMALL_ONE] (state) {
    let [scaleItemX, scaleItemY] = state.currentTransformShape.scale
    state.currentTransformShape.attr('scale', [(scaleItemX * 10 - 1) / 10, (scaleItemY * 10 - 1) / 10])
    state.group.add(state.currentTransformShape)
    state.zr.add(state.group)
  },
  [ROTATE_ONE] (state) {
    let {rotation} = state.currentTransformShape
    //每次旋转45度
    state.currentTransformShape.attr('rotation', rotation - Math.PI * 45 / 180)
    state.group.add(state.currentTransformShape)
    state.zr.add(state.group)
  },
  //16.3 单个左旋
  [ROTATE_LEFT_ONE] (state) {

  },
  //16.4 单个右旋
  [ROTATE_RIGHT_ONE] (state) {

  },
  //16.5 单个复制
  [COPY_ONE] (state) {
    let {draggable, scale, position, rotation, origin, shape, style} = state.currentTransformShape
    //判断当前的形状类型
    if (state.currentTransformShape.shape.x1) {
      //是直线
      state.group.add(new zrender.Line({draggable, scale, position, rotation, origin, shape, style}))
    } else if (state.currentTransformShape.shape.width) {
      //是矩形
      state.group.add(new zrender.Rect({draggable, scale, position, rotation, origin, shape, style}))
    } else if (state.currentTransformShape.style.width) {
      //是图片
      state.group.add(new zrender.Image({draggable, scale, position, rotation, origin, shape, style}))
    } else if (state.currentTransformShape.shape.cx) {
      //是圆
      state.group.add(new zrender.Circle({draggable, scale, position, rotation, origin, shape, style}))
    }
    state.zr.add(state.group)
    //提示用户复制成功
    Message.success({
      message: '复制成功',
      duration: 1500
    })
    state.isContextMenuShow = false
    state.transformContainerShow = false
  },
  //16.6 单个删除
  [DELETE_ONE] (state) {
    state.group.remove(state.currentTransformShape)
    state.zr.add(state.group)
    state.isContextMenuShow = false
    state.transformContainerShow = false
  },
  //17.初始化转换菜单栏的包围盒
  [INIT_MENU_CONTAINER] (state, {menuContainer}) {
    state.menuContainer = menuContainer
  },
  //18.关闭菜单栏
  [CLOSE_CONTEXT_MENU] (state) {
    state.isContextMenuShow = false
    state.transformContainerShow = false
  },
  //19.单个改变颜色
  [CHANGE_ONE_COLOR] (state, {color}) {
    //图片没有颜色，所以没有改变颜色的操作
    if (state.currentTransformShape.style.width) return
    state.currentTransformShape.attr('style', {stroke: color})
  },
  //20.缩小画布
  [SCALE_SMALL_MAP] (state) {
    state.scaleDegree *= 0.9
    state.TRANS.unshift(0.9)
    state.SHAPE_TRANS.scale *= 0.9
    state.group.attr({
      scale: [state.SHAPE_TRANS.scale, state.SHAPE_TRANS.scale]
    })
  },
  //25.放大画布
  [SCALE_BIG_MAP] (state) {
    state.scaleDegree *= 1.1
    state.TRANS.unshift(1.1)
    state.SHAPE_TRANS.scale *= 1.1
    state.group.attr({
      scale: [state.SHAPE_TRANS.scale, state.SHAPE_TRANS.scale]
    })
  },
  //26.上移画布
  [MOVE_UP_MAP] (state) {

  },
  //27.下移画布
  [MOVE_DOWN_MAP] (state) {

  },
  //28.左移画布
  [MOVE_LEFT_MAP] (state) {

  },
  //29.右移画布
  [MOVE_RIGHT_MAP] (state) {

  },
  //30.开始移动画布
  [MOVE_MAP] (state, {beginX, beginY}) {
    state.moveMapBeginDot = {beginX, beginY}
  },
  //31.移动画布中
  [MOVE_MAP_ING] (state, {currentX, currentY}) {
    let {beginX, beginY} = state.moveMapBeginDot
    let addX = currentX - beginX
    let addY = currentY - beginY
    state.SHAPE_TRANS.position.x += addX
    state.SHAPE_TRANS.position.y += addY
    state.group.attr({
      position: [state.SHAPE_TRANS.position.x, state.SHAPE_TRANS.position.y]
    })
    state.TRANS.unshift({x: addX, y: addY})
    state.moveMapBeginDot = {beginX: currentX, beginY: currentY}
    //计算总和
    let [x, y] = state.positionArr
    state.positionArr = [x + addX, y + addY]
  },
}
