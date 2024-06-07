import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'
import Playball from '../../Playball_Regular.json'
import { useEffect, useState } from 'react'

extend({ TextGeometry })


export default function Text({text, size, depth, position}) {
    const font = new FontLoader().parse(Playball)
    const [hovered, setHovered] = useState(false)
    const [color, setColor] = useState(0xffffff)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
        setColor(hovered ? 0xff0000 : 0xffffff)
    },[hovered])

    return (
        <mesh
            castShadow 
            receiveShadow 
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <textGeometry args={[text, { font, size, depth }]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}