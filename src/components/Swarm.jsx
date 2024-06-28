import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, Object3D } from "three";

export default function Swarm({ count, color }) {
    const mesh = useRef();

    const dummy = useMemo(() => new Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            const scale = 0.15 + Math.random() * (.33 - 0.15);
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, scale });
        }
        return temp;
    }, [count])

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor, scale, opacity } = particle;
            t = particle.t += speed / 5;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t)

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            dummy.scale.set(scale, scale);
            dummy.rotation.set(s * 5, s * 5, s * 5);

            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    })
    
    return (
        <instancedMesh ref={mesh} args={[null, null, count]} position={[-40, 75, 20]} scale={[4, 2, 4]}>
            <planeGeometry />
            <meshLambertMaterial side={DoubleSide} color={color} transparent opacity={0.75}/>
        </instancedMesh>
    )
}