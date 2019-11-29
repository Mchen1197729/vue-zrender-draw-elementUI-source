//画图片的函数
import zrender from 'zrender'

function drawImage ({url, x, y, width, height}) {
  return new zrender.Image({
    draggable: true,
    shape: {},
    style: {x, y, width, height, image: url},
  })
}

export default drawImage
