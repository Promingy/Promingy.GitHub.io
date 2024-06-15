import { useGLTF } from '@react-three/drei'
import LoadProject from './LoadProject'
import LoadImage from './LoadImage'
import SmallText from './SmallText'
import { usePan } from '../main'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb')
  const { displayProject } = usePan()
  materials.Body.side = 0
  return (
    <>
    {displayProject == props.name ? 
        <>
          <LoadProject
            url={props.project}
            rotation={[-1.418, 1.368, 1.414]}
            position={[85.147, 28, props.position[2]]}
            scale={[.41, .7, .1]}
          />
          {displayProject == 'project1' ?
            <>
            <SmallText
            text='Previous Project'
            position={[86.5, 21.75, 5]}
            // position={[86.5, 21, 7]}
            rotation={[-1.509, 1.425, 1.488]}
            moveTo={[95, 28, 50]}
            lookAt={[85, 27, 49.5]}
            size={.5}
            depth={0}
            setControls
            hoverColor={'#F07F13'}
            switchProject={'project2'}
          />
          <SmallText
            text='Back'
            position={[86.5, 21.5, -6]}
            rotation={[-1.426, 1.400, 1.423]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            size={.5}
            depth={0}
            setControls
            hoverColor={'#F07F13'}
          />
          </>
          :
          <>
          <SmallText
            text='Next Project'
            position={[86.5, 21.5, 44]}
            // position={[86.5, 21, 46]}
            rotation={[-1.456, 1.388, 1.453]}
            moveTo={[95, 28, -0.5]}
            lookAt={[85.2, 27, -0.75]}
            size={.5}
            depth={0}
            setControls
            hoverColor={'#F07F13'}
            switchProject={'project1'}
          />
          <SmallText
            text='Back'
            position={[86.5, 21.75, 55.5]}
            // position={[86.5, 21, 57]}
            rotation={[-1.518, 1.426, 1.497]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            size={.5}
            depth={0}
            setControls
            hoverColor={'#F07F13'}
          />
          </>
          }
        </>
        :
        <LoadImage
          file={props.name + '.png'}
          rotation={[-1.516, 1.383, 1.514]}
          position={[85.25, 28, props.position[2]]}
          scale={[.13, .125, .1]}
          basic
        />
        
      }
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Body_1_Body_0.geometry} material={materials.Body} position={[0.004, 1.013, 0.109]} rotation={[Math.PI, 0, -3.135]} scale={0.995} />
      <mesh castShadow receiveShadow geometry={nodes.Null_1_Null_0.geometry} material={materials.Null} position={[0.004, 1.013, 0.109]} rotation={[Math.PI, 0, -3.135]} scale={0.998} />
    </group>
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')