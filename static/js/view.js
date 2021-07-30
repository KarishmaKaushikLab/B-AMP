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
		case "sortase_fasta": {
			link.href = "static/sortase/M_Ala_Sortase.fasta";
			link.download = "M_Ala_Sortase.fasta";
			img.src = "static/icons/fasta.png";
			img.alt = "fasta-icon";
			linkText.textContent = "FASTA";
			break;
		}
		case "pdb": {
			link.href = `static/peptides/pdb/Pep${pepID}.pdb`;
			link.download = `Pep${pepID}.pdb`;
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
		case "sortase_model": {
			link.href = "static/sortase/M_Ala_Sortase.png";
			link.download = "M_Ala_Sortase.png";
			img.src = "static/icons/camera.png";
			img.alt = "camera-icon";
			linkText.textContent = "3D MODEL";
			break;
		}
		case "docked_model": {
			link.href = `static/peptides/docked/images/Pep${pepID}.png`;
			link.download = `Pep${pepID}.png`;
			img.src = "static/icons/camera.png";
			img.alt = "camera-icon";
			linkText.textContent = "3D MODEL";
			break;
		}
		case "sortase_pdbqt": {
			link.href = `static/sortase/M_Ala_Sortase.pdbqt`;
			link.download = `M_Ala_Sortase.pdbqt`;
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "PDBQT";
			break;
		}
		case "pdbqt_in": {
			link.href = `static/peptides/docked/pdbqt/input/Pep${pepID}.pdbqt`;
			link.download = `Pep${pepID}_In.pdbqt`;
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "PDBQT IN";
			break;
		}
		case "pdbqt_out": {
			link.href = `static/peptides/docked/pdbqt/output/Pep${pepID}.pdbqt`;
			link.download = `Pep${pepID}_Out.pdbqt`;
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "PDBQT OUT";
			break;
		}
		case "bond_info": {
			link.href = `static/peptides/docked/bond_info/Pep${pepID}.txt`;
			link.download = `Pep${pepID}_BondInfo.txt`;
			img.src = "static/icons/info.png";
			img.alt = "info-icon";
			linkText.textContent = "BOND INFO";
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
	drampCard.classList.add("pepCard");
	drampCard.classList.add("drampCard");

	const activity = PEP_TO_ACTIVITY_AND_NAME[pepID][0];
	drampCard.classList.add(ACTIVITY_TO_CSS_CLASS[activity]);

	const drampHeading = document.createElement("h3");
	drampHeading.textContent = drampID ? `Pep${pepID} · DRAMP${drampID}` : `Pep${pepID}`;
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

const generateSortaseCard = () => {
	const dockedCard = document.createElement("span");
	dockedCard.classList.add("pepCard");
	dockedCard.classList.add("dockedCard");
	dockedCard.id = "sortaseCard";

	const img = document.createElement("img");
	img.className = "dockedImage";
	img.src = "static/sortase/M_Ala_Sortase_Thumb.png"; // TODO: Replace with thumbnail
	dockedCard.appendChild(img);

	const infoContainer = document.createElement("section");
	infoContainer.className = "infoContainer";
	dockedCard.appendChild(infoContainer);

	const drampHeading = document.createElement("h3");
	drampHeading.innerHTML =
		"Mutated Class C Sortase in semi-open conformation of <i>Corynebacterium striatum</i>";
	infoContainer.appendChild(drampHeading);

	const drampLinks = document.createElement("span");
	drampLinks.className = "drampLinks";
	infoContainer.appendChild(drampLinks);

	drampLinks.appendChild(generateDRAMPLink(-1, "sortase_fasta"));
	drampLinks.appendChild(generateDRAMPLink(-1, "sortase_pdbqt"));
	drampLinks.appendChild(generateDRAMPLink(-1, "sortase_model"));

	return dockedCard;
};

const renderCards = (results) => {
	CARDS_CONTAINER.textContent = "";

	for (const result of results) {
		let card;

		if (env === "docked") {
			card = generateDockedCard(result["drampID"], result["pepID"]);
		} else {
			card = generateDRAMPCard(result["drampID"], result["pepID"]);
		}
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
	const permalink = getPermalink();
	if (permalink === "sortase") {
		return;
	}

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
	return url.searchParams.get("pep");
};

const enablePreviewMode = (permalink) => {
	const helpBubble = document.querySelector(".helpBubble");
	helpBubble.style.display = "none";

	const searchSection = document.querySelector("#search");
	searchSection.style.display = "none";

	const resultsCount = document.querySelector("#resultsCount");
	resultsCount.style.display = "none";

	const navLinksSection = document.querySelector("#navLinksSection");
	const linkToHome = document.createElement("a");
	linkToHome.href = "/";

	const homeHeading = document.createElement("h3");
	homeHeading.innerText = "Home";
	linkToHome.appendChild(homeHeading);

	navLinksSection.innerHTML = "";
	navLinksSection.appendChild(linkToHome);

	const previewHeading = document.createElement("h3");
	previewHeading.innerHTML = "Pep View";
	navLinksSection.appendChild(previewHeading);

	togglePageNavButtonsVisibility();

	if (permalink === "sortase") {
		const card = generateSortaseCard();
		CARDS_CONTAINER.appendChild(card);
		document.title = "Class C Sortase | Pep View | AMP-R";
	} else {
		searchBox.value = `PEP${permalink}`;
		document.title = `Pep${permalink} | Pep View | AMP-R`;
	}
};

const main = () => {
	const searchBox = document.querySelector("#searchBox");
	searchBox.oninput = triggerSearch;

	const permalink = getPermalink();
	if (permalink) {
		enablePreviewMode(permalink);
	}
};

main();
triggerSearch();
