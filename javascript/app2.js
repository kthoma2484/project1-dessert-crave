$(function () {

    // -----------------------Kim's Section Starts------------------------  
    let dessertInput = "";
    let dessertName = "";
    let ingredients = "";
    let dessertTime = "";
    let dessertId = "";
    let themeSong = document.getElementById('page-audio');

    // audio to play/pause music buttons
    $('.play-audio').click(function () {
        themeSong.play();
    });

    $('.pause-audio').click(function () {
        themeSong.pause();
    });
    
    // api pull request from yummly api
    function recipeSearch() {

        console.log(dessertInput + " = is search term")
        let queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=d12c5941&_app_key=608774bd91d1850727be4bd6a7ba4dde&q=";

        $.ajax({
                // make ajax GET request
                url: queryURL + encodeURIComponent(dessertInput) + "&allowedCourse[]=course^course-Desserts&maxResult=20",
                method: "GET",
            })
            .then(function (response) {
                console.log(response)

                for (let i = 0; i < response.matches.length; i++) {

                    // store the needed results data
                    dessertId = response.matches[i].id;
                    dessertName = response.matches[i].recipeName;
                    rating = response.matches[i].rating;
                    ingredients = response.matches[i].ingredients;
                    dessertTime = moment.utc(parseInt(response.matches[i].totalTimeInSeconds) * 1000).format("HH:mm");
                    dessertPhoto = response.matches[i].imageUrlsBySize[90];

                    if (parseInt(response.matches[i].rating) >= 4) {
                        console.log("this is highly rated = " + dessertName);

                        $("#results-table > tbody").append(`
                        <tr class="dessertHere" id="${dessertId}">
                        <td> ${dessertName}  </td>
                        <td>  ${rating}  </td>
                        <td> ${dessertTime} </td>
                        <td> <img src="${dessertPhoto}" class="zoom" data-caption="${dessertName}"></td>`);

                        console.log("row added to table")
                    };
                    $("#dessert-search").html(dessertInput);

                };
                // unbind/clear prior click target events and free up DOM
                $(".dessertHere").unbind();

                // click event to select single result display in new page
                $(".dessertHere").on("click", function () {
                    console.log("clicked")
                    dessertId = $(this).attr("id");
                    console.log("recipe selected is = " + dessertId);
                    window.location = "singleresultpg.html?id=" + dessertId;
                    themeSong.pause();

                })
            });
    };

    // reset to main page and clear all values
    let reset = function() {
        window.location = "index.html";
        $("#dessert-name").empty();
        $(".form-check-input").prop("checked", false);
        $("tbody").empty();
        $(".single-pick").empty();
        $("#ingredients").empty();
        $("#recipe-link").empty();
        $(".video").empty();
    }

    $("#reset").on("click", function () {
        reset();
        themeSong.pause();
    });

    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars() {
        let vars = [],
            hash;
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
        
    dessertInput = getUrlVars()["q"];
    recipeSearch()

    $("#dessert-search").html(dessertInput);

    // ----------------------Kim's Section Ends----------------------------------

});