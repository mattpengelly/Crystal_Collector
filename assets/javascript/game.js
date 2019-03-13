var crystalGame = {

    crystals: [
        {
            name: "tanzanite",
            points: 0,
            image: "tanzanite.png",
        },
        {
            name: "ruby",
            points: 0,
            image: "ruby.png",
        },

        {
            name: "sapphire",
            points: 0,
            image: "sapphire.png",
        },
        {
            name: "emerald",
            points: 0,
            image: "emerald.png",
        }
    ],

    goal: 0,
    current: 0,
    active: false,

    newCrystals: function () {

        for (i = 0; i < this.crystals.length; i++) {
            var crystalBtn = $("<img>");
            var tempPoints = 0;
            tempPoints = Math.ceil(Math.random() * 12);
            this.crystals[i].points = tempPoints;
            console.log(this.crystals[i].points);
            crystalBtn.addClass("crystal-button col-lg-1 col-md-2 col-sm-3 col-12");
            crystalBtn.attr("src", "assets/images/" + this.crystals[i].image);
            crystalBtn.attr("data-points", tempPoints);
            crystalBtn.text(this.crystals[i].name);
            console.log(this.crystals[i].name);
            console.log(crystalBtn.text);
            $("#crystal-buttons").append(crystalBtn);
        }

        var crystalPad = $("<div>");
        crystalPad.addClass("col-lg-4 col-md-2 col-12");
        $("#crystal-buttons").prepend(crystalPad);
        $("#crystal-buttons").append(crystalPad);
    },

    newGoal: function () {
        this.goal = 0;
        this.current = 0;
        for (i = 0; i < this.crystals.length; i++) {
            this.goal += this.crystals[i].points * Math.ceil(Math.random() * 4);
        }
        if (this.goal > 120) {
            this.newGoal()
        }
        else if (this.goal < 19) {
            this.newGoal()
        };
        console.log(this.goal);
        $("#goal").html(this.goal);
        $("#current").html(this.current);
        this.active = true;
    },

    resetCrystals: function () {
        for (i = 0; i < this.crystals.length; i++) {

            $("#current").html(this.current);
        }
    },

    playGame: function (event) {
        var crystalValue = event.target.dataset.points;
        // console.log("playGame got called");
        // console.log(crystalGame.goal);
        // console.log(crystalGame.current);
        // console.log(crystalValue);
        if (crystalGame.active === true) {
            // console.log(crystalValue);
            crystalValue = parseInt(crystalValue);
            crystalGame.current += crystalValue;
            $("#current").html(crystalGame.current);
            if (crystalGame.current === crystalGame.goal) {
                alert("YOU WIN!!!");
                crystalGame.active = false
            }
            else if (crystalGame.current > crystalGame.goal) {
                alert("YOU LOSE!!!");
                crystalGame.active = false
            }
        }

    },
}



$(document).ready(function () {
    crystalGame.newCrystals();
    crystalGame.newGoal();
    $(document).on("click", ".crystal-button", this, crystalGame.playGame);
    // $(document).on("click", ".crystal-button", function () {
    //     var value = $(this).attr("data-points");
    //     crystalGame.playGame(value);
    // });
    $(document).on("click", "#start", function () {
        if (crystalGame.active === false) {
            $("#crystal-buttons").empty();
            crystalGame.newCrystals();
            crystalGame.newGoal();
        }
    });
    $(document).on("click", "#help", function () {
        //make a help popup
    });
});

// alert("Crystal Clicked!")
// crystalGame.playGame(this.points)

