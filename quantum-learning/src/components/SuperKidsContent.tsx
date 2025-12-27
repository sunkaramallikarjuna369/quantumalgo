import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  Sparkles, Lightbulb, Star, BookOpen, 
  HelpCircle, Trophy,
  Play, Eye, Code
} from 'lucide-react'
import { QuickVisualization } from '@/components/visualizations'
import type { CircuitExampleKey } from '@/components/visualizations'

// ============================================
// GLOSSARY - Simple definitions for kids
// ============================================
const glossary: Record<string, { simple: string; emoji: string }> = {
  'qubit': { 
    simple: "A quantum bit - like a magical coin that can be heads AND tails at the same time until you look at it!", 
    emoji: "🪙" 
  },
  'superposition': { 
    simple: "When a qubit is in multiple states at once - like a spinning coin before it lands!", 
    emoji: "🌀" 
  },
  'measurement': { 
    simple: "Looking at a qubit to see what state it's in - like stopping a spinning coin to see heads or tails!", 
    emoji: "👁️" 
  },
  'entanglement': { 
    simple: "When two qubits become best friends and always match - like magic friendship bracelets!", 
    emoji: "🔗" 
  },
  'gate': { 
    simple: "A quantum instruction that changes a qubit - like a magic wand that transforms things!", 
    emoji: "🪄" 
  },
  'hadamard': { 
    simple: "The H gate - makes a qubit go into superposition (start spinning)!", 
    emoji: "🌀" 
  },
  'cnot': { 
    simple: "A gate that connects two qubits - if the first is 1, it flips the second!", 
    emoji: "🔀" 
  },
  'probability': { 
    simple: "The chance of something happening - like how likely you are to get heads when flipping a coin!", 
    emoji: "🎲" 
  },
  'circuit': { 
    simple: "A list of quantum instructions - like a recipe for the quantum computer to follow!", 
    emoji: "📋" 
  },
  'state': { 
    simple: "What a qubit currently is - like whether a light is on, off, or somewhere in between!", 
    emoji: "💡" 
  },
  'bloch sphere': { 
    simple: "A 3D ball that shows where a qubit is pointing - the arrow shows the qubit's state!", 
    emoji: "🌍" 
  },
  'shots': { 
    simple: "How many times we run the experiment - like flipping a coin 100 times to see the pattern!", 
    emoji: "🔄" 
  }
}

// Glossary tooltip component
function GlossaryTerm({ term, children }: { term: string; children: React.ReactNode }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const entry = glossary[term.toLowerCase()]
  
  if (!entry) return <>{children}</>
  
  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="border-b-2 border-dotted border-purple-400 cursor-help text-purple-300">
        {children}
      </span>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-purple-900 border border-purple-500 rounded-lg shadow-xl z-50">
          <div className="flex items-start gap-2">
            <span className="text-2xl">{entry.emoji}</span>
            <p className="text-sm text-purple-100">{entry.simple}</p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-purple-900"></div>
        </div>
      )}
    </span>
  )
}

// ============================================
// STEP-BY-STEP CODE EXPLANATION
// ============================================
interface CodeStep {
  lineNumber: number
  code: string
  simpleExplanation: string
  detailedExplanation: string
  whatHappens: string
  analogy: string
  visualizationBefore?: CircuitExampleKey
  visualizationAfter?: CircuitExampleKey
  stepInVisualization?: number
}

