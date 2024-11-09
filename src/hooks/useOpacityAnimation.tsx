import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppContext } from '../context';

export const useOpacityAnimation = (initialOpacity: number = 0) => {
    const [cloudOpacity, setCloudOpacity] = useState(initialOpacity);
    const context = useAppContext();
    const [isHovered, setIsHovered] = useState(false);
    const debounceTime = 100; // time in milliseconds
    const lastUpdateTime = useRef(0);

    useFrame(() => {
        const now = Date.now();

        if (now - lastUpdateTime.current >= debounceTime) {
            if ((context.lookingAt === 'none' || context.lookingAt === 'projects') && isHovered && cloudOpacity < 1) {
                setCloudOpacity(prevOpacity => Math.min(prevOpacity + 0.01, 1));  // Prevent over-incrementing
            } else if (cloudOpacity > 0) {
                setCloudOpacity(prevOpacity => Math.max(prevOpacity - 0.025, 0));  // Prevent going below 0
            }
            lastUpdateTime.current = now;
        }
    });

    return { cloudOpacity, setIsHovered };
};
