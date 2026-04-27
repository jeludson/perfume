'use client'

import { Canvas } from '@react-three/fiber'
import { 
  Stage, 
  OrbitControls, 
  SpotLight, 
  PerspectiveCamera, 
  Environment,
  ContactShadows,
} from '@react-three/drei'
import { Suspense } from 'react'
import PerfumeModel from './PerfumeModel'
import { motion } from 'framer-motion'

export default function Hero3D() {
  return (
    <div className="relative w-full h-screen bg-[#050508] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-accent3/10 blur-[120px] rounded-full" />
      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        <div className="flex flex-col items-center justify-between h-full py-[10vh] md:py-[15vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-30"
          >
            <span className="text-accent font-inter tracking-[0.5em] text-[10px] md:text-xs uppercase mb-4 block">Exclusive Luxury</span>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-playfair font-bold text-white mb-6 tracking-tighter leading-[0.85]">
              PREMIUM <br /> <span className="text-accent italic text-[0.8em]">ELITE</span>
            </h1>
            <p className="text-muted text-xs md:text-sm lg:text-base max-w-xl mx-auto font-inter uppercase tracking-[0.3em] leading-relaxed mt-4">
              The essence of divine elegance in every drop.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pointer-events-auto"
          >
            <button className="px-8 py-3 md:px-12 md:py-5 bg-white text-bg font-bold rounded-full hover:bg-accent transition-all duration-500 uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-white/10">
              DISCOVER COLLECTION
            </button>
          </motion.div>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
          <color attach="background" args={['#050508']} />
          
          <Suspense fallback={null}>
            <Stage 
              intensity={0.5} 
              environment="city" 
              shadows={{ type: 'contact', opacity: 0.4, blur: 3 }} 
              adjustCamera={false}
            >
              <PerfumeModel />
            </Stage>
            
            {/* Spotlight Focus */}
            <SpotLight
              position={[0, 5, 0]}
              angle={0.15}
              penumbra={1}
              intensity={2}
              castShadow
              color="#00f5c4"
            />
            
            <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={35} />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.5} 
              maxPolarAngle={Math.PI / 2} 
              minPolarAngle={Math.PI / 2.5}
            />
            
            <Environment preset="night" />
            
            {/* Pedestal effect */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
              <circleGeometry args={[2, 64]} />
              <meshStandardMaterial color="#0c0c14" roughness={0.1} metalness={0.8} />
            </mesh>
            
            <ContactShadows position={[0, -1.19, 0]} opacity={0.6} scale={10} blur={2} far={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-muted to-accent" />
        <span className="text-[10px] tracking-widest font-inter uppercase">SCROLL</span>
      </motion.div>
    </div>
  )
}
