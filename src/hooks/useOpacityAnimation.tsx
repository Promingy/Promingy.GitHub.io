import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppContext } from '../context';

export const useOpacityAnimation = (initialOpacity: number = 0) => {
    const [cloudOpacity, setCloudOpacity] = useState(initialOpacity);
    const context = useAppContext();
    const [isHovered, setIsHovered] = useState(false);

    useFrame(() => {
        if (context.lookingAt === 'none' && isHovered && cloudOpacity < 1) {
            setCloudOpacity(prevOpacity => Math.min(prevOpacity + 0.0025, 1));  // Prevent over-incrementing
        } else if (cloudOpacity > 0) {
            setCloudOpacity(prevOpacity => Math.max(prevOpacity - 0.0075, 0));  // Prevent going below 0
        }
    });

    return { cloudOpacity, setIsHovered };
};
