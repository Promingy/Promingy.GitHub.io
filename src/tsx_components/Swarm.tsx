import React, { useEffect, useMemo, useRef } from "react";
import { InstancedMesh, Object3D, BufferGeometry, Float32BufferAttribute, DoubleSide, MeshLambertMaterial, ShaderMaterial, InstancedBufferAttribute } from "three";

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

    // Generate an array of particles with random properties
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
            const xFactor = -10 + Math.random() * 20; // Reduced range for x position.
            const yFactor = -10 + Math.random() * 20; // Reduced range for y position.
            const zFactor = -10 + Math.random() * 20; // Reduced range for z position.
            const scale = 0.005 + Math.random() * (0.005 - 0.002); // Smaller particle scale.

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

    const frameInterval = 3; // Update particles every 5 frames
    let frameCount = 0;

    // Create geometry with BufferGeometry
    const geometry = useMemo(() => {
        const positions: number[] = [];
        const scales: number[] = [];

        for (let i = 0; i < count; i++) {
            positions.push(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5); // Smaller particle positions
            scales.push(Math.random() * 0.1 + 0.05); // Smaller particle scales
        }

        const bufferGeometry = new BufferGeometry();
        bufferGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        bufferGeometry.setAttribute('scale', new Float32BufferAttribute(scales, 1));

        return bufferGeometry;
    }, [count]);

    // Update the particles on each frame

        const updateParticles = () => {
        if (frameCount % frameInterval === 0) {
            particles.forEach((particle, i) => {
                let { t, factor, speed, xFactor, yFactor, zFactor, scale } = particle;
                t = particle.t += speed / 10;
                const a = Math.cos(t) + Math.sin(t * 1) / 10;
                const b = Math.sin(t) + Math.cos(t * 2) / 10;
                const s = Math.cos(t);

                // Calculate position
                dummy.position.set(
                    (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                    (particle.my / 10) * b + yFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 2) * factor) / 10,
                    (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
                );

                // Set scale and rotation
                dummy.scale.set(scale, scale, scale);
                dummy.rotation.set(s * 5, s * 5, s * 5);
                dummy.updateMatrix();
                mesh.current!.setMatrixAt(i, dummy.matrix);
            });
            mesh.current!.instanceMatrix.needsUpdate = true;
        }
        frameCount++;
    };

    // Request animation frame loop
    const animationRef = useRef<number | null>(null);
    const animate = () => {
        updateParticles();
        animationRef.current = requestAnimationFrame(animate); // Schedule next frame
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate); // Start the animation loop when the component mounts
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current); // Cleanup when component unmounts
        };
    }, []);


    return (
        <instancedMesh
            ref={mesh}
            args={[geometry, undefined, count]}
            position={[-5, 0, 0]} // Adjust the position to fit better in the scene
            scale={[20, 20, 20]} // Adjust the overall scale of the instanced mesh
        >
            <meshLambertMaterial
                side={DoubleSide}
                transparent
                color={color}
                opacity={opacity}
            />
        </instancedMesh>
    );
}
