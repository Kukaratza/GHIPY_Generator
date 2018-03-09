            // Initial array of animals
            var topics = ["Aquaman", "Green Lantern", "Wonder Woman", "Superman", "Batman", "Flash", "Martian Manhunter", "Joker", "Luthor"];

            // Function for displaying giphy data
            function renderButtons() {

                // Delete the content inside the giphy-view div prior to adding new giphy
                $('#giphy-view').html('')
                // (this is necessary otherwise you will have repeat buttons)

                // Loop through the array of giphy, then generate buttons for each giphy in the array
                for (i = 0; i < topics.length; i++) {
                    $('#giphy-view').append(`<button class="btn btn-outline-light giphy-info" value="${topics[i]}">${topics[i]}</button>`)
                    
                }
            }
            
            $('#giphy-view').on('click', '.giphy-info', function (e) { //event delegation .
                var giphyClicked = e.target.value;
                //var other = $(this).val();

                $.ajax({
                    url: "https://api.giphy.com/v1/gifs/search?q=" + giphyClicked + "&api_key=ZAa1d1Uc4X4BK9rydf5XPA8RKVqxoBk9&limit=10",
                    method: "GET"
                }).done(function (response) {
                    console.log(response);
                    $('.info').empty()
                    for (var a = 0; a < response.data.length; a++) {
                    let rating = response.data[a].rating;
                    console.log(rating);
                        $(".info").append('<img class="gif" src="' + response.data[a].images.fixed_height_still.url + '">');
                        // $("<p>").append(rating[a])
                        // $(".info").append(rating)
                    };
                })
            });

            // This function handles events where the add giphy button is clicked
            $("#add-giphy").on("click", function (event) {
                // event.preventDefault() prevents submit button from trying to send a form.
                // Using a submit button instead of a regular button allows the user to hit
                // "Enter" instead of clicking the button if desired
                event.preventDefault();
                // Write code to grab the text the user types into the input field
                var giphy = $('#giphy-input').val().trim();
                // Write code to add the new giphy into the giphy array
                topics.push(giphy)
                // The renderButtons function is called, rendering the list of giphy buttons
                renderButtons();
            });

            // Calling the renderButtons function to display the initial list of giphy
            renderButtons();

            $('body').on('click', '.gif', function () {
                var src = $(this).attr("src");
                if ($(this).hasClass('playing')) {
                    //stop
                    $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
                    $(this).removeClass('playing');
                } else {
                    //play
                    $(this).addClass('playing');
                    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
                }
            });

            $("#reset").on("click", function () {
                $(".gif").remove();
            })

    