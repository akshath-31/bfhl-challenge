// groups nodes into forest components and identifies entry points for cycles
export function groupForest(graph, parentCount, allNodes) {
    const components = [];
    const visitedNodes = new Set();
    
    // build undirected graph for component traversal
    const undirectedGraph = {};
    for (const node of allNodes) {
        undirectedGraph[node] = [];
    }
    
    for (const u of allNodes) {
        const children = graph[u] || [];
        for (const v of children) {
            undirectedGraph[u].push(v);
            undirectedGraph[v].push(u);
        }
    }
    
    for (const node of allNodes) {
        if (visitedNodes.has(node)) continue;
        
        const componentNodes = new Set();
        const queue = [node];
        visitedNodes.add(node);
        componentNodes.add(node);
        
        // BFS to collect all nodes in this component
        while (queue.length > 0) {
            const curr = queue.shift();
            
            const neighbors = undirectedGraph[curr] || [];
            for (const neighbor of neighbors) {
                if (!visitedNodes.has(neighbor)) {
                    visitedNodes.add(neighbor);
                    componentNodes.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        const compNodesArr = Array.from(componentNodes);
        
        // determine the root for this component
        const possibleRoots = compNodesArr.filter(n => parentCount[n] === 0);
        
        let root;
        if (possibleRoots.length > 0) {
            possibleRoots.sort();
            root = possibleRoots[0];
        } else {
            // pure cycle component
            compNodesArr.sort();
            root = compNodesArr[0];
        }
        
        components.push({ root, componentNodes });
    }
    
    return components;
}

// traverses the graph iteratively to build the tree structure and detect cycles
export function analyzeTree(root, graph, componentNodes) {
    const stackQueue = [];
    const treeSnapshot = {};
    const exploredNodes = new Set();
    const ancestorPath = new Set();
    let maxDepth = 0;
    
    stackQueue.push({
        currNode: root,
        parentRef: treeSnapshot,
        depthSoFar: 1,
        action: 'ENTER'
    });
    
    while (stackQueue.length > 0) {
        const item = stackQueue.pop();
        
        if (item.action === 'EXIT') {
            ancestorPath.delete(item.currNode);
            continue;
        }
        
        const { currNode, parentRef, depthSoFar } = item;
        
        if (ancestorPath.has(currNode)) {
            return { root, tree: {}, has_cycle: true };
        }
        
        parentRef[currNode] = {};
        const myChildrenObj = parentRef[currNode];
        
        if (depthSoFar > maxDepth) {
            maxDepth = depthSoFar;
        }
        
        ancestorPath.add(currNode);
        exploredNodes.add(currNode);
        
        stackQueue.push({
            currNode,
            action: 'EXIT'
        });
        
        const children = graph[currNode] || [];
        for (let i = children.length - 1; i >= 0; i--) {
            const childLabel = children[i];
            if (!componentNodes.has(childLabel)) continue;
            stackQueue.push({
                currNode: childLabel,
                parentRef: myChildrenObj,
                depthSoFar: depthSoFar + 1,
                action: 'ENTER'
            });
        }
    }
    
    return { root, tree: treeSnapshot, depth: maxDepth };
}
