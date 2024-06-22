import { useThree } from '@react-three/fiber'
import Playball from '../Playball_Regular.json'
import { useState } from 'react'
import { clearTimeouts } from './Camera'
import { usePan } from '../main'
import { Text3D } from '@react-three/drei'



export default function Text({text, size, depth, position, rotation, moveTo, lookAt, setControls, hoverColor=0xff0000, baseColor=0xffffff, displayProject, ...props}) {
    const { setPan, setSmallText, setDisplayProject, whoosh, click, handlePointerIn, handlePointerOut, setLookingAt } = usePan() 
    const { controls } = useThree()
    const [color, setColor] = useState(baseColor || 0xffffff)

    return (
        <Text3D
            position={position}
            rotation={rotation}
            font={Playball}
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

                controls._removeAllEventListeners();
                click.play();
                whoosh.play();
                clearTimeouts();
                setPan(false);
                setLookingAt(props.lookingAt)

                setTimeout(() => {
                    setDisplayProject(displayProject || 'none');
                    if (props.enableButtons) {
                        setSmallText(true);
                    }
                }, 2000)
                
                controls?.setLookAt(...moveTo, ...lookAt, true)
            }}
          >
            {text}
            <meshLambertMaterial color={color} />
        </Text3D>
    )
}