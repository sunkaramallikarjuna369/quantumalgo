from qiskit import QuantumCircuit, Aer, execute

# 1 qubit: prepare |+> and measure in Z basis
qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend=backend, shots=1024)
counts = job.result().get_counts()
print(counts)
