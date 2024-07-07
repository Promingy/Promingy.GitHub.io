import { Text, Bvh, meshBounds } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useAppContext } from '../context'
import { useState } from 'react'

export default function SmallText({hoverColor="#ff0000", baseColor='#ffffff', ...props}) {
    const [color, setColor] = useState(baseColor)
    const {controls} = useThree()
    const context = useAppContext()

    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                font='/Playball-Regular.ttf'
                characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é "
                color={color}
                position={props.position}
                rotation={props.rotation}
                scale={props.size || .33}
                text={props.text}
                raycast={meshBounds}
                onPointerOver={(e) => {context.handlePointerIn(e); setColor(hoverColor)}}
                onPointerOut={(e) => {context.handlePointerOut(e); setColor(baseColor)}}
                onClick={e =>context.handleClick(e, controls, props)}
            />
        </Bvh>
    )
}