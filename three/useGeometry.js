/** 几何体 */

import * as THREE from 'three'

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
    // const { cone: renderBox } = useConeGeometry()
    // const { cylineder: renderBox } = useCylinderGeometry()
    const { ring: renderBox } = useRingGeometry()
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

/** 构造立方缓冲几何体
 * BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
 * width — X 轴上面的宽度，默认值为 1
 * height — Y 轴上面的高度，默认值为 1
 * depth — Z 轴上面的深度，默认值为 1
 * widthSegments — （可选）宽度的分段数，默认值是 1
 * heightSegments — （可选）高度的分段数，默认值是 1
 * depthSegments — （可选）深度的分段数，默认值是 1
 */
function useBoxGeometry() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Line(geometry, material)
    return { cube }
}

/** 构造胶囊图形类
 * CapsuleGeometry(radius : Float, length : Float, capSegments : Integer, radialSegments : Integer)
 * radius — 胶囊半径。可选的; 默认值为1
 * length — 中间区域的长度。可选的; 默认值为1
 * capSegments — 构造盖子的曲线部分的个数。可选的; 默认值为4
 * radialSegments — 覆盖胶囊圆周的分离的面的个数。可选的; 默认值为8
 */
function useCapsuleGeometry() {
    const geometry = new THREE.CapsuleGeometry(0.5, 2, 5, 10)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const capsule = new THREE.Line(geometry, material)
    return { capsule }
}

/** 构造圆形缓冲几何体
 * CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
 * radius — 圆形的半径，默认值为1
 * segments — 分段（三角面）的数量，最小值为3，默认值为32
 * thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
 * thetaLength — 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆
 */
function useCircleGeometry() {
    const geometry = new THREE.CircleGeometry(0.5, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const circle = new THREE.Line(geometry, material)
    return { circle }
}

/** 构造圆锥缓冲几何体
 * ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
 * radius — 圆锥底部的半径，默认值为1
 * height — 圆锥的高度，默认值为1
 * radialSegments — 圆锥侧面周围的分段数，默认为32
 * heightSegments — 圆锥侧面沿着其高度的分段数，默认值为1
 * openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的
 * thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
 * thetaLength — 圆锥底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆锥
 */
function useConeGeometry() {
    const geometry = new THREE.ConeGeometry(0.5, 2, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const cone = new THREE.Line(geometry, material)
    return { cone }
}

/** 构造圆柱缓冲几何体 */
function useCylinderGeometry() {
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const cylineder = new THREE.Line(geometry, material)
    return { cylineder }
}

/** 构造圆环缓冲几何体
 * RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
 * innerRadius — 内部半径，默认值为0.5
 * outerRadius — 外部半径，默认值为1
 * thetaSegments — 圆环的分段数。这个值越大，圆环就越圆。最小值为3，默认值为32
 * phiSegments — 圆环半径的分段数字。最小值为1，默认值为1
 * thetaStart — 起始角度，默认值为0
 * thetaLength — 圆心角，默认值为Math.PI * 2
 */
function useRingGeometry() {
    const geometry = new THREE.RingGeometry(0.5, 1, 18, 8, 0, Math.PI * 2)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const ring = new THREE.Line(geometry, material)
    return { ring }
}
