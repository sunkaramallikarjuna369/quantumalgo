from qiskit import QuantumCircuit

# Single-qubit rotations
qc = QuantumCircuit(1)
qc.rx(0.5, 0)
qc.ry(0.5, 0)
qc.rz(0.5, 0)
print(qc)
