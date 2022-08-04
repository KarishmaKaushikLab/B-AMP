const SECTIONS_DOM_LIST = document.querySelector("#citations");

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

const generateProject = (projectTitle, citations) => {
	const project = document.createElement("li");
	project.className = "citation";

	const title = document.createElement("h1");
	title.style = "text-decoration: underline";
	title.textContent = projectTitle;
	project.appendChild(title);

	const list = document.createElement("ul");
	project.appendChild(list);

	for (const citation of citations) {
		const citationElement = generateCitation(
			citation["authors"],
			citation["title"],
			citation["publication"]
		);
		list.appendChild(citationElement);
	}

	return project;
};

const generateSection = (sectionTitle, projects) => {
	const section = document.createElement("li");
	section.className = "citation";

	const title = document.createElement("h1");
	title.style = "font-size: 2.7em; font-weight: bold;";
	title.textContent = sectionTitle;
	section.appendChild(title);

	const list = document.createElement("ul");
	section.appendChild(list);

	for (const project of projects) {
		const citationElement = generateProject(project["projectTitle"], project["citations"]);
		list.appendChild(citationElement);
	}

	return section;
};

const render = (sections) => {
	for (const section of sections) {
		const sectionDOM = generateSection(section["sectionTitle"], section["projects"]);
		SECTIONS_DOM_LIST.appendChild(sectionDOM);
	}
};

