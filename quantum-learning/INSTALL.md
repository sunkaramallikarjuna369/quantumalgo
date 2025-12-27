# Quantum Algorithm Mastery - Installation Guide

This guide will help you install and run the Quantum Algorithm Learning Platform locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

To check if you have Node.js installed, run:
```bash
node --version
```

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone -b devin/1766801352-quantum-learning-platform https://github.com/sunkaramallikarjuna369/quantumalgo.git
```

### Step 2: Navigate to the Project Directory

```bash
cd quantumalgo/quantum-learning
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages including React, Three.js for 3D visualizations, and other dependencies.

### Step 4: Run the Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:5173
```

You should now see the Quantum Algorithm Mastery learning platform!

## Features

The platform includes:

1. **8 Learning Modules** covering quantum algorithm development from basics to advanced topics
2. **Interactive 3D Visualizations** with Bloch sphere representations
3. **Side-by-side Code Examples** in both Qiskit and Amazon Braket
4. **Step-by-step Circuit Execution** showing how quantum states evolve
5. **Probability Bar Charts** for measurement outcomes
6. **Practice Exercises** with hints
7. **Progress Tracking** saved in your browser

## Modules Covered

1. Qiskit & Braket Fundamentals
2. Single Qubit Operations
3. Multi-Qubit Operations
4. Circuit Programming Patterns
5. Query/Oracle Algorithms (Deutsch-Jozsa, Grover)
6. QFT & Phase Estimation
7. Variational Algorithms (VQE, QAOA)
8. Build Your Own Algorithms

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder. You can serve these with any static file server.

## Troubleshooting

### Common Issues

**Issue: `npm install` fails**
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again

**Issue: Port 5173 is already in use**
- Either stop the other process using that port, or run with a different port:
  ```bash
  npm run dev -- --port 3000
  ```

**Issue: 3D visualizations not loading**
- Make sure WebGL is enabled in your browser
- Try using Chrome or Firefox for best compatibility

## Need Help?

If you encounter any issues, please open an issue on the GitHub repository.

## Learning Path Recommendation

1. Start with Module 1 to understand the basics of Qiskit and Braket
2. Use the interactive visualizations to see how quantum states change
3. Practice with the exercises in each module
4. Progress through modules sequentially for best understanding
5. By Module 8, you'll be ready to design your own quantum algorithms!

Happy learning!
