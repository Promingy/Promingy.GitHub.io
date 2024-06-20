import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend, useThree } from '@react-three/fiber'
import Playball from '../Playball_Regular.json'
import { useCallback, useState } from 'react'
import { clearTimeouts } from './Camera'
import { usePan } from '../main'
import { useCursor } from '@react-three/drei'

extend({ TextGeometry })


export default function Text({text, size, depth, position, rotation, moveTo, lookAt, setControls, hoverColor=0xff0000, baseColor=0xffffff, displayProject, ...props}) {
    const font = new FontLoader().parse(Playball)
    const { setPan, setSmallText, setDisplayProject, whoosh, click, handlePointerIn, handlePointerOut, lookingAt, setLookingAt } = usePan() 
    const { controls } = useThree()
    const [color, setColor] = useState(baseColor || 0xffffff)


    return (
        <mesh
            position={position}
            rotation={rotation}
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
                
                
                controls._removeAllEventListeners();

                controls?.setLookAt(...moveTo, ...lookAt, true)
                if (lookingAt == 'none') controls._addAllEventListeners(controls._domElement);
            }}
          >
            <textGeometry args={[text, { font, size, depth}]} />
            <meshLambertMaterial color={color} />
        </mesh>
    )
}