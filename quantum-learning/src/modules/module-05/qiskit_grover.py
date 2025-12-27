from qiskit import QuantumCircuit, Aer, execute

# Grover's algorithm for 2-qubit search with oracle marking |11>
qc = QuantumCircuit(2, 2)

# Oracle for |11>: apply Z with both as controls via CZ
qc.cz(0, 1)

# Diffusion operator
qc.h([0,1])
qc.x([0,1])
qc.h(1)
qc.cx(0,1)
qc.h(1)
qc.x([0,1])
qc.h([0,1])

qc.measure([0,1],[0,1])

backend = Aer.get_backend('qasm_simulator')
counts = execute(qc, backend, shots=1024).result().get_counts()
print(counts)
