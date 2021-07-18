const CITATIONS_LIST = document.querySelector("#citations");

const generateCitation = (authors, title, publication) => {
    const citation = document.createElement("li");
    citation.className = "citation";

    const citationContainer = document.createElement("span");
    citation.appendChild(citationContainer);

    const authorsHeading = document.createElement("h3");
    authorsHeading.className = "citationAuthors";
    authorsHeading.innerText = authors;
    citationContainer.appendChild(authorsHeading);

    const titleHeading = document.createElement("h3");
    titleHeading.className = "citationTitle";
    titleHeading.innerText = title;
    citationContainer.appendChild(titleHeading);

    const publicationHeading = document.createElement("h4");
    publicationHeading.className = "citationPublication";
    publicationHeading.innerText = publication;
    citationContainer.appendChild(publicationHeading);

    return citation;
};

const renderCitations = (citations) => {
    for (const citation of citations) {
        const citationElement = generateCitation(citation["authors"], citation["title"], citation["publication"]);
        CITATIONS_LIST.appendChild(citationElement);
    }
};

const main = () => {
    const CITATIONS = [
        {
            "authors": "Lamiable A, Thévenet P, Rey J, Vavrusa M, Derreumaux P, Tufféry P.",
            "title": "PEP-FOLD3: faster de novo structure prediction for linear peptides in solution and in complex.",
            "publication": "Nucleic Acids Res. 2016 Jul 8;44(W1):W449-54."
        },
        {
            "authors": "Shen Y, Maupetit J, Derreumaux P, Tufféry P.",
            "title": "Improved PEP-FOLD approach for peptide and miniprotein structure prediction",
            "publication": "J. Chem. Theor. Comput. 2014; 10:4745-4758"
        }
    ];

    renderCitations(CITATIONS);
};

main();