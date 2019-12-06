<template>
  <div class="app">
    <Header/>
    <Draw/>
    <div v-show="isContextMenuShow" id="menu-container">
      <Menu/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import Header from './components/Header/Header'
import Draw from './components/Draw/Draw'
import Menu from './components/Menu/Menu'

export default {
  mounted () {
    // 获取转换菜单的包围盒子元素
    let menuContainer = document.getElementById('menu-container')
    this.$store.dispatch('initMenuContainer', {menuContainer})
    // 监听键盘的上下左右键的点击事件
    window.addEventListener('keyup', (e) => {
      console.log(e.code)
      if (e.code === 'ArrowUp') {
        this.$store.dispatch('moveUpMap')
      } else if (e.code === 'ArrowDown') {
        this.$store.dispatch('moveDownMap')
      } else if (e.code === 'ArrowLeft') {
        this.$store.dispatch('moveLeftMap')
      } else if (e.code === 'ArrowRight') {
        this.$store.dispatch('moveRightMap')
      }
    })
    // 调用userTips
    this.userTips()
  },
  data () {
    return {}
  },
  methods: {
    // 提示用户放大缩小以及拖动以及鼠标右键的详细信息
    userTips () {
      const htmlStr = `
          <div style="color: #F56C6C;font-size: 14px;">1.使用鼠标滚轮滚动可以实现画布的缩放功能</div>
          <div style="color: #F56C6C;font-size: 14px;margin: 10px 0;">2.按住鼠标滚轮拖动可以实现画布的平移功能</div>
          <div style="color: #F56C6C;font-size: 14px;">3.鼠标悬停在画好的形状上方右键可以弹出操作菜单栏</div>
        `
      this.$alert(htmlStr, '~贴心小提示~', {
        dangerouslyUseHTMLString: true,
        showClose: false
      })
    }
  },
  computed: {
    ...mapState(['isContextMenuShow'])
  },
  components: {
    Header, Draw, Menu
  }
}
</script>

<style lang="less" scoped>
  .app {
    width: 100%;
    height: 100%;
    overflow: hidden;

    #menu-container {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
