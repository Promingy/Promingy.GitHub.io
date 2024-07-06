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
        <Text
        // <Bvh setBoundingBox splitStrategy="SAH">
                position={props.position}
                rotation={props.rotation}
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é '
                text={props.text}
                font={'/Playball-Regular.ttf'}
                scale={props.size}
                color={color}
                // raycast={meshBounds}
                onPointerEnter={(e) => {
                    if (context.lookingAt == 'contact') return;
                    context.handlePointerIn(e);
                    setColor(hoverColor)}}
                onPointerOut={(e) => {e.stopPropagation();context.handlePointerOut(e); setColor(baseColor)}}
                onClick={(e) => {
                    e.stopPropagation();
                    if (context.lookingAt == 'contact') return;
                    
                    context.setTransition(true);
                    context.setPan(false);
                    clearTimeouts();
                    clearTimeout(context.panTimeout);
                    
                    context.click.play();
                    context.whoosh.play();
                    
                    setTimeout(() => {
                        context.setLookingAt(props.lookingAt)
                        context.setSmallText(props.enableButtons || false);
                    }, 2000)
                    
                    controls?.setLookAt(...props.moveTo, ...props.lookAt, true).then(() => context.setTransition(false))
                }}
            />
        // </Bvh>
    )
}