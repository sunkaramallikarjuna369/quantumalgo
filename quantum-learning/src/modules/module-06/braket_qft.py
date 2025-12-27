from braket.circuits import Circuit

# Simple QFT on 3 qubits (manual construction)
c = Circuit()
# Hadamards and controlled phase rotations
c.h(0)
c.cphaseshift(1, 0, 3.14159/2)
c.cphaseshift(2, 0, 3.14159/4)
c.h(1)
c.cphaseshift(2, 1, 3.14159/2)
c.h(2)
print(c)
