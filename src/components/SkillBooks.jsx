import { useGLTF, Detailed, meshBounds, Float, Clouds, Cloud } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import { useAppContext } from '../context'
import { clearTimeouts } from './Camera'
import { MeshBasicMaterial } from 'three'

export default function SkillBooks(props) {
  const { nodes, materials } = useGLTF(`models/low-res/skill_books.glb`)
  const { materials: midMats } = useGLTF(`models/mid-res/skill_books.glb`)
  const { materials: highMats } = useGLTF(`models/high-res/skill_books.glb`)
  const [opacity, setOpacity] = useState(0)
  const [hovered, setHovered] = useState(false)
  const context = useAppContext()
  const { controls } = useThree();

  useFrame(() => {
    if (hovered && opacity < 1) setOpacity(opacity + 0.005)
    else if (!hovered && opacity > 0) setOpacity(opacity - 0.0075);
  })

  
  const handleClick = useCallback(() => {
    context.setPan(false);
    context.setTransition(true)
    context.toggleTransitionTimeout(false)

    clearTimeouts();
    clearTimeout(context.panTimeout);

    context.whoosh.play();

    if (context.lookingAt == 'skills') {
      context.setLookingAt('none')
      
      controls.setLookAt(-200, 175, 200, 0, 0, 0,true)
      context.toggleTransitionTimeout(true)
    }
    else {
      context.setLookingAt('skills')
      controls.setLookAt(44, 47, -15, 48, 47, -15, true)
    }
}, [controls, context.setPan, context.whoosh])

  return (
    <>
    <Float floatingRange={[0, 1]} rotationIntensity={0} speed={5}>
      <Clouds material={MeshBasicMaterial}>
        <Cloud fade={0} opacity={opacity} seed={.24} color="papayawhip" speed={1} scale={1.25} position={[54, 42, -14]} rotation={[0, Math.PI / 2, 0]}/>
      </Clouds>
    </Float>
    <Detailed raycast={meshBounds} {...props} distances={[0, 15, 80]} 
    onPointerOver={(e) => {
      context.handlePointerIn(e);
      setHovered(true);
    }} 
    onPointerOut={(e) => {
      context.handlePointerOut(e);
      setHovered(false);
    }} 
    onClick={handleClick}>
    <group dispose={null}>
      <mesh geometry={nodes.Box002_ORANGE_0.geometry} material={highMats.ORANGE} position={[-30.927, 3.112, -56.585]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box003_RED_0.geometry} material={highMats.material} position={[-30.573, 14.017, -57.247]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box004_blue_0.geometry} material={highMats.blue} position={[-30.79, 35.178, -57.33]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box005_black_0.geometry} material={highMats.black} position={[-30.601, 24.85, -57.835]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box006_green_0.geometry} material={highMats.green} position={[-28.765, 40.406, -58.626]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box007_purple_0.geometry} material={highMats.purple} position={[-28.721, 30.078, -58.127]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box008_pink_0.geometry} material={highMats.pink} position={[-29.499, 19.245, -57.192]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box009_Cyan_0.geometry} material={highMats.Cyan} position={[-29.086, 8.34, -57.639]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box002_ORANGE_0001.geometry} material={highMats['ORANGE.001']} position={[-30.927, 45.554, -58.275]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box003_RED_0001.geometry} material={highMats['material.001']} position={[-30.573, 56.459, -58.937]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box004_blue_0001.geometry} material={highMats['blue.001']} position={[-30.79, 77.62, -59.02]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box005_black_0001.geometry} material={highMats['black.001']} position={[-30.601, 67.292, -59.525]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box006_green_0001.geometry} material={highMats['green.001']} position={[-28.765, 82.848, -60.316]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box007_purple_0001.geometry} material={highMats['purple.001']} position={[-28.721, 72.52, -59.817]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box008_pink_0001.geometry} material={highMats['pink.001']} position={[-29.499, 61.687, -58.882]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box009_Cyan_0001.geometry} material={highMats['Cyan.001']} position={[-29.086, 50.782, -59.329]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
    </group>
    <group dispose={null}>
      <mesh geometry={nodes.Box002_ORANGE_0.geometry} material={midMats.ORANGE} position={[-30.927, 3.112, -56.585]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box003_RED_0.geometry} material={midMats.material} position={[-30.573, 14.017, -57.247]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box004_blue_0.geometry} material={midMats.blue} position={[-30.79, 35.178, -57.33]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box005_black_0.geometry} material={midMats.black} position={[-30.601, 24.85, -57.835]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box006_green_0.geometry} material={midMats.green} position={[-28.765, 40.406, -58.626]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box007_purple_0.geometry} material={midMats.purple} position={[-28.721, 30.078, -58.127]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box008_pink_0.geometry} material={midMats.pink} position={[-29.499, 19.245, -57.192]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box009_Cyan_0.geometry} material={midMats.Cyan} position={[-29.086, 8.34, -57.639]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box002_ORANGE_0001.geometry} material={midMats['ORANGE.001']} position={[-30.927, 45.554, -58.275]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box003_RED_0001.geometry} material={midMats['material.001']} position={[-30.573, 56.459, -58.937]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box004_blue_0001.geometry} material={midMats['blue.001']} position={[-30.79, 77.62, -59.02]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box005_black_0001.geometry} material={midMats['black.001']} position={[-30.601, 67.292, -59.525]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box006_green_0001.geometry} material={midMats['green.001']} position={[-28.765, 82.848, -60.316]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box007_purple_0001.geometry} material={midMats['purple.001']} position={[-28.721, 72.52, -59.817]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box008_pink_0001.geometry} material={midMats['pink.001']} position={[-29.499, 61.687, -58.882]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box009_Cyan_0001.geometry} material={midMats['Cyan.001']} position={[-29.086, 50.782, -59.329]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
    </group>
    <group dispose={null}>
      <mesh geometry={nodes.Box002_ORANGE_0.geometry} material={materials.ORANGE} position={[-30.927, 3.112, -56.585]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box003_RED_0.geometry} material={materials.material} position={[-30.573, 14.017, -57.247]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box004_blue_0.geometry} material={materials.blue} position={[-30.79, 35.178, -57.33]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box005_black_0.geometry} material={materials.black} position={[-30.601, 24.85, -57.835]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box006_green_0.geometry} material={materials.green} position={[-28.765, 40.406, -58.626]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box007_purple_0.geometry} material={materials.purple} position={[-28.721, 30.078, -58.127]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box008_pink_0.geometry} material={materials.pink} position={[-29.499, 19.245, -57.192]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box009_Cyan_0.geometry} material={materials.Cyan} position={[-29.086, 8.34, -57.639]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box002_ORANGE_0001.geometry} material={materials['ORANGE.001']} position={[-30.927, 45.554, -58.275]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box003_RED_0001.geometry} material={materials['material.001']} position={[-30.573, 56.459, -58.937]} rotation={[-Math.PI / 2, 0, -0.061]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box004_blue_0001.geometry} material={materials['blue.001']} position={[-30.79, 77.62, -59.02]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box005_black_0001.geometry} material={materials['black.001']} position={[-30.601, 67.292, -59.525]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box006_green_0001.geometry} material={materials['green.001']} position={[-28.765, 82.848, -60.316]} rotation={[-Math.PI / 2, 0, -0.067]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box007_purple_0001.geometry} material={materials['purple.001']} position={[-28.721, 72.52, -59.817]} rotation={[-Math.PI / 2, 0, -0.105]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box008_pink_0001.geometry} material={materials['pink.001']} position={[-29.499, 61.687, -58.882]} rotation={[-Math.PI / 2, 0, -0.036]} scale={[26.586, 17.029, 5.141]} />
      <mesh geometry={nodes.Box009_Cyan_0001.geometry} material={materials['Cyan.001']} position={[-29.086, 50.782, -59.329]} rotation={[-Math.PI / 2, 0, 0]} scale={[26.586, 17.029, 5.141]} />
    </group>
    </Detailed>
    </>
  )
}

useGLTF.preload('models/low-res/skill_books.glb')
useGLTF.preload('models/mid-res/skill_books.glb')
useGLTF.preload('models/high-res/skill_books.glb')
