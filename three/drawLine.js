/**
 * 绘制线段
 * Vector3: 3D坐标点，Vector3( x : Float, y : Float, z : Float )
 */

import * as Three from 'three'

export function drawingLines() {
    const renderer = new Three.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    
    const camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    const scene = new Three.Scene()

    //create a blue LineBasicMaterial
    const lineMeterial = new Three.LineBasicMaterial({ color: 0x0000ff })
    // const lineMeterial = new Three.LineDashedMaterial({
    //     color: 0xffffff,
    //     linewidth: 10,
    //     scale: 1,  // The scale of the dashed part of a line. Default is 1
    //     dashSize: 3, // the size of the dash. This is both the gap with the stroke. Default is 3
    //     gapSize: 20, // The size of the gap. Default is 1
    // })
    const points = []
    points.push(new Three.Vector3(-10, 0, 0))
    points.push(new Three.Vector3(0, 10, 0))
    points.push(new Three.Vector3(10, 0, 0))
    const geometry = new Three.BufferGeometry().setFromPoints(points)
    const line = new Three.Line(geometry, lineMeterial)

    scene.add(line)
    renderer.render(scene, camera)
}
