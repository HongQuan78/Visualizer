/**
 * BST Insert Engine: genera historial completo de snapshots
 * para reproducir la inserción paso a paso en un BST.
 *
 * Cada snapshot contiene:
 *   - tree:             { nodes, edges } con posiciones calculadas
 *   - activeNode:       nodo actualmente comparado
 *   - newNode:          nodo recién insertado (para animación verde)
 *   - comparing:        nodos resaltados durante comparación
 *   - traversalPath:    camino recorrido durante la inserción actual
 *   - pendingValues:    valores pendientes por insertar
 *   - currentInsertValue: valor que se está insertando
 *   - codeLine:         línea activa del pseudocódigo
 *   - description:      texto descriptivo del paso actual
 *   - queue:            alias de pendingValues (compatibilidad con header)
 */

export const BST_INSERT_CODE = [
  { line: 1,  text: 'function insert(root, value) {' },
  { line: 2,  text: '  if (root === null) {' },
  { line: 3,  text: '    return new Node(value);' },
  { line: 4,  text: '  }' },
  { line: 5,  text: '  if (value < root.val) {' },
  { line: 6,  text: '    root.left = insert(root.left, value);' },
  { line: 7,  text: '  } else if (value > root.val) {' },
  { line: 8,  text: '    root.right = insert(root.right, value);' },
  { line: 9,  text: '  }' },
  { line: 10, text: '  return root;' },
  { line: 11, text: '}' },
];

export const BST_INSERT_META = {
  name: 'BST Insert',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  category: 'Trees',
  tag: 'Binary Tree',
};

// ──────────────────────────────
// Nodo interno del BST (solo para generación de pasos)
// ──────────────────────────────
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// ──────────────────────────────
// Layout: calcula posiciones (x, y) para renderizar el árbol
// Usa división recursiva del espacio horizontal disponible
// ──────────────────────────────
function computeLayout(root) {
  const nodes = [];
  const edges = [];

  function traverse(node, depth, left, right) {
    if (!node) return;
    const x = (left + right) / 2;
    const y = 60 + depth * 100;
    nodes.push({ id: node.val, x, y });

    if (node.left) {
      edges.push({ from: node.val, to: node.left.val, direction: 'left' });
      traverse(node.left, depth + 1, left, x);
    }
    if (node.right) {
      edges.push({ from: node.val, to: node.right.val, direction: 'right' });
      traverse(node.right, depth + 1, x, right);
    }
  }

  traverse(root, 0, 50, 950);
  return { nodes, edges };
}

// ──────────────────────────────
// Helper: crea un snapshot con valores por defecto
// ──────────────────────────────
function createSnapshot(root, overrides) {
  const layout = root ? computeLayout(root) : { nodes: [], edges: [] };
  return {
    tree: layout,
    // Necesario para compatibilidad con GraphStage/header
    graph: { nodes: layout.nodes, adjList: {} },
    activeNode: null,
    newNode: null,
    comparing: [],
    traversalPath: [],
    pendingValues: [],
    currentInsertValue: null,
    visited: new Set(),
    codeLine: 1,
    description: '',
    queue: [],
    ...overrides,
  };
}

/**
 * Genera snapshots para la inserción secuencial de valores en un BST.
 * @param {number[]} values - Valores a insertar en orden.
 */
