import { useGLTF, Detailed, meshBounds, Cloud, Clouds, Float } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useCallback, useMemo } from 'react';
import { useAppContext } from '../context';
import { Euler, MeshBasicMaterial, Vector3 } from 'three';
import { useOpacityAnimation } from '../hooks/useOpacityAnimation';

interface BountyBoardProps {
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
 * BountyBoard component
 * This component renders a detailed 3D model of a bounty board with different levels of detail.
 * It includes animations for hovering and opacity changes, and preloads various model resolutions.
 *
 * Props:
 *  - position: Vector3
 *  - rotation: Euler
 *  - scale: Vector3
 *  - moveTo: (vector: Vector3) => void
 *  - lookAt: {
 *        (vector: Vector3): void;
 *        (x: number, y: number, z: number): void;
 *    }
 *  - name: string
 *
 * @param props
 * @returns JSX.Element
 */
export default function BountyBoard(props: BountyBoardProps) {
    // Load GLTF models with different resolutions
    const { nodes, materials: lowResMaterials } = useGLTF('/models/low-res/bounty_board.glb') as GLTFResult;
    const { materials: midResMaterials } = useGLTF('/models/mid-res/bounty_board.glb') as GLTFResult;
    const { materials: highResMaterials } = useGLTF('/models/high-res/bounty_board.glb') as GLTFResult;

    // State hooks for opacity and hover status
    const { cloudOpacity, setIsHovered } = useOpacityAnimation();
    const context = useAppContext();
    const { controls } = useThree();

    // Event handlers for pointer interactions
    const handlePointerOver = useCallback((e: any) => {
        context.handlePointerIn(e);
        setIsHovered(true);
    }, [context, setIsHovered]);

    const handlePointerOut = useCallback((e: any) => {
        context.handlePointerOut(e);
        setIsHovered(false);
    }, [context, setIsHovered]);

    const handleClick = useCallback((e: any) => {
        // Handle click with a slight delay
        setTimeout(() => {
            context.handleClick(e, controls, props);
        }, 0);
    }, [context, controls, props]);

    return (
        <>
            {/* Render floating clouds with varying opacity when hovered */}
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
            {/* Render detailed 3D model with level of detail */}
            <Detailed
                distances={[0, 30, 100]}
                {...props}
                raycast={meshBounds}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
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

useGLTF.preload('/models/low-res/bounty_board.glb');
useGLTF.preload('/models/mid-res/bounty_board.glb');
useGLTF.preload('/models/high-res/bounty_board.glb');