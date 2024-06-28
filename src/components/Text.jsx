import { useThree } from '@react-three/fiber'
import { Bvh, Text, meshBounds } from '@react-three/drei'
import { clearTimeouts } from './Camera'
import { useState } from 'react'
import { useAppContext } from '../context'


export default function MenuText({ hoverColor=0xff0000, baseColor=0xffffff, ...props }) {
    const context = useAppContext();
    const { controls } = useThree();
    const [color, setColor] = useState(baseColor || 0xffffff);

    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                position={props.position}
                rotation={props.rotation}
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é '
                font={'/Playball-Regular.ttf'}
                scale={props.size}
                raycast={meshBounds}
                onPointerEnter={(e) => {
                    context.handlePointerIn(e);
                    setColor(hoverColor);
                }}
                onPointerOut={(e) => {
                    context.handlePointerOut(e);
                    setColor(baseColor);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    
                    context.setTransition(true);
                    context.setPan(false);
                    clearTimeouts();
                    
                    context.click.play();
                    context.whoosh.play();
                    
                    setTimeout(() => {
                        context.setLookingAt(props.lookingAt)
                        context.setSmallText(props.enableButtons || false);
                    }, 2000)
                    
                    controls?.setLookAt(...props.moveTo, ...props.lookAt, true).then(() => context.setTransition(false))
                }}
                >
                {props.text}
                <meshLambertMaterial color={color} />
            </Text>
        </Bvh>
    )
}