/**
 * Three.js应用三要素之相机
 */

import * as THREE from 'three'

export function useCamera() {
    const renderer = new THREE.WebGLRenderer()
    const width = parseInt(window.innerWidth / 2)
    const height = parseInt(window.innerHeight / 2)
    // renderer.setSize(width, height, false)
    renderer.setSize(width, height)

    const scene = new THREE.Scene()

    // 创建一个立方球体
    const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x000080, wireframe: true })
    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    document.body.appendChild(renderer.domElement)

    const camera = usePerspectiveCamera()
    // const camera = useOrthographicCamera()
    scene.add(camera)

    function animate() {
        requestAnimationFrame(animate) // 递归调用动画
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
    }
    setTimeout(() => {
        animate()
    }, 2000)

    window.addEventListener('resize', () => {
        console.error('---------- aiden --------------')
        renderer.render(scene, camera)
    })
}

/**
 * - 透视相机（PerspectiveCamera） 是最常用的相机类型，用于模拟人眼的透视效果
 * PerspectiveCamera(fov, aspect, near, far)
 * fov: Field of View, 视锥体垂直视野角度, 【角度越大，视角越远，物体越小】
 * aspect: 纵横比(长宽比)，一般设置为 window.innerWidth / window.innerHeight
 * near: 近平面距离
 * far: 远平面距离
 */
function usePerspectiveCamera() {
    const camera = new THREE.PerspectiveCamera(30, 9 / 16, 0.1, 1000)
    camera.position.z = 10
    return camera
}

/**
 * - 正交相机（OrthographicCamera）用于创建没有透视失真的2D场景或UI界面
 * OrthographicCamera(left, right, top, bottom, near, far);
 * left: 左平面位置
 * right：右平面位置
 * top: 上平面位置
 * bottom: 下平面位置
 * near: 近平面距离
 * far: 远平面距离
 */
function useOrthographicCamera() {
    const aspect = window.innerWidth / window.innerHeight
    const d = 10
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000)
    camera.position.set(20, 20, 20)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    return camera
}

/**
 * - 立方相机（CubeCamera） 用于创建环境映射或反射效果
 *
 * CubeCamera通常不是用来直接查看场景的，而是用来捕捉场景的信息以供其他材质使用;
 * 它的作用是捕捉场景的六个面（上、下、左、右、前、后），然后将这些捕捉的图像用作立方体贴图。这个贴图可以用在反射或折射的材质上
 *
 * CubeCamera(near, far, renderTarget);
 * near: 近平面距离
 * far: 远平面距离
 * renderTarget: WebGL渲染目标
 */
export function useCubeCamera() {
    let scene, camera, renderer, cubeCamera, reflectiveSphere

    function init() {
        // 创建场景
        scene = new THREE.Scene()

        // 创建透视相机
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 10)

        // 创建渲染器
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
        document.body.appendChild(renderer.domElement)

        // 创建立方相机
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128)
        cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget)

        // 创建一个反射材质的球体
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
        const sphereMaterial = new THREE.MeshBasicMaterial({
            envMap: cubeRenderTarget.texture,
        })
        reflectiveSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        reflectiveSphere.position.set(0, 0, 0)
        scene.add(reflectiveSphere)

        // 添加一些环境
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        for (let i = 0; i < 10; i++) {
            const cube = new THREE.Mesh(geometry, material)
            cube.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
            scene.add(cube)
        }

        // 添加光源
        const light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(10, 10, 10)
        scene.add(light)

        // 窗口调整大小处理
        window.addEventListener('resize', onWindowResize)

        // 开始渲染循环
        animate()
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    }

    function animate() {
        requestAnimationFrame(animate)

        // 更新立方相机的环境贴图
        reflectiveSphere.visible = false
        cubeCamera.position.copy(reflectiveSphere.position)
        cubeCamera.update(renderer, scene)
        reflectiveSphere.visible = true

        // 渲染场景
        renderer.render(scene, camera)
    }

    init()
}
