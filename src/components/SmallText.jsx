import { useCursor, Text, Bvh } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { clearTimeouts } from './Camera'
import { useCallback, useState } from 'react'
import { useAppContext } from '../context'

export default function SmallText({hoverColor="#ff0000", baseColor='#ffffff', ...props}) {
    const [color, setColor] = useState(baseColor)
    const {controls} = useThree()
    const context = useAppContext()
    const [hovered, setHovered] = useState(false)

    useCursor(hovered, 'pointer', 'default')

    const handleClick = useCallback((e) => {
        e.stopPropagation()

        context.setTransition(true)
        context.toggleTransitionTimeout(false)
        context.setPan(false)
        
        clearTimeouts();
        clearTimeout(context.panTimeout)

        context.click.play();
        context.whoosh.play();
        
        context.setSmallText(props.newLookingAt ? true : false);
        context.setLookingAt(props.newLookingAt ? props.newLookingAt : 'none');

        controls?.setLookAt(...props.moveTo, ...props.lookAt, true)
        context.toggleTransitionTimeout(true)

    }, [controls, context.setPan, context.setSmallText, context.click, context.whoosh, context.lookingAt, context.setLookingAt, props.newLookingAt, props.moveTo, props.lookAt]);


    return (
        <Bvh setBoundingBox splitStrategy="SAH">
            <Text
                font='/Playball-Regular.ttf'
                characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!é "
                color={color}
                position={props.position}
                rotation={props.rotation}
                scale={props.size || .33}
                onClick={handleClick}
                text={props.text}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    setColor(hoverColor)
                    setHovered(true)
                }}
                onPointerOut={(e) => {
                    e.stopPropagation()
                    setColor(baseColor)
                    setHovered(false)
                }}
            />
        </Bvh>
    )
}