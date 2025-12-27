// Lightweight quantum simulator for visualization purposes
// Supports small circuits (up to 4 qubits) for educational visualization

export interface Complex {
  re: number;
  im: number;
}

export interface QubitState {
  theta: number; // polar angle (0 to pi)
  phi: number;   // azimuthal angle (0 to 2pi)
}

export interface SimulationStep {
  gateName: string;
  qubitIndices: number[];
  stateVector: Complex[];
  probabilities: number[];
  blochStates: QubitState[];
  description: string;
}

// Complex number operations
const complex = (re: number, im: number = 0): Complex => ({ re, im });
const add = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im });
const mul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});
const scale = (a: Complex, s: number): Complex => ({ re: a.re * s, im: a.im * s });
const conj = (a: Complex): Complex => ({ re: a.re, im: -a.im });
const abs2 = (a: Complex): number => a.re * a.re + a.im * a.im;

// Gate matrices (2x2 for single qubit gates)
const X_GATE = [[complex(0), complex(1)], [complex(1), complex(0)]];
const Y_GATE = [[complex(0), complex(0, -1)], [complex(0, 1), complex(0)]];
const Z_GATE = [[complex(1), complex(0)], [complex(0), complex(-1)]];
const H_GATE = [[complex(1/Math.sqrt(2)), complex(1/Math.sqrt(2))], 
                [complex(1/Math.sqrt(2)), complex(-1/Math.sqrt(2))]];
const S_GATE = [[complex(1), complex(0)], [complex(0), complex(0, 1)]];
const T_GATE = [[complex(1), complex(0)], [complex(0), complex(Math.cos(Math.PI/4), Math.sin(Math.PI/4))]];

// Rotation gates
const RX = (theta: number): Complex[][] => [
  [complex(Math.cos(theta/2)), complex(0, -Math.sin(theta/2))],
  [complex(0, -Math.sin(theta/2)), complex(Math.cos(theta/2))]
];

const RY = (theta: number): Complex[][] => [
  [complex(Math.cos(theta/2)), complex(-Math.sin(theta/2))],
  [complex(Math.sin(theta/2)), complex(Math.cos(theta/2))]
];

const RZ = (theta: number): Complex[][] => [
  [complex(Math.cos(theta/2), -Math.sin(theta/2)), complex(0)],
  [complex(0), complex(Math.cos(theta/2), Math.sin(theta/2))]
];

export class QuantumSimulator {
  private numQubits: number;
  private stateVector: Complex[];
  private steps: SimulationStep[];

  constructor(numQubits: number) {
    if (numQubits > 4) {
      throw new Error("Simulator supports up to 4 qubits for visualization");
    }
    this.numQubits = numQubits;
    this.stateVector = this.initializeState();
    this.steps = [];
    this.recordStep("Initial", [], "All qubits initialized to |0⟩");
  }

  private initializeState(): Complex[] {
    const size = Math.pow(2, this.numQubits);
    const state = new Array(size).fill(null).map(() => complex(0));
    state[0] = complex(1); // |00...0⟩
    return state;
  }

  private recordStep(gateName: string, qubits: number[], description: string) {
    this.steps.push({
      gateName,
      qubitIndices: qubits,
      stateVector: [...this.stateVector],
      probabilities: this.getProbabilities(),
      blochStates: this.getBlochStates(),
      description
    });
  }

  getProbabilities(): number[] {
    return this.stateVector.map(abs2);
  }

  getBlochStates(): QubitState[] {
    const states: QubitState[] = [];
    for (let q = 0; q < this.numQubits; q++) {
      states.push(this.getReducedBlochState(q));
    }
    return states;
  }

