const CARDS_CONTAINER = document.querySelector("#drampCards");
const JUMP_LIST = document.querySelector("#jumpList");

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

	switch (linkType) {
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

const generateDockedCard = (drampID, pepID) => {
	const dockedCard = document.createElement("span");
	dockedCard.classList.add("pepCard");
	dockedCard.classList.add("dockedCard");

	const activity = PEP_TO_ACTIVITY_AND_NAME[pepID][0];
	dockedCard.classList.add(ACTIVITY_TO_CSS_CLASS[activity]);

	const img = document.createElement("img");
	img.className = "dockedImage";
	img.src = `static/peptides/docked/thumbs/Pep${pepID}.png`;
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
	drampHeading.textContent = drampID ? `Pep${pepID} · DRAMP${drampID}` : `Pep${pepID}`;
	nameContainer.appendChild(drampHeading);

	const pepName = document.createElement("h2");
	pepName.textContent = PEP_TO_ACTIVITY_AND_NAME[pepID][1];
	pepName.className = "pepName";
	nameContainer.appendChild(pepName);

	const dockingEnergy = document.createElement("h2");
	dockingEnergy.textContent = `${PEP_TO_DOCKING_SCORE[pepID]} kJ/mol`;
	dockingEnergy.className = "dockingEnergy";
	horizontalContainer.appendChild(dockingEnergy);

	const drampLinks = document.createElement("span");
	drampLinks.className = "drampLinks";
	infoContainer.appendChild(drampLinks);

	drampLinks.appendChild(generateDRAMPLink(pepID, "pdbqt_in"));
	drampLinks.appendChild(generateDRAMPLink(pepID, "pdbqt_out"));
	drampLinks.appendChild(generateDRAMPLink(pepID, "docked_model"));
	drampLinks.appendChild(generateDRAMPLink(pepID, "bond_info"));

	return dockedCard;
};

const DOCKING_SCORE_TO_COLOR_CODE = [
	"red",
	"green",
	"#cfde0d",
	"#1a91db",
	"#e75480",
	"purple",
	"orange",
	"black",
	"olive",
	"grey",
	"#c4a01d",
	"teal",
];

const DOCKED_PEPTIDES_BY_SCORE = {
	0: [993],
	1: [3309, 5236, 5493],
	2: [167, 2534, 5500, 994],
	3: [1086, 1088, 187, 3469, 3470, 4819, 4933, 5235, 5238, 5242, 5243, 5486, 5488, 5495, 995],
	4: [115, 49],
	5: [1089, 109, 2533, 3052, 3983, 50, 5481],
	6: [113, 1326, 5240, 5245, 72],
	7: [26, 3349, 4844, 4886, 5484, 5490, 5498, 88],
	8: [
		1005, 1087, 1219, 1245, 168, 2442, 3059, 3219, 3239, 3240, 3292, 3296, 3297, 3298, 3308,
		3366, 3461, 3475, 4020, 4674, 4709, 4710, 4932, 51, 5241, 5244, 5363, 5483, 5485, 5487,
		5489, 5491, 5492, 5497, 5499, 5501, 5502, 5505, 5509, 696, 782, 996,
	],
	9: [1218, 4708, 4931, 4934, 5482, 5508],
	10: [1437, 4021, 4583, 4707, 4785, 5494, 5496],
	11: [1],
};

const sortByDockingScore = () => {
	for (let score = 0; score <= 10; score++) {
		let peps = DOCKED_PEPTIDES_BY_SCORE[score];

		peps.sort((pepA, pepB) => {
			const scoreA = PEP_TO_DOCKING_SCORE[pepA];
			const scoreB = PEP_TO_DOCKING_SCORE[pepB];

			if (scoreB > scoreA) return 1;

			return 0;
		});
	}
};

const renderIsland = (score) => {
	const peps = DOCKED_PEPTIDES_BY_SCORE[score];

	const island = document.createElement("span");
	island.className = "island";
	island.id = `score-${score}`;

	const islandHeading = document.createElement("h1");
	islandHeading.style = `background-color: ${DOCKING_SCORE_TO_COLOR_CODE[score]}`;
	islandHeading.textContent = score === 11 ? "Standard" : `Score ${score}`;
	island.appendChild(islandHeading);

	const islandCardContainer = document.createElement("span");
	islandCardContainer.className = "islandCardContainer";
	island.appendChild(islandCardContainer);

	for (const pep of peps) {
		const card = generateDockedCard(PEP_TO_DRAMP[pep], pep);
		islandCardContainer.appendChild(card);
	}

	CARDS_CONTAINER.appendChild(island);
};

const addJumpListItem = (score) => {
	const li = document.createElement("li");
	li.className = "jumpListItem";
	li.style = `background-color: ${DOCKING_SCORE_TO_COLOR_CODE[score]}`;

	const jumpLink = document.createElement("a");
	jumpLink.textContent = score === 11 ? "Standard" : `Score ${score}`;
	jumpLink.href = `#score-${score}`;
	li.appendChild(jumpLink);

	JUMP_LIST.appendChild(li);
};

const main = () => {
	sortByDockingScore();

	for (let score = 11; score >= 0; score--) {
		renderIsland(score);
		addJumpListItem(score);
	}
};

main();
