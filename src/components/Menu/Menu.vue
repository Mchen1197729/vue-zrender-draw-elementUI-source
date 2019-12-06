<template>
  <div id="context-menu-container">
    <div class="context-menu">
      <div class="menu-item item1">
        <div class="menu-title">
          <img src="./images/menu.png" alt="">
          <p>图形变换</p>
        </div>
        <div class="change-color">
          <img src="./images/color.png" alt="">
          <p>改变颜色</p>
          <div class="color-select">
            <el-color-picker @change="selectColor" size="mini" v-model="color"></el-color-picker>
          </div>
        </div>
      </div>
      <div class="menu-item item2">
        <div @click="handleScaleBigOne" class="scale-big">
          <img src="./images/scale-big.png" alt="">
          <p>放大</p>
        </div>
        <div @click="handleScaleSmallOne" class="scale-small">
          <img src="./images/scale-small.png" alt="">
          <p>缩小</p>
        </div>
        <div @click="handleRotateOne" class="rotate">
          <img src="./images/rotate.png" alt="">
          <p>旋转</p>
        </div>
      </div>
      <div class="menu-item item3">
        <div @click="handleCopyOne" class="copy">
          <img src="./images/copy.png" alt="">
          <p>复制</p>
        </div>
        <div @click="handleDeleteOne" class="delete">
          <img src="./images/delete.png" alt="">
          <p>删除</p>
        </div>
        <div @click="handleCloseMenu" id="close-item" class="close-menu">
          <img src="./images/close-menu.png" alt="">
          <p>关闭</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: '#000'
    }
  },
  methods: {
    // 关闭菜单栏
    handleCloseMenu () {
      this.$store.dispatch('closeContextMenu')
    },
    // 删除选中的元素
    handleDeleteOne () {
      this.$store.dispatch('deleteOneItem')
    },
    // 放大单个元素
    handleScaleBigOne () {
      this.$store.dispatch('scaleBigOne')
    },
    // 缩小单个元素
    handleScaleSmallOne () {
      this.$store.dispatch('scaleSmallOne')
    },
    // 旋转单个元素
    handleRotateOne () {
      this.$store.dispatch('rotateOne')
    },
    // 复制单个
    handleCopyOne () {
      this.$store.dispatch('copyOne')
    },
    // 选择颜色
    selectColor (color) {
      this.$store.dispatch('changeOneColor', {color})
    }
  }
}
</script>

<style lang="less" scoped>
  .context-menu {
    user-select: none;
    font-family: 幼圆;
    font-size: 12px;
    width: 100px;
    height: 250px;
    cursor: pointer;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #555;

    .menu-item {
      width: 100%;
      height: 33.333333%;

      &.item1 {
        display: flex;
        flex-direction: column;
        border-bottom: 1px dashed #555;

        .menu-title {
          width: 100%;
          height: 50%;
          display: flex;
          font-size: 14px;
          align-items: center;
          font-weight: bold;
          border-bottom: 1px solid #555;

          img {
            width: 20%;
          }

          p {
            width: 80%;
          }
        }

        .change-color {
          width: 100%;
          height: 50%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 50%;
          }

          .color-select {
            width: 35%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
        }
      }

      &.item2 {
        display: flex;
        flex-direction: column;
        border-bottom: 1px dashed #555;

        .scale-big {
          width: 100%;
          height: 33.33333333%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 80%;
          }
        }

        .scale-small {
          width: 100%;
          height: 33.33333333%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 80%;
          }
        }

        .rotate {
          width: 100%;
          height: 33.33333333%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 80%;
          }
        }
      }

      &.item3 {
        display: flex;
        flex-direction: column;

        .copy {
          width: 100%;
          height: 33.33333333%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 80%;
          }
        }

        .delete {
          width: 100%;
          height: 33.33333333%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 80%;
          }
        }

        .close-menu {
          width: 100%;
          height: 33.33333333%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px dashed #555;

          &:hover {
            color: #409EFF;
          }

          img {
            width: 15%;
          }

          p {
            width: 80%;
          }
        }
      }
    }
  }
</style>
