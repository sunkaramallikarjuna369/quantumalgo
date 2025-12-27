from braket.circuits import Circuit

c = Circuit().rx(0, 0.5).ry(0, 0.5).rz(0, 0.5)
print(c)
