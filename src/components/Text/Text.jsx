import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../../Playball_Regular.json'
import { useEffect, useState } from 'react'
import { clearTimeouts } from '../../App'
import { usePan } from '../../main'

extend({ TextGeometry })




export default function Text({text, size, depth, position, moveTo, lookAt}) {
    const font = new FontLoader().parse(Playball)
    const [hovered, setHovered] = useState(false)
    const [color, setColor] = useState(0xffffff)
    const {controls} = useThree()
    const { pan, setPan } = usePan() 

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
        setColor(hovered ? 0xff0000 : 0xffffff)
    },[hovered])

    return (
        <mesh
            castShadow 
            receiveShadow 
            position={position}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setHovered(false)
            }}
            onClick={() => {
                clearTimeouts()
                setPan(false)
                controls?.setLookAt(...moveTo, ...lookAt, true).then(() => controls.enabled = false)
            }}
          >
            <textGeometry args={[text, { font, size, depth }]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}