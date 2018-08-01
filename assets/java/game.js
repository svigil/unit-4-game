// Create necessary variables
$(document).ready(function() {

    var userChoices = ["jack", "oogie", "sally", "santa", "zero"];
    var enemyChoices = [];
    var enemydead = [];
    
    var player;
    var currentEnemy;

    console.log(userChoices);
// Create character attributes
    
    var jack = {
        healthPoints: 120,
        attack: 20,
        baseAttackPoints: 20,
        counterAttackPoints: 14
    }
    
    var oogie = {
        healthPoints: 140,
        attack: 13,
        baseAttackPoints: 13,
        counterAttackPoints: 15
    }
    
    var sally = {
        healthPoints: 110,
        attack: 23,
        baseAttackPoints: 23,
        counterAttackPoints: 18
    }
    
    var santa = {
        healthPoints: 160,
        attack: 12,
        baseAttackPoints: 12,
        counterAttackPoints: 12
    }
    
    var zero = {
        healthPoints: 100,
        attack: 31,
        baseAttackPoints: 31,
        counterAttackPoints: 16
    }
    
//First click to choose player character    
$(".characters").click(function() {
    if (userChoices !== [] && player === undefined) {
        player = $(this).attr("dataChar");
        for (item in userChoices) {
            if (userChoices[item] !== player) {
                enemyChoices.push(userChoices[item]);
            }
        };
        userChoices = [];
        $(".player").append(document.getElementById(player));
        $("#userPlayer").text("Choose your opponent");
    } 
    //Second click to choose current opponent
    else if (currentEnemy === undefined) {
        for (item in enemyChoices) {
            if (enemyChoices[item] === $(this).attr("dataChar")) {
                currentEnemy = $(this).attr("dataChar");
                $(".opponent").append(document.getElementById(currentEnemy));
                $("#userPlayer").text("");
            }
        }
        $("#fight").removeClass("hidden");
    };
});

//Click fight button to attack
$("#fight").click(function() {
    eval(player).healthPoints = eval(player).healthPoints - eval(currentEnemy).counterAttackPoints;
    eval(currentEnemy).healthPoints = eval(currentEnemy).healthPoints - eval(player).attack;
    eval(player).attack = eval(player).attack + eval(player).baseAttackPoints;
    $("#jackHealth").text("Health: " + jack.healthPoints);
    $("#oogieJoeHealth").text("Health: " + oogieJoe.healthPoints);
    $("#sallyHealth").text("Health: " + sally.healthPoints);
    $("#santaHealth").text("Health: " + santa.healthPoints);
    $("#zeroHealth").text("Health: " + zero.healthPoints);
    if (eval(player).healthPoints <= 0) {
        $("#userPlayer").text("You lost!");
        $("#fight").addClass("hidden");
        $("#restart").removeClass("hidden");
        $("#defeat").removeClass("hidden");
    } else if (eval(currentEnemy).healthPoints <= 0) {
        $("#userPlayer").text("You won the battle!  Choose a new opponent");
        $(".dead").append(document.getElementById(currentEnemy));
        var element = document.getElementById(currentEnemy);
        element.classList.remove("floatLeft");
        element.classList.add("floatRight")
        
        for (item in enemyChoices) {
            if (enemyChoices[item] === currentEnemy) {
                enemydead.push(currentEnemy);
                enemyChoices.splice(item, 1);
            }
        };
        currentEnemy = undefined;
        if (enemyChoices.length === 0) {
            $("#userPlayer").text("You are victorious!");
            $("#victory").removeClass("hidden");
            $("#fight").addClass("hidden");
            $("#restart").removeClass("hidden");
        }
    };
});

//Click restart button to reset conditions
$("#restart").click(function() {
    location.reload();
})

})