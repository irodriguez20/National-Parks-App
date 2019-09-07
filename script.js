
const apiKey = "9MTYXHvF3IuX8ACZlWuCoBYEIMaw7Wr7GCJ2RfTu";
const searchUrl = "https://developer.nps.gov/api/v1/parks";

function displayResults(responseJson){
    console.log(responseJson);
    $("#results-list").empty();

    for( let i =0; i < responseJson.data.length; i++){
        $("#results-list").append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p><br>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
            </li>`
        );
    }
    $("#results").removeClass("hidden");
}

function getNationalParks(searchTerm, maxResults=10){
    const params ={
        stateCode: searchTerm,
        limit: maxResults,
        api_key: apiKey,
    };

    let queryString = $.param(params);
    const url = searchUrl + "?" + queryString;
    console.log("url", url);

    fetch(url).then(response =>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(responseJson => displayResults(responseJson))
    .catch(err=> {
        $("#js-error-message").text(`Something failed: ${err.message}`);
    })
}

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        let searchTerm = $("#search-term").val();
        let maxResults = $("#max-results").val();
        console.log("data",searchTerm, maxResults);
        if(maxResults ==""){
            maxResults=undefined;
        }
        getNationalParks(searchTerm,maxResults);
    })
}

$(watchForm);