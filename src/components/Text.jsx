import { useThree } from '@react-three/fiber'
import Playball from '../Playball_Regular.json'
import { Bvh, Text3D, Text } from '@react-three/drei'
import { clearTimeouts } from './Camera'
import { useState } from 'react'
import { usePan } from '../main'



export default function Text1({text: words, size, position, rotation, moveTo, lookAt, hoverColor=0xff0000, baseColor=0xffffff, ...props}) {
    const { setPan, setSmallText, whoosh, click, handlePointerIn, handlePointerOut, setLookingAt } = usePan() 
    const { controls } = useThree()
    const [color, setColor] = useState(baseColor || 0xffffff)

    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                position={position}
                rotation={rotation}
                // font={Playball}
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789! '
                font={'/Playball-Regular.ttf'}
                scale={size}
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
                    
                    setPan(false);
                    clearTimeouts();
                    setLookingAt(props.lookingAt)
                    
                    click.play();
                    whoosh.play();
                    controls._removeAllEventListeners();
                    
                    setTimeout(() => {
                        setSmallText(props.enableButtons || false);
                    }, 2000)
                    
                    controls?.setLookAt(...moveTo, ...lookAt, true)
                }}
                >
                {words}
                <meshLambertMaterial color={color} />
            </Text>
        </Bvh>
    )
}