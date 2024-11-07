import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { DoubleSide, InstancedMesh, Object3D } from "three";

interface SwarmProps {
    count: number;
    color: string;
    opacity: number;
}

/**
 * A swarm of particles.
 *
 * @param {number} count - The number of particles to display.
 * @param {string} color - The color of the particles.
 * @param {number} opacity - The opacity of the particles.
 */
export default function Swarm({ count, color, opacity }: SwarmProps) {
    const mesh = useRef<InstancedMesh>(null);
    const dummy = useMemo(() => new Object3D(), []); // A dummy object used to calculate the position and rotation of the particles.

    /**
     * Generate an array of particles.
     *
     * Each particle is an object with the properties t, factor, speed, xFactor, yFactor, zFactor, mx, my, and scale.
     *
     * @returns {Array} The array of particles.
     */
    const particles = useMemo(() => {
        const temp: {
            t: number;
            factor: number;
            speed: number;
            xFactor: number;
            yFactor: number;
            zFactor: number;
            mx: number;
            my: number;
            scale: number;
        }[] = [];

        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100; // The time of the particle.
            const factor = 20 + Math.random() * 100; // A factor that affects the position of the particle.
            const speed = 0.01 + Math.random() / 200; // The speed of the particle.
            const xFactor = -50 + Math.random() * 100; // A factor that affects the x position of the particle.
            const yFactor = -50 + Math.random() * 100; // A factor that affects the y position of the particle.
            const zFactor = -50 + Math.random() * 100; // A factor that affects the z position of the particle.
            const scale = 0.15 + Math.random() * (0.33 - 0.15); // The scale of the particle.

            temp.push({
                t,
                factor,
                speed,
                xFactor,
                yFactor,
                zFactor,
                mx: 0,
                my: 0,
                scale,
            });
        }
        
        return temp;
    }, [count]);

    
    
    // Update the particles.
    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor, scale } = particle;
            t = particle.t += speed / 5; // Update the time of the particle.
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Calculate the position of the particle.
            dummy.position.set(
                (particle.mx / 10) * a +
                xFactor +
                Math.cos((t / 10) * factor) +
                (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b +
                yFactor +
                Math.cos((t / 10) * factor) +
                (Math.sin(t * 2) * factor) / 10,
                (particle.my / 10) * b +
                zFactor +
                Math.cos((t / 10) * factor) +
                (Math.sin(t * 3) * factor) / 10
            );

            // Set the scale and rotation of the particle.
            dummy.scale.set(scale, scale, scale);
            dummy.rotation.set(s * 5, s * 5, s * 5);

            dummy.updateMatrix();

            // Set the position and rotation of the particle.
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current!.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={mesh}
            args={[undefined, undefined, count]}
            position={[-40, 75, 20]}
            scale={[4, 2, 4]}
        >
        <planeGeometry />
        <meshLambertMaterial
            side={DoubleSide}
            color={color}
            transparent
            opacity={opacity}
        />
        </instancedMesh>
    )
}
