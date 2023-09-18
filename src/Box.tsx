import { ThreeElements } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

export const Box = (props: ThreeElements['mesh']) => {

  const ref = useRef<THREE.Mesh>(null!)

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  
  useFrame((_state, delta) => (ref.current.rotation.x += delta))
  
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <meshNormalMaterial />
    </mesh>
  )
}
