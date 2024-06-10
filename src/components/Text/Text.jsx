import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../../Playball_Regular.json'
import { useState } from 'react'
import { clearTimeouts } from '../Camera/Camera'
import { usePan } from '../../main'
import { useCursor } from '@react-three/drei'

extend({ TextGeometry })


export default function Text({text, size, depth, position, rotation, moveTo, lookAt, setControls, hoverColor=0xff0000, baseColor=0xffffff, ...props}) {
    const font = new FontLoader().parse(Playball)
    const { setPan, whoosh, click } = usePan() 
    const { controls } = useThree()
    const [color, setColor] = useState(baseColor || 0xffffff)
    const [hovered, setHovered] = useState(false)

    useCursor(hovered, 'pointer', 'default')

    return (
        <mesh
            castShadow 
            receiveShadow 
            position={position}
            rotation={rotation}
            onPointerOver={(e) => {
                e.stopPropagation()

                setColor(hoverColor)
                setHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()

                setColor(0xffffff)
                setHovered(false)
            }}
            onClick={(e) => {
                e.stopPropagation();

                click.play();
                
                clearTimeouts();
                setPan(false);
                setHovered(false);
                
                whoosh.play();
                

                controls._removeAllEventListeners();

                controls?.setLookAt(...moveTo, ...lookAt, true).then(() => {
                    controls.enabled = setControls
                    controls._addAllEventListeners(controls._domElement);
                });
            }}
          >
            <textGeometry args={[text, { font, size, depth}]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}