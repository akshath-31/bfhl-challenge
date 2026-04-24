// builds the graph adjacency structure and counts incoming edges to find roots
export function buildGraphData(validEdges) {
    const edgesList = [];
    const dupBucket = [];
    const graph = {};
    const parentCount = {};
    const allNodes = new Set();
    
    const seenPairs = new Set();
    const addedToDup = new Set();

    for (const edge of validEdges) {
        const pairKey = `${edge.source}~${edge.target}`;

        allNodes.add(edge.source);
        allNodes.add(edge.target);

        if (seenPairs.has(pairKey)) {
            if (!addedToDup.has(pairKey)) {
                dupBucket.push(edge.original);
                addedToDup.add(pairKey);
            }
            continue;
        }

        seenPairs.add(pairKey);

        if (parentCount[edge.target] && parentCount[edge.target] > 0) {
            continue;
        }

        edgesList.push(edge.original);

        if (!graph[edge.source]) {
            graph[edge.source] = [];
        }
        graph[edge.source].push(edge.target);

        if (!graph[edge.target]) {
            graph[edge.target] = [];
        }

        parentCount[edge.target] = (parentCount[edge.target] || 0) + 1;
        if (parentCount[edge.source] === undefined) {
            parentCount[edge.source] = 0;
        }
    }

    for (const node of allNodes) {
        if (parentCount[node] === undefined) {
            parentCount[node] = 0;
        }
        if (!graph[node]) {
            graph[node] = [];
        }
    }

    return { edgesList, dupBucket, graph, parentCount, allNodes: Array.from(allNodes) };
}
