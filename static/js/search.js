/*
SEARCH ENGINE

The search here is entirely in-browser. We just break down the query and perform
a search against a pre-built index.

===========================================================================================

QUERY SYNTAX:

- A peptide can be queried using either one of its identifiers. An identifier is either a peptide's
  DRAMP ID or PEP ID.
	Example #1: PEP1217
	Example #2: DRAMP01472

- Multiple peptides can be queried at once by separating their identifiers using commas.
	Example: DRAMP01472, PEP1217

- A range of peptides can be queried by specifying the its PEP ID followed by the
  starting and ending (inclusive) index separated by a hyphen. Range queries are NOT
  allowed on DRAMP IDs since they are not sequential.
	Example: PEP120-125

- Multiple range queries can be made at a time by separating them with commas.
	Example: PEP120-125

NOTE: Only legal characters in query are the words "DRAMP", "PEP", 0-9, hyphens, commas and spaces.

===========================================================================================

QUERY ALGORITHM:

- Split up the query based on commas.
- Strip whitespace on each query item.
- resultSet = []
- for queryItem in queryItems
	- Check if query item begins with DRAMP or PEP.
		- Stop processing query item if not.
	- if queryItem starts with DRAMP:
		- if queryItem contains hyphen
			- Stop processing queryItem
		- get PEP ID from selected[1] DRAMP_TO_PEP index
  
		- add PEP ID to resultSet
- Create cards based on PEP IDs in resultSet


[1]: selected index depends on the page that user is viewing since each page represents a different set of peptides

*/

const verifyResult = (resultItem) => {
	return !(resultItem["drampID"] === undefined || resultItem["pepID"] === undefined);
};

const verifyRangeIndices = (indices) => {
	for (const index of indices) {
		if (index == "") return false;
	}

	return true;
};

const DOCKED_PEPS = new Set();

const generateDockedPepsSet = () => {
	const dockedPepsList = [
		26, 49, 50, 51, 72, 88, 109, 113, 115, 167, 168, 187, 696, 782, 993,
		994, 995, 996, 1005, 1086, 1087, 1088, 1089, 1218, 1219, 1245, 1326,
		1437, 2442, 2533, 2534, 3052, 3059, 3219, 3239, 3240, 3292, 3296, 3297,
		3298, 3308, 3309, 3349, 3366, 3461, 3469, 3470, 3475, 3983, 4020, 4021,
		4583, 4674, 4707, 4708, 4709, 4710, 4785, 4819, 4844, 4886, 4931, 4932,
		4933, 4934, 5235, 5236, 5238, 5240, 5241, 5242, 5243, 5244, 5245, 5363,
		5481, 5482, 5483, 5484, 5485, 5486, 5487, 5488, 5489, 5490, 5491, 5492,
		5493, 5494, 5495, 5496, 5497, 5498, 5499, 5500, 5501, 5502, 5505, 5508, 5509
	];

	for (const dockedPep of dockedPepsList) {
		DOCKED_PEPS.add(dockedPep);
	}
};

const isDocked = (pepID) => DOCKED_PEPS.has(pepID);

const search = (query, env) => {
	const queryItems = query.split(",").map((e) => e.trim());

	const resultSet = [];
	const errors = [];

	const addToResultSet = (resultItem) => {
		if (!verifyResult(resultItem)) return;

		if (env === "ag+") {
			const pepActivity = PEP_TO_ACTIVITY_AND_NAME[resultItem["pepID"]][0];
			if (!(pepActivity === 1 || pepActivity === 3)) return;
		} else if (env === "docked" && !isDocked(resultItem["pepID"])) {
			return;
		}

		resultSet.push(resultItem);
	};

	for (const queryItem of queryItems) {
		if (queryItem === "") continue;

		if (queryItem.startsWith("DRAMP") && queryItem.length > 5) {
			const drampID = queryItem.substring(5);
			const indices = drampID.split("-");

			if (indices.length > 1) {
				errors.push(`Range queries not allowed on DRAMP IDs: ${queryItem}`);
				continue;
			}

			const resultItem = {
				drampID: drampID,
				pepID: DRAMP_TO_PEP[drampID],
			};

			addToResultSet(resultItem);
		} else if (queryItem.startsWith("PEP") && queryItem.length > 3) {
			const subQueryItem = queryItem.substring(3);
			const indices = subQueryItem.split("-");

			if (!verifyRangeIndices(indices)) {
				errors.push(`Invalid range query: ${queryItem}`);
			}

			switch (indices.length) {
				case 1: {
					const resultItem = {
						drampID: PEP_TO_DRAMP[subQueryItem.toString()],
						pepID: parseInt(subQueryItem),
					};

					addToResultSet(resultItem);
					break;
				}
				case 2: {
					const startIndex = parseInt(indices[0]);
					const endIndex = parseInt(indices[1]);

					if (startIndex >= endIndex) {
						errors.push(
							`Invalid range query, end index should be greater than start index: ${queryItem}`
						);
						continue;
					}

					for (let i = startIndex; i <= endIndex; i++) {
						const resultItem = {
							drampID: PEP_TO_DRAMP[i],
							pepID: i,
						};

						addToResultSet(resultItem);
					}

					break;
				}
				default: {
					// Invalid range query
					errors.push(`Invalid range query: ${queryItem}`);
				}
			}
		} else {
			const peps = TEXT_TO_PEP[queryItem.toLowerCase()];

			if (peps === undefined) return;

			for (const pep of peps) {
				const resultItem = {
					pepID: pep,
					drampID: PEP_TO_DRAMP[pep]
				};

				addToResultSet(resultItem);
			}
		}
	}

	return {
		resultSet: resultSet,
		errors: errors,
	};
};

generateDockedPepsSet();