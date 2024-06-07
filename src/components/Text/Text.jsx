import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'
import Playball from '../../Playball_Regular.json'

extend({ TextGeometry })


export default function Text({text, size, depth, position}) {
    const font = new FontLoader().parse(Playball)

    return (
        <mesh position={position}>
            <textGeometry args={[text, { font, size, depth }]} />
            <meshStandardMaterial color={0xffffff} />
        </mesh>
    )
}