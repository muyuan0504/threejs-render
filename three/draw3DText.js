/** 如何处理3D文字
 * 1. 创建场景、相机和渲染器：这些是Three.js应用的基本组成部分
 * 2. 加载字体：使用THREE.FontLoader加载字体文件（通常是JSON格式）
 * 3. 创建文本几何体：使用加载的字体创建文本几何体
 * 4. 创建材质并将其应用于文本几何体
 * 5. 将文本添加到场景中并进行渲染
 */

import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
// TextGeometry: 几何文字
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

export function draw3DText() {
    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    document.body.appendChild(renderer.domElement)

    // 创建光源
    const light = new THREE.PointLight(0xffffff, 10, 100)
    light.position.set(10, 10, 10)
    scene.add(light)

    // 加载字体
    const loader = new FontLoader()
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        console.log(font)
        // 创建文本几何体
        const textGeometry = new TextGeometry('Hello, THREE.js!', {
            font: font,
            size: 1, // Float. Size of the text. Default is 100. 字体大小
            height: 0.2,
            // depth: 5, // Float. Thickness to extrude text. Default is 50 字体粗度
            curveSegments: 12, // Integer. Number of points on the curves. Default is 12
            bevelEnabled: true, // Boolean. Turn on bevel. Default is False， 字体倾斜
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelSegments: 5,
        })

        // 创建材质
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })

        // 创建文本网格
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(textMesh)

        // 渲染场景
        function animate() {
            requestAnimationFrame(animate)
            textMesh.rotation.y += 0.01 // 使文字旋转
            renderer.render(scene, camera)
        }
        animate()
    })

    // 处理窗口调整大小
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    })
}
