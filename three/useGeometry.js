import * as THREE from 'three'
/** 几何体 */

export const useGeometry = () => {
    // 构建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)

    // 构建相机
    const camera = new THREE.PerspectiveCamera(30, 9 / 16, 0.1, 1000)
    camera.position.z = 10

    // 构建场景
    const scene = new THREE.Scene()

    //  添加物体对象
    // const { cube: renderBox } = useBoxGeometry()
    // const { capsule: renderBox } = useCapsuleGeometry()
    // const { circle: renderBox } = useCircleGeometry()
    const { cone: renderBox } = useConeGeometry()
    scene.add(renderBox)

    // 添加渲染对象
    document.body.appendChild(renderer.domElement)

    function animate() {
        requestAnimationFrame(animate)

        renderBox.rotation.x += 0.01
        renderBox.rotation.y += 0.01

        renderer.render(scene, camera)
    }
    animate()
}

/** 构造立方缓冲几何体 */
function useBoxGeometry() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Line(geometry, material)
    return { cube }
}

/** 构造胶囊图形类 */
function useCapsuleGeometry() {
    const geometry = new THREE.CapsuleGeometry(0.5, 2, 5, 10)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const capsule = new THREE.Line(geometry, material)
    return { capsule }
}

/** 构造圆形缓冲几何体 */
function useCircleGeometry() {
    const geometry = new THREE.CircleGeometry(0.5, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const circle = new THREE.Line(geometry, material)
    return { circle }
}

/** 构造圆锥缓冲几何体 */
function useConeGeometry() {
    const geometry = new THREE.ConeGeometry(0.5, 2, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const cone = new THREE.Line(geometry, material)
    return { cone }
}
