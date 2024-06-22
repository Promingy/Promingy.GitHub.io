import { useCursor, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { clearTimeouts } from './Camera'
import { useState } from 'react'
import { usePan } from '../main'

export default function SmallText({text, position, rotation, moveTo, lookAt, hoverColor="#ff0000", baseColor='#ffffff', switchProject}) {
    const [color, setColor] = useState(baseColor)
    const {controls} = useThree()
    const { setPan, setSmallText, setDisplayProject, click, whoosh, lookingAt, setLookingAt } = usePan() 
    const [hovered, setHovered] = useState(false)

    useCursor(hovered, 'pointer', 'default')

    function handleClick(e) {
        e.stopPropagation()
        
        clearTimeouts();
        
        click.play();
        whoosh.play();

        setDisplayProject(switchProject || 'none');
        setSmallText(switchProject ? true : false);
        controls._removeAllEventListeners();


        setLookingAt(switchProject ? switchProject:'none');

        controls?.setLookAt(...moveTo, ...lookAt, true)
        controls?._addAllEventListeners(controls._domElement);

        setPan(lookingAt == 'none')
    }

    return (
        <Text
            font='/Playball-Regular.ttf'
            color={color}
            position={position}
            rotation={rotation}
            scale={.33}
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
    )
}