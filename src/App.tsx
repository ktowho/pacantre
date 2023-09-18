import { PointerLockControls, KeyboardControls } from "@react-three/drei"
import { Box } from "./Box"
import { Floor } from "./Floor"
import { Player } from "./Player"


export const App = () => {

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
      ]}
    >
      <PointerLockControls />

      <ambientLight intensity={1} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Floor
        position={[0, -2, 0]}
        rotation-x={[- Math.PI * 0.5]}
        scale={100}
      />
      <Player />
    </KeyboardControls>
  )
}

