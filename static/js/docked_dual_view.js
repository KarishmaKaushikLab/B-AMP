const CARDS_CONTAINER = document.querySelector("#drampCards");
const HELP_OVERLAY = document.querySelector("#helpOverlay");
const TOGGLE_HELP_BUTTON = document.querySelector("#toggleHelpButton");

const ACTIVITY_TO_CSS_CLASS = [
	"otherActivity",
	"antiGramPositive",
	"antiGramNegative",
	"bothActivities",
];

const generateDRAMPLink = (pepID, linkType) => {
	const link = document.createElement("a");
	link.className = "drampLink";

	const img = document.createElement("img");
	img.className = "drampLinkIcon";
	link.appendChild(img);

	const linkText = document.createTextNode("");
	link.appendChild(linkText);

	let linkRelativePath;

	switch (linkType) {
		case "pdbqt_in": {
			linkRelativePath = `static/peptides/docked_dual/pdbqt/Pep${pepID}.pdbqt`;
			link.download = `Pep${pepID}_In.pdbqt`;
			link.target = "_blank";
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "PDBQT IN";
			break;
		}
		case "pdb_tar1": {
			linkRelativePath = `static/peptides/docked_dual/pdb/docked_to_tar1/Pep${pepID}_docked.pdb`;
			link.download = `Pep${pepID}_docked_to_tar1.pdb`;
			link.target = "_blank";
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "DOCKED PDB";
			break;
		}
		case "pdb_tar37": {
			linkRelativePath = `static/peptides/docked_dual/pdb/docked_to_tar37/Pep${pepID}_docked.pdb`;
			link.download = `Pep${pepID}_docked_to_tar37.pdb`;
			link.target = "_blank";
			img.src = "static/icons/download.png";
			img.alt = "download-icon";
			linkText.textContent = "DOCKED PDB";
			break;
		}
	}

	link.href = linkRelativePath;

	link.addEventListener("click", () => {
		window.goatcounter.count({
			path: linkRelativePath,
			title: `(DOWNLOAD ${linkText.textContent}) Pep${pepID}`,
			event: true,
		});
	});

	return link;
};

const generateDockedCard = (drampID, pepID, docked_to) => {
	const dockedCard = document.createElement("span");
	dockedCard.classList.add("pepCard");
	dockedCard.classList.add("dockedCard");

	const activity = PEP_TO_ACTIVITY_AND_NAME[pepID][0];
	dockedCard.classList.add(ACTIVITY_TO_CSS_CLASS[activity]);

	const img = document.createElement("img");
	img.className = "dockedImage";
	img.src = `static/peptides/docked_dual/thumbs/tar`+docked_to+`/Pep${pepID}.png`;
	img.loading = "lazy";
	dockedCard.appendChild(img);

	const infoContainer = document.createElement("section");
	infoContainer.className = "infoContainer";
	dockedCard.appendChild(infoContainer);

	const horizontalContainer = document.createElement("span");
	horizontalContainer.className = "horizontalContainer";
	infoContainer.appendChild(horizontalContainer);

	const nameContainer = document.createElement("span");
	nameContainer.className = "nameContainer";
	horizontalContainer.appendChild(nameContainer);

	const drampHeading = document.createElement("h3");
	drampHeading.textContent = drampID ? `Pep${pepID} · DRAMP${drampID} - docked to Target` + docked_to : `Pep${pepID} docked to Target` + docked_to;
	nameContainer.appendChild(drampHeading);

	const pepName = document.createElement("h2");
	pepName.textContent = PEP_TO_ACTIVITY_AND_NAME[pepID][1];
	pepName.className = "pepName";
	nameContainer.appendChild(pepName);

	const dockingEnergy = document.createElement("h2");
	dockingEnergy.textContent = `${PEP_TO_DOCKING_DUAL_SCORE[pepID][docked_to]} kcal/mol`;
	dockingEnergy.className = "dockingEnergy";
	horizontalContainer.appendChild(dockingEnergy);

	const drampLinks = document.createElement("span");
	drampLinks.className = "drampLinks";
	infoContainer.appendChild(drampLinks);

	drampLinks.appendChild(generateDRAMPLink(pepID, "pdbqt_in"));
	drampLinks.appendChild(generateDRAMPLink(pepID, "pdb_tar" + docked_to));

	return dockedCard;
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


const renderIsland = (peptide) => {

	const island = document.createElement("span");
	island.className = "island";
	island.id = `island-${peptide}`;

	const islandHeading = document.createElement("h1");
	islandHeading.style.backgroundColor = "#461868";
	islandHeading.style.color = "white";
	var diff = PEP_TO_DOCKING_DUAL_SCORE[peptide]['diff'];
	islandHeading.textContent = `Peptide ${peptide} (Difference in binding energies = ${diff} kcal/mol)`;
	islandHeading.className = "dockedDualHeading"
	island.appendChild(islandHeading);

	const islandCardContainer = document.createElement("span");
	islandCardContainer.className = "islandCardContainer";
	island.appendChild(islandCardContainer);
	
	const card1 = generateDockedCard(PEP_TO_DRAMP[peptide], peptide, "1");
	islandCardContainer.appendChild(card1);
	const card37 = generateDockedCard(PEP_TO_DRAMP[peptide], peptide, "37");
	islandCardContainer.appendChild(card37);

	CARDS_CONTAINER.appendChild(island);
};

peps = ['4975', '5241', '4710', '1217', '5037', '5193', '169', '2533', '3961', '4707', '783', '167', '2896', '662', '3239', '4709', '4842', '3292', '3052', '407', '3240', '69', '2530', '5057', '5488'];
const main = () => {
	for (const pep of peps) {
		renderIsland(pep);
	};
};

main();