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

        console.log(dessertId + " = is search term")
        let queryURL = "https://api.yummly.com/v1/api/recipe/";

        $.ajax({
                // make ajax GET request
                url: queryURL + encodeURI(dessertId) + "?_app_id=d12c5941&_app_key=608774bd91d1850727be4bd6a7ba4dde",
                method: "GET",
            })
            .then(function (response) {
                console.log(response)

                // store the needed results data
                dessertId = response.id;
                dessertName = response.name;
                ingredients = response.ingredientLines;
                recipeLink = response.attribution.url;

                $(".single-pick").html(dessertName);
                $("#ingredients").html(ingredients);
                $("#recipe-link").html(`<a href="${recipeLink}">${recipeLink}</a>`);

                console.log("dessert name is = " + dessertName)
                search();

            });
  
    };

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

    dessertId = getUrlVars()["id"];
    console.log('dessert id= ' + dessertId)
    recipeSearch();

    // reset to main page and clear all values
    let reset = function () {
        window.location = "index.html";
        $("#dessert-name").empty();
        $(".form-check-input").prop("checked", false);
        $("tbody").empty();
        $(".single-pick").empty();
        $("#ingredients").empty();
        $("#recipe-link").empty();
        $(".video").empty();
        themeSong.pause();
    }

    $("#reset").on("click", function () {
        reset();
        themeSong.pause();

    });

    // ----------------------Kim's Section Ends/Anthony's Section Starts----------------------------------

    function search() {
        // Reset Results
        $('.movie').html('');
        // Assigned variable for search input
        q = dessertName;
        console.log(q);
        // Run GET/AJAX request on API
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
                part: 'snippet, id',
                q: q,
                type: 'video',
                maxResults: 5,
                order: 'viewCount',
                key: 'AIzaSyBqsfshUVe2dhIcYn_bKTXrpr9Pst1g3Vo',
                publishedAfter: "2013-01-01T00:00:00Z"
            },
            function (data) {
                console.log(data);
                $.each(data.items, function (i, item) {
                    let output = getOutput(item);
                    // Display Results
                    $('.movie').append(output);
                })
            })
    }
    //Setting variables for needed object items
    function getOutput(item) {
        let videoId = item.id.videoId;
        console.log(videoId);
        let title = item.snippet.title;
        console.log(title);
        let description = item.snippet.description;
        let thumb = item.snippet.thumbnails.high.url;
        let channelTitle = item.snippet.channelTitle;
        let videoDate = item.snippet.publishedAt;
        //Creating Output String
        let output = '<li>' +
            '<div class="list-left">' +
            '<img src="' + thumb + '">' +
            '</div>' +
            '<div class="list-right">' +
            '<h3><a href="http://www.youtube.com/embed/' + videoId + '">' + title + '</h3>' +
            '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
            '<p>' + description + '</p>' +
            '</div>' +
            '</li>' +
            '';
        return output;
    };

});