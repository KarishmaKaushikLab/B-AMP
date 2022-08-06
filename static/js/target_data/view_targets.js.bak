const RESULTS_COUNT = document.querySelector("#resultsCount");
const CARDS_CONTAINER = document.querySelector("#tarCards");
const HELP_OVERLAY = document.querySelector("#helpOverlay");
const TOGGLE_HELP_BUTTON = document.querySelector("#toggleHelpButton");
const ERRORS_CONSOLE = document.querySelector("#errorsConsole");
const ACTIVITY_FILTER = document.querySelector("#filter-activity");
const ORGANISM_FILTER = document.querySelector("#filter-organisms");
const FILTER_BUBBLE = $("#filters");
const DATA_LINKS = $("#data-links");
const TARID_SET = JSON.parse(tarids);
const MODEL_IDS = JSON.parse(modelids);

const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

//Page navigation button visibility function - start
const togglePageNavButtonsVisibility = () => {
	prevButton.style.visibility = isFirstPage() ? "hidden" : "";
	nextButton.style.visibility = isLastPage() ? "hidden" : "";
};
//end

const renderNext = () => {
	const nextPage = next();
	if (nextPage === null) return;

	queryToCard(nextPage);
	window.scrollTo(0, 0);

	togglePageNavButtonsVisibility();
};

const renderPrev = () => {
	const prevPage = prev();
	if (prevPage === null) return;

	queryToCard(prevPage);
	window.scrollTo(0, 0);

	togglePageNavButtonsVisibility();
};

const generateTARLink = (tarID, linkType) => {
	const link = document.createElement("a");
	link.className = "drampLink";

	const img = document.createElement("img");
	img.className = "drampLinkIcon";
	link.appendChild(img);

	const linkText = document.createTextNode("");
	link.appendChild(linkText);

	let linkRelativePath;

	switch (linkType) {
		case "uniprot": {
			linkText.textContent="UniProt";
			linkRelativePath=TARID_SET[tarID]['uniprot_id']
			link.target= "_blank";
			img.src = "static/icons/uniprot.png";
			img.alt = "uniprot-icon";
			break;
		}
		
		case "pubmed": {
			linkText.textContent="PubMed";
			linkRelativePath= "https://pubmed.ncbi.nlm.nih.gov/?term=" + TARID_SET[tarID]['pubmed_id'].join('+')
			link.target= "_blank";
			img.src = "static/icons/ncbi_2.png";
			img.alt = "pubmed-icon";
			break;
			}
		
		case "pdb": {
			linkText.textContent="PDB";
			linkRelativePath=TARID_SET[tarID]['pdb_link']
			link.target= "_blank";
			img.src = "static/icons/pdb_icon.png";
			img.alt = "pdb-icon";
			img.style.width = "30px";
			img.style.height = "30px";
			img.style.position = "relative";
			img.style.top = "8px";
			break;
			}
			
		case "model": {
			linkText.textContent="Model";
			linkRelativePath=`static/targets/RFmodels/`+tarID+`.pdb`;
			link.target= "_blank";
			img.src = "static/icons/RF.png";
			img.alt = "RoseTTAFmodel-icon";
			img.style.width = "28px";
			img.style.height = "28px";
			img.style.position = "relative";
			img.style.top = "8px";
			break;
			}
		}

	link.href = linkRelativePath;
	return link;
};

//Generating the TARGET card - start
const generateTarCard = (tarid) => {
	const tarCard = document.createElement("span");
	tarCard.classList.add("tarCard");

	const tarHeading = document.createElement("h3");
	tarHeading.textContent = "Target"+tarid;
	tarCard.appendChild(tarHeading);

	const tarName = document.createElement("h2");
	tarName.textContent = TARID_SET[tarid]['name'];
	tarName.className = "tarName";
	tarCard.appendChild(tarName);

	const tarOrgName = document.createElement("h2");
	tarOrgName.textContent = TARID_SET[tarid]['src_org'];
	tarOrgName.className = "tarOrgName";
	tarCard.appendChild(tarOrgName);

	const tarActivity = document.createElement("h2");
	tarActivity.textContent = TARID_SET[tarid]['activity'];
	tarActivity.className = "tarActivity";
	tarCard.appendChild(tarActivity);
	
	const classification = TARID_SET[tarid]['activity'].split(' ').filter(item => !['/'].includes(item)).join('_');
	tarCard.classList.add(classification);
	
	const tarLinks = document.createElement("span");
	tarLinks.className = "drampLinks";

	tarLinks.appendChild(generateTARLink(tarid, "uniprot"));
	tarLinks.appendChild(generateTARLink(tarid, "pubmed"));
	
	if (parseInt(tarid)<=102)
	{
		const img = document.createElement("img");
		img.className = "peptideImage";
		img.src = `static/targets/thumbs/`+tarid+`.png`;
		tarCard.appendChild(img);
		tarLinks.appendChild(generateTARLink(tarid, "pdb"));
	}
	 
	else if (MODEL_IDS.includes(parseInt(tarid)))
	{
		const img = document.createElement("img");
		img.className = "peptideImage";
		img.src = `static/targets/RFmodelThumbs/`+tarid+`.png`;
		tarCard.appendChild(img);
		tarLinks.appendChild(generateTARLink(tarid, "model"));
	}
	
	else
	{	
		const img = document.createElement("img");
		img.className = "peptideImage";
		img.src = `static/images/struct_not_available_2.png`;
		tarCard.appendChild(img);
	}
	
	tarCard.appendChild(tarLinks);
	return tarCard;
};
//End


