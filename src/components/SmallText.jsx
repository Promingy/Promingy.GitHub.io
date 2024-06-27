import { useCursor, Text, Bvh } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { clearTimeouts } from './Camera'
import { useCallback, useState } from 'react'
import { usePan } from '../main'

export default function SmallText({text, size, position, rotation, moveTo, lookAt, hoverColor="#ff0000", baseColor='#ffffff', newLookingAt}) {
    const [color, setColor] = useState(baseColor)
    const {controls} = useThree()
    const { setPan, setSmallText, click, whoosh, lookingAt, setLookingAt, setTransition, panTimeout, toggleTransitionTimeout } = usePan() 
    const [hovered, setHovered] = useState(false)

    useCursor(hovered, 'pointer', 'default')

    const handleClick = useCallback((e) => {
        e.stopPropagation()
        setPan(false)
        setTransition(true)
        toggleTransitionTimeout(false)
        
        clearTimeouts();
        clearTimeout(panTimeout)

        click.play();
        whoosh.play();
        
        setSmallText(newLookingAt ? true : false);
        setLookingAt(newLookingAt ? newLookingAt : 'none');

        controls?.setLookAt(...moveTo, ...lookAt, true)
        toggleTransitionTimeout(true)

    }, [controls, setPan, setSmallText, click, whoosh, lookingAt, setLookingAt, newLookingAt, moveTo, lookAt]);


    /// This is what's causing the FOUC (flash of unstyled content)
    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                font='/Playball-Regular.ttf'
                characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é "
                color={color}
                position={position}
                rotation={rotation}
                scale={size || .33}
                onClick={handleClick}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    setColor(hoverColor)
                    setHovered(true)
                }}
                onPointerOut={(e) => {
                    e.stopPropagation()
                    setColor(baseColor)
                    setHovered(false)
                }}
                >
                {text}
            </Text>
        </Bvh>
    )
}