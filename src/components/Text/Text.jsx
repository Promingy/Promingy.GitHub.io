import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../../Playball_Regular.json'
import { useState } from 'react'
import { clearTimeouts } from '../Camera/Camera'
import { usePan } from '../../main'

extend({ TextGeometry })




export default function Text({text, size, depth, position, rotation, moveTo, lookAt, setControls, hoverColor=0xff0000, baseColor=0xffffff}) {
    const font = new FontLoader().parse(Playball)
    const [color, setColor] = useState(baseColor || 0xffffff)
    const {controls} = useThree()
    const { setPan } = usePan() 



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
                setPan(false)
                
                controls?.setLookAt(...moveTo, ...lookAt, true).then(() => controls.enabled = setControls)
            }}
          >
            <textGeometry args={[text, { font, size, depth}]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}