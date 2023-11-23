/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.12 kitchen7.glb
*/

import React, { useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Kitchen7 = forwardRef(({ events, props, action, rotate, color }, ref) => {
	const { nodes, materials } = useGLTF('/kitchen7.glb');
  return (
    <group
    dispose={null}
    {...props}
    {...events}
    ref={ref}
    onClick={action}
    rotation-y={rotate}>
      <group position={[0, -0.758, -0.559]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[-546.827, 151.733, 241.807]} rotation={[-Math.PI / 2, 0, -0.727]} scale={100}>
            <mesh geometry={nodes.Cube002_Anyag001_0.geometry} material={materials['Anyag.001']} />
            <mesh geometry={nodes.Cube002_Anyag003_0.geometry} material={materials['Anyag.003']} />
          </group>
          <mesh geometry={nodes.Cube_Anyag003_0.geometry} material={materials['Anyag.003']} position={[-390.705, 164.62, 23.304]} rotation={[-Math.PI / 2, 0, 0]} scale={100}  material-color={color.Color ? color.Color : null}/>
          <mesh geometry={nodes.Cube001_Anyag006_0.geometry} material={materials['Anyag.006']} position={[-180.414, 153.58, 107.335]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.Cube003_Anyag007_0.geometry} material={materials['Anyag.007']} position={[-668.389, 248.714, 99.327]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.Cube004_Anyag007_0.geometry} material={materials['Anyag.007']} position={[-668.389, 52.464, 99.327]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.Henger001_Anyag005_0.geometry} material={materials['Anyag.005']} position={[-202.27, 21.751, 128.397]} rotation={[0, 0, -Math.PI]} scale={-4.582} />
        </group>
      </group>
    </group>
  )
});

useGLTF.preload('/kitchen7.glb');

export default Kitchen7;