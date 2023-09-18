import { ThreeElements } from "@react-three/fiber"

export const Floor = (props: ThreeElements['mesh']) => {
  


  return (
    <mesh
      {...props}
    >
      <planeGeometry />
      <meshNormalMaterial />
    </mesh>
  )
} 