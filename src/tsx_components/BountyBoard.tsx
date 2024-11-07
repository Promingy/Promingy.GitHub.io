import { useGLTF, Detailed, meshBounds, Cloud, Clouds, Float, PositionalAudio } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useState } from 'react';
import { useAppContext } from '../context';
import { Euler, MeshBasicMaterial, Vector3 } from 'three';
import { useOpacityAnimation } from '../hooks/useOpacityAnimation';

interface BountyBoardProps {
  // Add any props you want to pass to the BountyBoard component
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    moveTo: (vector: Vector3) => void;
    lookAt: {
    (vector: Vector3): void;
    (x: number, y: number, z: number): void;
    };
    name: string;
}

interface GLTFResult {
    nodes: any;
    materials: any;
}

/**
 * A component that renders a bounty board in the scene.
 *
 * @param props - The properties of the component.
 * @param props.position - The position of the component.
 * @param props.rotation - The rotation of the component.
 * @param props.scale - The scale of the component.
 * @param props.moveTo - A function that moves the camera to the given position.
 * @param props.lookAt - A function that makes the camera look at the given position.
 * @param props.name - The name of the component.
 */
export default function BountyBoard(props: BountyBoardProps) {
    // Load the GLTF models for the bounty board.
    // The models are loaded at different resolutions and are used depending on the distance from the camera.
    const { nodes, materials: lowResMaterials } = useGLTF('models/low-res/bounty_board.glb') as GLTFResult;
    const { materials: midResMaterials } = useGLTF('models/mid-res/bounty_board.glb') as GLTFResult;
    const { materials: highResMaterials } = useGLTF('models/high-res/bounty_board.glb') as GLTFResult;

    //State variables to keep track of the component's hover state and the opacity of the cloud effect.
    const { cloudOpacity, setIsHovered } = useOpacityAnimation();


    // Get the context and the controls of the scene.    
    const context = useAppContext();
    const { controls } = useThree();


   //The JSX that is returned by the component.
   //It renders a cloud effect and a detailed mesh with different resolutions.
    return (
    <>
        {cloudOpacity > 0 && (
        <Float floatingRange={[-2, 0]} rotationIntensity={0} speed={5}>
            <Clouds material={MeshBasicMaterial}>
            <Cloud
                color="papayawhip"
                opacity={cloudOpacity}
                speed={1}
                scale={4}
                position={[52, -3, 152.5]}
                rotation={[0, Math.PI / 2, 0]}
                seed={0.5}
            />
            </Clouds>
        </Float>
        )}
        <Detailed
            distances={[0, 30, 100]}
            {...props}
            raycast={meshBounds}
            onPointerOver={(e) => {
                context.handlePointerIn(e);
                setIsHovered(true);
            }}
            onPointerOut={(e) => {
                context.handlePointerOut(e);
                setIsHovered(false);
            }}
            onClick={(e) => context.handleClick(e, controls, props)}
        >
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={highResMaterials['default']}
            position={[0, 1.643, -0.056]}
            scale={1.919}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={midResMaterials['default']}
            position={[0, 1.643, -0.056]}
            scale={1.919}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={lowResMaterials['default']}
            position={[0, 1.643, -0.056]}
            scale={1.919}
        />
        </Detailed>
    </>
    );
}
