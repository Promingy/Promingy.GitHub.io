import { useThree } from '@react-three/fiber'
import { Bvh, Text } from '@react-three/drei'
import { useState } from 'react'
import { useAppContext } from '../context'


export default function NavText({ hoverColor = 0xff0000, baseColor = 0xffffff, ...props }) {
    const context = useAppContext();
    const { controls } = useThree();
    const [color, setColor] = useState(baseColor);

    const handlePointerEnter = (e) => {
        if (context.lookingAt !== 'contact') {
            context.handlePointerIn(e);
            setColor(hoverColor);
        }
    };

    const handlePointerOut = (e) => {
        if (context.lookingAt !== 'contact') {
            context.handlePointerOut(e);
            setColor(baseColor);
        }
    };

    const handleClick = (e) => {
        if (context.lookingAt !== 'contact') {
            context.handleClick(e, controls, props);
            setColor(baseColor);
        }
    };

    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                font='/Playball-Regular.ttf'
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é '
                color={color}
                position={props.position}
                rotation={props.rotation}
                scale={props.size}
                text={props.text}
                onPointerEnter={handlePointerEnter}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            />
        </Bvh>
    );
}
