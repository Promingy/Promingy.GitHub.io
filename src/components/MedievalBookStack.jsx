import { useGLTF } from '@react-three/drei'

export default function MedievalBookStack(props) {
  const { nodes, materials } = useGLTF('models/medieval_book_stack.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.book1_low1_books_0.geometry} material={materials.books} position={[-2.033, 13.703, -0.039]} scale={20.623} />
    </group>
  )
}

useGLTF.preload('models/medieval_book_stack.glb')
