/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.12 kitchen6.glb
*/
import React, { useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Kitchen6 = forwardRef(({ events, props, action, rotate, color }, ref) => {
	const { nodes, materials } = useGLTF('/kitchen6.glb');
  return (
    <group
    dispose={null}
    {...props}
    {...events}
    ref={ref}
    onClick={action}
    rotation-y={rotate}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.benchtop1}  material-color={color.Color ? color.Color : null}/>
        <mesh geometry={nodes.Object_3.geometry} material={materials.carcaseBaseleft}  material-color={color.Color ? color.Color : null} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.door}  material-color={color.Color ? color.Color : null}/>
        <mesh geometry={nodes.Object_5.geometry} material={materials.handle_03}  material-color={color.Handle ? color.Handle : null}/>
        <mesh geometry={nodes.Object_6.geometry} material={materials.kick1}  material-color={color.Color ? color.Color : null}/>
        <mesh geometry={nodes.Object_7.geometry} material={materials.stand1} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.standbase1}  material-color={color.Color ? color.Color : null}/>
      </group>
    </group>
  )
});

useGLTF.preload('/kitchen6.glb');

export default Kitchen6;