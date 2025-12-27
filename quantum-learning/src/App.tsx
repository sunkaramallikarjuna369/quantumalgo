import { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Circle, Copy, BookOpen, Code, Lightbulb, Rocket, ArrowRight, Menu, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Module {
  id: number
  title: string
  description: string
  topics: string[]
  qiskitCode: { title: string; code: string; explanation: string }[]
  braketCode: { title: string; code: string; explanation: string }[]
  exercises: { question: string; hint: string }[]
  commonMistakes: string[]
  keyTakeaways: string[]
}

const modules: Module[] = [
  {
    id: 1,
    title: "Qiskit & Braket Fundamentals",
    description: "Learn the basics of creating quantum circuits, applying gates, and running on simulators",
    topics: [
      "Setting up Qiskit and Braket environments",
      "Creating quantum circuits and registers",
      "Understanding qubits and classical bits",
      "Basic gate operations (X, Y, Z, H)",
      "Measurement and reading results",
      "Running on simulators vs hardware"
    ],
    qiskitCode: [
      {
        title: "Basic Circuit Creation",
        code: `from qiskit import QuantumCircuit, Aer, execute

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

print("Measurement results:", counts)
# Expected: {'00': ~512, '11': ~512} (Bell state)`,
        explanation: "This creates a Bell state (maximally entangled state). The Hadamard gate puts qubit 0 in superposition, and CNOT entangles it with qubit 1. When measured, you'll see either 00 or 11 with equal probability."
      },
      {
        title: "Understanding Measurement",
        code: `from qiskit import QuantumCircuit, Aer, execute

# Create circuit with 1 qubit
qc = QuantumCircuit(1, 1)

# Prepare |+> state (superposition)
qc.h(0)

# Measure in computational basis
qc.measure(0, 0)

# Run multiple times
backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend=backend, shots=1024)
counts = job.result().get_counts()

print(counts)
# Expected: {'0': ~512, '1': ~512}`,
        explanation: "Measurement collapses the quantum state. A qubit in superposition (|+> state) has 50% probability of measuring 0 or 1. The 'shots' parameter determines how many times we repeat the experiment."
      }
    ],
    braketCode: [
      {
        title: "Basic Circuit Creation",
        code: `from braket.circuits import Circuit
from braket.devices import LocalSimulator

# Create a circuit with 2 qubits
circuit = Circuit()

# Apply Hadamard gate to qubit 0
circuit.h(0)

# Apply CNOT gate (control=0, target=1)
circuit.cnot(0, 1)

# Measure both qubits
circuit.measure([0, 1])

# Run on local simulator
device = LocalSimulator()
result = device.run(circuit, shots=1024).result()
counts = result.measurement_counts

print("Measurement results:", counts)
# Expected: {'00': ~512, '11': ~512}`,
        explanation: "Braket syntax is similar but uses different method names. Note: cnot() instead of cx(), and measurement_counts instead of get_counts(). The quantum behavior is identical."
      },
      {
        title: "Understanding Measurement",
        code: `from braket.circuits import Circuit
from braket.devices import LocalSimulator

# Create circuit
circuit = Circuit()

# Prepare |+> state
circuit.h(0)

# Measure
circuit.measure(0)

# Run simulation
device = LocalSimulator()
result = device.run(circuit, shots=1024).result()
counts = result.measurement_counts

print(counts)
# Expected: {'0': ~512, '1': ~512}`,
        explanation: "Same quantum behavior as Qiskit. The key difference is in the API: Braket uses device.run() with a result object, while Qiskit uses execute() with a job object."
      }
    ],
    exercises: [
      {
        question: "Create a 3-qubit circuit that prepares the state |000> + |111> (GHZ state). Hint: Use H on first qubit, then CNOT gates.",
        hint: "Apply H to qubit 0, then CNOT(0,1), then CNOT(0,2) or CNOT(1,2)"
      },
      {
        question: "What happens if you measure a qubit in the |+> state in the X basis instead of Z basis?",
        hint: "Apply H before measurement to change basis. In X basis, |+> is an eigenstate."
      }
    ],
    commonMistakes: [
      "Forgetting to add classical bits for measurement results",
      "Confusing qubit indices (0-indexed) with circuit size",
      "Not specifying enough shots for statistical accuracy",
      "Mixing up control and target qubits in CNOT",
      "Trying to access quantum state after measurement (it's collapsed!)"
    ],
    keyTakeaways: [
      "Quantum circuits are built by applying gates to qubits",
      "Measurement collapses superposition to classical bits",
      "Simulators let you test circuits before running on real hardware",
      "Qiskit and Braket have similar concepts but different APIs",
      "Always specify classical registers to store measurement results"
    ]
  },
  {
    id: 2,
    title: "Single Qubit Operations",
    description: "Master single-qubit gates, rotations, and Bloch sphere visualization",
    topics: [
      "Pauli gates (X, Y, Z)",
      "Hadamard gate and superposition",
      "Phase gates (S, T, P)",
      "Rotation gates (RX, RY, RZ)",
      "Bloch sphere representation",
      "State preparation techniques"
    ],
    qiskitCode: [
      {
        title: "Pauli Gates",
        code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)

# X gate: bit flip |0> -> |1>
qc.x(0)
print("After X:", Statevector.from_instruction(qc))

# Y gate: bit flip + phase
qc.y(0)
print("After Y:", Statevector.from_instruction(qc))

# Z gate: phase flip (no effect on |0> or |1>)
qc.z(0)
print("After Z:", Statevector.from_instruction(qc))`,
        explanation: "Pauli gates are fundamental. X flips |0>↔|1>, Y combines flip and phase, Z adds phase to |1>. These are the quantum analogs of classical NOT gate."
      },
      {
        title: "Rotation Gates",
        code: `from qiskit import QuantumCircuit
import numpy as np

qc = QuantumCircuit(1)

# Rotate around X axis by π/4
qc.rx(np.pi/4, 0)

# Rotate around Y axis by π/3
qc.ry(np.pi/3, 0)

# Rotate around Z axis by π/2
qc.rz(np.pi/2, 0)

# Note: H = RY(π/2) · RZ(π)
# S = RZ(π/2), T = RZ(π/4)

print(qc)`,
        explanation: "Rotation gates allow precise control of qubit state on the Bloch sphere. RX, RY, RZ rotate around respective axes. These are essential for variational algorithms."
      }
    ],
    braketCode: [
      {
        title: "Pauli Gates",
        code: `from braket.circuits import Circuit

circuit = Circuit()

# X gate: bit flip
circuit.x(0)

# Y gate: bit flip + phase
circuit.y(0)

# Z gate: phase flip
circuit.z(0)

print(circuit)`,
        explanation: "Braket uses the same gate names. The quantum operations are identical to Qiskit, just different syntax for building circuits."
      },
      {
        title: "Rotation Gates",
        code: `from braket.circuits import Circuit
import numpy as np

circuit = Circuit()

# Rotate around X axis
circuit.rx(0, np.pi/4)

# Rotate around Y axis
circuit.ry(0, np.pi/3)

# Rotate around Z axis
circuit.rz(0, np.pi/2)

# Note: Braket uses (qubit, angle) order
# Qiskit uses (angle, qubit) order

print(circuit)`,
        explanation: "Key difference: Braket puts qubit index first, then angle. Qiskit does the opposite. Always check documentation for parameter order!"
      }
    ],
    exercises: [
      {
        question: "Create a circuit that prepares the state |-> = (|0> - |1>)/√2. What gates do you need?",
        hint: "Start with |0>, apply X to get |1>, then apply H"
      },
      {
        question: "What's the difference between RZ(θ) and P(θ) gates? When would you use each?",
        hint: "They differ by a global phase. P(θ) is more commonly used in practice."
      }
    ],
    commonMistakes: [
      "Confusing parameter order between Qiskit (angle, qubit) and Braket (qubit, angle)",
      "Forgetting that Z gate has no effect on computational basis states",
      "Not understanding that global phase doesn't affect measurement",
      "Mixing up radians and degrees in rotation angles",
      "Applying too many gates when a single rotation would suffice"
    ],
    keyTakeaways: [
      "Single-qubit gates are rotations on the Bloch sphere",
      "Pauli gates are special cases of rotations (π radians)",
      "Any single-qubit gate can be decomposed into rotations",
      "Phase gates (S, T) are important for quantum algorithms",
      "Understanding Bloch sphere helps visualize quantum states"
    ]
  },
  {
    id: 3,
    title: "Multi-Qubit Operations",
    description: "Learn entanglement, controlled gates, and multi-qubit states",
    topics: [
      "CNOT and controlled operations",
      "SWAP gate",
      "Toffoli (CCX) gate",
      "Creating entanglement",
      "Bell states",
      "GHZ and W states"
    ],
    qiskitCode: [
      {
        title: "Bell States",
        code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# Create all four Bell states
def create_bell_state(state_num):
    qc = QuantumCircuit(2)
    
    # Start with |00>
    if state_num in [1, 3]:
        qc.x(0)  # Flip first qubit
    
    # Create entanglement
    qc.h(0)
    qc.cx(0, 1)
    
    # Add phase if needed
    if state_num in [2, 3]:
        qc.z(0)
    
    return qc

# Bell state |Φ+> = (|00> + |11>)/√2
bell_00 = create_bell_state(0)
print("Bell |Φ+>:", Statevector.from_instruction(bell_00))`,
        explanation: "Bell states are maximally entangled 2-qubit states. They're the foundation of quantum teleportation and superdense coding. The pattern H-CNOT creates entanglement."
      },
      {
        title: "Controlled Gates",
        code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3)

# CNOT: controlled-X
qc.cx(0, 1)

# Controlled-Z
qc.cz(0, 1)

# Controlled-Y
qc.cy(0, 1)

# Toffoli: doubly-controlled-X
qc.ccx(0, 1, 2)

# Controlled rotation
qc.crz(1.57, 0, 1)

print(qc)`,
        explanation: "Controlled gates apply an operation only if control qubit(s) are |1>. CNOT is most common. Toffoli (CCX) is universal for reversible classical computation."
      }
    ],
    braketCode: [
      {
        title: "Bell States",
        code: `from braket.circuits import Circuit

def create_bell_state(state_num):
    circuit = Circuit()
    
    if state_num in [1, 3]:
        circuit.x(0)
    
    circuit.h(0)
    circuit.cnot(0, 1)
    
    if state_num in [2, 3]:
        circuit.z(0)
    
    return circuit

# Bell state |Φ+>
bell_00 = create_bell_state(0)
print(bell_00)`,
        explanation: "Same quantum operations as Qiskit. Braket uses 'cnot' instead of 'cx', but the entanglement mechanism is identical."
      },
      {
        title: "Controlled Gates",
        code: `from braket.circuits import Circuit

circuit = Circuit()

# CNOT
circuit.cnot(0, 1)

# Controlled-Z
circuit.cz(0, 1)

# Controlled-Y
circuit.cy(0, 1)

# Toffoli (CCX)
circuit.ccnot(0, 1, 2)

# Controlled phase
circuit.cphaseshift(0, 1, 1.57)

print(circuit)`,
        explanation: "Braket uses 'ccnot' for Toffoli instead of 'ccx'. Also note 'cphaseshift' instead of 'crz'. Always check the gate library documentation."
      }
    ],
    exercises: [
      {
        question: "Create a 3-qubit GHZ state: (|000> + |111>)/√2. How is this different from Bell states?",
        hint: "H on qubit 0, then CNOT(0,1), then CNOT(0,2) or CNOT(1,2)"
      },
      {
        question: "Implement a SWAP gate using only CNOT gates. How many CNOTs do you need?",
        hint: "You need exactly 3 CNOTs: CNOT(0,1), CNOT(1,0), CNOT(0,1)"
      }
    ],
    commonMistakes: [
      "Forgetting that CNOT is not symmetric (control vs target matters)",
      "Confusing CZ with CNOT (CZ is symmetric, CNOT is not)",
      "Not realizing that entanglement can't be created with single-qubit gates alone",
      "Mixing up qubit order in multi-controlled gates",
      "Assuming all controlled gates have the same decomposition cost"
    ],
    keyTakeaways: [
      "Entanglement requires multi-qubit gates (can't be created with single-qubit gates)",
      "CNOT is the most common entangling gate",
      "Bell states are the building blocks of quantum protocols",
      "Controlled gates are essential for quantum algorithms",
      "Toffoli gate enables reversible classical computation"
    ]
  },
  {
    id: 4,
    title: "Circuit Programming Patterns",
    description: "Learn essential patterns for building quantum algorithms",
    topics: [
      "Phase kickback mechanism",
      "Compute-uncompute pattern",
      "Oracle design principles",
      "Using ancilla qubits",
      "Reversible classical logic",
      "Basis transformations"
    ],
    qiskitCode: [
      {
        title: "Compute-Uncompute Pattern",
        code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3)

# Compute: entangle ancilla with data
qc.h(0)
qc.cx(0, 1)  # Ancilla 1 now stores parity
qc.cx(0, 2)  # Ancilla 2 stores another function

# Use ancillas for some operation
qc.cz(1, 2)  # Example: controlled operation

# Uncompute: restore ancillas to |0>
qc.cx(0, 2)
qc.cx(0, 1)

print(qc)`,
        explanation: "Compute-uncompute is crucial for managing ancilla qubits. You compute a function into ancillas, use them, then uncompute to restore them to |0>. This prevents entanglement buildup."
      },
      {
        title: "Phase Kickback",
        code: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)

# Prepare control in superposition
qc.h(0)

# Prepare target in |-⟩ eigenstate
qc.x(1)
qc.h(1)

# Apply CNOT: phase kicks back to control
qc.cx(0, 1)

# Uncompute target
qc.h(1)
qc.x(1)

# Control now has phase information
qc.h(0)

print(qc)`,
        explanation: "Phase kickback: when target is in eigenstate of the gate, the phase appears on the control qubit instead. This is the key mechanism behind Deutsch-Jozsa and Grover's algorithms."
      }
    ],
    braketCode: [
      {
        title: "Compute-Uncompute Pattern",
        code: `from braket.circuits import Circuit

circuit = Circuit()

# Compute
circuit.h(0)
circuit.cnot(0, 1)
circuit.cnot(0, 2)

# Use ancillas
circuit.cz(1, 2)

# Uncompute
circuit.cnot(0, 2)
circuit.cnot(0, 1)

print(circuit)`,
        explanation: "Same pattern in Braket. The key insight: reversible computation means you can always uncompute by applying gates in reverse order."
      },
      {
        title: "Phase Kickback",
        code: `from braket.circuits import Circuit

circuit = Circuit()

# Prepare control
circuit.h(0)

# Prepare target in |-⟩
circuit.x(1)
circuit.h(1)

# CNOT causes phase kickback
circuit.cnot(0, 1)

# Uncompute target
circuit.h(1)
circuit.x(1)

# Measure control
circuit.h(0)

print(circuit)`,
        explanation: "Phase kickback works identically in Braket. Understanding this pattern is essential for designing quantum algorithms that extract information through interference."
      }
    ],
    exercises: [
      {
        question: "Design an oracle that marks the state |101⟩ using phase kickback. How many ancillas do you need?",
        hint: "You can use a multi-controlled Z gate, or decompose it using ancillas and Toffoli gates"
      },
      {
        question: "Implement a 3-bit parity check using compute-uncompute. Store result in ancilla, use it, then restore.",
        hint: "Use two CNOT gates to compute parity into ancilla, then reverse them to uncompute"
      }
    ],
    commonMistakes: [
      "Forgetting to uncompute ancillas (causes unwanted entanglement)",
      "Not preparing target in correct eigenstate for phase kickback",
      "Mixing up which qubit gets the phase in kickback",
      "Using too many ancillas when fewer would suffice",
      "Not understanding that uncompute is just reverse of compute"
    ],
    keyTakeaways: [
      "Compute-uncompute prevents ancilla entanglement buildup",
      "Phase kickback is how quantum algorithms extract information",
      "Ancillas are temporary workspace that must be cleaned up",
      "Reversible computation is fundamental to quantum algorithms",
      "Oracle design uses these patterns extensively"
    ]
  },
  {
    id: 5,
    title: "Query/Oracle Algorithms",
    description: "Implement Deutsch-Jozsa, Bernstein-Vazirani, and Grover's algorithm",
    topics: [
      "Deutsch algorithm",
      "Deutsch-Jozsa algorithm",
      "Bernstein-Vazirani algorithm",
      "Grover's search algorithm",
      "Oracle construction techniques",
      "Amplitude amplification"
    ],
    qiskitCode: [
      {
        title: "Deutsch-Jozsa Algorithm",
        code: `from qiskit import QuantumCircuit, Aer, execute

def deutsch_jozsa(oracle_type='balanced'):
    n = 3  # number of qubits
    qc = QuantumCircuit(n+1, n)
    
    # Initialize
    qc.x(n)  # ancilla to |1⟩
    qc.h(range(n+1))  # all qubits to superposition
    
    # Oracle (example: balanced function)
    if oracle_type == 'balanced':
        qc.cx(0, n)
        qc.cx(1, n)
    # For constant oracle, do nothing
    
    # Apply H to input qubits
    qc.h(range(n))
    
    # Measure
    qc.measure(range(n), range(n))
    
    backend = Aer.get_backend('qasm_simulator')
    result = execute(qc, backend, shots=1).result()
    counts = result.get_counts()
    
    # If all zeros: constant, else: balanced
    return '000' in counts

print("Is constant?", deutsch_jozsa('constant'))`,
        explanation: "Deutsch-Jozsa determines if a function is constant or balanced in ONE query. Classical algorithms need 2^(n-1)+1 queries. This demonstrates quantum advantage through interference."
      },
      {
        title: "Grover's Search",
        code: `from qiskit import QuantumCircuit, Aer, execute
import numpy as np

def grover_search(marked_state='11'):
    n = 2
    qc = QuantumCircuit(n, n)
    
    # Initialize: superposition
    qc.h(range(n))
    
    # Grover iteration (repeat sqrt(N) times)
    iterations = int(np.pi/4 * np.sqrt(2**n))
    
    for _ in range(iterations):
        # Oracle: mark target state
        if marked_state == '11':
            qc.cz(0, 1)
        elif marked_state == '10':
            qc.x(1)
            qc.cz(0, 1)
            qc.x(1)
        # Add other cases as needed
        
        # Diffusion operator
        qc.h(range(n))
        qc.x(range(n))
        qc.h(n-1)
        qc.cx(0, n-1)
        qc.h(n-1)
        qc.x(range(n))
        qc.h(range(n))
    
    qc.measure(range(n), range(n))
    
    backend = Aer.get_backend('qasm_simulator')
    result = execute(qc, backend, shots=1024).result()
    return result.get_counts()

print(grover_search('11'))`,
        explanation: "Grover's algorithm finds a marked item in an unsorted database in O(√N) time vs O(N) classically. The key is amplitude amplification through oracle + diffusion."
      }
    ],
    braketCode: [
      {
        title: "Deutsch-Jozsa Algorithm",
        code: `from braket.circuits import Circuit
from braket.devices import LocalSimulator

def deutsch_jozsa(oracle_type='balanced'):
    n = 3
    circuit = Circuit()
    
    # Initialize
    circuit.x(n)
    for i in range(n+1):
        circuit.h(i)
    
    # Oracle
    if oracle_type == 'balanced':
        circuit.cnot(0, n)
        circuit.cnot(1, n)
    
    # Apply H to input qubits
    for i in range(n):
        circuit.h(i)
    
    # Measure
    for i in range(n):
        circuit.measure(i)
    
    device = LocalSimulator()
    result = device.run(circuit, shots=1).result()
    counts = result.measurement_counts
    
    return '000' in counts

print("Is constant?", deutsch_jozsa('constant'))`,
        explanation: "Same algorithm in Braket. The quantum speedup comes from querying all inputs simultaneously through superposition and using interference to extract the answer."
      },
      {
        title: "Grover's Search",
        code: `from braket.circuits import Circuit
from braket.devices import LocalSimulator
import numpy as np

def grover_search(marked_state='11'):
    n = 2
    circuit = Circuit()
    
    # Initialize
    for i in range(n):
        circuit.h(i)
    
    # Grover iterations
    iterations = int(np.pi/4 * np.sqrt(2**n))
    
    for _ in range(iterations):
        # Oracle
        if marked_state == '11':
            circuit.cz(0, 1)
        elif marked_state == '10':
            circuit.x(1)
            circuit.cz(0, 1)
            circuit.x(1)
        
        # Diffusion
        for i in range(n):
            circuit.h(i)
        for i in range(n):
            circuit.x(i)
        circuit.h(n-1)
        circuit.cnot(0, n-1)
        circuit.h(n-1)
        for i in range(n):
            circuit.x(i)
        for i in range(n):
            circuit.h(i)
    
    for i in range(n):
        circuit.measure(i)
    
    device = LocalSimulator()
    result = device.run(circuit, shots=1024).result()
    return result.measurement_counts

print(grover_search('11'))`,
        explanation: "Grover's algorithm in Braket. The number of iterations is crucial: too few and you don't amplify enough, too many and you over-rotate past the target."
      }
    ],
    exercises: [
      {
        question: "Implement Bernstein-Vazirani algorithm to find a hidden binary string. How is it different from Deutsch-Jozsa?",
        hint: "The oracle computes f(x) = s·x (dot product). Use CNOT gates based on the secret string s."
      },
      {
        question: "Modify Grover's algorithm to search for multiple marked items. How does this change the number of iterations?",
        hint: "If there are M marked items out of N, iterations = π/4 * sqrt(N/M)"
      }
    ],
    commonMistakes: [
      "Wrong number of Grover iterations (must be ~π/4 * sqrt(N))",
      "Forgetting to prepare ancilla in |-⟩ for phase kickback oracles",
      "Not understanding that oracle must be reversible",
      "Measuring too early (before final H gates in Deutsch-Jozsa)",
      "Confusing oracle marking (phase flip) with amplitude amplification"
    ],
    keyTakeaways: [
      "Oracle algorithms use quantum parallelism and interference",
      "Deutsch-Jozsa shows exponential speedup for specific problem",
      "Grover provides quadratic speedup for unstructured search",
      "Oracle design is key: must mark target states with phase",
      "Number of iterations matters: too few or too many reduces success probability"
    ]
  },
  {
    id: 6,
    title: "QFT & Phase Estimation",
    description: "Master Quantum Fourier Transform and Phase Estimation algorithms",
    topics: [
      "Quantum Fourier Transform intuition",
      "QFT implementation",
      "Inverse QFT",
      "Quantum Phase Estimation (QPE)",
      "Applications of QPE",
      "Period finding"
    ],
    qiskitCode: [
      {
        title: "Quantum Fourier Transform",
        code: `from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT
import numpy as np

# Using built-in QFT
n = 3
qc = QuantumCircuit(n)
qc.append(QFT(num_qubits=n), range(n))
print("Built-in QFT:")
print(qc)

# Manual QFT implementation
def qft_manual(n):
    qc = QuantumCircuit(n)
    for j in range(n):
        qc.h(j)
        for k in range(j+1, n):
            qc.cp(np.pi/2**(k-j), k, j)
    # Swap qubits for correct order
    for i in range(n//2):
        qc.swap(i, n-i-1)
    return qc

qc_manual = qft_manual(3)
print("\\nManual QFT:")
print(qc_manual)`,
        explanation: "QFT is the quantum analog of discrete Fourier transform. It's exponentially faster than classical FFT (O(n²) gates vs O(n·2ⁿ) operations). Essential for Shor's algorithm and phase estimation."
      },
      {
        title: "Quantum Phase Estimation",
        code: `from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT

def qpe(unitary_gate, eigenstate_prep, n_counting):
    """
    Quantum Phase Estimation
    unitary_gate: gate whose eigenvalue we want
    eigenstate_prep: circuit to prepare eigenstate
    n_counting: number of counting qubits (precision)
    """
    n_state = eigenstate_prep.num_qubits
    qc = QuantumCircuit(n_counting + n_state, n_counting)
    
    # Initialize counting qubits to |+⟩
    qc.h(range(n_counting))
    
    # Prepare eigenstate
    qc.compose(eigenstate_prep, 
               range(n_counting, n_counting + n_state), 
               inplace=True)
    
    # Controlled-U^(2^j) operations
    for j in range(n_counting):
        for _ in range(2**j):
            qc.append(unitary_gate.control(1), 
                     [j] + list(range(n_counting, n_counting + n_state)))
    
    # Inverse QFT on counting qubits
    qc.append(QFT(n_counting, inverse=True), range(n_counting))
    
    # Measure counting qubits
    qc.measure(range(n_counting), range(n_counting))
    
    return qc

# Example: estimate phase of Z gate (eigenvalue -1 = e^(iπ))
eigenstate = QuantumCircuit(1)
eigenstate.x(0)  # |1⟩ is eigenstate of Z with eigenvalue -1

from qiskit import QuantumCircuit as QC
z_gate = QC(1)
z_gate.z(0)
qpe_circuit = qpe(z_gate, eigenstate, 3)
print(qpe_circuit)`,
        explanation: "QPE estimates the phase φ in eigenvalue e^(2πiφ). It's the core of Shor's algorithm and quantum chemistry simulations. Precision increases with more counting qubits."
      }
    ],
    braketCode: [
      {
        title: "Quantum Fourier Transform",
        code: `from braket.circuits import Circuit
import numpy as np

def qft_braket(n):
    circuit = Circuit()
    
    for j in range(n):
        circuit.h(j)
        for k in range(j+1, n):
            angle = np.pi / 2**(k-j)
            circuit.cphaseshift(k, j, angle)
    
    # Swap qubits
    for i in range(n//2):
        circuit.swap(i, n-i-1)
    
    return circuit

qft_circuit = qft_braket(3)
print(qft_circuit)`,
        explanation: "QFT in Braket uses cphaseshift instead of cp. The algorithm structure is identical: Hadamards with controlled phase rotations, then swaps for correct qubit ordering."
      },
      {
        title: "Quantum Phase Estimation",
        code: `from braket.circuits import Circuit
import numpy as np

def qpe_braket(n_counting, n_state):
    circuit = Circuit()
    
    # Initialize counting qubits
    for i in range(n_counting):
        circuit.h(i)
    
    # Prepare eigenstate (example: |1⟩ for Z gate)
    circuit.x(n_counting)
    
    # Controlled-U operations
    for j in range(n_counting):
        for _ in range(2**j):
            circuit.cz(j, n_counting)
    
    # Inverse QFT (manual implementation)
    for i in range(n_counting//2):
        circuit.swap(i, n_counting-i-1)
    
    for j in range(n_counting-1, -1, -1):
        for k in range(n_counting-1, j, -1):
            angle = -np.pi / 2**(k-j)
            circuit.cphaseshift(k, j, angle)
        circuit.h(j)
    
    # Measure
    for i in range(n_counting):
        circuit.measure(i)
    
    return circuit

qpe_circuit = qpe_braket(3, 1)
print(qpe_circuit)`,
        explanation: "QPE in Braket requires manual inverse QFT implementation. The key insight: inverse QFT is just QFT with reversed gate order and negated angles."
      }
    ],
    exercises: [
      {
        question: "Implement QFT for 4 qubits and verify it's unitary by composing with inverse QFT. What should you get?",
        hint: "QFT · QFT† = I (identity). The circuit should do nothing to any input state."
      },
      {
        question: "Use QPE to estimate the phase of the T gate (eigenvalue e^(iπ/4)). How many counting qubits do you need for 3-bit precision?",
        hint: "For n-bit precision, you need n counting qubits. T gate has phase π/4 = 0.001 in binary (3 bits)."
      }
    ],
    commonMistakes: [
      "Forgetting to swap qubits at the end of QFT",
      "Using wrong angle in controlled phase rotations (should be π/2^k)",
      "Not preparing correct eigenstate for QPE",
      "Confusing QFT with inverse QFT (angles are negated)",
      "Not using enough counting qubits for desired precision"
    ],
    keyTakeaways: [
      "QFT is exponentially faster than classical FFT",
      "QFT transforms between computational and Fourier basis",
      "QPE extracts phase information from unitary operators",
      "Precision in QPE scales linearly with counting qubits",
      "QFT is the foundation of Shor's factoring algorithm"
    ]
  },
  {
    id: 7,
    title: "Variational Algorithms",
    description: "Learn VQE, QAOA, and hybrid quantum-classical optimization",
    topics: [
      "Variational Quantum Eigensolver (VQE)",
      "Quantum Approximate Optimization Algorithm (QAOA)",
      "Parameterized quantum circuits",
      "Classical optimization loops",
      "Ansatz design",
      "Barren plateaus and trainability"
    ],
    qiskitCode: [
      {
        title: "VQE for H2 Molecule",
        code: `from qiskit import QuantumCircuit, Aer, execute
import numpy as np

# Simple VQE example for 2-qubit Hamiltonian
def vqe_ansatz(theta):
    qc = QuantumCircuit(2)
    qc.ry(theta[0], 0)
    qc.ry(theta[1], 1)
    qc.cx(0, 1)
    qc.ry(theta[2], 0)
    qc.ry(theta[3], 1)
    return qc

def measure_hamiltonian(circuit, hamiltonian_terms):
    """
    Measure expectation value of Hamiltonian
    hamiltonian_terms: list of (coeff, pauli_string) tuples
    Example: [(0.5, 'ZZ'), (-0.2, 'XX'), (0.3, 'Z_')]
    """
    backend = Aer.get_backend('statevector_simulator')
    result = execute(circuit, backend).result()
    statevector = result.get_statevector()
    
    # Compute expectation (simplified)
    energy = 0
    # In practice, measure each Pauli term separately
    return energy

def vqe_optimization():
    # Initial parameters
    theta = np.random.rand(4) * 2 * np.pi
    
    # Classical optimization loop
    from scipy.optimize import minimize
    
    def cost_function(params):
        circuit = vqe_ansatz(params)
        # Measure energy expectation value
        energy = measure_hamiltonian(circuit, hamiltonian_terms=[])
        return energy
    
    result = minimize(cost_function, theta, method='COBYLA')
    return result.x, result.fun

optimal_params, ground_energy = vqe_optimization()
print(f"Ground state energy: {ground_energy}")`,
        explanation: "VQE finds ground state energy of molecules. It uses a parameterized quantum circuit (ansatz) and classical optimizer to minimize energy expectation value. Key for quantum chemistry."
      },
      {
        title: "QAOA for MaxCut",
        code: `from qiskit import QuantumCircuit
import numpy as np

def qaoa_circuit(graph_edges, gamma, beta, p=1):
    """
    QAOA for MaxCut problem
    graph_edges: list of (i, j) tuples
    gamma, beta: variational parameters (length p)
    p: number of QAOA layers
    """
    n = max(max(edge) for edge in graph_edges) + 1
    qc = QuantumCircuit(n)
    
    # Initial state: uniform superposition
    qc.h(range(n))
    
    # QAOA layers
    for layer in range(p):
        # Problem Hamiltonian (cost)
        for i, j in graph_edges:
            qc.cx(i, j)
            qc.rz(2 * gamma[layer], j)
            qc.cx(i, j)
        
        # Mixer Hamiltonian
        for i in range(n):
            qc.rx(2 * beta[layer], i)
    
    return qc

# Example: 3-node triangle graph
edges = [(0, 1), (1, 2), (2, 0)]
gamma = [0.5]
beta = [0.3]

qaoa = qaoa_circuit(edges, gamma, beta, p=1)
print(qaoa)

# In practice: measure, compute cost, optimize gamma/beta`,
        explanation: "QAOA solves combinatorial optimization problems. It alternates between problem Hamiltonian (encodes cost) and mixer Hamiltonian (explores solutions). Depth p controls approximation quality."
      }
    ],
    braketCode: [
      {
        title: "VQE Ansatz",
        code: `from braket.circuits import Circuit, FreeParameter
import numpy as np

# Parameterized circuit for VQE
def vqe_ansatz_braket():
    circuit = Circuit()
    
    # Define parameters
    theta1 = FreeParameter('theta1')
    theta2 = FreeParameter('theta2')
    theta3 = FreeParameter('theta3')
    theta4 = FreeParameter('theta4')
    
    # Build ansatz
    circuit.ry(0, theta1)
    circuit.ry(1, theta2)
    circuit.cnot(0, 1)
    circuit.ry(0, theta3)
    circuit.ry(1, theta4)
    
    return circuit

ansatz = vqe_ansatz_braket()
print(ansatz)

# To run with specific parameters:
# params = {'theta1': 0.5, 'theta2': 1.2, ...}
# result = device.run(ansatz, shots=1000, inputs=params)`,
        explanation: "Braket uses FreeParameter for variational parameters. You can define the circuit once and run it with different parameter values without rebuilding."
      },
      {
        title: "QAOA Circuit",
        code: `from braket.circuits import Circuit, FreeParameter

def qaoa_braket(graph_edges, p=1):
    n = max(max(edge) for edge in graph_edges) + 1
    circuit = Circuit()
    
    # Parameters
    gammas = [FreeParameter(f'gamma_{i}') for i in range(p)]
    betas = [FreeParameter(f'beta_{i}') for i in range(p)]
    
    # Initial state
    for i in range(n):
        circuit.h(i)
    
    # QAOA layers
    for layer in range(p):
        # Cost Hamiltonian
        for i, j in graph_edges:
            circuit.cnot(i, j)
            circuit.rz(j, 2 * gammas[layer])
            circuit.cnot(i, j)
        
        # Mixer
        for i in range(n):
            circuit.rx(i, 2 * betas[layer])
    
    # Measure
    for i in range(n):
        circuit.measure(i)
    
    return circuit

edges = [(0, 1), (1, 2), (2, 0)]
qaoa = qaoa_braket(edges, p=1)
print(qaoa)`,
        explanation: "QAOA in Braket uses FreeParameters for gamma and beta. The optimization loop runs on classical computer, repeatedly calling the quantum device with different parameters."
      }
    ],
    exercises: [
      {
        question: "Design a VQE ansatz for a 3-qubit system. What makes a good ansatz? How do you balance expressibility and trainability?",
        hint: "Good ansatz: enough parameters to represent target state, but not so many that optimization is hard. Use hardware-efficient gates."
      },
      {
        question: "Implement QAOA for a 4-node graph. How does increasing p (number of layers) affect the solution quality and circuit depth?",
        hint: "Higher p gives better approximation but deeper circuits. Trade-off between quality and noise."
      }
    ],
    commonMistakes: [
      "Using too many parameters (causes barren plateaus)",
      "Not choosing hardware-efficient ansatz (leads to compilation issues)",
      "Forgetting that VQE/QAOA are heuristics (no guarantee of global optimum)",
      "Not considering noise when choosing circuit depth",
      "Using gradient-free optimizers when gradients are available"
    ],
    keyTakeaways: [
      "Variational algorithms are hybrid quantum-classical",
      "VQE finds ground states, useful for quantum chemistry",
      "QAOA solves combinatorial optimization problems",
      "Ansatz design is crucial for performance",
      "These algorithms are more noise-resilient than others"
    ]
  },
  {
    id: 8,
    title: "Build Your Own Algorithms",
    description: "Learn to design, debug, and optimize custom quantum algorithms",
    topics: [
      "Algorithm design methodology",
      "Debugging quantum circuits",
      "Performance optimization",
      "Transpilation and compilation",
      "Noise modeling and mitigation",
      "Best practices and patterns"
    ],
    qiskitCode: [
      {
        title: "Debugging with Statevector",
        code: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

def debug_circuit(qc, checkpoints=[]):
    """
    Debug circuit by inspecting statevector at checkpoints
    """
    print("Initial state: |0...0⟩")
    
    if not checkpoints:
        # Debug entire circuit
        sv = Statevector.from_instruction(qc)
        print(f"Final state: {sv}")
        print(f"Probabilities: {sv.probabilities()}")
    else:
        # Debug at specific gates
        temp_qc = QuantumCircuit(qc.num_qubits)
        for i, instruction in enumerate(qc.data):
            temp_qc.append(instruction[0], instruction[1])
            if i in checkpoints:
                sv = Statevector.from_instruction(temp_qc)
                print(f"After gate {i}: {sv}")

# Example: debug Bell state creation
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

debug_circuit(qc)

# Verify entanglement
sv = Statevector.from_instruction(qc)
print(f"Is entangled: {not sv.is_separable()}")`,
        explanation: "Debugging quantum circuits requires inspecting intermediate states. Use statevector simulation for small circuits. Check: correct superposition, expected entanglement, proper phase relationships."
      },
      {
        title: "Circuit Optimization",
        code: `from qiskit import QuantumCircuit, transpile
from qiskit.providers.fake_provider import FakeMontreal

# Original circuit (inefficient)
qc = QuantumCircuit(3)
qc.h(0)
qc.cx(0, 1)
qc.cx(1, 2)
qc.h(0)
qc.h(0)  # Redundant: H·H = I
qc.cx(0, 1)
qc.cx(0, 1)  # Redundant: CNOT·CNOT = I

print(f"Original depth: {qc.depth()}")
print(f"Original gate count: {qc.size()}")

# Optimize for specific backend
backend = FakeMontreal()
qc_optimized = transpile(qc, backend=backend, optimization_level=3)

print(f"Optimized depth: {qc_optimized.depth()}")
print(f"Optimized gate count: {qc_optimized.size()}")

# Manual optimization tips:
# 1. Remove redundant gates (H·H, CNOT·CNOT)
# 2. Combine rotations (RZ(a)·RZ(b) = RZ(a+b))
# 3. Use commutation rules to reduce depth
# 4. Choose gates native to hardware`,
        explanation: "Circuit optimization reduces depth and gate count. Use transpiler for automatic optimization. Manual optimization: remove redundancies, combine gates, use hardware-native gates, exploit commutation."
      },
      {
        title: "Noise Simulation",
        code: `from qiskit import QuantumCircuit, Aer, execute
from qiskit.providers.aer.noise import NoiseModel, depolarizing_error

# Create noisy simulator
noise_model = NoiseModel()

# Add depolarizing error to gates
error_1q = depolarizing_error(0.001, 1)  # 0.1% error on single-qubit gates
error_2q = depolarizing_error(0.01, 2)   # 1% error on two-qubit gates

noise_model.add_all_qubit_quantum_error(error_1q, ['h', 'rx', 'ry', 'rz'])
noise_model.add_all_qubit_quantum_error(error_2q, ['cx'])

# Test circuit
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Run with noise
backend = Aer.get_backend('qasm_simulator')
result_noisy = execute(qc, backend, noise_model=noise_model, shots=1024).result()
counts_noisy = result_noisy.get_counts()

print("With noise:", counts_noisy)
# Expected: some '01' and '10' due to errors

# Run without noise for comparison
result_ideal = execute(qc, backend, shots=1024).result()
counts_ideal = result_ideal.get_counts()

print("Ideal:", counts_ideal)`,
        explanation: "Noise simulation helps predict real hardware behavior. Common errors: depolarizing (random Pauli), amplitude damping (energy loss), phase damping (dephasing). Test algorithms under realistic noise."
      }
    ],
    braketCode: [
      {
        title: "Circuit Analysis",
        code: `from braket.circuits import Circuit

def analyze_circuit(circuit):
    """Analyze circuit properties"""
    print(f"Number of qubits: {circuit.qubit_count}")
    print(f"Circuit depth: {circuit.depth}")
    
    # Count gate types
    gate_counts = {}
    for instruction in circuit.instructions:
        gate_name = instruction.operator.name
        gate_counts[gate_name] = gate_counts.get(gate_name, 0) + 1
    
    print("Gate counts:", gate_counts)
    
    # Identify two-qubit gates (more expensive)
    two_qubit_gates = [inst for inst in circuit.instructions 
                       if len(inst.target) == 2]
    print(f"Two-qubit gates: {len(two_qubit_gates)}")
    
    return gate_counts

# Example
circuit = Circuit()
circuit.h(0)
circuit.cnot(0, 1)
circuit.ry(0, 0.5)
circuit.cnot(1, 2)

analyze_circuit(circuit)`,
        explanation: "Circuit analysis helps identify optimization opportunities. Key metrics: depth (affects coherence time), two-qubit gate count (most error-prone), total gate count (affects runtime)."
      },
      {
        title: "Error Mitigation Strategy",
        code: `from braket.circuits import Circuit

def design_error_mitigated_circuit():
    """
    Design circuit with error mitigation in mind
    """
    circuit = Circuit()
    
    # Strategy 1: Minimize two-qubit gates
    # Bad: multiple CNOTs
    # circuit.cnot(0,1).cnot(1,2).cnot(2,3)
    
    # Better: parallel CNOTs where possible
    circuit.cnot(0,1)
    circuit.cnot(2,3)  # Can run in parallel
    
    # Strategy 2: Use native gates
    # Check device topology and native gate set
    # Prefer gates that are native to hardware
    
    # Strategy 3: Keep circuits shallow
    # Deeper circuits accumulate more errors
    # Trade off between accuracy and depth
    
    # Strategy 4: Dynamical decoupling (if supported)
    # Insert identity operations to suppress noise
    
    return circuit

circuit = design_error_mitigated_circuit()
print(circuit)

# Best practices:
# 1. Minimize circuit depth
# 2. Use hardware-native gates
# 3. Reduce two-qubit gate count
# 4. Consider qubit connectivity
# 5. Use error mitigation techniques`,
        explanation: "Error mitigation strategies: minimize depth, use native gates, reduce two-qubit gates, exploit parallelism, use dynamical decoupling. Design circuits with hardware constraints in mind."
      }
    ],
    exercises: [
      {
        question: "Design a custom algorithm to solve a specific problem of your choice. Document your design process: problem analysis, quantum advantage, circuit design, optimization.",
        hint: "Start with: What's the problem? Can quantum help? What's the oracle/Hamiltonian? What's the ansatz? How to measure success?"
      },
      {
        question: "Take an existing algorithm (e.g., Grover) and optimize it for a specific hardware backend. Measure improvement in fidelity.",
        hint: "Use transpiler, check qubit connectivity, minimize two-qubit gates, use native gates, reduce depth."
      }
    ],
    commonMistakes: [
      "Not testing on small examples before scaling up",
      "Ignoring hardware constraints (connectivity, native gates)",
      "Not considering noise when designing algorithms",
      "Over-optimizing for simulators (doesn't transfer to hardware)",
      "Not documenting assumptions and design decisions"
    ],
    keyTakeaways: [
      "Algorithm design is iterative: design, test, debug, optimize",
      "Debugging requires inspecting intermediate states",
      "Optimization balances depth, gate count, and fidelity",
      "Noise is unavoidable: design with it in mind",
      "Best practices: minimize depth, use native gates, test thoroughly"
    ]
  }
]

function App() {
  const [currentModule, setCurrentModule] = useState<number>(0)
  const [completedModules, setCompletedModules] = useState<Set<number>>(
    () => new Set(JSON.parse(localStorage.getItem('completedModules') || '[]'))
  )
  const [showSidebar, setShowSidebar] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('completedModules', JSON.stringify(Array.from(completedModules)))
  }, [completedModules])

  const toggleModuleComplete = (moduleId: number) => {
    const newCompleted = new Set(completedModules)
    if (newCompleted.has(moduleId)) {
      newCompleted.delete(moduleId)
    } else {
      newCompleted.add(moduleId)
    }
    setCompletedModules(newCompleted)
  }

  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(title)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const progressPercentage = (completedModules.size / modules.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-blue-900/50 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden"
              >
                {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Rocket className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Quantum Algorithm Mastery
                </h1>
                <p className="text-sm text-slate-400">From Fundamentals to Building Your Own Algorithms</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="text-lg font-bold text-blue-400">{completedModules.size}/{modules.length} Modules</p>
              </div>
              <Progress value={progressPercentage} className="w-32" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className={`${showSidebar ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
          <Card className="bg-slate-900/50 border-blue-900/50 sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Learning Roadmap
              </CardTitle>
              <CardDescription>Click on any module to start learning</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <button
                      key={module.id}
                      onClick={() => {
                        setCurrentModule(index)
                        setShowSidebar(false)
                      }}
                      className={`w-full text-left p-4 rounded-lg transition-all roadmap-node ${
                        currentModule === index
                          ? 'bg-blue-600 shadow-lg shadow-blue-500/50'
                          : 'bg-slate-800/50 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {completedModules.has(module.id) ? (
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              Module {module.id}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{module.title}</h3>
                          <p className="text-xs text-slate-400 line-clamp-2">{module.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="space-y-6 fade-in">
            {/* Module Header */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-800/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3">Module {modules[currentModule].id} of {modules.length}</Badge>
                    <CardTitle className="text-3xl mb-2">{modules[currentModule].title}</CardTitle>
                    <CardDescription className="text-base">{modules[currentModule].description}</CardDescription>
                  </div>
                  <Button
                    onClick={() => toggleModuleComplete(modules[currentModule].id)}
                    variant={completedModules.has(modules[currentModule].id) ? "default" : "outline"}
                    className="flex-shrink-0"
                  >
                    {completedModules.has(modules[currentModule].id) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Topics Covered */}
            <Card className="bg-slate-900/50 border-blue-900/50">
              <CardHeader>
                <CardTitle className="text-xl">Topics Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {modules[currentModule].topics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-sm text-slate-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card className="bg-slate-900/50 border-blue-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  Code Examples
                </CardTitle>
                <CardDescription>Compare Qiskit and Braket implementations side-by-side</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="qiskit" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="qiskit">Qiskit</TabsTrigger>
                    <TabsTrigger value="braket">Amazon Braket</TabsTrigger>
                  </TabsList>

                  <TabsContent value="qiskit" className="space-y-6">
                    {modules[currentModule].qiskitCode.map((example, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="text-lg font-semibold text-blue-300">{example.title}</h3>
                        <div className="code-block">
                          <div className="code-header">
                            <span className="text-sm text-slate-400">Python (Qiskit)</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(example.code, example.title)}
                              className="h-8"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {copiedCode === example.title ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          <div className="code-content scrollbar-thin">
                            <pre className="text-slate-300">{example.code}</pre>
                          </div>
                        </div>
                        <Alert className="bg-blue-950/30 border-blue-800/50">
                          <Lightbulb className="h-4 w-4 text-blue-400" />
                          <AlertTitle>Explanation</AlertTitle>
                          <AlertDescription className="text-slate-300">
                            {example.explanation}
                          </AlertDescription>
                        </Alert>
                        {index < modules[currentModule].qiskitCode.length - 1 && (
                          <Separator className="my-6 bg-slate-800" />
                        )}
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="braket" className="space-y-6">
                    {modules[currentModule].braketCode.map((example, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="text-lg font-semibold text-cyan-300">{example.title}</h3>
                        <div className="code-block">
                          <div className="code-header">
                            <span className="text-sm text-slate-400">Python (Braket)</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(example.code, example.title)}
                              className="h-8"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {copiedCode === example.title ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                          <div className="code-content scrollbar-thin">
                            <pre className="text-slate-300">{example.code}</pre>
                          </div>
                        </div>
                        <Alert className="bg-cyan-950/30 border-cyan-800/50">
                          <Lightbulb className="h-4 w-4 text-cyan-400" />
                          <AlertTitle>Explanation</AlertTitle>
                          <AlertDescription className="text-slate-300">
                            {example.explanation}
                          </AlertDescription>
                        </Alert>
                        {index < modules[currentModule].braketCode.length - 1 && (
                          <Separator className="my-6 bg-slate-800" />
                        )}
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Exercises */}
            <Card className="bg-slate-900/50 border-blue-900/50">
              <CardHeader>
                <CardTitle>Practice Exercises</CardTitle>
                <CardDescription>Test your understanding with these challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {modules[currentModule].exercises.map((exercise, index) => (
                    <AccordionItem key={index} value={`exercise-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-semibold">Exercise {index + 1}</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="text-slate-300">{exercise.question}</p>
                        <Alert className="bg-yellow-950/20 border-yellow-800/50">
                          <Lightbulb className="h-4 w-4 text-yellow-400" />
                          <AlertTitle>Hint</AlertTitle>
                          <AlertDescription className="text-slate-300">
                            {exercise.hint}
                          </AlertDescription>
                        </Alert>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card className="bg-red-950/20 border-red-900/50">
              <CardHeader>
                <CardTitle className="text-red-400">Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {modules[currentModule].commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-400 flex-shrink-0 mt-1">!</span>
                      <span className="text-slate-300">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Key Takeaways */}
            <Card className="bg-green-950/20 border-green-900/50">
              <CardHeader>
                <CardTitle className="text-green-400">Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {modules[currentModule].keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button
                onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
                disabled={currentModule === 0}
                variant="outline"
              >
                Previous Module
              </Button>
              <Button
                onClick={() => setCurrentModule(Math.min(modules.length - 1, currentModule + 1))}
                disabled={currentModule === modules.length - 1}
              >
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-900/50 bg-slate-950/80 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          <p>Master quantum algorithms with hands-on examples in Qiskit and Amazon Braket</p>
          <p className="mt-2">Your progress is automatically saved in your browser</p>
        </div>
      </footer>
    </div>
  )
}

export default App
