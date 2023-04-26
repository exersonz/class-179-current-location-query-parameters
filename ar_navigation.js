let coordinates = {}

$(document).ready(function(){
    get_coordinates();
});

// function getting the data from the query parameters
function get_coordinates(){
    // from the current website url we get the part that was sent as the query parameter
    // URLSearchParams() - takes the query parameters and creates an object for the key-value pairs from it
    let searchParams = new URLSearchParams(window.location.search);

    console.log(searchParams);

    // checking if the source and destination are present in the searchParams variable
    // .has() selects elements which contain at least one element that matches the specified selector
    if(searchParams.has('source') && searchParams.has('destination')){
        // getting the source and destination info from searchParams
        let source = searchParams.get('source');
        let destination = searchParams.get('destination');

        // getting the lat and lng from the source
        coordinates.source_lat = source.split(";")[0];
        coordinates.source_lon = source.split(";")[1];
    
        // getting the lat and lng from the destination
        coordinates.destination_lat = destination.split(";")[0];
        coordinates.destination_lon = destination.split(";")[1];

        console.log(coordinates);
    }
    else{
        alert('Coordinates were not selected!');

        // you go back to the last visited page in your history (it's the same as clicking the back button!)
        window.history.back();
    }
}