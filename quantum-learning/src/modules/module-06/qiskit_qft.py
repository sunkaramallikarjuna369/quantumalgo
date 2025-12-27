from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT

n = 3
qc = QuantumCircuit(n)
qc.append(QFT(num_qubits=n), range(n))
print(qc)
