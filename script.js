console.log(document.getElementById("summonerIDInput"));

const data_dragon_champions_list_url = "https://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json";
// var allChamps = "all champs gonna be here";
// async function getChamps() {
//     return await fetch(data_dragon_champions_list_url)
//         .then(function(response) {
//             return response.json();
//         }).then(function(championsJSON) {
//             //console.log(championsJSON);
//             allChamps = championsJSON;
//             return championsJSON;
//             });
//         }
// getChamps();

const apiKey = "RGAPI-66e8f0b6-a9e8-40ef-b553-d63b6b4b727f";


document.getElementById("summonerIDSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("summonerIDInput").value;
    if (value === "")
        return;
    console.log(value);
    console.log(apiKey);
    const summoner_url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + value + "?api_key=" + apiKey;
    console.log(summoner_url);
    fetch(summoner_url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json); //can comment this line out later

            let summonerName = json.name;

            const topMasteryCount = 5;
            const mastery_url = "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + json.id + "/top?count=" + topMasteryCount + "&api_key=" + apiKey;
            console.log(mastery_url);
            fetch(mastery_url)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log(json);

                    console.log(allChamps);
                    //parse the data for the highest mastery champs
                    let masteredChamps = new Array();
                    for (let i=0; i < json.length; i++) {
                        let searchId = json[i].championId;
                        console.log(searchId);
                        //console.log(allChamps.data.Aatrox);
                        for (let j=0; j<allChamps.length; j++) {
                            //console.log(allChamps[j])
                            if (allChamps[j].key == searchId) {
                                console.log("adding item!: ", allChamps[j]);
                                masteredChamps.push(allChamps[j]);
                            }
                        }
                    }
                    console.log(masteredChamps);

                    function cleanUpName(name) {
                            let cleanName = "";
                            for (let i=0; i<name.length; i++) {
                                if (name.charAt(i) == ' ') {
                                    //remove spaces
                                }
                                else if (name.charAt(i) == '\'') {
                                    //for void champs
                                    cleanName += name.charAt(i + 1).toLowerCase();
                                    i++;
                                }
                                else {
                                    cleanName += name.charAt(i);
                                }
                            }
                            if (name == "LeBlanc") {
                                cleanName = "Leblanc"; //the B isn't capitalized for some reason
                            }
                            if (name == "Kog'Maw") {
                                cleanName = "KogMaw"; //its capitalized for some reason
                            }
                            if (name == "Rek'Sai") {
                                cleanName = "RekSai"; //its capitalized for some reason
                            }
                            if (name == "Renata Glasc") {
                                cleanName = "Renata"; //chops last name for some reason
                            }
                            if (name == "Nunu & Willump") {
                                cleanName = "Nunu";
                            }
                            return cleanName;
                        }

                    let results = '<div class="overview">';
                    results += '<h1>Champion Mastery</h1>'
                    results += '<div class="overview-flex">';
                    for (let i = 0; i < masteredChamps.length; i++) {
                        results += '<div class="champion-mastery-tile-' + json[i].championLevel +'">';
                        let cleanName = cleanUpName(masteredChamps[i].name);
                        let imageURL = "https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/" + cleanName + ".png";
                        results += '<img src="' + imageURL + '">';
                        results += '<h2>' + masteredChamps[i].name + '</h2>';
                        results += '<h3>' + masteredChamps[i].title + '</h3>';
                        results += '<h2>' + json[i].championPoints + 'pts</h2>';
                        results += '</div>'; //champion-mastery-tile-#
                    }

                    results += '</div>'; //overview-flex
                    results += '<h1>' + summonerName + '</h1>';
                    results += '</div>'; //overview
                    document.getElementById("overviewResults").innerHTML = results;
                });

        });
});

//url for square champion image
//http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/Aatrox.png
//url for full splash art
//http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