const main = () => {
	const SECTIONS = [
		{
			sectionTitle: "PROTEIN MODELING",
			projects: [
				{
					projectTitle: "PEP-FOLD3 (for <50 amino acids)",
					citations: [
						{
							authors:
								"Lamiable A, Thévenet P, Rey J, Vavrusa M, Derreumaux P, Tufféry P.",
							title:
								"PEP-FOLD3: faster de novo structure prediction for linear peptides in solution and in complex.",
							publication: "Nucleic Acids Res. 2016 Jul 8;44(W1):W449-54.",
						},
						{
							authors: "Shen Y, Maupetit J, Derreumaux P, Tufféry P.",
							title:
								"Improved PEP-FOLD approach for peptide and miniprotein structure prediction",
							publication: "J. Chem. Theor. Comput. 2014; 10:4745-4758",
						},
						{
							authors:
								"Thévenet P, Shen Y, Maupetit J, Guyon F, Derreumaux P, Tufféry P.",
							title:
								"PEP-FOLD: an updated de novo structure prediction server for both linear and disulfide bonded cyclic peptides.",
							publication: "Nucleic Acids Res. 2012. 40, W288-293.",
						},
					],
				},
				{
					projectTitle: "I-TASSER (for unusual/unknown amino acids)",
					citations: [
						{
							authors: "J Yang, R Yan, A Roy, D Xu, J Poisson, Y Zhang.",
							title: "The I-TASSER Suite: Protein structure and function prediction",
							publication: "Nature Methods, 12: 7-8 (2015)",
						},
						{
							authors: "A Roy, A Kucukural, Y Zhang",
							title:
								"I-TASSER: a unified platform for automated protein structure and function prediction.",
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
					projectTitle: "Robetta (for >50 amino acids)",
					citations: [
						{
							authors:
								"Jianyi Yang, Ivan Anishchenko, Hahnbeom Park, Zhenling Peng, Sergey Ovchinnikov, and David Baker",
							title:
								"Improved protein structure prediction using predicted interresidue orientations.",
							publication: "(2020) PNAS 117 (3) 1496-1503",
						},
						{
							authors:
								"Naozumi Hiranuma, Hahnbeom Park, Ivan Anishchanka, Minkyung Baek, David Baker",
							title:
								"Improved protein structure refinement guided by deep learning based accuracy estimation",
							publication:
								"(2020) bioRxiv preprint. https://doi.org/10.1101/2020.07.17.209643",
						},
					],
				},
				{
					projectTitle: "RoseTTAFold (for modeling targets)",
					citations: [
						{
							authors:
								"Baek, M., DiMaio, F., Anishchenko, I., Dauparas, J., Ovchinnikov, S., and Lee, G.",
							title:
								"Accurate prediction of protein structures and interactions using a three-track neural network.",
							publication: " (2021) Science, 373(6557), 871-876. doi: 10.1126/science.abj8754",
						},
					],
				},
				{
					projectTitle:
						"Avogadro: an open-source molecular builder and visualization tool. Version 1.2. http://avogadro.cc/ (for small peptides)",
					citations: [
						{
							authors:
								"Marcus D Hanwell, Donald E Curtis, David C Lonie, Tim Vandermeersch, Eva Zurek and Geoffrey R Hutchison",
							title:
								"Avogadro: An advanced semantic chemical editor, visualization, and analysis platform",
							publication: "Journal of Cheminformatics 2012, 4:17",
						},
					],
				},
			],
		},
		{
			sectionTitle: "PROTEIN-PEPTIDE DOCKING",
			projects: [
				{
					projectTitle: "AutoDock Vina",
					citations: [
						{
							authors: "O. Trott, A. J. Olson",
							title:
								"AutoDock Vina: improving the speed and accuracy of docking with a new scoring function, efficient optimization and multithreading",
							publication: "Journal of Computational Chemistry 31 (2010) 455-461",
						},
					],
				},
			],
		},
		{
			sectionTitle: "MOLECULAR DYNAMICS SIMULATIONS",
			projects: [
				{
					projectTitle: "GROMACS",
					citations: [
						{
							authors: "M.J. Abraham, T. Murtola, R. Schulz, S. Páll, J.C. Smith, B. Hess, and E. Lindahl",
							title: "GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers",
							publication: "SoftwareX 1-2 (2015) 19-25",
						},
						{
							authors: "H. Bekker, H.J.C. Berendsen, E.J. Dijkstra, S. Achterop, R. van Drunen, D. van der Spoel, A. Sijbers, and H. Keegstra",
							title: "Gromacs: A parallel computer for molecular dynamics simulations",
							publication: "Physics computing (1992) 252–256",
						},
					],
				},
			],
		},
		{
			sectionTitle: "VISUALIZATION",
			projects: [
				{
					projectTitle: "UCSF Chimera",
					citations: [
						{
							authors:
								"Pettersen EF, Goddard TD, Huang CC, Couch GS, Greenblatt DM, Meng EC, Ferrin TE.",
							title:
								"UCSF Chimera--a visualization system for exploratory research and analysis",
							publication: "J Comput Chem. 2004 Oct;25(13):1605-12.",
						},
					],
				},
				{
					projectTitle: "PyMOL",
					citations: [
						{
							authors: "The PyMOL Molecular Graphics System, Version 2.0",
							title: "",
							publication: "Schrödinger, LLC.",
						},
					],
				},
			],
		},
		{
			sectionTitle: "RESOURCES",
			projects: [
				{
					projectTitle: "DRAMP",
					citations: [
						{
							authors: "Shi G.; Kang X.; Dong F.; Liu Y.; Zhu N.; & Hu Y. et al",
							title:
								"DRAMP 3.0: an enhanced comprehensive data repository of antimicrobial peptides",
							publication: "Nucleic Acids Research 2021; 50(D1), 488-496. PMID:34390348",
						},
						{
							authors: "Kang X.; Dong F.; Shi C.; Zheng H. et al",
							title:
								"DRAMP 2.0, an updated data repository of antimicrobial peptides",
							publication: "Scientific Data. 2019; 6(1): 148. PMID:31409791",
						},
						{
							authors: "Fan L.; Sun J.; Zhou M.; Zhou J.; Lao X.; Zheng H.; Xu H.",
							title:
								"DRAMP: a comprehensive data repository of antimicrobial peptides",
							publication: "Sci Rep. 2016 Apr 14;6:24482. PMID:27075512",
						},
						{
							authors: "Liu S.; Bao J.; Lao X.; Zheng H.",
							title:
								"Novel 3D Structure Based Model for Activity Prediction and Design of Antimicrobial Peptides",
							publication: "Sci Rep. 2018 Jul 25;8(1):11189. PMID:30046138",
						},
						{
							authors: "Liu S.; Fan L.; Sun J.; Lao X.; Zheng H.",
							title: "Computational resources and tools for antimicrobial peptides",
							publication: "J Pept Sci. 2017 Jan;23(1):4-12. PMID:27966278",
						},
					],
				},
			],
		},
	];

	render(SECTIONS);
};

main();
