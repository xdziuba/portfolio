"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * The hero scene: a core that receives a signal on one side, transforms it, and
 * emits a structured lattice on the other. That is the shape every project in this
 * portfolio shares, so the object is the argument rather than decoration.
 *
 * Constraints this file takes seriously:
 *  - no textures, no loaded models — everything is procedural geometry
 *  - device pixel ratio capped, geometry budget reduced on coarse pointers
 *  - the render loop stops entirely when the tab is hidden or the hero scrolls away
 *  - prefers-reduced-motion renders one static frame and never animates
 *
 * Per-frame values are mutated through refs, never through memoised objects or
 * React state: a 60fps setState would re-render the whole tree every frame.
 */

const ICE = new THREE.Color("#7fe9ff");
const ACCENT = new THREE.Color("#2fd3f5");
const DEEP = new THREE.Color("#3c6bff");

type Quality = "high" | "low";

/**
 * Half-length of the signal path. Kept short deliberately: at full width the line
 * ran under the hero paragraph, and a hairline crossing body text is a defect.
 */
const PATH_HALF = 3.3;

/* ------------------------------------------------------------------ core -- */

const coreVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPositionW;

  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/*
 * Fresnel rim plus a vertical scan band, which reads as an instrument sweeping the
 * object rather than a generic glow. Branchless — step/smoothstep instead of if.
 */
const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uIce;
  uniform vec3 uAccent;
  uniform vec3 uDeep;
  uniform float uMotion;

  varying vec3 vNormalW;
  varying vec3 vPositionW;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPositionW);
    // A high exponent keeps this a rim rather than a fill — the object must read as
    // an engineered edge, not a glowing ball.
    float fresnel = pow(1.0 - clamp(dot(viewDir, normalize(vNormalW)), 0.0, 1.0), 4.2);

    // Sweep band travelling up the object; frozen when motion is disabled.
    float sweepY = fract(uTime * 0.09 * uMotion);
    float band = smoothstep(0.05, 0.0, abs(fract(vPositionW.y * 0.42 - sweepY) - 0.5) - 0.45);

    vec3 color = mix(uDeep * 0.1, uAccent, fresnel);
    color = mix(color, uIce, band * 0.35 + fresnel * fresnel * 0.4);

    // Additive blending accumulates fast on a near-black page, so the envelope is
    // kept deliberately low; the silhouette comes from the rim, not the volume.
    float alpha = clamp(fresnel * 0.85 + band * 0.12, 0.0, 1.0) * 0.6;
    gl_FragColor = vec4(color * 0.85, alpha);
  }
