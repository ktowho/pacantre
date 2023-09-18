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

    /**
     * TODO: Скорее всего нужно изменить логику: создать физическое тело (условный шар), к нему присоединить камеру.
     * Существующие недостатки: 1) Движение влево-вправо работает только по осям X и Z
     * 2) Нельзя одновременно двигаться вперед и в сторону (по диагонали)
     * 
     * Возможно, есть хелпер получше. Но в App используется PointerLockControls, разные контроллеры вместе видимо не работают.
     * Поэтому передвижение камеры было решено писать самому. Хотя лучше всего эту функцию выполняет FirstPersonControls
     */

    // Привязываем скорость к delta (для одинакового результата на любом fps)
    let moveSpeed = delta * 5

    const { forward, backward, leftward, rightward } = getKeys()

    // Получаем направление камеры
    const cameraDirection = state.camera.getWorldDirection(new THREE.Vector3())

    const setCameraDirection = (moveSpeed: number, invert: boolean = false) => {
      if (invert)
        // Перезаписываем z и x
        cameraDirection.set(cameraDirection.z, 0, cameraDirection.x)

      // Убираем направление по Y, чтобы предотвратить перемещение в этом направлении
      cameraDirection.set(cameraDirection.x, 0, cameraDirection.z)
      state.camera.position.add(cameraDirection.multiplyScalar(moveSpeed))
    }


    if (forward) {
      setCameraDirection(moveSpeed)
    }

    if (backward) {
      setCameraDirection(-moveSpeed)
    }

    if (leftward) {
      // При x < z, направление меняет знак
      Math.abs(cameraDirection.x) < Math.abs(cameraDirection.z) ? moveSpeed = - moveSpeed : moveSpeed
      setCameraDirection(-moveSpeed, true)
    }

    if (rightward) {
      Math.abs(cameraDirection.x) < Math.abs(cameraDirection.z) ? moveSpeed = - moveSpeed : moveSpeed
      setCameraDirection(moveSpeed, true)
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