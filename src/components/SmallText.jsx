import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../Playball_Regular.json'
import { useState } from 'react'
import { clearTimeouts } from './Camera'
import { usePan } from '../main'
import { Html, useCursor } from '@react-three/drei'

extend({ TextGeometry })

export default function SmallText({text, size, depth, position, rotation, moveTo, lookAt, setControls, hoverColor="#ff0000", baseColor='#ffffff', switchProject}) {
    const font = new FontLoader().parse(Playball)
    const [color, setColor] = useState(baseColor || '#ffffff')
    const {controls} = useThree()
    const { setPan, setSmallText, setBigText, setDisplayProject, click, whoosh } = usePan() 
    const [hovered, setHovered] = useState(false)

    useCursor(hovered, 'pointer', 'default')


    return (
        <mesh
            position={position}
            rotation={rotation}
            // onPointerOver={(e) => {
            //     e.stopPropagation()

            //     setColor(hoverColor)
            //     setHovered(true)
            // }}
            // onPointerOut={(e) => {
            //     e.stopPropagation()

            //     setColor(0xffffff)
            //     setHovered(false)
            // }}
            // onClick={(e) => {
            //     e.stopPropagation()

            //     if (setControls) controls.enabled = setControls
                
            //     clearTimeouts();
                
            //     click.play();
            //     whoosh.play();

            //     setPan(false);

            //     controls._removeAllEventListeners();
            //     controls?.setLookAt(...moveTo, ...lookAt, true).then(() => {
            //         controls.enabled = setControls
            //         controls._addAllEventListeners(controls._domElement);

            //         const x = Math.floor(Math.abs(controls._target.x))
            //         const y = Math.floor(Math.abs(controls._target.y))
            //         const z = Math.floor(Math.abs(controls._target.z))
                    
            //         // check if the camera is looking at 0, 0, 0
            //         if (x === 0 && y === 0 && z === 0)
            //             setPan(true)
            //     })
            // }}
          >
            {/* <textGeometry args={[text, { font, size, depth}]} />
            <meshBasicMaterial color={color} /> */}
            <Html wrapperClass={"test"} transform occlude>
                <p 
                style={{color}}
                onPointerOver={(e) => {
                    e.stopPropagation()
    
                    setColor(hoverColor)
                    setHovered(true)
                }}
                onPointerOut={(e) => {
                    e.stopPropagation()
    
                    setColor('#ffffff')
                    setHovered(false)
                }}
                
                onClick={(e) => {
                    e.stopPropagation()

                    if (setControls) controls.enabled = setControls
                    
                    clearTimeouts();
                    
                    click.play();
                    whoosh.play();

                    setPan(false);
                    setDisplayProject(switchProject || 'none');
                    setSmallText(switchProject ? true : false);
                    setBigText(switchProject ? false : true)

                    controls._removeAllEventListeners();
                    controls?.setLookAt(...moveTo, ...lookAt, true).then(() => {
                        controls.enabled = setControls
                        controls._addAllEventListeners(controls._domElement);

                        const x = Math.floor(Math.abs(controls._target.x))
                        const y = Math.floor(Math.abs(controls._target.y))
                        const z = Math.floor(Math.abs(controls._target.z))
                        
                        // check if the camera is looking at 0, 0, 0
                        if (x === 0 && y === 0 && z === 0)
                            setPan(true)
                        }
                    )
            }}>{text}</p>
            </Html>
        </mesh>
    )
}