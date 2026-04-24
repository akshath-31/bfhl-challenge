// filters raw edge strings into valid pairs and malformed entries
export function filterEntries(rawList) {
    const validEdges = [];
    const invalidBucket = [];

    if (!Array.isArray(rawList)) return { validEdges, invalidBucket };

    for (const item of rawList) {
        if (typeof item !== 'string') {
            invalidBucket.push(item);
            continue;
        }

        const trimmedVal = item.trim();
        const matchResult = trimmedVal.match(/^([A-Z])->([A-Z])$/);

        if (matchResult) {
            const leftNode = matchResult[1];
            const rightNode = matchResult[2];

            if (leftNode === rightNode) {
                invalidBucket.push(trimmedVal);
            } else {
                validEdges.push({ source: leftNode, target: rightNode, original: trimmedVal });
            }
        } else {
            invalidBucket.push(trimmedVal);
        }
    }

    return { validEdges, invalidBucket };
}