interface ProgramExplanation {
  title: string
  goal: string
  realWorldUse: string
  steps: CodeStep[]
  fullCode: string
  quiz: QuizQuestion[]
}

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// ============================================
// DETAILED PROGRAM EXPLANATIONS
// ============================================
const programExplanations: Record<number, ProgramExplanation[]> = {
  1: [
    {
      title: "Creating Your First Quantum Circuit - The Bell State",
      goal: "Make two qubits become 'quantum best friends' (entangled) so they always give matching answers!",
      realWorldUse: "This is used in quantum teleportation, super-secure communication, and quantum computers!",
      fullCode: `from qiskit import QuantumCircuit, Aer, execute

# Create a circuit with 2 qubits and 2 classical bits
qc = QuantumCircuit(2, 2)

# Apply Hadamard gate to qubit 0
qc.h(0)

# Apply CNOT gate (control=0, target=1)
qc.cx(0, 1)

# Measure both qubits
qc.measure([0, 1], [0, 1])

# Run on simulator
backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend=backend, shots=1024)
result = job.result()
counts = result.get_counts()
print("Results:", counts)`,
      steps: [
        {
          lineNumber: 1,
          code: "from qiskit import QuantumCircuit, Aer, execute",
          simpleExplanation: "Get our quantum tools ready!",
          detailedExplanation: "This line tells Python to bring in the tools we need from Qiskit. It's like getting your art supplies before painting - you need brushes, paint, and paper!",
          whatHappens: "Nothing visible yet - we're just preparing our toolbox.",
          analogy: "Like opening your toy box and getting out the pieces you need to build something cool!"
        },
        {
          lineNumber: 4,
          code: "qc = QuantumCircuit(2, 2)",
          simpleExplanation: "Create a quantum circuit with 2 qubits!",
          detailedExplanation: "We create a 'quantum circuit' - think of it as a recipe card. The first '2' means we want 2 qubits (quantum coins). The second '2' means we want 2 regular bits to store our answers.",
          whatHappens: "Two qubits are created, both starting in the |0⟩ state (like two coins both showing tails).",
          analogy: "Like getting two magical coins and two boxes to put your answers in!",
          visualizationBefore: 'bellState',
          stepInVisualization: 0
        },
        {
          lineNumber: 7,
          code: "qc.h(0)",
          simpleExplanation: "Make the first qubit start spinning!",
          detailedExplanation: "The 'H' stands for Hadamard gate. It takes qubit 0 (the first one) and puts it into SUPERPOSITION. Before: the qubit was definitely |0⟩. After: it's BOTH |0⟩ AND |1⟩ at the same time!",
          whatHappens: "Qubit 0 goes from pointing straight up on the Bloch sphere to pointing sideways (on the equator). It now has 50% chance of being 0 and 50% chance of being 1.",
          analogy: "Like spinning a coin really fast - while it's spinning, it's not heads or tails, it's BOTH!",
          visualizationAfter: 'bellState',
          stepInVisualization: 1
        },
        {
          lineNumber: 10,
          code: "qc.cx(0, 1)",
          simpleExplanation: "Connect the two qubits as best friends!",
          detailedExplanation: "CNOT (Controlled-NOT) is the 'friendship gate'. Qubit 0 is the 'control' and qubit 1 is the 'target'. If qubit 0 is |1⟩, qubit 1 gets flipped. If qubit 0 is |0⟩, nothing happens to qubit 1. But since qubit 0 is in superposition (both 0 AND 1), something magical happens - they become ENTANGLED!",
          whatHappens: "The two qubits become entangled. Now they're connected - if you measure one, you instantly know what the other will be!",
          analogy: "Like making a pinky promise with your best friend - now whatever happens to one affects the other!",
          visualizationAfter: 'bellState',
          stepInVisualization: 2
        },
        {
          lineNumber: 13,
          code: "qc.measure([0, 1], [0, 1])",
          simpleExplanation: "Look at both qubits to see what they are!",
          detailedExplanation: "Measurement is like opening a mystery box. Before measuring, the qubits were in superposition (both 0 and 1). After measuring, each qubit 'chooses' to be either 0 or 1. Because they're entangled, they ALWAYS choose the same thing!",
          whatHappens: "Both qubits collapse from superposition to a definite state. You'll get either '00' or '11' - never '01' or '10'!",
          analogy: "Like stopping two spinning coins at the exact same moment - because they're magic best friends, they always land the same way!",
          visualizationAfter: 'bellState',
          stepInVisualization: 3
        },
        {
          lineNumber: 16,
          code: "backend = Aer.get_backend('qasm_simulator')",
          simpleExplanation: "Get a pretend quantum computer to test on!",
          detailedExplanation: "Real quantum computers are expensive and rare. A 'simulator' is a regular computer pretending to be a quantum computer. It's perfect for learning and testing!",
          whatHappens: "We connect to a simulator that will run our quantum circuit.",
          analogy: "Like using a flight simulator to practice flying before getting in a real airplane!"
        },
        {
          lineNumber: 17,
          code: "job = execute(qc, backend=backend, shots=1024)",
          simpleExplanation: "Run the experiment 1024 times!",
          detailedExplanation: "Because quantum results are random (50/50 for our Bell state), we run the experiment many times to see the pattern. 'shots=1024' means we run it 1024 times.",
          whatHappens: "The circuit runs 1024 times. Each time, we get either '00' or '11'.",
          analogy: "Like flipping your magic coins 1024 times to prove they really do always match!"
        },
        {
          lineNumber: 20,
          code: "counts = result.get_counts()",
          simpleExplanation: "Count up all the results!",
          detailedExplanation: "After running 1024 times, we count how many times we got '00' and how many times we got '11'. It should be about 512 each (half and half)!",
          whatHappens: "We get something like {'00': 510, '11': 514} - roughly half and half!",
          analogy: "Like counting your coin flip results: 'I got heads 510 times and tails 514 times!'"
        }
      ],
      quiz: [
        {
          question: "What does the Hadamard (H) gate do to a qubit?",
          options: [
            "Deletes the qubit",
            "Puts it in superposition (both 0 and 1 at once)",
            "Makes it always be 1",
            "Connects it to another qubit"
          ],
          correctIndex: 1,
          explanation: "The H gate creates superposition - like spinning a coin so it's both heads AND tails until you look at it!"
        },
        {
          question: "After measuring a Bell state, what results can you get?",
          options: [
            "Only '00'",
            "Only '11'",
            "Either '00' or '11', but never '01' or '10'",
            "Any combination: '00', '01', '10', or '11'"
          ],
          correctIndex: 2,
          explanation: "Because the qubits are entangled (best friends), they always match! You get '00' or '11', never '01' or '10'."
        },
        {
          question: "Why do we run the circuit 1024 times (shots=1024)?",
          options: [
            "Because quantum computers are slow",
            "To see the pattern of random results",
            "Because one time isn't enough power",
            "To make the qubits stronger"
          ],
          correctIndex: 1,
          explanation: "Quantum results are random! Running many times shows us the pattern - like flipping a coin many times to prove it's 50/50."
        }
      ]
    }
  ],
  2: [
    {
      title: "Understanding Quantum Gates - Your Magic Wands!",
      goal: "Learn how different gates (magic wands) change qubits in different ways!",
      realWorldUse: "Gates are the building blocks of ALL quantum algorithms - like letters making words!",
      fullCode: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)

# X gate: flip the qubit
qc.x(0)

# Y gate: flip with a twist
qc.y(0)

# Z gate: add a phase
qc.z(0)

# H gate: create superposition
qc.h(0)`,
      steps: [
        {
          lineNumber: 6,
          code: "qc.x(0)",
          simpleExplanation: "The X gate FLIPS the qubit!",
          detailedExplanation: "The X gate is like a light switch. If the qubit is |0⟩ (off), X makes it |1⟩ (on). If it's |1⟩ (on), X makes it |0⟩ (off). It's the quantum version of NOT!",
          whatHappens: "The qubit flips from |0⟩ to |1⟩ (or vice versa). On the Bloch sphere, the arrow flips from top to bottom!",
          analogy: "Like flipping a pancake - what was on top is now on bottom!",
          visualizationBefore: 'pauliGates',
          visualizationAfter: 'pauliGates',
          stepInVisualization: 1
        },
        {
          lineNumber: 9,
          code: "qc.y(0)",
          simpleExplanation: "The Y gate flips AND rotates!",
          detailedExplanation: "The Y gate is like X but with a twist - it flips the qubit AND adds a rotation. It's like doing a flip AND a spin at the same time!",
          whatHappens: "The qubit flips and rotates. The arrow on the Bloch sphere moves in a more complex way.",
          analogy: "Like a gymnast doing a flip with a twist - two moves in one!",
          visualizationAfter: 'pauliGates',
          stepInVisualization: 2
        },
        {
          lineNumber: 12,
          code: "qc.z(0)",
          simpleExplanation: "The Z gate adds invisible 'phase'!",
          detailedExplanation: "The Z gate doesn't flip the qubit, but it adds something called 'phase'. You can't see phase directly, but it affects how the qubit interacts with others. It's like changing the timing of a wave!",
          whatHappens: "If the qubit is in superposition, the Z gate rotates it around the vertical axis of the Bloch sphere.",
          analogy: "Like changing when a swing reaches its highest point - same swing, different timing!",
          visualizationAfter: 'pauliGates',
          stepInVisualization: 3
        },
        {
          lineNumber: 15,
          code: "qc.h(0)",
          simpleExplanation: "The H gate creates superposition!",
          detailedExplanation: "The Hadamard (H) gate is the most important gate! It takes a qubit that's definitely |0⟩ or |1⟩ and puts it into superposition - both at once! It's the gateway to quantum magic!",
          whatHappens: "The qubit goes from pointing up (or down) to pointing sideways on the Bloch sphere - now it's 50% |0⟩ and 50% |1⟩!",
          analogy: "Like starting to spin a coin - now it's not heads or tails, it's BOTH!",
          visualizationBefore: 'superposition',
          visualizationAfter: 'superposition',
          stepInVisualization: 1
        }
      ],
      quiz: [
        {
          question: "What does the X gate do?",
          options: [
            "Creates superposition",
            "Flips the qubit (0→1 or 1→0)",
            "Deletes the qubit",
            "Connects two qubits"
          ],
          correctIndex: 1,
          explanation: "X is the flip gate! Like a light switch - it turns 0 into 1 and 1 into 0."
        },
        {
          question: "Which gate creates superposition?",
          options: ["X gate", "Y gate", "Z gate", "H gate (Hadamard)"],
          correctIndex: 3,
          explanation: "The H (Hadamard) gate is the superposition maker! It puts a qubit into both 0 and 1 at the same time."
        }
      ]
    }
  ],
  3: [
    {
      title: "Entanglement - Making Quantum Best Friends!",
      goal: "Learn how to connect qubits so they're linked forever - even across the universe!",
      realWorldUse: "Entanglement is used for quantum teleportation, unhackable communication, and super-fast computing!",
      fullCode: `from qiskit import QuantumCircuit

# Create Bell State (maximally entangled)
qc = QuantumCircuit(2, 2)

# Step 1: Put first qubit in superposition
qc.h(0)

# Step 2: Entangle with CNOT
qc.cx(0, 1)

# Step 3: Measure both
qc.measure([0, 1], [0, 1])`,
      steps: [
        {
          lineNumber: 4,
          code: "qc = QuantumCircuit(2, 2)",
          simpleExplanation: "Get two qubits ready to become best friends!",
          detailedExplanation: "We create two qubits. Right now they're strangers - measuring one tells you nothing about the other. But we're about to change that!",
          whatHappens: "Two qubits are created, both in the |0⟩ state. They're independent - no connection yet.",
          analogy: "Like two kids who just met at school - they don't know each other yet!",
          visualizationBefore: 'bellState',
          stepInVisualization: 0
        },
        {
          lineNumber: 7,
          code: "qc.h(0)",
          simpleExplanation: "Make the first qubit start spinning!",
          detailedExplanation: "We put qubit 0 into superposition. Now it's both |0⟩ and |1⟩ at the same time. Qubit 1 is still just |0⟩.",
          whatHappens: "Qubit 0 is now in superposition. The system is in state: (|00⟩ + |10⟩)/√2",
          analogy: "Like one kid starting to spin around while the other stands still!",
          visualizationAfter: 'bellState',
          stepInVisualization: 1
        },
        {
          lineNumber: 10,
          code: "qc.cx(0, 1)",
          simpleExplanation: "Connect them as quantum best friends!",
          detailedExplanation: "The CNOT gate creates entanglement! It says: 'If qubit 0 is |1⟩, flip qubit 1. If qubit 0 is |0⟩, leave qubit 1 alone.' But qubit 0 is in superposition (both 0 AND 1), so something magical happens - they become ENTANGLED!",
          whatHappens: "The qubits are now entangled! The state is (|00⟩ + |11⟩)/√2 - they're either BOTH 0 or BOTH 1, never different!",
          analogy: "Like making a magical pinky promise - now whatever happens to one instantly affects the other, even if they're far apart!",
          visualizationAfter: 'bellState',
          stepInVisualization: 2
        },
        {
          lineNumber: 13,
          code: "qc.measure([0, 1], [0, 1])",
          simpleExplanation: "Look at both qubits - they'll always match!",
          detailedExplanation: "When we measure entangled qubits, they 'choose' together. If qubit 0 becomes |0⟩, qubit 1 INSTANTLY becomes |0⟩ too. If qubit 0 becomes |1⟩, qubit 1 becomes |1⟩. They ALWAYS match!",
          whatHappens: "You get either '00' or '11' - never '01' or '10'. The qubits always agree!",
          analogy: "Like asking two best friends their favorite color at the same time - they always say the same thing!",
          visualizationAfter: 'bellState',
          stepInVisualization: 3
        }
      ],
      quiz: [
        {
          question: "What makes entanglement special?",
          options: [
            "The qubits are physically connected by a wire",
            "Measuring one instantly tells you about the other, even far away",
            "The qubits become the same qubit",
            "The qubits can only be 0"
          ],
          correctIndex: 1,
          explanation: "Entangled qubits are connected in a spooky way - measuring one instantly affects the other, no matter how far apart they are!"
        },
        {
          question: "What results can you get from measuring a Bell state?",
          options: [
            "Always '00'",
            "Always '11'",
            "'00' or '11' (always matching)",
            "'01' or '10' (always different)"
          ],
          correctIndex: 2,
          explanation: "Entangled qubits in a Bell state always match! You get '00' or '11', but never '01' or '10'."
        }
      ]
    }
  ]
}

// ============================================
// MAIN COMPONENTS
// ============================================

function StepByStepExplanation({ program }: { program: ProgramExplanation }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const step = program.steps[currentStep]

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const calculateScore = () => {
    let correct = 0
    program.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) correct++
    })
    return correct
  }

  return (
    <div className="space-y-6">
      {/* Program Header */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-2xl text-purple-200">{program.title}</CardTitle>
          </div>
          <CardDescription className="text-lg text-purple-300">
            <strong>Goal:</strong> {program.goal}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-950/40 border-green-500/50">
            <Sparkles className="h-5 w-5 text-green-400" />
            <AlertDescription className="text-green-200">
              <strong>Real World Use:</strong> {program.realWorldUse}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Step
        </Button>
        <div className="flex items-center gap-2">
          {program.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                index === currentStep
                  ? 'bg-purple-500 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => {
            if (currentStep < program.steps.length - 1) {
              setCurrentStep(currentStep + 1)
            } else {
              setShowQuiz(true)
            }
          }}
        >
          {currentStep === program.steps.length - 1 ? 'Take Quiz!' : 'Next Step'}
        </Button>
      </div>

      {!showQuiz ? (
        <>
          {/* Current Step */}
          <Card className="bg-slate-900/50 border-blue-900/50">
            <CardHeader>
              <Badge className="w-fit bg-blue-600">Step {currentStep + 1} of {program.steps.length}</Badge>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Code className="h-5 w-5 text-blue-400" />
                Line {step.lineNumber}: <code className="text-green-400 font-mono">{step.code}</code>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Simple Explanation */}
              <div className="bg-yellow-950/40 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-bold text-yellow-300">In Simple Words:</span>
                </div>
                <p className="text-xl text-yellow-100">{step.simpleExplanation}</p>
              </div>

              {/* Detailed Explanation */}
              <div className="bg-blue-950/40 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span className="font-bold text-blue-300">Let's Understand More:</span>
                </div>
                <p className="text-blue-100">{step.detailedExplanation}</p>
              </div>

              {/* What Happens */}
              <div className="bg-green-950/40 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-green-400" />
                  <span className="font-bold text-green-300">What Happens:</span>
                </div>
                <p className="text-green-100">{step.whatHappens}</p>
              </div>

              {/* Analogy */}
              <div className="bg-pink-950/40 rounded-lg p-4 border border-pink-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-pink-400" />
                  <span className="font-bold text-pink-300">Think of it Like This:</span>
                </div>
                <p className="text-pink-100 text-lg">{step.analogy}</p>
              </div>

              {/* Visualization */}
              {(step.visualizationBefore || step.visualizationAfter) && (
                <div className="bg-purple-950/40 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Play className="h-5 w-5 text-purple-400" />
                    <span className="font-bold text-purple-300">See It In Action:</span>
                  </div>
                  
                  {step.visualizationAfter && (
                    <div className="space-y-2">
                      <p className="text-purple-200 text-sm">
                        Use the controls below to step through and see how the quantum state changes!
                        {step.stepInVisualization !== undefined && (
                          <span className="text-yellow-300"> (This step is #{step.stepInVisualization + 1} in the visualization)</span>
                        )}
                      </p>
                      <QuickVisualization exampleKey={step.visualizationAfter} />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Quiz Section */
        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <HelpCircle className="h-6 w-6 text-indigo-400" />
              Quiz Time! Test Your Knowledge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {program.quiz.map((q, qIndex) => (
              <div key={qIndex} className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-lg font-semibold text-indigo-200 mb-3">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleQuizAnswer(qIndex, oIndex)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        quizAnswers[qIndex] === oIndex
                          ? showResults
                            ? oIndex === q.correctIndex
                              ? 'bg-green-600 text-white'
                              : 'bg-red-600 text-white'
                            : 'bg-indigo-600 text-white'
                          : showResults && oIndex === q.correctIndex
                          ? 'bg-green-600/50 text-green-200'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showResults && (
                  <Alert className="mt-3 bg-blue-950/50 border-blue-500/50">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-200">
                      {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}

            <div className="flex justify-center gap-4">
              {!showResults ? (
                <Button
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(quizAnswers).length < program.quiz.length}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Check Answers
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {calculateScore()} / {program.quiz.length} Correct!
                  </div>
                  {calculateScore() === program.quiz.length ? (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <Trophy className="h-6 w-6" />
                      <span className="text-xl">Perfect Score! You're a Quantum Star!</span>
                      <Trophy className="h-6 w-6" />
                    </div>
                  ) : (
                    <p className="text-slate-300">Great effort! Review the explanations above to learn more.</p>
                  )}
                  <Button
                    onClick={() => {
                      setShowQuiz(false)
                      setShowResults(false)
                      setQuizAnswers({})
                      setCurrentStep(0)
                    }}
                    className="mt-4"
                    variant="outline"
                  >
                    Start Over
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full Code Reference */}
      <Accordion type="single" collapsible>
        <AccordionItem value="full-code">
          <AccordionTrigger className="text-purple-300">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              View Complete Code
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 font-mono text-sm">{program.fullCode}</pre>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// ============================================
// GLOSSARY COMPONENT
// ============================================
function GlossarySection() {
  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-400" />
          Quantum Dictionary
        </CardTitle>
        <CardDescription>
          Hover over purple underlined words anywhere to see their meaning, or browse all terms here!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(glossary).map(([term, { simple, emoji }]) => (
            <div key={term} className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3">
              <span className="text-2xl">{emoji}</span>
              <div>
                <h4 className="font-bold text-purple-300 capitalize">{term}</h4>
                <p className="text-sm text-slate-300">{simple}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// MAIN EXPORT
// ============================================
export function SuperKidsModule({ moduleId }: { moduleId: number }) {
  const programs = programExplanations[moduleId]

  if (!programs || programs.length === 0) {
    return (
      <Card className="bg-purple-950/30 border-purple-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐱</span>
            <div>
              <p className="text-purple-200 text-lg">
                Qubit the Quantum Cat is still preparing super-detailed explanations for this module!
              </p>
              <p className="text-purple-300 text-sm mt-2">
                Check out the visualizations below - they work the same way!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Mascot Introduction */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="text-6xl">🐱</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-purple-300 text-xl">Qubit the Quantum Cat says:</span>
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-lg text-slate-200 leading-relaxed">
                Welcome to Super Learning Mode! I'll explain every single line of code, show you what happens 
                BEFORE and AFTER each step, and help you truly understand quantum computing. 
                Take your time - there's no rush! 🌟
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Glossary */}
      <GlossarySection />

      {/* Step-by-Step Programs */}
      {programs.map((program, index) => (
        <StepByStepExplanation key={index} program={program} />
      ))}
    </div>
  )
}

export { GlossaryTerm, glossary }
