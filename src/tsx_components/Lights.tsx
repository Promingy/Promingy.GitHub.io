import { Vector3 } from 'three';
import React from 'react'

interface LightsProps {
    position: Vector3;
    color?: number;
    intensity?: number;
    shadow?: boolean;
    decay?: number;
}

export default function Lights(props: LightsProps) {
    return (
        <pointLight
        position={props.position}
        color={props.color || 0xF07F13}
        intensity={props.intensity}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={2000}
        shadow-bias={-0.0001}
        decay={props.decay || 2}
        castShadow={props.shadow}
        />
    );
}