import * as Three from 'three'

export const initRender = () => {
    const { scene, camera } = createContainer()
    const { cube } = createContext()

    /** 默认情况下，当我们调用 scene.add() 的时候，物体将会被添加到 (0,0,0) 坐标 */
    scene.add(cube)

    camera.position.z = 5

    const { renderer } = createRenderer()

    /** 将渲染器的dom元素添加到HTML节点上 - 看不到任何物体 -> 此时还没有进行真正的渲染 */
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

function createContainer() {
    /** Scene： 场景实例 */
    const scene = new Three.Scene()
    /** PerspectiveCamera: 透视摄像机 */
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    return { scene, camera }
}

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

function createRenderer() {
    /** 创建渲染器 */
    const renderer = new Three.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    return { renderer }
}
