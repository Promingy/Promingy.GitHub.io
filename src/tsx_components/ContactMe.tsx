import { Cloud, Clouds, Detailed, Float, Html, useGLTF } from '@react-three/drei';
import { MeshBasicMaterial, Vector3 } from 'three';
import { useAppContext } from '../context';
import { useThree } from '@react-three/fiber';
import React, { useState, FormEvent, useMemo } from 'react';
import { useOpacityAnimation } from '../hooks/useOpacityAnimation';

type GLTFResult = {
    nodes: any;
    materials: any;
};

interface ContactProps {
    text: string;
    position: Vector3;
    moveTo: (vector: Vector3) => void;
    lookAt: {
        (vector: Vector3): void;
        (x: number, y: number, z: number): void;
    };
    size: number;
    name: string;
    click: boolean;
}

export default function Contact(props: ContactProps) {
    const { cloudOpacity, setIsHovered } = useOpacityAnimation();
    const { materials: lowMats } = useGLTF('/models/low-res/contact_sign.glb') as GLTFResult;
    const { materials: midMats } = useGLTF('/models/mid-res/contact_sign.glb') as GLTFResult;
    const { nodes, materials: highMats } = useGLTF('/models/high-res/contact_sign.glb') as GLTFResult;

    const [name, setName] = useState<string>('Enter Name Here');
    const [email, setEmail] = useState<string>('Enter Email Here');
    const [message, setMessage] = useState<string>('Enter Message Here');
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const context = useAppContext();
    const { controls } = useThree();

    const basicMaterials = useMemo(() => {
        return {
            low: new MeshBasicMaterial({ map: lowMats.T_floor_sign_1001.map }),
            mid: new MeshBasicMaterial({ map: midMats.T_floor_sign_1001.map }),
            high: new MeshBasicMaterial({ map: highMats.T_floor_sign_1001.map }),
        };
    }, [lowMats, midMats, highMats]);


    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        fetch('https://formcarry.com/s/pW8vrw_OPkn', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
            .then(response => response.json())
            .then(response => {
                if (response.code === 200) {
                    setSuccess('Message Successfully Sent');
                    setName('Enter Name Here');
                    setEmail('Enter Email Here');
                    setMessage('Enter Message Here');
                } else {
                    setError(response.message);
                }
            })
            .catch(error => {
                setError(error.message ?? 'An error occurred');
            });
    };

    return (
        <>
            {cloudOpacity > 0 && (
                <Float floatingRange={[-2, 0]} rotationIntensity={0} speed={3}>
                    <Clouds material={MeshBasicMaterial}>
                        <Cloud opacity={cloudOpacity} speed={1} seed={0.26} scale={2} position={[-92, -5, 115]} rotation={[0.75, 0, 0]} />
                        <Cloud opacity={cloudOpacity} speed={1} seed={0.26} scale={2} position={[-80, -5, 110]} rotation={[0.75, 0, 0]} />
                        <Cloud opacity={cloudOpacity} speed={1} seed={0.26} scale={2} position={[-80, -5, 120]} rotation={[0.75, 0, 0]} />
                        <Cloud opacity={cloudOpacity} speed={1} seed={0.26} scale={2} position={[-87, -5, 123]} rotation={[0.75, 0, 0.75]} />
                    </Clouds>
                </Float>
            )}
            {context.lookingAt === 'contact' && (
                <>
                    <mesh scale={[1.9, 2, 1]} position={[-87, 9, 116.5]} rotation={[-0.224, -0.796, -0.139]}>
                        <Html transform>
                            {success && <p className='messageSent'>{success}</p>}
                            {error && <p className='messageError'>{error}</p>}
                            <form className='contactForm' onSubmit={onSubmit}>
                                <div className='nameWrapper'>
                                    <input
                                        className='contact'
                                        value={name}
                                        type='text'
                                        onChange={e => setName(e.target.value)}
                                        onFocus={() => setName(name === 'Enter Name Here' ? '' : name)}
                                        onBlur={() => setName(name || 'Enter Name Here')}
                                        required
                                    />
                                </div>
                                <div className='emailWrapper'>
                                    <input
                                        className='contact'
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setEmail(email === 'Enter Email Here' ? '' : email)}
                                        onBlur={() => setEmail(email || 'Enter Email Here')}
                                        required
                                    />
                                </div>
                                <div className='messageWrapper'>
                                    <textarea
                                        className='message'
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        onFocus={() => setMessage(message === 'Enter Message Here' ? '' : message)}
                                        onBlur={() => setMessage(message || 'Enter Message Here')}
                                        required
                                    />
                                </div>
                                <button type='button' className='backButton' onClick={e => context.handleClick(e, controls, props)}>
                                    Back
                                </button>
                                <button type='submit' className='submit'>
                                    Submit
                                </button>
                            </form>
                        </Html>
                    </mesh>
                </>
            )}
            <Detailed
                {...props}
                distances={[0, 50, 100]}
                onPointerOver={e => {
                    if (context.lookingAt !== 'contact') {
                        context.handlePointerIn(e);
                        setIsHovered(true);
                    }
                }}
                onPointerOut={e => {
                    if (context.lookingAt !== 'contact') {
                        context.handlePointerOut(e);
                        setIsHovered(false);
                    }
                }}
                onClick={e => {
                    if (context.lookingAt !== 'contact') context.handleClick(e, controls, props);
                }}
            >
                <mesh geometry={nodes.defaultMaterial.geometry} material={basicMaterials.high} position={[0, 56.743, 0.001]} rotation={[-Math.PI / 2, 0, 0]} scale={56.743} />
                <mesh geometry={nodes.defaultMaterial.geometry} material={basicMaterials.mid} position={[0, 56.743, 0.001]} rotation={[-Math.PI / 2, 0, 0]} scale={56.743} />
                <mesh geometry={nodes.defaultMaterial.geometry} material={basicMaterials.low} position={[0, 56.743, 0.001]} rotation={[-Math.PI / 2, 0, 0]} scale={56.743} />
            </Detailed>
        </>
    );
}

useGLTF.preload('/models/low-res/contact_sign.glb');
useGLTF.preload('/models/mid-res/contact_sign.glb');
useGLTF.preload('/models/high-res/contact_sign.glb');
