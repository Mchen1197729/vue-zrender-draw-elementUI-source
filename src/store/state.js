// 保存组件共享的全局状态
export default {
  // 1.当前图形的类型(默认为直线)
  lineType: 'Line',
  // 2.当前填充的颜色(默认为#000)
  color: '#000',
  // 3.当前线的宽度(默认为2)
  lineWidth: 2,
  // 4.当前线型(默认是实线)
  lineDash: null,
  // 5.是否开始作画(默认为false)
  isStarted: false,
  // 6.当前正在画的图形
  curShape: {},
  // 7.当前形状的各种参数
  curArgs: {},
  // 8.当前的zrender实例对象
  zr: {},
  // 9.当前的组实例
  group: {},
  // 10.当前的canvas对象
  curCanvas: {},
  // 11.当前进行变化的元素
  currentTransformShape: {},
  // 12.变换的下拉框是否显示(如果正在进行转换操作,则不能触发画图)
  transformContainerShow: false,
  // 13.是否显示变换的菜单栏
  isContextMenuShow: false,
  // 14.转换菜单栏的包围盒
  menuContainer: {},
  // 15.定义初始的转换参数
  TRANS: [], // 经理的所有变换的数组
  SHAPE_TRANS: {position: {x: 0, y: 0}, scale: 1}, // 当前的变换的参数
  // 当前的缩放倍数
  scaleDegree: 1,
  // 当前的移动的坐标数组
  positionArr: [0, 0],
  // 定义反转换的函数
  getDot: function (x0, y0) {
    // 把数组拆分成两个
    let positionArr = this.TRANS.filter(item => item.x || item.y)
    let scaleArr = this.TRANS.filter(item => !item.x && !item.y)
    // 返回反转换后的坐标
    for (let i = 0; i < positionArr.length; i++) {
      let {x, y} = positionArr[i]
      x0 = x0 - x
      y0 = y0 - y
    }
    for (let j = 0; j < scaleArr.length; j++) {
      x0 = x0 / scaleArr[j]
      y0 = y0 / scaleArr[j]
    }
    return {x0, y0}
  },
  // 移动画布的初始坐标
  moveMapBeginDot: {beginX: 0, beginY: 0}
}