  private getReducedBlochState(qubit: number): QubitState {
    // Calculate reduced density matrix for single qubit
    // For pure states, extract the Bloch vector
    const size = Math.pow(2, this.numQubits);
    let rho00 = complex(0);
    let rho01 = complex(0);
    let rho10 = complex(0);
    let rho11 = complex(0);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const bit_i = (i >> (this.numQubits - 1 - qubit)) & 1;
        const bit_j = (j >> (this.numQubits - 1 - qubit)) & 1;
        const other_i = i ^ (bit_i << (this.numQubits - 1 - qubit));
        const other_j = j ^ (bit_j << (this.numQubits - 1 - qubit));
        
        if (other_i === other_j) {
          const amp_i = this.stateVector[i];
          const amp_j = this.stateVector[j];
          const contrib = mul(amp_i, conj(amp_j));
          
          if (bit_i === 0 && bit_j === 0) rho00 = add(rho00, contrib);
          if (bit_i === 0 && bit_j === 1) rho01 = add(rho01, contrib);
          if (bit_i === 1 && bit_j === 0) rho10 = add(rho10, contrib);
          if (bit_i === 1 && bit_j === 1) rho11 = add(rho11, contrib);
        }
      }
    }

    // Bloch vector components
    const x = rho01.re + rho10.re;
    const y = rho01.im - rho10.im;
    const z = rho00.re - rho11.re;

    // Convert to spherical coordinates
    const r = Math.sqrt(x*x + y*y + z*z);
    if (r < 1e-10) {
      return { theta: Math.PI/2, phi: 0 }; // Mixed state at center
    }

    const theta = Math.acos(Math.max(-1, Math.min(1, z / r)));
    const phi = Math.atan2(y, x);

    return { theta, phi: phi < 0 ? phi + 2*Math.PI : phi };
  }

  // Apply single qubit gate
  applySingleQubitGate(gate: Complex[][], qubit: number, gateName: string, description: string) {
    const size = Math.pow(2, this.numQubits);
    const newState = new Array(size).fill(null).map(() => complex(0));
    
    for (let i = 0; i < size; i++) {
      const bit = (i >> (this.numQubits - 1 - qubit)) & 1;
      const other = i ^ (bit << (this.numQubits - 1 - qubit));
      
      // |0⟩ component
      const idx0 = other;
      // |1⟩ component  
      const idx1 = other | (1 << (this.numQubits - 1 - qubit));
      
      if (bit === 0) {
        newState[i] = add(
          mul(gate[0][0], this.stateVector[idx0]),
          mul(gate[0][1], this.stateVector[idx1])
        );
      } else {
        newState[i] = add(
          mul(gate[1][0], this.stateVector[idx0]),
          mul(gate[1][1], this.stateVector[idx1])
        );
      }
    }
    
    this.stateVector = newState;
    this.recordStep(gateName, [qubit], description);
  }

  // Apply CNOT gate
  applyCNOT(control: number, target: number, description: string = "") {
    const size = Math.pow(2, this.numQubits);
    const newState = [...this.stateVector];
    
    for (let i = 0; i < size; i++) {
      const controlBit = (i >> (this.numQubits - 1 - control)) & 1;
      if (controlBit === 1) {
        const flipped = i ^ (1 << (this.numQubits - 1 - target));
        // Swap amplitudes only if i < flipped to avoid double-swapping
        if (i < flipped) {
          const temp = newState[i];
          newState[i] = newState[flipped];
          newState[flipped] = temp;
        }
      }
    }
    
    this.stateVector = newState;
    this.recordStep("CNOT", [control, target], description || `CNOT: control q${control}, target q${target}`);
  }

  // Apply CZ gate
  applyCZ(control: number, target: number, description: string = "") {
    const size = Math.pow(2, this.numQubits);
    const newState = [...this.stateVector];
    
    for (let i = 0; i < size; i++) {
      const controlBit = (i >> (this.numQubits - 1 - control)) & 1;
      const targetBit = (i >> (this.numQubits - 1 - target)) & 1;
      if (controlBit === 1 && targetBit === 1) {
        newState[i] = scale(newState[i], -1);
      }
    }
    
    this.stateVector = newState;
    this.recordStep("CZ", [control, target], description || `CZ: q${control}, q${target}`);
  }

  // Convenience methods
  h(qubit: number, desc: string = "") {
    this.applySingleQubitGate(H_GATE, qubit, "H", desc || `Hadamard on q${qubit}: creates superposition`);
  }

  x(qubit: number, desc: string = "") {
    this.applySingleQubitGate(X_GATE, qubit, "X", desc || `X gate on q${qubit}: bit flip |0⟩↔|1⟩`);
  }

  y(qubit: number, desc: string = "") {
    this.applySingleQubitGate(Y_GATE, qubit, "Y", desc || `Y gate on q${qubit}: bit flip with phase`);
  }

  z(qubit: number, desc: string = "") {
    this.applySingleQubitGate(Z_GATE, qubit, "Z", desc || `Z gate on q${qubit}: phase flip`);
  }

  s(qubit: number, desc: string = "") {
    this.applySingleQubitGate(S_GATE, qubit, "S", desc || `S gate on q${qubit}: π/2 phase`);
  }

  t(qubit: number, desc: string = "") {
    this.applySingleQubitGate(T_GATE, qubit, "T", desc || `T gate on q${qubit}: π/4 phase`);
  }

  rx(qubit: number, theta: number, desc: string = "") {
    this.applySingleQubitGate(RX(theta), qubit, "RX", desc || `RX(${(theta/Math.PI).toFixed(2)}π) on q${qubit}`);
  }

  ry(qubit: number, theta: number, desc: string = "") {
    this.applySingleQubitGate(RY(theta), qubit, "RY", desc || `RY(${(theta/Math.PI).toFixed(2)}π) on q${qubit}`);
  }

  rz(qubit: number, theta: number, desc: string = "") {
    this.applySingleQubitGate(RZ(theta), qubit, "RZ", desc || `RZ(${(theta/Math.PI).toFixed(2)}π) on q${qubit}`);
  }

  cnot(control: number, target: number, desc: string = "") {
    this.applyCNOT(control, target, desc || `CNOT: if q${control}=|1⟩, flip q${target}`);
  }

  cz(control: number, target: number, desc: string = "") {
    this.applyCZ(control, target, desc || `CZ: phase flip if both qubits are |1⟩`);
  }

  measure(description: string = "Measurement") {
    this.recordStep("Measure", [], description);
  }

  getSteps(): SimulationStep[] {
    return this.steps;
  }

  getStateVector(): Complex[] {
    return [...this.stateVector];
  }
}