`;

function Core({ motion }: { motion: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Created once and handed to the material as its initial uniform set. Per-frame
  // writes go through the material instance below, never through this object
  // during render.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIce: { value: ICE },
      uAccent: { value: ACCENT },
      uDeep: { value: DEEP },
      uMotion: { value: 1 },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (material) {
      material.uniforms.uTime!.value = state.clock.elapsedTime;
      material.uniforms.uMotion!.value = motion;
    }

    const mesh = meshRef.current;
    if (mesh && motion > 0) {
      mesh.rotation.y += delta * 0.12;
      mesh.rotation.x += delta * 0.04;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Noticeably smaller than the shell so the cage reads as a separate layer. */}
      <icosahedronGeometry args={[0.95, 1]} />
      {/* Declarative, so R3F owns disposal of both geometry and material. */}
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={coreVertex}
        fragmentShader={coreFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Wireframe shell around the core — gives the glass object an engineered edge. */
function CoreShell({ motion }: { motion: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  // Detail 0 on purpose: subdividing produced a dense triangle mesh that read as
  // generic 3D noise. Twenty faces keep it a deliberate, engineered cage.
  const geometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 0)), []);

  // Three.js never frees GPU memory on its own.
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const node = ref.current;
    if (node && motion > 0) node.rotation.y -= delta * 0.05;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color={ACCENT} transparent opacity={0.22} />
    </lineSegments>
  );
}

/* ----------------------------------------------------------------- rings -- */

/** Frequency rings on separate axes — the RF/oscilloscope reference. */
function Rings({ count, motion }: { count: number; motion: number }) {
  const group = useRef<THREE.Group>(null);

  const rings = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        // Radii hug the shell; wider rings projected as stray arcs across the page.
        radius: 1.5 + i * 0.32,
        tilt: (i * Math.PI) / 3.2,
        speed: 0.16 - i * 0.035,
        opacity: 0.5 - i * 0.11,
      })),
    [count],
  );

  useFrame((_, delta) => {
    const node = group.current;
    if (!node || motion === 0) return;
    for (const [i, child] of node.children.entries()) {
      child.rotation.z += delta * (rings[i]?.speed ?? 0.1);
    }
  });

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + ring.tilt, ring.tilt * 0.5, 0]}>
          <torusGeometry args={[ring.radius, 0.006, 3, 96]} />
          <meshBasicMaterial color={i % 2 === 0 ? ACCENT : DEEP} transparent opacity={ring.opacity} />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------------- signal path -- */

/**
 * The literal statement of the piece: pulses enter from the left, reach the core,
 * and leave on the right as an evenly spaced lattice.
 */
function SignalPath({ motion, quality }: { motion: number; quality: Quality }) {
  const pulseCount = quality === "high" ? 5 : 3;
  const pulsesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  useFrame((state) => {
    const mesh = pulsesRef.current;
    if (!mesh) return;
    const t = motion > 0 ? state.clock.elapsedTime : 4;
    const node = dummy.current;

    for (let i = 0; i < pulseCount; i++) {
      const phase = (t * 0.22 + i / pulseCount) % 1;
      const x = -PATH_HALF + phase * PATH_HALF * 2;
      // Pulses compress as they pass through the core and spread out after it.
      const nearCore = 1 - Math.min(Math.abs(x) / 1.8, 1);
      node.position.set(x, 0, 0);
      node.scale.setScalar(0.03 + nearCore * 0.045);
      node.updateMatrix();
      mesh.setMatrixAt(i, node.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* drei's Line owns its geometry/material lifecycle — building a THREE.Line
          inline would allocate a new object on every render. */}
      <Line
        points={[
          [-PATH_HALF, 0, 0],
          [PATH_HALF, 0, 0],
        ]}
        color={ACCENT}
        lineWidth={1}
        transparent
        opacity={0.16}
      />
      <instancedMesh ref={pulsesRef} args={[undefined, undefined, pulseCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={ICE} transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}

/** Structured output: an even lattice on the emit side, contrasting the loose input. */
function OutputLattice({ motion }: { motion: number }) {
  const ref = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        out.push([1.95 + col * 0.45, (row - 1.5) * 0.42, -0.25 + col * 0.14]);
      }
    }
    return out;
  }, []);

  useFrame((state) => {
    const node = ref.current;
    if (!node || motion === 0) return;
    // A slow breath, not a bounce — the lattice is meant to read as settled.
    node.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
  });

  return (
    <group ref={ref}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.045, 0.045, 0.045]} />
          <meshBasicMaterial color={i % 3 === 0 ? ICE : DEEP} transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------- pointer -- */

/** Damped parallax. Small range on purpose — the brief rules out aggressive camera work. */
function PointerParallax({ enabled }: { enabled: boolean }) {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  // The camera comes from the frame state rather than a hook return value, so the
  // per-frame write stays inside the render loop's own objects.
  useFrame((state) => {
    if (!enabled) return;
    const { camera } = state;
    camera.position.x += (target.current.x * 0.55 - camera.position.x) * 0.04;
    camera.position.y += (-target.current.y * 0.35 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------------------------------------------------------------- scene -- */

function Scene({ quality, motion }: { quality: Quality; motion: number }) {
  return (
    <>
      {/* One group so the whole instrument scales as a unit and stays a single
          readable object instead of spreading across the viewport. */}
      <group scale={quality === "high" ? 0.86 : 0.78}>
        <Core motion={motion} />
        <CoreShell motion={motion} />
        <Rings count={quality === "high" ? 3 : 2} motion={motion} />
        <SignalPath motion={motion} quality={quality} />
        {quality === "high" && <OutputLattice motion={motion} />}
      </group>
      <PointerParallax enabled={motion > 0 && quality === "high"} />
    </>
  );
}

export default function SignalField() {
  const hostRef = useRef<HTMLDivElement>(null);

  // Subscribed, so a mid-session change to either preference is picked up.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const narrow = useMediaQuery("(max-width: 767px)");

  const [active, setActive] = useState(true);

  // Stop rendering when the tab is hidden or the hero has scrolled out of view.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let onScreen = true;
    const sync = () => setActive(onScreen && document.visibilityState === "visible");

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
      sync();
    }, { rootMargin: "120px" });

    io.observe(host);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const quality: Quality = coarsePointer || narrow ? "low" : "high";
  const motion = reducedMotion ? 0 : 1;
  // With reduced motion we still render one frame, then never again.
  const frameloop = reducedMotion ? "demand" : active ? "always" : "never";

  return (
    <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={[1, quality === "high" ? 2 : 1.5]}
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
        // Lets AdaptiveDpr drop resolution on a weak GPU instead of dropping frames.
        performance={{ min: 0.5 }}
        style={{ pointerEvents: "none" }}
      >
        <Scene quality={quality} motion={motion} />
        <AdaptiveDpr />
      </Canvas>
    </div>
  );
}
