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
  CLEAR_MAP,
  IMPORT_IMAGE,
  CREATE_IMAGE,
  CREATE_FILE,
  OPEN_LEGAL_FILE,
  INIT_MENU_CONTAINER,
  CLOSE_CONTEXT_MENU,
  DELETE_ONE,
  SCALE_BIG_ONE,
  SCALE_SMALL_ONE,
  ROTATE_ONE,
  COPY_ONE,
  CHANGE_ONE_COLOR,
  SCALE_BIG_MAP,
  SCALE_SMALL_MAP,
  MOVE_UP_MAP,
  MOVE_DOWN_MAP,
  MOVE_LEFT_MAP,
  MOVE_RIGHT_MAP, MOVE_MAP, MOVE_MAP_ING,
} from './mutation-types'

export default {
  //1.初始化zrender实例对象
  initZrSuccess ({commit}, {zr}) {
    commit(INIT_ZR_SUCCESS, {zr})
  },
  //2.初始化组实例对象
  initGroupSuccess ({commit}, {group}) {
    commit(INIT_GROUP_SUCCESS, {group})
  },
  //2.1初始化canvas实例
  initCanvasSuccess ({commit}, {curCanvas}) {
    commit(INIT_CANVAS_SUCCESS, {curCanvas})
  },
  //3.确定作画的起始位置
  drawBegin ({commit}, {beginX, beginY}) {
    commit(DRAW_BEGIN, {beginX, beginY})
  },
  //4.正在作画
  drawIng ({commit}, {currentX, currentY}) {
    commit(DRAW_ING, {currentX, currentY})
  },
  //5.作画结束
  drawEnd ({commit}) {
    commit(DRAW_END)
  },
  //6.选择线型
  selectLineType ({commit}, {lineDash}) {
    commit(SELECT_LINE_TYPE, {lineDash})
  },
  //7.选择形状
  selectShape ({commit}, {lineType}) {
    commit(SELECT_SHAPE, {lineType})
  },
  //8.选择线宽
  selectLineWidth ({commit}, {lineWidth}) {
    commit(SELECT_LINE_WIDTH, {lineWidth})
  },
  //9.选择颜色
  selectColor ({commit}, {color}) {
    commit(SELECT_COLOR, {color})
  },
  //10.清除画布
  clearMap ({commit}) {
    commit(CLEAR_MAP)
  },
  //11.导入图片
  importImage ({commit}, {url, width, height}) {
    commit(IMPORT_IMAGE, {url, width, height})
  },
  //12.生成图片
  createImage ({commit}) {
    commit(CREATE_IMAGE)
  },
  //13.生成文件
  createFile ({commit}) {
    commit(CREATE_FILE)
  },
  //14.打开合法文件
  openLegalFile ({commit}, {shapeData}) {
    commit(OPEN_LEGAL_FILE, {shapeData})
  },
  //16.初始化转换菜单栏的包围盒
  initMenuContainer ({commit}, {menuContainer}) {
    commit(INIT_MENU_CONTAINER, {menuContainer})
  },
  //17.关闭菜单栏
  closeContextMenu ({commit}) {
    commit(CLOSE_CONTEXT_MENU)
  },
  //18.删除单个
  deleteOneItem ({commit}) {
    commit(DELETE_ONE)
  },
  //19.单个放大
  scaleBigOne ({commit}) {
    commit(SCALE_BIG_ONE)
  },
  //20.缩小单个元素
  scaleSmallOne ({commit}) {
    commit(SCALE_SMALL_ONE)
  },
  //21.旋转单个元素
  rotateOne ({commit}) {
    commit(ROTATE_ONE)
  },
  //22.复制单个
  copyOne ({commit}) {
    commit(COPY_ONE)
  },
  //23.单个改变颜色
  changeOneColor ({commit}, {color}) {
    commit(CHANGE_ONE_COLOR, {color})
  },
  //24.缩小画布
  scaleSmallMap ({commit}) {
    commit(SCALE_SMALL_MAP)
  },
  //25.缩小画布
  scaleBigMap ({commit}) {
    commit(SCALE_BIG_MAP)
  },
  //26.上移画布
  moveUpMap ({commit}) {
    commit(MOVE_UP_MAP)
  },
  //27.下移画布
  moveDownMap ({commit}) {
    commit(MOVE_DOWN_MAP)
  },
  //28.左移画布
  moveLeftMap ({commit}) {
    commit(MOVE_LEFT_MAP)
  },
  //29.右移画布
  moveRightMap ({commit}) {
    commit(MOVE_RIGHT_MAP)
  },
  //29.5开始移动画布
  moveMapBegin ({commit}, {beginX, beginY}) {
    commit(MOVE_MAP, {beginX, beginY})
  },
  //30.移动画布
  moveMapIng ({commit}, {currentX, currentY}) {
    commit(MOVE_MAP_ING, {currentX, currentY})
  },
}
