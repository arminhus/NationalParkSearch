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
let getParkData = (states, resultCount) => {
    const PARK_DATA_LINK = "https://api.nps.gov/api/v1/parks?" + `${states}` + resultCount + API_KEY;
    fetch(PARK_DATA_LINK)
        .then(res => res.json())
        .then(parkData => displayParkResults(parkData));
};

let displayParkResults = (parkData) => {
    let resultHTML = "";
    //         <h2 class="item-name">${item.fullName}</h2>
    parkData.data.map(item => {
        resultHTML += `<div class="item-box">
        <a class="item-link" href="${item.url}">${item.fullName}</a>
        <p class="item-description">${item.description}</p>
      </div>`;
    });
    $(".park-results").html(resultHTML);
};

let buildStateString = (formInputResult, resultCount) => {
    let stateArray = formInputResult.split(",").map(res => res.trim());
    let states = stateArray.map(states => "stateCode=" + states + "&").join("");
    getParkData(states, resultCount);
};

let getFormInput = () => {
    $('#state-form').submit(event => {
        event.preventDefault();
        let formInputResult = $(event.currentTarget).find(".js-query").val().toUpperCase();
        let resultLimit = $(event.currentTarget).find(".js-search-limit").val();
        let num = Number(resultLimit)
        let resultCount;
        if (Number.isInteger(num) && num > 0) {
            resultCount = "limit=" + (num - 1) + "&";
            // buildStateString(formInputResult, resultCount);
        } else {
            resultCount = "limit=9&";
            // buildStateString(formInputResult, resultCount);
        }
        buildStateString(formInputResult, resultCount);
    });
};

$(getFormInput)