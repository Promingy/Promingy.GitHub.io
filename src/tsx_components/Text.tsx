import { ThreeEvent, useThree } from '@react-three/fiber'
import { Bvh, Text } from '@react-three/drei'
import React, { useState } from 'react'
import { useAppContext } from '../context'
import { Euler, Vector3 } from 'three';


interface NavTextProps {
    hoverColor?: string;
    baseColor?: string;
    position: Vector3;
    rotation?: Euler;
    moveTo?: (vector: Vector3) => void;
    lookAt?: (x: number, y: number, z: number) => void;
    name: string;
    click?: boolean;
    size: number;
    text: string;
    color?: string;
}

/**
 * NavText component
 * This component renders a text element within a BVH container.
 * It changes color on pointer events and triggers context-related actions.
 *
 * Props:
 *  - hoverColor: The color of the text when hovered over
 *  - baseColor: The default color of the text
 *  - position: The position of the text in 3D space
 *  - rotation: The rotation of the text
 *  - size: The scale size of the text
 *  - text: The string content to be displayed
 *
 * @param props
 * @returns JSX.Element
 */
export default function NavText({ hoverColor = "#ff0000", baseColor = "#ffffff", ...props }: NavTextProps) {
    const context = useAppContext();
    const { controls } = useThree();
    const [color, setColor] = useState<string>(baseColor);

    
    // Handles the pointer enter event.
    // Changes the text color to hoverColor and triggers context actions.
    const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
        if (context.lookingAt !== 'contact') {
            context.handlePointerIn(e);
            console.log('test', hoverColor);
            setColor(hoverColor);
        }
    };


    //Resets the text color to baseColor and triggers context actions.
    //Handles the pointer out event.
    const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        if (context.lookingAt !== 'contact') {
            context.handlePointerOut(e);
            setColor(baseColor);
        }
    };


    // Handles the click event.
    // Triggers context actions and resets the text color to baseColor.
    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        if (context.lookingAt !== 'contact') {
            context.handleClick(e, controls, props);
            setColor(baseColor);
        }
    };

    return (
        <Bvh setBoundingBox>
            <Text
                font={'/Playball-Regular.ttf'}
                characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é '
                color={color}
                position={props.position}
                rotation={props.rotation}
                scale={props.size}
                onPointerEnter={handlePointerEnter}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                {props.text}
            </Text>
        </Bvh>
    );
}