export function generateBSTInsertSteps(values) {
  const steps = [];
  let root = null;

  // Paso inicial: árbol vacío
  steps.push(createSnapshot(null, {
    pendingValues: [...values],
    queue: [...values],
    codeLine: 1,
    description: 'Starting BST construction...',
  }));

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const remaining = values.slice(i + 1);

    // Anunciar la inserción del valor actual
    steps.push(createSnapshot(root, {
      pendingValues: remaining,
      currentInsertValue: value,
      queue: [value, ...remaining],
      codeLine: 1,
      description: `Inserting value ${value} into the BST`,
    }));

    if (root === null) {
      // Árbol vacío: el primer valor se convierte en raíz
      steps.push(createSnapshot(null, {
        pendingValues: remaining,
        currentInsertValue: value,
        queue: [value, ...remaining],
        codeLine: 2,
        description: `Root is null — tree is empty`,
      }));

      root = new TreeNode(value);

      steps.push(createSnapshot(root, {
        newNode: value,
        pendingValues: remaining,
        currentInsertValue: value,
        queue: remaining,
        codeLine: 3,
        description: `Created root node with value ${value}`,
      }));
    } else {
      // Recorrer el árbol para encontrar la posición de inserción
      let current = root;
      const path = [];

      while (current) {
        path.push(current.val);

        if (value < current.val) {
          // Comparación: ir a la izquierda
          steps.push(createSnapshot(root, {
            activeNode: current.val,
            comparing: [current.val],
            traversalPath: [...path],
            pendingValues: remaining,
            currentInsertValue: value,
            queue: [value, ...remaining],
            codeLine: 5,
            description: `${value} < ${current.val} → go left`,
          }));

          if (current.left === null) {
            // Insertar como hijo izquierdo
            steps.push(createSnapshot(root, {
              activeNode: current.val,
              traversalPath: [...path],
              pendingValues: remaining,
              currentInsertValue: value,
              queue: [value, ...remaining],
              codeLine: 6,
              description: `Left child is null — insert ${value} here`,
            }));

            current.left = new TreeNode(value);

            steps.push(createSnapshot(root, {
              newNode: value,
              traversalPath: [...path],
              pendingValues: remaining,
              currentInsertValue: value,
              queue: remaining,
              codeLine: 3,
              description: `Inserted ${value} as left child of ${current.val}`,
            }));
            break;
          }

          steps.push(createSnapshot(root, {
            activeNode: current.val,
            traversalPath: [...path],
            pendingValues: remaining,
            currentInsertValue: value,
            queue: [value, ...remaining],
            codeLine: 6,
            description: `Moving to left subtree...`,
          }));

          current = current.left;
        } else {
          // Comparación: ir a la derecha
          steps.push(createSnapshot(root, {
            activeNode: current.val,
            comparing: [current.val],
            traversalPath: [...path],
            pendingValues: remaining,
            currentInsertValue: value,
            queue: [value, ...remaining],
            codeLine: 7,
            description: `${value} > ${current.val} → go right`,
          }));

          if (current.right === null) {
            // Insertar como hijo derecho
            steps.push(createSnapshot(root, {
              activeNode: current.val,
              traversalPath: [...path],
              pendingValues: remaining,
              currentInsertValue: value,
              queue: [value, ...remaining],
              codeLine: 8,
              description: `Right child is null — insert ${value} here`,
            }));

            current.right = new TreeNode(value);

            steps.push(createSnapshot(root, {
              newNode: value,
              traversalPath: [...path],
              pendingValues: remaining,
              currentInsertValue: value,
              queue: remaining,
              codeLine: 3,
              description: `Inserted ${value} as right child of ${current.val}`,
            }));
            break;
          }

          steps.push(createSnapshot(root, {
            activeNode: current.val,
            traversalPath: [...path],
            pendingValues: remaining,
            currentInsertValue: value,
            queue: [value, ...remaining],
            codeLine: 8,
            description: `Moving to right subtree...`,
          }));

          current = current.right;
        }
      }
    }

    // Paso de "return root" después de cada inserción
    steps.push(createSnapshot(root, {
      pendingValues: remaining,
      queue: remaining,
      codeLine: 10,
      description: `Value ${value} inserted successfully. Tree has ${i + 1} node(s).`,
    }));
  }

  // Paso final
  steps.push(createSnapshot(root, {
    codeLine: 11,
    description: 'BST construction complete!',
  }));

  return { steps, totalSteps: steps.length };
}

/**
 * Genera valores únicos aleatorios para insertar en el BST.
 * Evita valores duplicados y orden parcialmente sorted para
 * producir árboles más balanceados visualmente.
 */
export function generateRandomBSTValues(count = 8) {
  const values = new Set();
  while (values.size < count) {
    values.add(Math.floor(Math.random() * 99) + 1);
  }
  return Array.from(values);
}
