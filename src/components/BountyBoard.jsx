import { useGLTF } from '@react-three/drei'

export default function BountyBoard(props) {
  const { nodes, materials } = useGLTF('models/bounty_board.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['default']} position={[0, 1.643, -0.056]} scale={1.919} />
    </group>
  )
}

useGLTF.preload('models/bounty_board.glb')
