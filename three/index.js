import WebGL from 'three/addons/capabilities/WebGL.js'

import { demoShow } from './demo'
import { drawingLines } from './drawLine'
import { draw3DText } from './draw3DText'
import { useCamera, useCubeCamera } from './aboutCamera'
import { useGeometry } from './useGeometry'

export const initRender = () => {
    /** WebGL 的浏览器支持检测 */
    if (WebGL.isWebGL2Available()) {
        console.log('支持WebGL')
    } else {
        const warning = WebGL.getWebGL2ErrorMessage()
        document.getElementById('container').appendChild(warning)
        return
    }

    // useCamera()
    // useCubeCamera()
    // demoShow()
    // draw3DText()
    // drawingLines()
    useGeometry()
}
