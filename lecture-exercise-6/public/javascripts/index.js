
async function uploadData(){
    // get the data that the user typed in
    let myData = {}
    
    myData.first_name = document.getElementById("first_name_input").value

    myData.last_name = document.getElementById("last_name_input").value

    myData.favorite_ice_cream = document.getElementById("favorite_ice_cream_input").value

    // send the data to the server
    let response = await fetch("users/addUserData", {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let responsetext = await response.text();
    // see what the server said
    document.getElementById("uploadResponse").innerHTML = responsetext;
}


async function loadUsers() {
    let response = await fetch("users/getUsers")
    let usersData = await response.json();

    let html = usersData.map(userInfo => {
        return `
        User Info: ${userInfo.first_name} ${userInfo.last_name} – ${userInfo.favorite_ice_cream}
        `
    });

    let htmlString = html.join("<br/>"); // HTML new line character

    // userData itself will be displayed as [object, Object] in the web page, using JSON.stringify to turn it into a properly-formatted string.
    document.getElementById("results").innerHTML = htmlString;
}