import express from 'express';
import { filterEntries } from '../utils/validator.js';
import { buildGraphData } from '../utils/processor.js';
import { groupForest, analyzeTree } from '../utils/walker.js';
import { makeSummary } from '../utils/builder.js';

const router = express.Router();

// handles the main POST request, orchestrating data processing steps
router.post('/', (req, res) => {
    const bodyData = req.body.data;
    
    if (!bodyData || !Array.isArray(bodyData)) {
        return res.status(400).json({ error: "Invalid payload, missing data array" });
    }
    
    const { validEdges, invalidBucket } = filterEntries(bodyData);
    const { edgesList, dupBucket, graph, parentCount, allNodes } = buildGraphData(validEdges);
    
    const components = groupForest(graph, parentCount, allNodes);
    
    const hierarchies = [];
    for (const comp of components) {
        const treeInfo = analyzeTree(comp.root, graph, comp.componentNodes);
        hierarchies.push(treeInfo);
    }
    
    const summary = makeSummary(hierarchies);
    
    const responsePayload = {
        "user_id": "akshathsenthilkumar_31052005",
        "email_id": "as8308@srmait.edu.in",
        "college_roll_number": "RA2311056010175",
        "hierarchies": hierarchies,
        "invalid_entries": invalidBucket,
        "duplicate_edges": dupBucket,
        "summary": summary
    };
    
    return res.json(responsePayload);
});

// handles the GET request for operation_code
router.get('/', (req, res) => {
    return res.status(200).json({ "operation_code": 1 });
});

export default router;
