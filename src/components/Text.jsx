import { useThree } from '@react-three/fiber'
import { Bvh, Text, meshBounds } from '@react-three/drei'
import { clearTimeouts } from './Camera'
import { useState } from 'react'
import { usePan } from '../main'



export default function MenuText({text: words, size, position, rotation, moveTo, lookAt, hoverColor=0xff0000, baseColor=0xffffff, ...props}) {
    const { setPan, setSmallText, whoosh, click, handlePointerIn, handlePointerOut, setLookingAt, setTransition } = usePan() 
    const { controls } = useThree()
    const [color, setColor] = useState(baseColor || 0xffffff)

    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                position={position}
                rotation={rotation}
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é '
                font={'/Playball-Regular.ttf'}
                scale={size}
                raycast={meshBounds}
                onPointerEnter={(e) => {
                    handlePointerIn(e);
                    setColor(hoverColor);
                }}
                onPointerOut={(e) => {
                    handlePointerOut(e);
                    setColor(baseColor);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    
                    setTransition(true);
                    setPan(false);
                    clearTimeouts();
                    setLookingAt(props.lookingAt)
                    
                    click.play();
                    whoosh.play();
                    
                    setTimeout(() => {
                        setSmallText(props.enableButtons || false);
                    }, 2000)
                    
                    controls?.setLookAt(...moveTo, ...lookAt, true).then(() => setTransition(false))
                }}
                >
                {words}
                <meshLambertMaterial color={color} />
            </Text>
        </Bvh>
    )
}