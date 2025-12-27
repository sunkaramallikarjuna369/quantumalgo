from qiskit import QuantumCircuit

# Compute-uncompute pattern example: restore ancilla to |0>
qc = QuantumCircuit(2)
qc.cx(0,1)   # compute
# ... use ancilla 1 ...
qc.cx(0,1)   # uncompute
print(qc)
