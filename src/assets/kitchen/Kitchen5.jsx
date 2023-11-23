/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.12 kitchen5.glb
*/

import React, { useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Kitchen5 = forwardRef(({ events, props, action, rotate, color }, ref) => {
	const { nodes, materials } = useGLTF('/kitchen5.glb');
  return (
    <group
    dispose={null}
    {...props}
    {...events}
    ref={ref}
    onClick={action}
    rotation-y={rotate}>
      <mesh geometry={nodes.Drawer_001_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Drawer_002_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Drawer_003_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Drawer_004_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.ElectricStove_lambert1_0.geometry} material={materials.lambert1}  material-Stove={color.Color ? color.Stove : null}/>
      <mesh geometry={nodes.Switch_001_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Switch_002_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.KitchenTable_lambert1_0.geometry} material={materials.lambert1}  material-color={color.Color ? color.Color : null} />
      <mesh geometry={nodes.L_SinkCabinet_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.MiniRef_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Door_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.TempSwitch_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.R_SinkCabinet_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Sink_lambert1_0.geometry} material={materials.lambert1}  material-color={color.Sink ? color.Sink : null}/>
      <mesh geometry={nodes.Faucet_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.Piple_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.SinkHole_lambert1_0.geometry} material={materials.lambert1} />
    </group>
  )
});

useGLTF.preload('/kitchen5.glb');

export default Kitchen5;