from qiskit import QuantumCircuit, Aer
from qiskit.quantum_info import Statevector

# Bell state and debug with statevector
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0,1)
sv = Statevector.from_instruction(qc)
print(sv)
