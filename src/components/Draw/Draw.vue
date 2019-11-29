<template>
  <div id="draw" class="draw">

  </div>
</template>

<script>
  import zrender from 'zrender'

  import drawRule from '../../utils/rule/drawRule'
  import Menu from '../Menu/Menu'

  export default {
    mounted () {
      //初始化zrender对象(必须要在mounted声明钩子函数中进行)
      let zr = zrender.init(document.getElementById('draw'))
      this.$store.dispatch('initZrSuccess', {zr})
      //初始化组
      let group = new zrender.Group()
      this.$store.dispatch('initGroupSuccess', {group})
      let picture = document.getElementById('draw')
      //阻止浏览器默认的右键事件
      picture.oncontextmenu = function (e) {
        e.preventDefault()
      }
      drawRule(picture)
      //给picture添加鼠标滚动事件(画布整体缩放功能)
      picture.addEventListener('mousewheel', (e) => {
        let {deltaY} = e
        //deltaY: 100(向下滚动)  -100(向上滚动)
        if (deltaY === 100) {
          this.$store.dispatch('scaleSmallMap')
        } else if (deltaY === -100) {
          this.$store.dispatch('scaleBigMap')
        }
      })
    },
    data () {
      return {}
    },
    components: {
      Menu
    }
  }
</script>

<style lang="less" scoped>
  .draw {
    width: 100%;
    height: 90%;
    border-top: 1px solid #FFE6C2;
    background-color: #FEFFF6;
  }
</style>
