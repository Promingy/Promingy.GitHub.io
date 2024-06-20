import { useGLTF, Detailed, useCursor } from '@react-three/drei'
import { NearestFilter } from 'three'
import { useThree } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import { usePan } from '../main'

export default function SkillBooks(props) {
  const { nodes, materials } = useGLTF(`models/low-res/skill_books.glb`)
  const { materials: highMats } = useGLTF(`models/high-res/skill_books.glb`)
  const [hovered, setHovered] = useState(false)
  const { setPan, whoosh, lookingAt, setLookingAt, handlePointerIn, handlePointerOut } = usePan();
  const { controls } = useThree();

  
  const handleClick = useCallback(() => {
    setPan(false);
    whoosh.play();
    controls._removeAllEventListeners();

    if (lookingAt == 'skills') {
      setLookingAt('none')
      
      controls._addAllEventListeners(controls._domElement);

      controls.reset(true)
      setPan(lookingAt == 'none')
    }
    else {
      setLookingAt('skills')
      controls.setLookAt(44, 47, -15, 48, 47, -15, true)
    }
}, [controls, setPan, whoosh])

  for (const key in materials) {
    if (materials[key].isMaterial) {
      materials[key].side = 0;
      materials[key].minFilter = NearestFilter
      materials[key].magFilter = NearestFilter
    }
  }
  return (
    <group {...props} dispose={null} onPointerOver={handlePointerIn} onPointerLeave={handlePointerOut} onClick={handleClick}>
      <mesh receiveShadow geometry={nodes.Box002_ORANGE_0.geometry} material={materials.ORANGE} position={[-30.927, 3.112, -56.585]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box003_RED_0.geometry} material={materials.material} position={[-30.573, 14.017, -57.247]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box004_blue_0.geometry} material={materials.blue} position={[-30.79, 35.178, -57.33]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box005_black_0.geometry} material={materials.black} position={[-30.601, 24.85, -57.835]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box006_green_0.geometry} material={materials.green} position={[-28.765, 40.406, -58.626]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box007_purple_0.geometry} material={materials.purple} position={[-28.721, 30.078, -58.127]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box008_pink_0.geometry} material={materials.pink} position={[-29.499, 19.245, -57.192]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box009_Cyan_0.geometry} material={materials.Cyan} position={[-29.086, 8.34, -57.639]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box002_ORANGE_0001.geometry} material={materials['ORANGE.001']} position={[-30.927, 45.554, -58.275]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box003_RED_0001.geometry} material={materials['material.001']} position={[-30.573, 56.459, -58.937]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box004_blue_0001.geometry} material={materials['blue.001']} position={[-30.79, 77.62, -59.02]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box005_black_0001.geometry} material={materials['black.001']} position={[-30.601, 67.292, -59.525]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box006_green_0001.geometry} material={materials['green.001']} position={[-28.765, 82.848, -60.316]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box007_purple_0001.geometry} material={materials['purple.001']} position={[-28.721, 72.52, -59.817]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box008_pink_0001.geometry} material={materials['pink.001']} position={[-29.499, 61.687, -58.882]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh receiveShadow geometry={nodes.Box009_Cyan_0001.geometry} material={materials['Cyan.001']} position={[-29.086, 50.782, -59.329]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
    </group>
  )
}

useGLTF.preload('models/low-res/skill_books.glb')
