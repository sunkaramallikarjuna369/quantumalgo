import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

interface ProbabilityBarsProps {
  probabilities: number[]
  numQubits: number
}

function Bar({ position, height, label, probability }: { 
  position: [number, number, number]
  height: number
  label: string
  probability: number
}) {
  const color = new THREE.Color()
  // Color gradient from blue (low) to red (high)
  color.setHSL(0.6 - probability * 0.6, 0.8, 0.5)

  return (
    <group position={position}>
      {/* Bar */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.2}
        color="#aaaaaa"
        anchorY="top"
      >
        |{label}⟩
      </Text>
      {/* Probability value */}
      <Text
        position={[0, height + 0.2, 0]}
        fontSize={0.15}
        color="#ffffff"
      >
        {(probability * 100).toFixed(1)}%
      </Text>
    </group>
  )
}

function Grid({ numBars }: { numBars: number }) {
  const width = numBars * 1.2
  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 - 0.6, 0, 0]}>
        <planeGeometry args={[width + 1, 4]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.5} />
      </mesh>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((y) => (
        <group key={y}>
          <mesh position={[width / 2 - 0.6, y * 2, -2]}>
            <planeGeometry args={[width + 1, 0.01]} />
            <meshBasicMaterial color="#333355" />
          </mesh>
          <Text
            position={[-1, y * 2, 0]}
            fontSize={0.12}
            color="#666688"
          >
            {(y * 100).toFixed(0)}%
          </Text>
        </group>
      ))}
    </group>
  )
}

function BarsScene({ probabilities, numQubits }: ProbabilityBarsProps) {
  const numStates = Math.pow(2, numQubits)
  const maxProb = Math.max(...probabilities, 0.01)
  
  return (
    <group>
      <Grid numBars={numStates} />
      {probabilities.map((prob, index) => {
        const binaryLabel = index.toString(2).padStart(numQubits, '0')
        const normalizedHeight = (prob / maxProb) * 2
        return (
          <Bar
            key={index}
            position={[index * 1.2, 0, 0]}
            height={Math.max(normalizedHeight, 0.02)}
            label={binaryLabel}
            probability={prob}
          />
        )
      })}
    </group>
  )
}

export function ProbabilityBars3D({ probabilities, numQubits }: ProbabilityBarsProps) {
  const numStates = Math.pow(2, numQubits)
  const cameraX = numStates * 0.6
  
  return (
    <div className="w-full h-64 bg-slate-900 rounded-lg border border-blue-900/50">
      <Canvas camera={{ position: [cameraX, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        <BarsScene probabilities={probabilities} numQubits={numQubits} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  )
}

// 2D fallback for simpler display
export function ProbabilityBars2D({ probabilities, numQubits }: ProbabilityBarsProps) {
  const maxProb = Math.max(...probabilities, 0.01)
  
  return (
    <div className="w-full p-4 bg-slate-900 rounded-lg border border-blue-900/50">
      <div className="flex items-end justify-center gap-2 h-40">
        {probabilities.map((prob, index) => {
          const binaryLabel = index.toString(2).padStart(numQubits, '0')
          const heightPercent = (prob / maxProb) * 100
          const hue = 220 - prob * 180 // Blue to red
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-white mb-1">
                {(prob * 100).toFixed(1)}%
              </div>
              <div
                className="w-8 rounded-t transition-all duration-300"
                style={{
                  height: `${Math.max(heightPercent, 2)}%`,
                  backgroundColor: `hsl(${hue}, 70%, 50%)`,
                  minHeight: '4px'
                }}
              />
              <div className="text-xs text-slate-400 mt-1">|{binaryLabel}⟩</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProbabilityBars3D