//Result stats function - start 
const showResultsStats = (resultSet) => {
	if (resultSet.length > 0) {
		RESULTS_COUNT.style.visibility = "";
		RESULTS_COUNT.innerText = `${resultSet.length} target${
			resultSet.length === 1 ? "" : "s"
		} found`;
	} else RESULTS_COUNT.style.visibility = "hidden";
};
//End


//Toggle help functions - start
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
//End


//Error handling functions - start
const generateErrorCard = (error) => {
	const card = document.createElement("span");
	card.className = "errorCard";
	card.innerText = error;
	return card;
};

const showErrors = () => {
	ERRORS_CONSOLE.textContent = "";
	RESULTS_COUNT.textContent = "";
	RESULTS_COUNT.style.visibility = "hidden";
	ERRORS_CONSOLE.appendChild(generateErrorCard("No results found"));
};
//End 

//Checking for empty input field
const checkEmpty = () => {
	if($('#searchBox').val() === "")
	{	
		CARDS_CONTAINER.textContent = "";
		ERRORS_CONSOLE.textContent = "";
		RESULTS_COUNT.textContent = "";
		RESULTS_COUNT.style.visibility = "hidden";				
		DATA_LINKS.show();
		FILTER_BUBBLE.hide();
	}
}
//End


//Function to add filters - start
const addFilters = (filter_vals,section) => {
		option = document.createElement("option");
		option.value = Object.values(filter_vals).join();
		option.innerHTML = "Choose filter";
		option.selected = true; 
		section.appendChild(option);

		keys = Object.keys(filter_vals);
		for (i=0; i< keys.length; ++i)
		{	
			option = document.createElement("option");
			option.value = filter_vals[keys[i]].join();
			option.innerHTML = keys[i];
			section.appendChild(option);
		}
}
//End

const renderCards = (query_targets) => {
	showResultsStats(query_targets);
	queryToCard(paginate(query_targets));
}


//Rendering cards function - start
const queryToCard = (query_ids) => {
	CARDS_CONTAINER.textContent = "";
	ERRORS_CONSOLE.textContent = "";
	
	if(query_ids)
	{	
		DATA_LINKS.hide();
		FILTER_BUBBLE.show();
		
		let query_orgs = {};
		let query_activity = {};

		for (let i=0; i< query_ids.length; i++)
		{	
			if (query_orgs[TARID_SET[query_ids[i]]['src_org']])
			{ query_orgs[TARID_SET[query_ids[i]]['src_org']].push(query_ids[i]); }

			else 
			{	query_orgs[TARID_SET[query_ids[i]]['src_org']] = [query_ids[i]]; }

			if (query_activity[TARID_SET[query_ids[i]]['activity']])
			{ query_activity[TARID_SET[query_ids[i]]['activity']].push(query_ids[i]); }

			else 
			{	query_activity[TARID_SET[query_ids[i]]['activity']] = [query_ids[i]]; }

			card = generateTarCard(query_ids[i]);
			CARDS_CONTAINER.appendChild(card);
		}
		
			if($('#filter-organisms').has('option').length == 0)
				addFilters(query_orgs,ORGANISM_FILTER);

			if($('#filter-activity').has('option').length == 0)
				addFilters(query_activity,ACTIVITY_FILTER);
	}

	else
	{	
		FILTER_BUBBLE.hide()
		DATA_LINKS.show();
		showErrors();	
	}

	togglePageNavButtonsVisibility();
}
//End