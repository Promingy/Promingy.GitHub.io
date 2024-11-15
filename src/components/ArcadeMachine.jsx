import { Cloud, Clouds, Float, useGLTF } from '@react-three/drei'
import LoadProject from './LoadProject'
import NavText from './Text'
import LoadImage from './LoadImage'
import { useEffect, useState } from 'react'
import { useAppContext } from '../context'
import Data from '../data.json'
import { useThree, useFrame } from '@react-three/fiber'
import { MeshBasicMaterial } from 'three'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb')
  const [ staticImage, setStaticImage  ] = useState({...Data.images.loadingImage})
  const [ hovered, setHovered ] = useState(false)
  const [ opacity, setOpacity ] = useState(0)
  const { controls } = useThree();
  const context = useAppContext()

  const cloudPosition = [...Data[props.name].cloudPosition]

  useEffect(() => {
    if(context.defaultImage) {
      setStaticImage({...Data[props.name].image})
    }
  }, [context.defaultImage])

  useFrame(() => {
    if (hovered && opacity < 1 && (context.lookingAt == 'none' || context.lookingAt == 'projects')) setOpacity(opacity + 0.0025)
    else if (opacity > 0) setOpacity(opacity - 0.0075);
  })

  return (
    <>
      {context.lookingAt != props.name ? 
          <LoadImage {...staticImage}/>
          :
          <>
            <LoadProject  {...Data[props.name].loadProject}/>
            {Data[props.name].nextProject && <NavText {...Data[props.name].nextProject}/>}
            {Data[props.name].previousProject && <NavText {...Data[props.name].previousProject}/>}
            <NavText {...Data[props.name].backText}/>
          </>
        }
      {opacity && 
      <Float floatingRange={[-1, 1]} rotationIntensity={0} speed={5}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud
            fade={10}
            color='grey'
            opacity={opacity}
            speed={1}
            scale={[4, 2, 4]}
            position={cloudPosition}
            rotation={[0, Math.PI / 2, 0]}
            seed={.52}
          />
          <Cloud 
            fade={10}
            color='grey'
            opacity={opacity}
            speed={1}
            scale={[4, 2, 4]}
            position={[cloudPosition[0] - 10, ...cloudPosition.slice(1)]}
            rotation={[0, Math.PI / 2, 0]}
            seed={.52}
          />
        </Clouds>
      </Float>}
      <mesh 
        geometry={nodes.Cube001_10011_0.geometry} 
        material={materials['Baked.001']} 
        position={[0, 0.015, 0]} 
        scale={0.985} 
        {...props} 
        onPointerOver={(e) => {
          if (context.lookingAt == "none" || context.lookingAt == 'projects'){
            setHovered(true)
            context.handlePointerIn(e); 
          }
        }}
        onPointerOut={(e) => {
          if (context.lookingAt == "none" || context.lookingAt == 'projects'){
            setHovered(false)
            context.handlePointerOut(e); 
          }
        }}
        onClick={(e) => {
          if (context.lookingAt == "none" || context.lookingAt == 'projects'){
            setHovered(false)
            context.handleClick(e, controls, props)
          }
        }}
      />
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')
