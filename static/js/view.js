const CARDS_CONTAINER = document.querySelector("#drampCards");
const ERRORS_CONSOLE = document.querySelector("#errorsConsole");

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
            link.href= "#";
            img.src = "static/icons/fasta.png";
            img.alt = "fasta-icon";
            linkText.textContent = "FASTA";
            break;
        }
        case "pdb": {
            link.href = "";
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
            linkText.textContent = "3D MODEL IMAGE";
            break;
        }
    }

    return link;
};

const ACTIVITY_TO_CSS_CLASS = ["otherActivity", "antiGramPositive", "antiGramNegative", "bothActivities"];

const generateDRAMPCard = (drampID, pepID) => {
    const drampCard = document.createElement("span");
    drampCard.classList.add("drampCard");
    
    const activity = PEP_TO_ACTIVITY[pepID];
    console.log(activity);
    drampCard.classList.add(ACTIVITY_TO_CSS_CLASS[activity]);

    const img = document.createElement("img");
    img.className = "peptideImage";
    img.src = `static/peptides/images/Pep${pepID}.png`;
    drampCard.appendChild(img);

    const drampHeading = document.createElement("h3");
    drampHeading.textContent = `Pep${pepID} | DRAMP${drampID}`;
    drampCard.appendChild(drampHeading);

    const drampLinks = document.createElement("span");
    drampLinks.className = "drampLinks";
    drampCard.appendChild(drampLinks);

    drampLinks.appendChild(generateDRAMPLink(pepID, "fasta"));
    drampLinks.appendChild(generateDRAMPLink(pepID, "pdb"));
    drampLinks.appendChild(generateDRAMPLink(pepID, "model"));

    return drampCard;
};

const showResults = (resultSet) => {
	CARDS_CONTAINER.textContent = "";

    for (const result of resultSet) {
        console.log(result);
        const card = generateDRAMPCard(result["drampID"], result["pepID"]);
        CARDS_CONTAINER.appendChild(card);
    }
};

const generateErrorCard = (error) => {
    const card = document.createElement("span");
    card.className = "errorCard";
    card.innerText = error;
    return card;
}

const showErrors = (errors) => {
    ERRORS_CONSOLE.textContent = '';

    for (const error of errors) {
        ERRORS_CONSOLE.appendChild(generateErrorCard(error));
    }
};

let errorDisplayTimer;

const triggerSearch = () => {
    clearTimeout(errorDisplayTimer);

	const response = search(searchBox.value.toUpperCase());
	showResults(response["resultSet"]);

    errorDisplayTimer = setTimeout(() => showErrors(response["errors"]), 750);
};

const searchBox = document.querySelector("#searchBox");
searchBox.oninput = triggerSearch;

triggerSearch();