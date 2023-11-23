import { Vector3, Plane } from 'three';
import {
	createContext,
	useContext,
	useCallback,
	useState,
	useRef,
} from 'react';
import { useThree } from '@react-three/fiber';

const v = new Vector3();
const p = new Plane(new Vector3(0, 1, 0), 0);
const context = createContext();

function useDrag(onDrag) {
	const controls = useThree((state) => state.controls);
	const activatePlane = useContext(context);
	const [hovered, hover] = useState(false);
	const [active, activate] = useState(false);
	const out = useCallback(() => hover(false), []);
	const over = useCallback((e) => (e.stopPropagation(), hover(true)), []);

	const down = useCallback(
		(e) => {
			e.stopPropagation();
			activate(true);
			activatePlane(true);
			if (controls) controls.enabled = false;
			e.target.setPointerCapture(e.pointerId);
		},
		[controls]
	);

	const up = useCallback(
		(e) => {
			activate(false);
			activatePlane(false);
			if (controls) controls.enabled = true;
			e.target.releasePointerCapture(e.pointerId);
		},
		[controls]
	);

	const move = useCallback(
		(e) => {
			e.stopPropagation();
			if (active && e.ray.intersectPlane(p, v)) onDrag(v);
		},
		[onDrag, active]
	);
	return [
		{
			onPointerOver: over,
			onPointerOut: out,
			onPointerDown: down,
			onPointerUp: up,
			onPointerMove: move,
		},
		active,
		hovered,
	];
}

function Grid({ children, scale, divisions = 10, ...props }) {
	const [active, activate] = useState(false);

	return (
		<group {...props}>
			<context.Provider value={activate}>{children}</context.Provider>
		</group>
	);
}

export { Grid, useDrag };
