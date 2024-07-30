/** 使用灯光 */

import * as THREE from 'three'

export const useLight = () => {
    // 构建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)

    // 构建相机
    const camera = new THREE.PerspectiveCamera(30, 9 / 16, 0.1, 1000)
    camera.position.z = 10

    // 构建场景
    const scene = new THREE.Scene()

    //  添加物体对象
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // 打灯
    const pointLight = new THREE.PointLight(0xffffff, 1, 100) // 白色光，强度为1，距离为100
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)
    pointLight.castShadow = true // 设置阴影

    // 添加渲染对象
    document.body.appendChild(renderer.domElement)

    function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
    }
    animate()
}
