import { useThree } from '@react-three/fiber'
import { Bvh, Text } from '@react-three/drei'
import { useState } from 'react'
import { useAppContext } from '../context'


export default function NavText({ hoverColor=0xff0000, baseColor=0xffffff, ...props }) {
    const context = useAppContext();
    const { controls } = useThree();
    const [color, setColor] = useState(baseColor || 0xffffff);

    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                font={'/Playball-Regular.ttf'}
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é '
                color={color}
                position={props.position}
                rotation={props.rotation}
                scale={props.size}
                text={props.text}
                onPointerEnter={(e) => {
                    if (context.lookingAt == 'contact') return;
                    context.handlePointerIn(e);
                    setColor(hoverColor)}}
                onPointerOut={(e) => {context.handlePointerOut(e); setColor(baseColor)}}
                onClick={(e) => {context.lookingAt == 'contact' ? null : context.handleClick(e, controls, props)}}
            />
        </Bvh>
    )
}