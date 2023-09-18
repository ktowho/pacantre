import { useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"

export const Player = () => {

  const [subscribeKeys, getKeys] = useKeyboardControls()

  useFrame((state, delta) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys()

    // Привязываем скорость к delta (для одинакового результата на любом fps)
    const moveSpeed: number = delta * 5
    const axisY: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
    const angle: number = Math.PI / 2

    // Получаем направление камеры
    const cameraDirection: THREE.Vector3 = state.camera.getWorldDirection(new THREE.Vector3())

    // Убираем направление по Y, чтобы предотвратить перемещение в этом направлении
    cameraDirection.setY(0)
    
    const setCameraDirection = (moveSpeed: number, rotation: boolean = false) => {
      // Поворот вектора на 90 град. для перемещения "влево-вправо"
      rotation ? cameraDirection.applyAxisAngle(axisY, angle) : null
      state.camera.position.add(cameraDirection.multiplyScalar(moveSpeed))
    }

    // TODO: Движение по диагонали
    if (forward) {
      setCameraDirection(moveSpeed)
    }

    if (backward) {
      setCameraDirection(-moveSpeed)
    }

    if (leftward) {
      setCameraDirection(moveSpeed, true)
    }

    if (rightward) {
      setCameraDirection(-moveSpeed, true)
    }
  })

  useEffect(() => {
    const unsubscribeAny = subscribeKeys(() => { })
    return () => {
      unsubscribeAny()
    }
  })

  return null
}