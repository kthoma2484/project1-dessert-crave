$(function () {

    let q = "";

    // -----------------------Kim's Section Starts------------------------  
    let dessertInput = "";

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
    };

    // search variable
    let searchTerm = function() {
        console.log('search term is= ' + q);
        $("#stay-hidden").val(q);
        $(".option-one").attr("id", "hide-one");
        $(".option-two").attr("id", "hide-one");
        $(".enter-div").attr("id", "hide-three");
        $(".submit-form").removeAttr("id");
    };

    // Select to enter search text or use radio criteria for search
    $(".form-check-input").on('click', function () {
        // make visible the search term input box
        if ($("#enter-name").is(':checked')) {
            $(".option-one").removeAttr("id");
            $(".enter-textdiv").removeAttr("id");
            $(".reset-div").removeAttr("id");
            $("#intro-question").attr("id", "hide-one");
        }
        // make visiable the criteria radio questions & buttons
        if ($("#criteria-search").is(':checked')) {
            $(".option-two").removeAttr("id");
            $(".enter-criteriadiv").removeAttr("id");
            $(".reset-div").removeAttr("id");
            $("#intro-question").attr("id", "hide-one");
        }
    });

    // On click set the api search term to a new form for submit
    $(".option-one").on("submit", function(event) {

        // validation - if the search is blank or if a none alphabetical character (or space) is search, page will reset
        if ($("#dessert-name").val() == "" || !$("#dessert-name").val().match(/^[a-zA-Z\s]*$/)) {
            console.log("no text")
           reset();
        } else {
            q = $("#dessert-name").val();
            searchTerm();
        }
        return false;
    });

    $(".option-two").on("submit", function(event) {

        if ($("input:checked[name='dessert-type']").length && $("input:checked[name='flavor']").length) {
            console.log("checked")
            q = $("input:checked[name='dessert-type']").val() + " " + $("input:checked[name='flavor']").val();
            searchTerm();
        } else {
            reset();
        }
        return false;
    });
    
    $("#reset").on("click", function () {
        reset();
        themeSong.pause();
    });
    
    // ----------------------Kim's Section Ends/Anthony's Section Starts----------------------------------

    /*
        // --------------------------------------------------
        let queryURL = "https://www.googleapis.com/youtube/v3/AIzaSyBqsfshUVe2dhIcYn_bKTXrpr9Pst1g3Vo"

        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/AIzaSyBqsfshUVe2dhIcYn_bKTXrpr9Pst1g3Vo",
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    */


    // ---------------------Anthony's Section Ends/ Ericka's Section Starts----------------------------------




});