// Pre-built circuit examples for visualization
export const circuitExamples = {
  superposition: () => {
    const sim = new QuantumSimulator(1);
    sim.h(0, "Apply Hadamard: |0⟩ → (|0⟩+|1⟩)/√2");
    sim.measure("Measure: 50% chance of |0⟩ or |1⟩");
    return sim.getSteps();
  },

  bellState: () => {
    const sim = new QuantumSimulator(2);
    sim.h(0, "Hadamard on q0: creates superposition");
    sim.cnot(0, 1, "CNOT entangles q0 and q1: |00⟩+|11⟩)/√2");
    sim.measure("Measure: always get 00 or 11 together!");
    return sim.getSteps();
  },

  phaseKickback: () => {
    const sim = new QuantumSimulator(2);
    sim.h(0, "Put control qubit in superposition");
    sim.x(1, "Prepare target in |1⟩");
    sim.h(1, "Target now in |-⟩ eigenstate");
    sim.cnot(0, 1, "Phase kicks back to control qubit!");
    sim.h(1, "Uncompute target");
    sim.x(1, "Restore target to |0⟩");
    sim.h(0, "Reveal phase on control");
    sim.measure("Control qubit shows the phase information");
    return sim.getSteps();
  },

  grover2Qubit: () => {
    const sim = new QuantumSimulator(2);
    sim.h(0, "Initialize q0 in superposition");
    sim.h(1, "Initialize q1 in superposition");
    // Oracle for |11⟩
    sim.cz(0, 1, "Oracle: mark |11⟩ with phase flip");
    // Diffusion
    sim.h(0, "Diffusion step 1: H on q0");
    sim.h(1, "Diffusion step 1: H on q1");
    sim.x(0, "Diffusion step 2: X on q0");
    sim.x(1, "Diffusion step 2: X on q1");
    sim.h(1, "Diffusion step 3: prepare for CZ");
    sim.cnot(0, 1, "Diffusion step 3: controlled phase");
    sim.h(1, "Diffusion step 3: complete");
    sim.x(0, "Diffusion step 4: X on q0");
    sim.x(1, "Diffusion step 4: X on q1");
    sim.h(0, "Diffusion step 5: H on q0");
    sim.h(1, "Diffusion step 5: H on q1");
    sim.measure("Measure: |11⟩ has highest probability!");
    return sim.getSteps();
  },

  singleQubitRotations: () => {
    const sim = new QuantumSimulator(1);
    sim.rx(0, Math.PI/4, "RX(π/4): rotate around X-axis");
    sim.ry(0, Math.PI/3, "RY(π/3): rotate around Y-axis");
    sim.rz(0, Math.PI/2, "RZ(π/2): rotate around Z-axis");
    sim.measure("Final state after rotations");
    return sim.getSteps();
  },

  pauliGates: () => {
    const sim = new QuantumSimulator(1);
    sim.x(0, "X gate: |0⟩ → |1⟩ (bit flip)");
    sim.y(0, "Y gate: |1⟩ → -i|0⟩ (flip + phase)");
    sim.z(0, "Z gate: adds phase to |1⟩ component");
    sim.measure("Final state after Pauli gates");
    return sim.getSteps();
  },

  ghzState: () => {
    const sim = new QuantumSimulator(3);
    sim.h(0, "Hadamard on q0: superposition");
    sim.cnot(0, 1, "CNOT q0→q1: entangle first two");
    sim.cnot(0, 2, "CNOT q0→q2: create GHZ state (|000⟩+|111⟩)/√2");
    sim.measure("Measure: all qubits same (000 or 111)");
    return sim.getSteps();
  }
};

export type CircuitExampleKey = keyof typeof circuitExamples;
