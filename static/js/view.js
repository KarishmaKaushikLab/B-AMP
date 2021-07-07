const CARDS_CONTAINER = document.querySelector("#drampCards");
const ERRORS_CONSOLE = document.querySelector("#errorsConsole");
const RESULTS_COUNT = document.querySelector("#resultsCount");
const HELP_OVERLAY = document.querySelector("#helpOverlay");
const TOGGLE_HELP_BUTTON = document.querySelector("#toggleHelpButton");

const ERROR_DELAY_MS = 400;

const generateDRAMPLink = (pepID, linkType) => {
	const link = document.createElement("a");
	link.className = "drampLink";

	const img = document.createElement("img");
	img.className = "drampLinkIcon";
	link.appendChild(img);

	const linkText = document.createTextNode("");
	link.appendChild(linkText);

	switch (linkType) {
		case "fasta": {
			link.href = `static/peptides/fasta/Pep${pepID}.fasta`;
			link.download = `Pep${pepID}.fasta`;
			img.src = "static/icons/fasta.png";
			img.alt = "fasta-icon";
			linkText.textContent = "FASTA";
			break;
		}
		case "pdb": {
			link.href = `static/peptides/pdb/Pep${pepID}.pdb`;
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "PDB";
			break;
		}
		case "model": {
			link.href = `static/peptides/images/Pep${pepID}.png`;
			link.download = `Pep${pepID}.png`;
			img.src = "static/icons/camera.png";
			img.alt = "camera-icon";
			linkText.textContent = "3D MODEL";
			break;
		}
	}

	return link;
};

const ACTIVITY_TO_CSS_CLASS = [
	"otherActivity",
	"antiGramPositive",
	"antiGramNegative",
	"bothActivities",
];

const generateDRAMPCard = (drampID, pepID) => {
	const drampCard = document.createElement("span");
	drampCard.classList.add("drampCard");

	const activity = PEP_TO_ACTIVITY_AND_NAME[pepID][0];
	drampCard.classList.add(ACTIVITY_TO_CSS_CLASS[activity]);

	const drampHeading = document.createElement("h3");
	drampHeading.textContent = `Pep${pepID} · DRAMP${drampID}`;
	drampCard.appendChild(drampHeading);

	const pepName = document.createElement("h2");
	pepName.textContent = PEP_TO_ACTIVITY_AND_NAME[pepID][1];
	pepName.className = "pepName";
	drampCard.appendChild(pepName);

	const img = document.createElement("img");
	img.className = "peptideImage";
	img.src = `static/peptides/thumbs/Pep${pepID}.png`;
	drampCard.appendChild(img);

	const drampLinks = document.createElement("span");
	drampLinks.className = "drampLinks";
	drampCard.appendChild(drampLinks);

	drampLinks.appendChild(generateDRAMPLink(pepID, "fasta"));
	drampLinks.appendChild(generateDRAMPLink(pepID, "pdb"));
	drampLinks.appendChild(generateDRAMPLink(pepID, "model"));

	return drampCard;
};

const renderCards = (results) => {
	CARDS_CONTAINER.textContent = "";

	for (const result of results) {
		const card = generateDRAMPCard(result["drampID"], result["pepID"]);
		CARDS_CONTAINER.appendChild(card);
	}
};

const showResultsStats = (resultSet) => {
	if (resultSet.length > 0) {
		RESULTS_COUNT.style.visibility = "";
		RESULTS_COUNT.innerText = `${resultSet.length} peptide${
			resultSet.length === 1 ? "" : "s"
		} found`;
	} else RESULTS_COUNT.style.visibility = "hidden";
};

const generateErrorCard = (error) => {
	const card = document.createElement("span");
	card.className = "errorCard";
	card.innerText = error;
	return card;
};

const showErrors = (errors) => {
	ERRORS_CONSOLE.textContent = "";

	for (const error of errors) {
		ERRORS_CONSOLE.appendChild(generateErrorCard(error));
	}
};

const getEnv = () => {
	const currentPage = document.querySelector("#currentPage");
	return {
		"All Peptides": "all",
		"Anti-Gram Positive Peptides": "ag+",
		"Docked Peptides": "docked",
	}[currentPage.textContent];
};

let errorDisplayTimer;
const env = getEnv();

const triggerSearch = () => {
	clearTimeout(errorDisplayTimer);

	const response = search(searchBox.value.toUpperCase(), env);
	showResultsStats(response["resultSet"]);
	renderCards(paginate(response["resultSet"]));

	if (
		response["resultSet"].length === 0 &&
		searchBox.value !== "" &&
		response["errors"].length === 0
	)
		response["errors"].push("No results found");

	errorDisplayTimer = setTimeout(() => showErrors(response["errors"]), ERROR_DELAY_MS);

	togglePageNavButtonsVisibility();
};

const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

const togglePageNavButtonsVisibility = () => {
	prevButton.style.visibility = isFirstPage() ? "hidden" : "";
	nextButton.style.visibility = isLastPage() ? "hidden" : "";
};

const renderNext = () => {
	const nextPage = next();
	if (nextPage === null) return;

	renderCards(nextPage);
	window.scrollTo(0, 0);

	togglePageNavButtonsVisibility();
};

const renderPrev = () => {
	const prevPage = prev();
	if (prevPage === null) return;

	renderCards(prevPage);
	window.scrollTo(0, 0);

	togglePageNavButtonsVisibility();
};

const showHelpOverlay = () => {
	HELP_OVERLAY.style.display = "flex";
	TOGGLE_HELP_BUTTON.innerHTML = "✕ CLOSE HELP";
	TOGGLE_HELP_BUTTON.removeEventListener("click", showHelpOverlay);
	TOGGLE_HELP_BUTTON.addEventListener("click", hideHelpOverlay);
};

const hideHelpOverlay = () => {
	HELP_OVERLAY.style.display = "none";
	TOGGLE_HELP_BUTTON.innerHTML = "💡 SHOW HELP";
	TOGGLE_HELP_BUTTON.removeEventListener("click", hideHelpOverlay);
	TOGGLE_HELP_BUTTON.addEventListener("click", showHelpOverlay);
};

const getPermalink = () => {
	const url = new URL(window.location);
	return url.searchParams.get("pepid");
};

const main = () => {
	const searchBox = document.querySelector("#searchBox");
	searchBox.oninput = triggerSearch;

	const permalink = getPermalink();
	if (permalink) {
		searchBox.value = `PEP${permalink}`;

		const searchSection = document.querySelector("#search");
		searchSection.style.display = "none";

		const resultsCount = document.querySelector("#resultsCount");
		resultsCount.style.display = "none";
	}
};

main();
triggerSearch();
