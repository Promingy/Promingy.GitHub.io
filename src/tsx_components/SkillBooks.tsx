import { useGLTF, Detailed, meshBounds, Float, Clouds, Cloud } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';
import { useAppContext } from '../context';
import { MeshBasicMaterial, NearestFilter, Mesh, Material, Vector3, Euler } from 'three';
import { useOpacityAnimation } from '../hooks/useOpacityAnimation';

interface SkillBooksProps {
  // Add any props that are being passed to the SkillBooks component
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

/**
 * SkillBooks component
 * This component renders a detailed 3D model of skill books with different levels of detail.
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
 * State hooks:
 *  - opacity: number
 *  - hovered: boolean
 *
 * Animate opacity based on hover state and context
 *
 * @param props
 * @returns JSX.Element
 */
export default function SkillBooks(props: SkillBooksProps) {
    // Load GLTF models with different resolutions
    const { nodes: lowNodes, materials: lowMats } = useGLTF(`models/low-res/skill_books.glb`);
    const { nodes: midNodes, materials: midMats } = useGLTF(`models/mid-res/skill_books.glb`);
    const { nodes: highNodes, materials: highMats } = useGLTF(`models/high-res/skill_books.glb`);
    
    // State hooks for opacity and hover status
    const { cloudOpacity, setIsHovered } = useOpacityAnimation();
    const context = useAppContext();
    const { controls } = useThree();

    // Apply NearestFilter to texture maps for the high-res materials
    for (let m in highMats) {
        const material = highMats[m] as MeshBasicMaterial;
        if (material instanceof MeshBasicMaterial && material.map) {
            material.map.minFilter = NearestFilter;
            material.map.magFilter = NearestFilter;
        }
    }


    return (
        <>
            {/* Render floating clouds with varying opacity when hovered */}
            {cloudOpacity > 0 && (
                <Float floatingRange={[0, 1]} rotationIntensity={0} speed={5}>
                    <Clouds material={MeshBasicMaterial}>
                        <Cloud
                            opacity={cloudOpacity}
                            seed={0.24}
                            color="papayawhip"
                            speed={1}
                            scale={1.25}
                            position={[54, 42, -14]}
                            rotation={[0, Math.PI / 2, 0]}
                        />
                        <Cloud
                            opacity={cloudOpacity}
                            seed={0.25}
                            color="papayawhip"
                            speed={1}
                            scale={1.25}
                            position={[54, 42, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                        />
                    </Clouds>
                </Float>
            )}
            {/* Render detailed 3D meshes with interactions */}
            <Detailed
                {...props}
                raycast={meshBounds}
                distances={[0, 25, 200]}
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
                <mesh geometry={(highNodes.Box002_ORANGE_0 as Mesh).geometry} material={highMats.Atlas} />
                <mesh geometry={(lowNodes.Box002_ORANGE_0 as Mesh).geometry} material={midMats.Atlas} />
                <mesh geometry={(midNodes.Box002_ORANGE_0 as Mesh).geometry} material={lowMats.Atlas} />
            </Detailed>
        </>
    );
}

useGLTF.preload('models/low-res/skill_books.glb');
useGLTF.preload('models/mid-res/skill_books.glb');
useGLTF.preload('models/high-res/skill_books.glb');
