import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'
import * as THREE from 'three'
import { QubitState } from './QuantumSimulator'

interface BlochSphereProps {
  state: QubitState
  label?: string
  size?: number
}

function StateVector({ state }: { state: QubitState }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Convert spherical to Cartesian coordinates
  const x = Math.sin(state.theta) * Math.cos(state.phi)
  const y = Math.sin(state.theta) * Math.sin(state.phi)
  const z = Math.cos(state.theta)

  return (
    <group>
      {/* State vector arrow */}
      <Line
        points={[[0, 0, 0], [x, y, z]]}
        color="#ff4444"
        lineWidth={3}
      />
      {/* Arrow head */}
      <mesh ref={meshRef} position={[x, y, z]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function SphereWireframe() {
  return (
    <group>
      {/* Main sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#4488ff" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Equator circle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), Math.sin(angle), 0] as [number, number, number]
        })}
        color="#6699ff"
        lineWidth={1.5}
      />
      
      {/* Prime meridian (XZ plane) */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), 0, Math.sin(angle)] as [number, number, number]
        })}
        color="#6699ff"
        lineWidth={1.5}
      />
      
      {/* YZ plane circle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [0, Math.cos(angle), Math.sin(angle)] as [number, number, number]
        })}
        color="#6699ff"
        lineWidth={1.5}
      />
    </group>
  )
}

function Axes() {
  return (
    <group>
      {/* X axis */}
      <Line points={[[-1.3, 0, 0], [1.3, 0, 0]]} color="#ff6666" lineWidth={2} />
      <Text position={[1.5, 0, 0]} fontSize={0.15} color="#ff6666">X |+⟩</Text>
      <Text position={[-1.5, 0, 0]} fontSize={0.15} color="#ff6666">|-⟩</Text>
      
      {/* Y axis */}
      <Line points={[[0, -1.3, 0], [0, 1.3, 0]]} color="#66ff66" lineWidth={2} />
      <Text position={[0, 1.5, 0]} fontSize={0.15} color="#66ff66">Y |+i⟩</Text>
      <Text position={[0, -1.5, 0]} fontSize={0.15} color="#66ff66">|-i⟩</Text>
      
      {/* Z axis */}
      <Line points={[[0, 0, -1.3], [0, 0, 1.3]]} color="#6666ff" lineWidth={2} />
      <Text position={[0, 0, 1.5]} fontSize={0.15} color="#6666ff">Z |0⟩</Text>
      <Text position={[0, 0, -1.5]} fontSize={0.15} color="#6666ff">|1⟩</Text>
    </group>
  )
}

function RotatingScene({ state }: { state: QubitState }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle auto-rotation for better 3D perception
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <SphereWireframe />
      <Axes />
      <StateVector state={state} />
    </group>
  )
}

export function BlochSphere3D({ state, label, size = 200 }: BlochSphereProps) {
  return (
    <div className="flex flex-col items-center">
      {label && <div className="text-sm text-blue-400 mb-2 font-semibold">{label}</div>}
      <div style={{ width: size, height: size }} className="bg-slate-900 rounded-lg border border-blue-900/50">
        <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <RotatingScene state={state} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div className="text-xs text-slate-400 mt-1">
        θ={((state.theta / Math.PI) * 180).toFixed(0)}° φ={((state.phi / Math.PI) * 180).toFixed(0)}°
      </div>
    </div>
  )
}

interface MultiQubitBlochProps {
  states: QubitState[]
}

export function MultiQubitBloch({ states }: MultiQubitBlochProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {states.map((state, index) => (
        <BlochSphere3D 
          key={index} 
          state={state} 
          label={`Qubit ${index}`}
          size={180}
        />
      ))}
    </div>
  )
}

export default BlochSphere3D
