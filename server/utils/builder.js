// computes aggregate statistics over all generated hierarchies
export function makeSummary(hierarchies) {
    let totalTrees = 0;
    let totalCycles = 0;
    let deepestRoot = null;
    let maxDepth = -1;

    for (const h of hierarchies) {
        if (h.has_cycle) {
            totalCycles++;
        } else {
            totalTrees++;
            if (h.depth > maxDepth) {
                maxDepth = h.depth;
                deepestRoot = h.root;
            } else if (h.depth === maxDepth) {
                if (deepestRoot === null || h.root < deepestRoot) {
                    deepestRoot = h.root;
                }
            }
        }
    }

    return {
        total_trees: totalTrees,
        total_cycles: totalCycles,
        largest_tree_root: deepestRoot
    };
}
