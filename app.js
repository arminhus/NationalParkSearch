// Review The National Parks Services API documentation and create an API key. 
// You'll add this key to your request as a query parameter (api_key=).
// Review the /parks enpoint and data model to understand how it works.
// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.
// As a stretch goal, try adding the park's address to the results.
const API_KEY = 'api_key=YSDEGRMwmQ9qYfIetvJsMqnSjkvXri54zvv0INLa';
// https://api.nps.gov/api/v1/parks?stateCode=GA&stateCode=FL&api_key=YSDEGRMwmQ9qYfIetvJsMqnSjkvXri54zvv0INLa
let getParkData = (states) => {
    const PARK_DATA_LINK = "https://api.nps.gov/api/v1/parks?" + `${states}` + API_KEY;
    console.log(PARK_DATA_LINK);
    fetch(PARK_DATA_LINK)
        .then(res => res.json())
        .then(parkData => {
            parkData.data.map(results => {
                displayParkResults(results);
                // let name = results.fullName
                // let desc = results.description
                // let url = results.url
                // console.log(name, desc, url);
            });
        })
};

let displayParkResults = (results) => {
    let resultHTML = "";
    results.map(item => {
        resultHTML += `<div class="repo-box">
        <h2 class="repo-name">${item.fullName}</h2>
        <a class="repo-link" href="${item.url}">${results.url}</a>
        <p>${item.description}</p>
      </div>`;
    });
    $(".park-results").html(resultHTML);
};

let buildStateString = (formInputResult) => {
    let stateArray = formInputResult.split(",").map(res => res.trim());
    let states = stateArray.map(states => "stateCode=" + states + "&").join("");
    getParkData(states);
};

let getFormInput = () => {
    $('#state-form').submit(event => {
        event.preventDefault();
        let formInputResult = $(event.currentTarget).find(".js-query").val().toUpperCase();
        if (formInputResult.length > 2) {
            buildStateString(formInputResult);
        } else {
            getParkData("stateCode=" + formInputResult + "&");
        }
    });
};

$(getFormInput)