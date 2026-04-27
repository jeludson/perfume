'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function PerfumeModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = time * 0.5
    meshRef.current.position.y = Math.sin(time) * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Main bottle body */}
        <boxGeometry args={[1, 1.5, 0.6]} />
        <MeshDistortMaterial
          color="#00f5c4"
          speed={2}
          distort={0.2}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
        
        {/* Bottle cap */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.4]} />
          <meshStandardMaterial color="#7b5cfa" metalness={1} roughness={0} />
        </mesh>

        {/* Liquid inside effect */}
        <mesh position={[0, -0.2, 0]} scale={[0.9, 0.9, 0.9]}>
          <boxGeometry args={[1, 1, 0.6]} />
          <MeshWobbleMaterial
            color="#00f5c4"
            factor={0.4}
            speed={1}
            transparent
            opacity={0.5}
          />
        </mesh>
      </mesh>
    </Float>
  )
}
