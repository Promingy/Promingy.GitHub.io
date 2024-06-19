import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../Playball_Regular.json'
import { useState } from 'react'
import { clearTimeouts } from './Camera'
import { usePan } from '../main'
import { Html, useCursor } from '@react-three/drei'

extend({ TextGeometry })

export default function SmallText({text, position, rotation, moveTo, lookAt, setControls, hoverColor="#ff0000", baseColor='#ffffff', switchProject}) {
    const font = new FontLoader().parse(Playball)
    const [color, setColor] = useState(baseColor || '#ffffff')
    const {controls} = useThree()
    const { setPan, setSmallText, setDisplayProject, click, whoosh } = usePan() 
    const [hovered, setHovered] = useState(false)

    useCursor(hovered, 'pointer', 'default')

    function handleClick(e) {
        e.stopPropagation()

        if (setControls) controls.enabled = setControls
        
        clearTimeouts();
        
        click.play();
        whoosh.play();

        setPan(false);
        setDisplayProject(switchProject || 'none');
        setSmallText(switchProject ? true : false);

        controls._removeAllEventListeners();
        controls?.setLookAt(...moveTo, ...lookAt, true).then(() => {
            controls.enabled = setControls
            controls._addAllEventListeners(controls._domElement);

            const { x, y, z } = controls._targetEnd

            // check if the camera is looking at 0, 0, 0
            if (!x && !y && !z) setPan(true)
            }
        )
    }


    return (
        <mesh position={position} rotation={rotation}>
            <Html wrapperClass={"test"} transform occlude>
                <p 
                    style={{color}}
                    onPointerOver={() => {        
                        setColor(hoverColor)
                        setHovered(true)
                    }}
                    onPointerOut={() => {
                        setColor('#ffffff')
                        setHovered(false)
                    }}
                
                    onClick={handleClick}
                >
                    {text}
                </p>
            </Html>
        </mesh>
    )
}