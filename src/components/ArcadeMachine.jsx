import { useGLTF } from '@react-three/drei'
import LoadProject from './LoadProject'
import Data from '../data.json'
import LoadImage from './LoadImage'
import SmallText from './SmallText'
import { usePan } from '../main'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb')
  const { lookingAt } = usePan()
  // materials.Body.side = 0
  return (
    <>
    {lookingAt != props.name ? 
        <LoadImage {...Data[props.name].image} />
        :
        <>
          <LoadProject  {...Data[props.name].loadProject}/>
            <SmallText {...Data[props.name].switchProject}/>
            <SmallText {...Data[props.name].backText}/>
        </>
      }
    <group {...props} dispose={null}>
      <mesh receiveShadow geometry={nodes.Cube001_10011_0.geometry} material={materials['10011']} position={[0, 0.015, 0]} scale={0.985} />
      <mesh receiveShadow geometry={nodes.Cylinder001_1001_0.geometry} material={materials['1001']} position={[0.271, -0.165, 0.001]} scale={0.306} />
    </group>
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')
