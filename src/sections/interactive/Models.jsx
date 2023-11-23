import { easing } from 'maath';
import { MathUtils, Color } from 'three';
import { useCallback, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDrag } from './Grid';
import React from 'react';

const Models = ({
	position = [0.5, -1, -0.5],
	c = new Color(),
	round = Math.round,
	clamp = MathUtils.clamp,
	action,
	rotate,
	child,
	activeKey,
	color,
	xMin = -3.4,
	xMax = -5,
	zMin = -10.5,
	zMax = 10.5,
	...props
}) => {
	const ref = useRef();

	const pos = useRef(position);
	const onDrag = useCallback(
		({ x, z }) =>
			(pos.current = [
				clamp(x, xMin, xMax),
				position[1],
				clamp(z, zMin, zMax),
			]),
		[]
	);

	const [events, active, hovered] = useDrag(onDrag);
	useEffect(
		() =>
			void (document.body.style.cursor = active
				? '-webkit-grabbing'
				: hovered
				? '-webkit-grab'
				: 'auto'),
		[active, hovered]
	);
	useFrame((state, delta) => {
		easing.damp3(ref.current.position, pos.current, 0.1, delta);
	});

	const clonedElement = React.cloneElement(child, {
		ref: ref,
		events: events,
		props: props,
		action: action,
		color: color,
		rotate: rotate,
	});

	return <>{clonedElement}</>;
};

export default Models;
