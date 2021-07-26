const CITATIONS_LIST = document.querySelector("#citations");

const generateCitation = (authors, title, publication) => {
	const citation = document.createElement("li");
	citation.className = "citation";

	const authorsHeading = document.createElement("h3");
	authorsHeading.className = "citationAuthors";
	authorsHeading.innerText = authors;
	citation.appendChild(authorsHeading);

	const titleHeading = document.createElement("h3");
	titleHeading.className = "citationTitle";
	titleHeading.innerText = title;
	citation.appendChild(titleHeading);

	const publicationHeading = document.createElement("h4");
	publicationHeading.className = "citationPublication";
	publicationHeading.innerText = publication;
	citation.appendChild(publicationHeading);

	return citation;
};

const generateSection = (sectionTitle, citations) => {
	const section = document.createElement("li");
	section.className = "citation";

	const title = document.createElement("h1");
	title.textContent = sectionTitle;
	section.appendChild(title);

	const list = document.createElement("ul");
	section.appendChild(list);

	for (const citation of citations) {
		const citationElement = generateCitation(
			citation["authors"],
			citation["title"],
			citation["publication"]
		);
		list.appendChild(citationElement);
	}

	return section;
};

const renderCitations = (citations) => {
	for (const citation of citations) {
		if (citation["section"]) {
			const section = generateSection(citation["section"], citation["citations"]);
			CITATIONS_LIST.appendChild(section);
			continue;
		}

		const citationElement = generateCitation(
			citation["authors"],
			citation["title"],
			citation["publication"]
		);
		CITATIONS_LIST.appendChild(citationElement);
	}
};

const main = () => {
	const CITATIONS = [
		{
			section: "PEP-FOLD3",
			citations: [
				{
					authors: "Lamiable A, Thévenet P, Rey J, Vavrusa M, Derreumaux P, Tufféry P.",
					title: "PEP-FOLD3: faster de novo structure prediction for linear peptides in solution and in complex.",
					publication: "Nucleic Acids Res. 2016 Jul 8;44(W1):W449-54.",
				},
				{
					authors: "Shen Y, Maupetit J, Derreumaux P, Tufféry P.",
					title: "Improved PEP-FOLD approach for peptide and miniprotein structure prediction",
					publication: "J. Chem. Theor. Comput. 2014; 10:4745-4758",
				},
				{
					authors: "Thévenet P, Shen Y, Maupetit J, Guyon F, Derreumaux P, Tufféry P.",
					title: "PEP-FOLD: an updated de novo structure prediction server for both linear and disulfide bonded cyclic peptides.",
					publication: "Nucleic Acids Res. 2012. 40, W288-293.",
				},
			],
		},
		{
			section: "I-TASSER",
			citations: [
				{
					authors: "J Yang, R Yan, A Roy, D Xu, J Poisson, Y Zhang.",
					title: "The I-TASSER Suite: Protein structure and function prediction",
					publication: "Nature Methods, 12: 7-8 (2015)",
				},
				{
					authors: "A Roy, A Kucukural, Y Zhang",
					title: "I-TASSER: a unified platform for automated protein structure and function prediction.",
					publication: "Nature Protocols, 5: 725-738 (2010)",
				},
				{
					authors: "Y Zhang",
					title: "I-TASSER server for protein 3D structure prediction",
					publication: "BMC Bioinformatics, vol 9, 40 (2008)",
				},
			],
		},
		{
			authors:
				"Jianyi Yang, Ivan Anishchenko, Hahnbeom Park, Zhenling Peng, Sergey Ovchinnikov, and David Baker",
			title: "Improved protein structure prediction using predicted interresidue orientations.",
			publication: "(2020) PNAS 117 (3) 1496-1503",
		},
		{
			authors:
				"Naozumi Hiranuma, Hahnbeom Park, Ivan Anishchanka, Minkyung Baek, David Baker",
			title: "Improved protein structure refinement guided by deep learning based accuracy estimation",
			publication: "(2020) bioRxiv preprint.",
		},
		{
			authors: "O. Trott, A. J. Olson",
			title: "AutoDock Vina: improving the speed and accuracy of docking with a new scoring function, efficient optimization and multithreading",
			publication: "Journal of Computational Chemistry 31 (2010) 455-461",
		},
		{
			authors: "Kang X.; Dong F.; Shi C.; Zheng H. et al",
			title: "DRAMP 2.0, an updated data repository of antimicrobial peptides",
			publication: "Scientific Data. 2019; 6(1): 148. PMID:31409791",
		},
		{
			authors: "Liu S.; Bao J.; Lao X.; Zheng H.",
			title: "Novel 3D Structure Based Model for Activity Prediction and Design of Antimicrobial Peptides",
			publication: "Sci Rep. 2018 Jul 25;8(1):11189. PMID:30046138",
		},
		{
			authors: "Liu S.; Fan L.; Sun J.; Lao X.; Zheng H.",
			title: "Computational resources and tools for antimicrobial peptides",
			publication: "J Pept Sci. 2017 Jan;23(1):4-12. PMID:27966278",
		},
		{
			authors: "Fan L.; Sun J.; Zhou M.; Zhou J.; Lao X.; Zheng H.; Xu H.",
			title: "DRAMP: a comprehensive data repository of antimicrobial peptides",
			publication: "Sci Rep. 2016 Apr 14;6:24482. PMID: 27075512",
		},
		{
			authors:
				"Pettersen EF, Goddard TD, Huang CC, Couch GS, Greenblatt DM, Meng EC, Ferrin TE.",
			title: "UCSF Chimera--a visualization system for exploratory research and analysis",
			publication: "J Comput Chem. 2004 Oct;25(13):1605-12.",
		},
		{
			authors: "The PyMOL Molecular Graphics System, Version 2.0",
			title: "",
			publication: "Schrödinger, LLC.",
		},
	];

	renderCitations(CITATIONS);
};

main();
