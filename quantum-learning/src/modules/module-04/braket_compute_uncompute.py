from braket.circuits import Circuit

c = Circuit().cnot(0,1).cnot(0,1)
print(c)
