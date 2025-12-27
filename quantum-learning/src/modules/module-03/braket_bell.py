from braket.circuits import Circuit

c = Circuit().h(0).cnot(0,1)
print(c)
