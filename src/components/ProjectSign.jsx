import { useGLTF } from '@react-three/drei'

export default function ProjectSign(props) {
  const { nodes, materials } = useGLTF('models/project_sign.glb')

  return (
    <group {...props} dispose={null}>
      <mesh receiveShadow geometry={nodes.Projects.geometry} material={materials.emission} position={[-11.334, -0.388, 15.094]} rotation={[Math.PI / 2, 0, 0]} scale={161.487} />
      <mesh receiveShadow geometry={nodes.Cylinder001_cables_0.geometry} material={materials.cables} position={[-21.372, 6.62, 9.873]} scale={[186.782, 262.504, 252.408]} />
      <mesh receiveShadow geometry={nodes.Cylinder001_cover_0.geometry} material={materials.cover} position={[-8.966, 0.004, -1.67]} scale={[195.926, 275.355, 264.765]} />
      <mesh receiveShadow geometry={nodes.Cylinder001_wall_mount_0.geometry} material={materials.wall_mount} position={[-9.135, 0.271, -20.788]} scale={[179.566, 252.364, 242.657]} />
    </group>
  )
}

useGLTF.preload('models/project_sign.glb')
