const generateDRAMPCard = (data) => {

};

const showResults = (resultSet) => {
    const container = document.querySelector(".drampCards");


};

const triggerSearch = () => {
    const response = search(searchBox.value.toUpperCase());
    console.log(response);
};

const searchBox = document.querySelector("#searchBox");
searchBox.oninput = triggerSearch;