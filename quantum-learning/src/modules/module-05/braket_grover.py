from braket.circuits import Circuit
from braket.devices import LocalSimulator

# Grover's algorithm for 2-qubit search with oracle marking |11>
# Braket lacks a direct CZ convenience; use CNOT with H to emulate phase flip
c = Circuit()
# Oracle: Z on |11> equivalent (apply CZ via H + CNOT + H)
c.h(1)
c.cnot(0,1)
c.h(1)

# Diffusion
c.h(0).h(1)
c.x(0).x(1)
c.h(1).cnot(0,1).h(1)
c.x(0).x(1)
c.h(0).h(1)

c.measure(0).measure(1)

sim = LocalSimulator()
counts = sim.run(c, shots=1024).result().measurement_counts
print(counts)
