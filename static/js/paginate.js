const PAGE_SIZE = 50;

let RESULTS = [];
let CURRENT_PAGE = -1;

const paginate = (results) => {
	RESULTS = results;
	CURRENT_PAGE = -1;

	return next();
};

const next = () => {
	if ((CURRENT_PAGE + 1) * PAGE_SIZE < RESULTS.length) CURRENT_PAGE++;
	return RESULTS.slice(CURRENT_PAGE * PAGE_SIZE, (CURRENT_PAGE + 1) * PAGE_SIZE);
};

const prev = () => {
	if (CURRENT_PAGE > 0) CURRENT_PAGE--;

	return RESULTS.slice(CURRENT_PAGE * PAGE_SIZE, (CURRENT_PAGE + 1) * PAGE_SIZE);
};
