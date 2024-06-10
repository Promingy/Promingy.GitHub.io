import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../../Playball_Regular.json'
import { useState } from 'react'
import { clearTimeouts } from '../Camera/Camera'
import { usePan } from '../../main'

extend({ TextGeometry })




export default function SmallText({text, size, depth, position, rotation, moveTo, lookAt, setControls, hoverColor=0xff0000, baseColor=0xffffff}) {
    const font = new FontLoader().parse(Playball)
    const [color, setColor] = useState(baseColor || 0xffffff)
    const {controls} = useThree()
    const { pan, setPan } = usePan() 



    return (
        <mesh
            // castShadow 
            // receiveShadow 
            position={position}
            rotation={rotation}
            onPointerOver={(e) => {
                e.stopPropagation()

                setColor(hoverColor)
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
                e.stopPropagation()

                setColor(0xffffff)
                document.body.style.cursor = 'default'
            }}
            onClick={(e) => {
                e.stopPropagation()

                if (setControls) controls.enabled = setControls

                clearTimeouts()
                
                controls?.setLookAt(...moveTo, ...lookAt, true).then(() => {
                    controls.enabled = setControls

                    const x = Math.floor(Math.abs(controls._target.x))
                    const y = Math.floor(Math.abs(controls._target.y))
                    const z = Math.floor(Math.abs(controls._target.z))
                    
                    // check if the camera is looking at 0, 0, 0
                    console.log(controls._target, Math.floor(controls._target.x), Math.floor(controls._target.y), Math.floor(controls._target.z))
                    if (x === 0 && y === 0 && z === 0)
                        setPan(true)
                })
            }}
          >
            <textGeometry args={[text, { font, size, depth}]} />
            <meshBasicMaterial color={color} />
        </mesh>
    )
}