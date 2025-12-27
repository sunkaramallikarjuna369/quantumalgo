from braket.circuits import Circuit
from braket.devices import LocalSimulator

# 1 qubit: prepare |+> and measure in Z basis
c = Circuit().h(0).measure(0)

sim = LocalSimulator()
result = sim.run(c, shots=1024).result()
counts = result.measurement_counts
print(counts)
