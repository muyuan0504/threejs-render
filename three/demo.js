import * as Three from 'three'

// 场景、相机和渲染器是Three.js应用的基本组成部分

export function demoShow() {
    // 构建渲染器
    const { renderer } = createRenderer()
    // 构建场景与摄像机
    const { scene, camera } = createContainer()
    // 构建渲染物体
    const { cube } = createContext()

    /** 默认情况下调用 scene.add()，物体将会被添加到 (0,0,0) 坐标 */
    scene.add(cube)

    /** 将渲染器的dom元素 - canvas 添加到HTML节点上 - 看不到任何物体 -> 此时还没有进行真正的渲染 */
    document.body.appendChild(renderer.domElement)

    /** 创建了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环 */
    function animate() {
        requestAnimationFrame(animate) // 递归调用动画
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
    }
    setTimeout(() => {
        animate()
    }, 2000)
}

/** 创建场景实例 */
function createContainer() {
    /** Scene： 场景实例 */
    const scene = new Three.Scene()
    /**
     * PerspectiveCamera: 透视摄像机
     * PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
     * fov：视野角度 - 摄像机视锥体垂直视野角度
     * aspect：长宽比 - 摄像机视锥体长宽比
     * near：近截面 - 摄像机视锥体近端面
     * far：远截面 - 摄像机视锥体远端面
     * 这些参数一起定义了摄像机的viewing frustum（视锥体）
     *
     * 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中
     */
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // .position 设置相机在三维坐标中的位置   camera.position.set(0,0,0);
    camera.position.z = 5

    return { scene, camera }
}

/** 创建渲染物体 */
function createContext() {
    /**
     * BoxGeometry：立方体实例
     * MeshBasicMaterial: 材质实例
     * Mesh：网格实例，网格包含一个几何体以及作用在此几何体上的材质
     */
    const geometry = new Three.BoxGeometry(1, 1, 1)
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Three.Mesh(geometry, material)

    return { cube }
}

/** 创建渲染实例 */
function createRenderer() {
    /**
     * 创建渲染器
     * WebGLRenderer：WebGL渲染器，Three.js还提供了其他几种渲染器
     * 通过 setSize 来设置长宽尺寸, 如果需要以较低的分辨率来渲染，调用 setSize 时，将 updateStyle（第三个参数）设为 false
     */
    const renderer = new Three.WebGLRenderer()
    const width = parseInt(window.innerWidth / 2)
    const height = parseInt(window.innerHeight / 2)
    // renderer.setSize(width, height, false)
    renderer.setSize(width, height)
    return { renderer }
}
