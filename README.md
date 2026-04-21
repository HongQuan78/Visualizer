# 💠 AlgoForge | Algorithm Visualizer

**AlgoForge** is a premium, high-performance algorithm visualization platform designed for clarity, aesthetics, and deep technical understanding. Built with a modern glassmorphism design system, it allows users to monitor complex execution states, traversal paths, and real-time code execution across various data structures.

![Header Preview](https://img.shields.io/badge/Design-Glassmorphism-4CD7F6?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vanilla%20CSS-61DAFB?style=for-the-badge)

---

## ✨ Key Features

- **🚀 Real-Time Execution Trace**: See exactly which line of pseudocode is running with synchronized highlighting.
- **📊 Persistent Monitoring**: Critical data structures like **Call Stacks**, **Traversal Queues**, and **Pending Insertions** are pinned to the header for real-time tracking.
- **💎 Premium Aesthetics**: A sleek "Blueprint" interface featuring vibrant glow effects, smooth transitions, and glassmorphic panels.
- **📐 Specialized Viewports**: 
  - **Graph Stage**: Dynamic force-directed-like layouts for BFS/DFS.
  - **Tree Stage**: Hierarchical layouts with insertion animations for BST.
  - **DP Stage**: Tabulation grid with dependency arrows for Dynamic Programming.
- **⚙️ Complete Control**: Adjust execution speed (0.5x to 4x), step forward/backward, and randomize input data.

---

## 📚 Supported Algorithms

### 📊 Sorting
- **Bubble Sort**: The classic swap-based sorting.
- **Selection Sort**: Finding minimums and placing them in order.
- **Insertion Sort**: Building a sorted array one element at a time.
- **Merge Sort**: A divide & conquer algorithm that splits arrays into halves, sorts them, and merges them back together.

### 🕸️ Graphs
- **Breadth-First Search (BFS)**: Level-order traversal using a queue.
- **Depth-First Search (DFS)**: Exhaustive path searching using a stack.

### 🌳 Trees
- **BST Insert**: Visualizing the recursive placement of nodes in a Binary Search Tree.

### ⚡ Dynamic Programming
- **Fibonacci**: Visualizing the bottom-up tabulation process with dependency tracking.

---

## 🛠️ Technology Stack

- **Core**: React 18+
- **Styling**: Vanilla CSS with CSS Variables (Blueprint Design System)
- **Icons**: Google Material Symbols
- **Visuals**: SVG-based rendering with CSS-in-JS transitions

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HongQuan78/Visualizer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Visualizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🎨 Design Philosophy

> **"Readability and Order > Speed and Complex Interconnections"**

AlgoForge focuses on making the abstract concrete. By combining high-fidelity animations with persistent state monitoring, we eliminate the need for "mental mapping," allowing students and engineers to focus entirely on the logic of the algorithm.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Engineered for clarity. Designed for the curious.*
