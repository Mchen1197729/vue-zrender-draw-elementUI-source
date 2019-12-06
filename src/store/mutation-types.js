// 1.开始作画(确定了形状的起始位置)
export const DRAW_BEGIN = 'draw_begin'
// 2.作画中
export const DRAW_ING = 'draw_ing'
// 3.作画结束
export const DRAW_END = 'draw_end'
// 4.初始化zrender实例
export const INIT_ZR_SUCCESS = 'init_zr_success'
// 4.1初始化canvas实例
export const INIT_CANVAS_SUCCESS = 'init_canvas_success'
// 5.初始化组
export const INIT_GROUP_SUCCESS = 'init_group_success'
// 6.选择线型
export const SELECT_LINE_TYPE = 'select_line_type'
// 7.选择形状
export const SELECT_SHAPE = 'select_shape'
// 8.选择线宽
export const SELECT_LINE_WIDTH = 'select_line_width'
// 9.选择颜色
export const SELECT_COLOR = 'select_color'
/* -----------根据不同的形状的事件----------- */
// 10.直线
export const DRAW_LINE_BEGIN = 'draw_line_begin'
export const DRAW_LINE_ING = 'draw_line_ing'
export const DRAW_LINE_END = 'draw_line_end'

// 11.矩形
export const DRAW_RECT_BEGIN = 'draw_rect_begin'
export const DRAW_RECT_ING = 'draw_rect_ing'
export const DRAW_RECT_END = 'draw_rect_end'

// 12.圆
export const DRAW_CIRCLE_BEGIN = 'draw_circle_begin'
export const DRAW_CIRCLE_ING = 'draw_circle_ing'
export const DRAW_CIRCLE_END = 'draw_circle_end'

// 13.水平线
export const DRAW_H_LINE_BEGIN = 'draw_h_ine_begin'
export const DRAW_H_LINE_ING = 'draw_h_ine_ing'
export const DRAW_H_LINE_END = 'draw_h_ine_end'

// 14.竖直线
export const DRAW_V_LINE_BEGIN = 'draw_v_ine_begin'
export const DRAW_V_LINE_ING = 'draw_v_ine_ing'
export const DRAW_V_LINE_END = 'draw_v_ine_end'
/* -----------根据不同的形状的事件----------- */

// 15.清除画布
export const CLEAR_MAP = 'clear_map'

// 16.导入图片
export const IMPORT_IMAGE = 'import_image'

// 17.生成图片
export const CREATE_IMAGE = 'create_image'

// 18.生成文件
export const CREATE_FILE = 'create_file'

// 19.导入合法的文件
export const OPEN_LEGAL_FILE = 'open_legal_file'

// 20.对元素进行变化操作
export const CURRENT_TRANSFORM_SHAPE = 'current_transform_shape'
export const TRANSFORM_TYPE = 'transform_type'

// 20.1 单个放大
export const SCALE_BIG_ONE = 'scale_big_one'
// 20.2 单个缩小
export const SCALE_SMALL_ONE = 'scale_small_one'

export const ROTATE_ONE = 'rotate_one'

// 20.3 单个左旋
export const ROTATE_LEFT_ONE = 'rotate_left_one'
// 20.4 单个右旋
export const ROTATE_RIGHT_ONE = 'rotate_right_one'
// 20.5 单个复制
export const COPY_ONE = 'copy_one'
// 20.6 单个删除
export const DELETE_ONE = 'delete_one'
// 20.7 单个改变颜色
export const CHANGE_ONE_COLOR = 'change_one_color'

// 21.初始化转换菜单栏的包围盒
export const INIT_MENU_CONTAINER = 'init_menu_container'

// 22.关闭菜单栏
export const CLOSE_CONTEXT_MENU = 'close_context_menu'

// 23.整体画布放大
export const SCALE_BIG_MAP = 'scale_big_map'
// 24.整体画布缩小
export const SCALE_SMALL_MAP = 'scale_small_map'
// 25.上移画布
export const MOVE_UP_MAP = 'move_up_map'
// 26.下移画布
export const MOVE_DOWN_MAP = 'move_down_map'
// 27.左移画布
export const MOVE_LEFT_MAP = 'move_left_map'
// 28.右移画布
export const MOVE_RIGHT_MAP = 'move_right_map'

// 28.5开始移动画布
export const MOVE_MAP = 'move_map'
// 29.画布移动中
export const MOVE_MAP_ING = 'move_map_ing'
