import { useCursor, useGLTF, Detailed } from '@react-three/drei';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NearestFilter, FrontSide } from 'three';
import { useThree } from '@react-three/fiber';
import BountyBoard from './BountyBoard.jsx';
import SkillBooks from './SkillBooks.jsx';
import { usePan } from '../main.jsx';

export default function LoadModel({file, position, rotation, scale, canHover, lookAt, moveTo }) {
    const {pan, setPan, whoosh } = usePan();
    const [hovered, setHovered] = useState(false);
    const { controls } = useThree()
    const eventHandled = useRef(false);

    useCursor(hovered, 'pointer', 'default');

    const handleClick = useCallback(() => {
        if (!eventHandled.current) {
            // this is a hack to prevent the event from being handled twice
            eventHandled.current = true;
            setTimeout(() => {
                eventHandled.current = false;
            }, 1)

            const cTarget = controls._targetEnd;
            const { x, y, z } = cTarget;

            setPan(false);
            whoosh.play();
            controls.enabled = true;
            controls._removeAllEventListeners();

            if (x == lookAt[0] && y == lookAt[1] && z == lookAt[2]) {
                controls.setLookAt(-200, 175, 200, 0, 0, 0, true).then(() => {
                    const { x, y, z } = controls._targetEnd;

                    if (x == 0 && y == 0 && z == 0) {
                        controls.enabled = true; // set it again to circumvent spam-click events overwriting the controls
                        controls._addAllEventListeners(controls._domElement);
                        setPan(true);
                    }
                });
            }
            else controls.setLookAt(...moveTo, ...lookAt, true).then(() => {
                // check the updated camera controls - if the target is not 0,0,0 then disable the controls
                // this if statement prevents a user from stopping the camera from zooming into
                // a model, then stopping the zoom and still having the camera controls disabled
                const { x, y, z } = controls._targetEnd;
                if (x != 0 && y != 0 && z != 0){
                    controls.enabled = false
                }
            })
        }
    })

    return (
        <mesh
            onPointerOver={canHover ? () => setHovered(true) : null}
            onPointerOut={canHover ? () => setHovered(false) : null}
            onClick={canHover ? handleClick : null}
        >
            <Detailed 
                distances={[0, 50]}
                position={position}
                rotation={rotation}
                scale={scale}
            >
                { file == 'bounty_board.glb' ? 
                    <>
                        <BountyBoard res="high-res"/>
                        <BountyBoard res="low-res"/>
                    </>
                    :
                    <>
                        <SkillBooks res="high-res"/>
                        <SkillBooks res="low-res"/>
                    </>
                }
            </Detailed>
        </mesh>
    )
}