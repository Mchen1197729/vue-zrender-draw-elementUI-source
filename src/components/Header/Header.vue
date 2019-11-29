<template>
  <div class="header">
    <div @click="handleImportImage" class="load-img">
      <el-button type="success">导入图片</el-button>
      <input v-show="false" id="file" multiple type="file">
      <!--images容器-->
      <div id="img-box" style="display: none;"></div>
    </div>
    <div @click="handleCreateFile" class="save-file">
      <el-button type="success">保存文件</el-button>
    </div>
    <div @click="handleOpenFile" class="open-file">
      <el-button type="success">打开文件</el-button>
      <input v-show="false" id="open-file" type="file">
    </div>
    <div @click="handleCreateImage" class="create-img">
      <el-button type="success">生成图片</el-button>
      <!--a链接的容器-->
      <a v-show="false" id="download-link" download="image.png" href=""></a>
    </div>
    <div @click="handleClearMap" class="clear-map">
      <el-button type="success">清除画布</el-button>
    </div>
    <div class="line-select">
      <el-select @change="selectLineType" v-model="line" placeholder="选择线型">
        <el-option v-for="item in lines" :key="item.value" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="shape-select">
      <el-select @change="selectShape" v-model="shape" placeholder="选择形状">
        <el-option v-for="item in shapes" :key="item.value" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="width-select">
      <el-select @change="selectLineWidth" v-model="width" placeholder="选择线宽">
        <el-option v-for="item in widths" :key="item.value" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="color-select">
      <el-color-picker @change="selectColor" v-model="color"></el-color-picker>
    </div>
    <div class="current-trans">
      <el-tag type="success">倍数：<span style="color:#F56C6C;">{{scaleDegree.toFixed(2)}}</span></el-tag>
      <el-tag type="success">横坐标：<span style="color:#F56C6C;">{{positionArr[0].toFixed(2)}}px</span></el-tag>
      <el-tag type="success">纵坐标：<span style="color:#F56C6C;">{{positionArr[1].toFixed(2)}}px</span></el-tag>
    </div>
  </div>
</template>

<script>
  import download from '../../utils/download'
  import {mapState} from 'vuex'

  export default {
    mounted () {
      //得到images容器
      let imgBox = document.getElementById('img-box')
      //得到a链接容器
      this.aLink = document.getElementById('download-link')
      //得到上传文件的input对象
      this.fileInput = document.getElementById('file')
      //监听inout的点击事件
      this.fileInput.onchange = (e) => {
        if (e.target.files.length) {
          for (let file of e.target.files) {
            let reader = new FileReader()
            reader.onload = (e) => {
              let img = new Image()
              img.onload = () => {
                this.$store.dispatch('importImage', {
                  url: e.target.result,
                  width: img.width,
                  height: img.height
                })
              }
              img.src = e.target.result
              imgBox.appendChild(img)
            }
            reader.readAsDataURL(file)
          }
        }
      }
      //得到打开文件的input对象
      this.openFileInput = document.getElementById('open-file')
      //监听openFileInput的点击事件
      this.openFileInput.onchange = (e) => {
        if (e.target.files.length) {
          let file = e.target.files[0]
          let reader = new FileReader()
          reader.onload = (e) => {
            //防止用户导入非法的文件
            try {
              this.$store.dispatch('openLegalFile', {shapeData: JSON.parse(e.target.result)})
            } catch (e) {
              //提示用户
              this.$message({
                duration: 1500,
                message: '文件格式不合法',
                type: 'error'
              })
            }
          }
          reader.readAsText(file)
        }
      }
    },
    data () {
      return {
        color: '#000',
        line: '',
        lines: [
          {value: '实线'},
          {value: '虚线'}
        ],
        shape: '',
        shapes: [
          {value: '任意直线'},
          {value: '矩形'},
          {value: '圆'},
          {value: '水平线'},
          {value: '垂直线'}
        ],
        width: '',
        widths: [
          {value: 1},
          {value: 2},
          {value: 3},
          {value: 4},
          {value: 5},
          {value: 6},
          {value: 7},
          {value: 8},
          {value: 9},
          {value: 10}
        ],
      }
    },
    methods: {
      //生成文件
      handleCreateFile () {
        //派发生成文件的事件
        this.$store.dispatch('createFile')
      },
      //打开文件
      handleOpenFile () {
        //触发openFileInput的onchange的事件
        this.openFileInput.dispatchEvent(new MouseEvent('click'))
      },
      //生成图片
      handleCreateImage () {
        //初始化canvas对象
        let curCanvas = document.getElementsByTagName('canvas')[0]
        try {
          download(curCanvas.toDataURL('image/webp'), 'image.png', 'image/png')
        } catch (e) {
          //提示用户
          this.$message({
            duration: 1500,
            message: '您还没未作画',
            type: 'error'
          })
        }
      },
      //导入图片
      handleImportImage () {
        //主动触发input的点击事件
        this.fileInput.dispatchEvent(new MouseEvent('click'))
      },
      //清除画布
      handleClearMap () {
        //询问用户是否真的要清除画布
        this.$confirm('是否确定要清除画布？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //派发清除画布的事件
          this.$store.dispatch('clearMap')
          this.$message({
            type: 'success',
            duration: 1500,
            message: '成功清除画布!'
          })
        }).catch(() => {

        })
      },
      //选择线型
      selectLineType (lineDash) {
        if (lineDash === '实线') {
          lineDash = null
        } else if (lineDash === '虚线') {
          lineDash = [5, 5]
        }
        this.$store.dispatch('selectLineType', {lineDash})
      },
      //选择形状
      selectShape (shape) {
        if (shape === '任意直线') {
          shape = 'Line'
        } else if (shape === '矩形') {
          shape = 'Rectangle'
        } else if (shape === '圆') {
          shape = 'Circle'
        } else if (shape === '水平线') {
          shape = 'HLine'
        } else if (shape === '垂直线') {
          shape = 'VLine'
        }
        this.$store.dispatch('selectShape', {lineType: shape})
      },
      //选择线宽
      selectLineWidth (lineWidth) {
        this.$store.dispatch('selectLineWidth', {lineWidth})
      },
      //选择颜色
      selectColor (color) {
        this.$store.dispatch('selectColor', {color})
      },
    },
    computed: {
      ...mapState(['scaleDegree', 'positionArr'])
    }
  }
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    background-color: #FBFBFB;

    .load-img {
      width: 100px;
      height: 30px;
      margin-left: 10px;
      margin-right: 5px;
    }

    .save-file {
      width: 100px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .open-file {
      width: 100px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .create-img {
      width: 100px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .clear-map {
      width: 100px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .line-select {
      width: 110px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .shape-select {
      width: 110px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .width-select {
      width: 110px;
      height: 30px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .color-select {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      margin-right: 15px;
    }

    .current-trans {
      //width: 360px;
      height: 30px;
      line-height: 40px;
      //background-color: pink;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>
