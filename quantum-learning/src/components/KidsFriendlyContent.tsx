import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Sparkles, Lightbulb, Star, Zap, Heart } from 'lucide-react'

interface KidsExplanation {
  title: string
  analogy: string
  whatItDoes: string
  funFact: string
  challenge?: string
}

interface KidsModuleContent {
  moduleId: number
  mascotMessage: string
  simpleTitle: string
  explanations: KidsExplanation[]
}

const kidsContent: KidsModuleContent[] = [
  {
    moduleId: 1,
    mascotMessage: "Hi there, young quantum explorer! I'm Qubit the Quantum Cat. Let's discover the magical world of quantum computing together!",
    simpleTitle: "Welcome to Quantum World!",
    explanations: [
      {
        title: "What is a Qubit?",
        analogy: "Imagine a magical spinning coin that's BOTH heads AND tails at the same time until you look at it! That's what a qubit is like. Regular computer bits are like normal coins - always heads (1) or tails (0). But qubits are magical!",
        whatItDoes: "A qubit stores information in a special quantum way that lets computers solve puzzles super fast!",
        funFact: "The word 'qubit' comes from 'quantum bit' - it's like a superpower version of a regular computer bit!",
        challenge: "Can you think of other things that could be two things at once?"
      },
      {
        title: "Superposition - The Magic Spin!",
        analogy: "Think of a spinning top! While it's spinning, it's not pointing any single direction - it's kind of pointing everywhere at once. When it stops (like when we measure a qubit), it falls to one side.",
        whatItDoes: "Superposition lets qubits try MANY answers at the same time, like having a thousand helpers all working together!",
        funFact: "Schrödinger's cat is a famous story about superposition - a cat that's both asleep AND awake until you check on it!",
        challenge: "Watch the Bloch sphere below - see how the arrow moves when we apply the H gate!"
      },
      {
        title: "Measurement - Taking a Peek!",
        analogy: "It's like opening a mystery box! Before you open it, the gift could be anything. But once you peek inside, you see exactly what's there. You can't un-peek!",
        whatItDoes: "Measurement tells us what answer the qubit chose. But here's the tricky part - measuring changes the qubit!",
        funFact: "In quantum world, just looking at something changes it! That's why quantum computers are so tricky to build.",
        challenge: "Try the visualization - notice how the probabilities change after measurement!"
      }
    ]
  },
  {
    moduleId: 2,
    mascotMessage: "Meow! Now let's learn about quantum gates - they're like magic wands that transform our qubits!",
    simpleTitle: "Quantum Magic Wands (Gates)!",
    explanations: [
      {
        title: "X Gate - The Flip!",
        analogy: "The X gate is like flipping a pancake! If your qubit is 0 (like a pancake face-down), the X gate flips it to 1 (face-up). And if it's 1, it flips back to 0!",
        whatItDoes: "The X gate switches 0 to 1 and 1 to 0 - it's the quantum version of a NOT gate!",
        funFact: "X, Y, and Z gates are named after the three directions in space - like the axes on a globe!",
        challenge: "Watch the red arrow on the Bloch sphere flip from top to bottom!"
      },
      {
        title: "H Gate - The Superposition Maker!",
        analogy: "The H gate (Hadamard) is like a magic spell that makes your coin start spinning! It takes a boring 0 or 1 and turns it into that magical 'both at once' state.",
        whatItDoes: "H gate creates superposition - it's the most important gate for making quantum magic happen!",
        funFact: "Almost every quantum algorithm starts with H gates to get the qubits spinning!",
        challenge: "Apply H to see the arrow move to the equator of the Bloch sphere - that's superposition!"
      },
      {
        title: "Rotation Gates - Precise Moves!",
        analogy: "Imagine you're steering a spaceship with a joystick. You can tilt it a little or a lot in any direction. Rotation gates let us move the qubit arrow exactly where we want!",
        whatItDoes: "RX, RY, RZ gates rotate the qubit by specific amounts - like turning a dial to the perfect setting.",
        funFact: "Any single-qubit operation can be done with just rotations - they're the building blocks of quantum computing!",
        challenge: "Watch how different rotation angles move the arrow to different spots on the sphere!"
      }
    ]
  },
  {
    moduleId: 3,
    mascotMessage: "Purr-fect! Now for the really cool stuff - making qubits work together with ENTANGLEMENT!",
    simpleTitle: "Quantum Teamwork (Entanglement)!",
    explanations: [
      {
        title: "CNOT Gate - The Copy Cat!",
        analogy: "Imagine two friends playing 'Simon Says'. The first qubit is Simon. If Simon says 'flip!' (is 1), the second qubit flips. If Simon says nothing (is 0), the second qubit stays the same!",
        whatItDoes: "CNOT connects two qubits so one controls the other - it's how we make qubits work as a team!",
        funFact: "CNOT stands for 'Controlled NOT' - it's a NOT gate that only works when the control qubit says so!",
        challenge: "Watch both Bloch spheres - see how the second qubit responds to the first!"
      },
      {
        title: "Entanglement - Quantum Best Friends!",
        analogy: "Imagine magical friendship bracelets! When two qubits are entangled, they become best friends forever. If you check one bracelet and it's blue, you INSTANTLY know the other is blue too - even if your friend is on the moon!",
        whatItDoes: "Entanglement links qubits so they share the same fate. Measure one, and you know about the other!",
        funFact: "Einstein called entanglement 'spooky action at a distance' because he thought it was too weird to be true. But it is!",
        challenge: "Create a Bell state and see how the qubits always give matching answers!"
      },
      {
        title: "Bell States - The Ultimate Team!",
        analogy: "Bell states are like the ultimate buddy system! Two qubits become so connected that they always match - like twins who always wear the same color shirt without planning it!",
        whatItDoes: "Bell states are special entangled states used in quantum teleportation and super-secure communication!",
        funFact: "Bell states are named after physicist John Bell, who proved entanglement is real with a clever experiment!",
        challenge: "Make a Bell state: H on qubit 0, then CNOT. Watch them become quantum best friends!"
      }
    ]
  },
  {
    moduleId: 4,
    mascotMessage: "You're becoming a quantum wizard! Let's learn some clever tricks that quantum algorithms use!",
    simpleTitle: "Quantum Tricks & Patterns!",
    explanations: [
      {
        title: "Phase Kickback - The Bounce Back!",
        analogy: "Imagine throwing a ball at a magic mirror. Instead of bouncing back normally, the ball comes back with a secret message painted on it! Phase kickback is how qubits pass secret information backwards.",
        whatItDoes: "Phase kickback lets us extract information from quantum operations in clever ways!",
        funFact: "Phase kickback is the secret sauce in many quantum algorithms - it's how they get their speedup!",
        challenge: "Watch the phase kickback demo - see how information travels from target to control qubit!"
      }
    ]
  },
  {
    moduleId: 5,
    mascotMessage: "Now for the exciting part - real quantum algorithms that solve problems faster than regular computers!",
    simpleTitle: "Quantum Search Magic!",
    explanations: [
      {
        title: "Grover's Algorithm - Finding Needles!",
        analogy: "Imagine finding a specific book in a huge library. A regular computer checks books one by one. But Grover's algorithm is like having a magic wand that makes the right book glow brighter and brighter until it's obvious!",
        whatItDoes: "Grover's algorithm finds things in unsorted lists WAY faster than regular computers!",
        funFact: "If you had a million items, a regular computer might need 500,000 guesses. Grover only needs about 1,000!",
        challenge: "Watch Grover's algorithm make the target state's probability grow with each step!"
      }
    ]
  }
]

