import { useCursor, useGLTF, Detailed } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { NearestFilter, FrontSide } from 'three';
import { useThree } from '@react-three/fiber';
import BountyBoard from './BountyBoard.jsx';
import SkillBooks from './SkillBooks.jsx';
import { usePan } from '../main.jsx';

export default function LoadModel({file, position, rotation, scale, canHover, lookAt, moveTo, refToUse, shadow}) {
    // const url = 'models/' + file
    // const { scene } = useGLTF(url);
    const [hovered, setHovered] = useState(false);
    const { controls } = useThree()
    const modelRef = refToUse || useRef();
    const { setPan, setBigText, whoosh } = usePan();

    // useEffect(() => {
    //     if (modelRef.current) {
    //         modelRef.current.traverse(child => {
    //             if (child.isMesh) {
    //                 child.material.side = FrontSide;
                    
    //                 if (child.material.map) {
    //                     child.material.map.minFilter = NearestFilter;
    //                     child.material.map.magFilter = NearestFilter;
    //                 }
                    
    //                 if (!child.material.name.startsWith('lambert1')){
    //                     child.castShadow = shadow;
    //                     child.receiveShadow = true;
    //                 }
    //             }

    //         })
    //     }
    // }, [scene])


    useCursor(hovered, 'pointer', 'default');

    return (
            <Detailed 
                // object={scene} 
                // ref={modelRef}
                distances={[0, 50]}
                position={position}
                rotation={rotation}
                scale={scale}
                onPointerOver={canHover ? () => setHovered(true) : null}
                onPointerOut={canHover ? () => setHovered(false) : null}
                onClick={canHover ? () => {
                    const cTarget = controls._targetEnd;
                    // const x = cTarget.x != 0;
                    // const y = cTarget.y != 0;
                    // const z = cTarget.z != 0;
                    
                    const x = cTarget.x;
                    const y = cTarget.y;
                    const z = cTarget.z;

                    setPan(false);
                    
                    whoosh.play();
                    
                    controls._removeAllEventListeners();

                    if (x == lookAt[0] && y == lookAt[1] && z == lookAt[2]) {
                        controls.enabled = true;
                        setBigText(true);
                        controls.setLookAt(-200, 175, 200, 0, 0, 0, true).then(() => {
                            controls.enabled = true;
                            controls._addAllEventListeners(controls._domElement);
                            setPan(true);
                        });
                    }
                    else controls.setLookAt(...moveTo, ...lookAt, true).then(() => {
                        // check the updated camera controls - if the target is not 0,0,0 then disable the controls
                        // this if statement prevents a user from stopping the camera from zooming into
                        // a model, then stopping the zoom and still having the camera controls disabled
                        const x = controls._targetEnd.x;
                        const y = controls._targetEnd.y;
                        const z = controls._targetEnd.z;
                        if (x != 0 && y != 0 && z != 0){
                            controls.enabled = false
                        }
                        controls._addAllEventListeners(controls._domElement);
                    })
                } : null}
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
    )
}