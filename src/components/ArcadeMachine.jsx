import { useGLTF } from '@react-three/drei'
import LoadProject from './LoadProject'
import LoadImage from './LoadImage'
import SmallText from './SmallText'
import { usePan } from '../main'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/comp-arcade.glb')
  const { lookingAt } = usePan()
  // materials.Body.side = 0
  return (
    <>
    {lookingAt == props.name ? 
        <>
          <LoadProject url={props.project} position={[84, 25.5, props.position[2]]}/>
          {lookingAt == 'project1' ?
            <>
            <SmallText
            text='Previous Project'
            position={[85.3, 20.75, 4]}
            size={.5}
            // position={[86.5, 21.75, 5]}
            rotation={[-1.509, 1.425, 1.488]}
            moveTo={[92, 27, 49.75]}
            lookAt={[85, 26, 49.5]}
            hoverColor='#F07F13'
            newLookingAt='project2'
          />
          <SmallText
            text='Back'
            position={[85.2, 20.55, -5]}
            size={.5}
            rotation={[-1.426, 1.400, 1.423]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            hoverColor='#F07F13'
          />
          </>
          :
          <>
          <SmallText
            text='Next Project'
            position={[85.2, 20.55, 45.5]}
            // position={[86.5, 21, 46]}
            rotation={[-1.456, 1.388, 1.453]}
            moveTo={[92, 27, -0.5]}
            lookAt={[85.2, 26, -0.75]}
            size={.5}
            hoverColor='#F07F13'
            newLookingAt='project1'
          />
          <SmallText
            text='Back'
            position={[85.2, 20.75, 55]}
            rotation={[-1.518, 1.426, 1.497]}
            size={.5}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            hoverColor='#F07F13'
          />
          </>
          }
        </>
        :
        <LoadImage
          file={props.name + '.png'}
          rotation={[-1.516, 1.383, 1.514]}
          position={[84, 25.5, props.position[2]]}
          scale={[.115, .09, 1]}
          // position={[85.25, 28, props.position[2]]}
          // scale={[.13, .125, .1]}
          basic
        />
        
      }
    <group {...props} dispose={null}>
      <mesh receiveShadow geometry={nodes.Cube001_10011_0.geometry} material={materials['10011']} position={[0, 0.015, 0]} scale={0.985} />
      <mesh receiveShadow geometry={nodes.Cylinder001_1001_0.geometry} material={materials['1001']} position={[0.271, -0.165, 0.001]} scale={0.306} />
    </group>
    {/* <group {...props} dispose={null}>
      <mesh geometry={nodes.Body_1_Body_0.geometry} material={materials.Body} position={[0.004, 1.013, 0.109]} rotation={[Math.PI, 0, -3.135]} scale={0.995} />
      <mesh geometry={nodes.Null_1_Null_0.geometry} material={materials.Null} position={[0.004, 1.013, 0.109]} rotation={[Math.PI, 0, -3.135]} scale={0.998} />
    </group> */}
    </>
  )
}

useGLTF.preload('models/comp-arcade.glb')
