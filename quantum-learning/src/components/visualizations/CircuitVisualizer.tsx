import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react'
import { BlochSphere3D, MultiQubitBloch } from './BlochSphere'
import { ProbabilityBars2D } from './ProbabilityBars'
import { SimulationStep, circuitExamples, CircuitExampleKey } from './QuantumSimulator'

interface CircuitVisualizerProps {
  exampleKey: CircuitExampleKey
  title: string
  description: string
}

export function CircuitVisualizer({ exampleKey, title, description }: CircuitVisualizerProps) {
  const [steps] = useState<SimulationStep[]>(() => circuitExamples[exampleKey]())
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const step = steps[currentStep]
  const numQubits = step.blochStates.length

  // Auto-play functionality
  useState(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
  })

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
    setIsPlaying(false)
  }

  const handleNext = () => {
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))
    setIsPlaying(false)
  }

  return (
    <Card className="bg-slate-900/70 border-blue-900/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-blue-300">{title}</span>
          <Badge variant="outline" className="text-xs">
            Step {currentStep + 1} / {steps.length}
          </Badge>
        </CardTitle>
        <p className="text-sm text-slate-400">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current step info */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600">{step.gateName}</Badge>
            {step.qubitIndices.length > 0 && (
              <span className="text-sm text-slate-400">
                on qubit{step.qubitIndices.length > 1 ? 's' : ''} {step.qubitIndices.join(', ')}
              </span>
            )}
          </div>
          <p className="text-slate-300">{step.description}</p>
        </div>

        {/* Bloch spheres */}
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Qubit States (Bloch Sphere)</h4>
          {numQubits === 1 ? (
            <div className="flex justify-center">
              <BlochSphere3D state={step.blochStates[0]} label="Qubit 0" size={220} />
            </div>
          ) : (
            <MultiQubitBloch states={step.blochStates} />
          )}
          <p className="text-xs text-slate-500 text-center mt-2">
            Drag to rotate. Red arrow shows qubit state. |0⟩ is at top (Z+), |1⟩ at bottom (Z-).
          </p>
        </div>

        {/* Probability distribution */}
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Measurement Probabilities</h4>
          <ProbabilityBars2D probabilities={step.probabilities} numQubits={numQubits} />
        </div>

        {/* Timeline slider */}
        <div className="space-y-2">
          <Slider
            value={[currentStep]}
            onValueChange={([value]) => {
              setCurrentStep(value)
              setIsPlaying(false)
            }}
            max={steps.length - 1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            {steps.map((s, i) => (
              <span 
                key={i} 
                className={`cursor-pointer hover:text-blue-400 ${i === currentStep ? 'text-blue-400 font-bold' : ''}`}
                onClick={() => setCurrentStep(i)}
              >
                {s.gateName}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrev} disabled={currentStep === 0}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" onClick={handlePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} disabled={currentStep === steps.length - 1}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Quick visualization cards for embedding in modules
export function QuickVisualization({ exampleKey }: { exampleKey: CircuitExampleKey }) {
  const examples: Record<CircuitExampleKey, { title: string; description: string }> = {
    superposition: {
      title: "Superposition Demo",
      description: "Watch how Hadamard creates equal superposition of |0⟩ and |1⟩"
    },
    bellState: {
      title: "Bell State Creation",
      description: "See how H + CNOT creates quantum entanglement"
    },
    phaseKickback: {
      title: "Phase Kickback",
      description: "Understand how phase information transfers to control qubit"
    },
    grover2Qubit: {
      title: "Grover's Algorithm (2 qubits)",
      description: "Watch amplitude amplification find the marked state |11⟩"
    },
    singleQubitRotations: {
      title: "Rotation Gates",
      description: "See how RX, RY, RZ rotate the qubit on the Bloch sphere"
    },
    pauliGates: {
      title: "Pauli Gates",
      description: "Visualize X, Y, Z gates transforming qubit states"
    },
    ghzState: {
      title: "GHZ State (3 qubits)",
      description: "Create maximally entangled 3-qubit state"
    }
  }

  const { title, description } = examples[exampleKey]
  return <CircuitVisualizer exampleKey={exampleKey} title={title} description={description} />
}

export default CircuitVisualizer
