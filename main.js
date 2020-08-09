function set(element) {
    /**CREATE THE ELEMENTS */
    const mainDiv = document.getElementById('main');
    const colDiv = document.createElement('div')
    const cardDiv = document.createElement('div')
    const cardBodyDiv = document.createElement('div')
    const cardTitle = document.createElement('h5')
    const img = document.createElement('img')
    const missionId = document.createElement('p')
    const lYear = document.createElement('p')
    const sLaunch = document.createElement('p')
    const sLand = document.createElement('p')
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    const ul = document.createElement('ul');
    const li = document.createElement('li');


    // Set content and attributes
    img.setAttribute('src', element.links.mission_patch);
    img.setAttribute('alt', "unable to fetch image");
    img.setAttribute('class', "card-img-top");
    colDiv.setAttribute('class', 'col-sm-3 mt-4');
    colDiv.setAttribute('id', element.flight_number);
    cardDiv.setAttribute('class', 'card');
    cardBodyDiv.setAttribute('class', 'card-body');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.setAttribute('style', 'color:#285cb1;font-weight: bold');
    missionId.setAttribute('class', 'card-text');
    missionId.setAttribute('style', 'font-weight: bold');
    lYear.setAttribute('class', 'card-text');
    lYear.setAttribute('style', 'font-weight: bold');
    sLaunch.setAttribute('class', 'card-text');
    sLaunch.setAttribute('style', 'font-weight: bold');
    sLand.setAttribute('class', 'card-text');
    sLand.setAttribute('style', 'font-weight: bold');
    span1.setAttribute('style', 'color:#285cb1');
    span2.setAttribute('style', 'color:#285cb1');
    span3.setAttribute('style', 'color:#285cb1');
    ul.setAttribute('style', 'color:#285cb1');
    cardTitle.innerHTML = element.mission_name + " #" + element.flight_number;
    missionId.innerHTML = "Mission Ids: ";
    if (element.mission_id == "") {
        li.innerHTML = "Not Available";
    } else {
        li.innerHTML = element.mission_id;
    }

    lYear.innerHTML = "Launch Year: ";
    span1.innerHTML = element.launch_year;
    sLaunch.innerHTML = "Successful Launch: ";
    if (element.launch_success == null || element.launch_success == "") {
        span2.innerHTML = "Not Available";
    } else {
        span2.innerHTML = element.launch_success;
    }

    sLand.innerHTML = "Successful Landing: ";
    if (element.rocket.first_stage.cores[0].land_success == null || element.rocket.first_stage.cores[0].land_success == "") {
        span3.innerHTML = "Not available";
    } else
        span3.innerHTML = element.rocket.first_stage.cores[0].land_success;


    mainDiv.append(colDiv);
    colDiv.append(cardDiv);
    cardDiv.append(img);
    cardDiv.append(cardBodyDiv);
    cardBodyDiv.append(cardTitle);
    cardBodyDiv.append(missionId);
    cardBodyDiv.append(lYear);
    cardBodyDiv.append(sLaunch);
    cardBodyDiv.append(sLand);
    lYear.append(span1);
    sLand.append(span3);
    sLaunch.append(span2);
    missionId.append(ul);
    ul.append(li);

};
/**Load the data  */
fetch('https://api.spacexdata.com/v3/launches?limit=100')
    .then(res => res.json())//response type
    .then(data => {
        data.forEach(element => set(element));

    });

/**Remove the elements */
function removeCard() {

    const parent = document.getElementById('main');
    if (parent != null)
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
}
/**fetch the data based on filter */
function filterYear(year) {
    removeCard();
    fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_year=' + year)
        .then(res => res.json())//response type
        .then(data => {
            data.forEach(element => set(element))
        });
}
/**fetch the data based on filter */
function filterLaunch(value) {
    removeCard();
    fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_success=' + value)
        .then(res => res.json())//response type
        .then(data => {
            data.forEach(element => set(element))
        });
}
/**fetch the data based on filter */
function filterLanding(value) {
    removeCard();
    fetch('https://api.spacexdata.com/v3/launches?limit=100&land_success=' + value)
        .then(res => res.json())//response type
        .then(data => {
            data.forEach(element => set(element))
        });
}