export function KidsMascot({ message }: { message: string }) {
  return (
    <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50 mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="text-6xl">🐱</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-purple-300">Qubit the Quantum Cat says:</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-lg text-slate-200 leading-relaxed">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function KidsExplanationCard({ explanation }: { explanation: KidsExplanation }) {
  return (
    <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30 mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Star className="h-6 w-6 text-yellow-400" />
          <span className="text-indigo-200">{explanation.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-950/40 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold text-blue-300">Think of it like this:</span>
          </div>
          <p className="text-slate-200 text-lg leading-relaxed">{explanation.analogy}</p>
        </div>

        <div className="bg-green-950/40 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-green-400" />
            <span className="font-semibold text-green-300">What it does:</span>
          </div>
          <p className="text-slate-200">{explanation.whatItDoes}</p>
        </div>

        <div className="bg-pink-950/40 rounded-lg p-4 border border-pink-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-pink-400" />
            <span className="font-semibold text-pink-300">Fun Fact:</span>
          </div>
          <p className="text-slate-200">{explanation.funFact}</p>
        </div>

        {explanation.challenge && (
          <Alert className="bg-yellow-950/40 border-yellow-500/50">
            <Star className="h-5 w-5 text-yellow-400" />
            <AlertDescription className="text-yellow-200 text-lg">
              <span className="font-bold">Your Challenge: </span>
              {explanation.challenge}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export function KidsModuleHeader({ moduleId }: { moduleId: number }) {
  const content = kidsContent.find(c => c.moduleId === moduleId)
  if (!content) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-1">
          <Sparkles className="h-4 w-4 mr-2" />
          Kids Mode
        </Badge>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {content.simpleTitle}
        </h2>
      </div>
      <KidsMascot message={content.mascotMessage} />
    </div>
  )
}

export function KidsExplanations({ moduleId }: { moduleId: number }) {
  const content = kidsContent.find(c => c.moduleId === moduleId)
  if (!content) {
    return (
      <Card className="bg-purple-950/30 border-purple-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐱</span>
            <p className="text-purple-200">
              Qubit the Quantum Cat is still preparing kid-friendly explanations for this advanced module. 
              Check out the visualizations below - they work the same way!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {content.explanations.map((exp, index) => (
        <KidsExplanationCard key={index} explanation={exp} />
      ))}
    </div>
  )
}

export function KidsModeToggle({ 
  isKidsMode, 
  onToggle 
}: { 
  isKidsMode: boolean
  onToggle: () => void 
}) {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all
        ${isKidsMode 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }
      `}
    >
      <span className="text-xl">{isKidsMode ? '🐱' : '👶'}</span>
      <span>{isKidsMode ? 'Kids Mode ON' : 'Kids Mode'}</span>
      {isKidsMode && <Sparkles className="h-4 w-4" />}
    </button>
  )
}

export { kidsContent }
