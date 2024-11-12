import React, { useEffect, useRef, useMemo } from "react";
import { InstancedMesh, Object3D, DoubleSide, FrontSide } from "three";

interface SwarmProps {
    count: number;
    color: string;
    opacity: number;
}

export default function Swarm({ count, color, opacity }: SwarmProps) {
    const mesh = useRef<InstancedMesh>(null);
    const dummy = useMemo(() => new Object3D(), []);
    const particles = useMemo(() => {
        const temp: any[] = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                t: Math.random() * 100,
                factor: 20 + Math.random() * 100,
                speed: 0.01 + Math.random() / 200,
                xFactor: -50 + Math.random() * 100,
                yFactor: -50 + Math.random() * 100,
                zFactor: -50 + Math.random() * 100,
                mx: 0,
                my: 0,
                scale: 0.15 + Math.random() * (0.33 - 0.15),
            });
        }
        return temp;
    }, [count]);

    const frameInterval = 2; // Update particles every 5 frames
    let frameCount = 0;

    // Particle update function
    const updateParticles = () => {
        if (frameCount % frameInterval === 0) {
            particles.forEach((particle, i) => {
                let { t, factor, speed, xFactor, yFactor, zFactor, scale } = particle;
                t = particle.t += speed / 5;
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

    // Request animation frame loop with throttling
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
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[-40, 75, 20]} scale={[10, 4, 10]}>
            <planeGeometry />
            <meshLambertMaterial side={FrontSide} color={color} transparent opacity={opacity} />
        </instancedMesh>
    );
}
