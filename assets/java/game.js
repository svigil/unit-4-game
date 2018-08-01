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
        healthPoints: 125,
        attack: 18,
        baseAttackPoints: 18,
        counterAttackPoints: 14
    }
    
    var oogie = {
        healthPoints: 110,
        attack: 31,
        baseAttackPoints: 31,
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
        attack: 10,
        baseAttackPoints: 10,
        counterAttackPoints: 13
    }
    
    var zero = {
        healthPoints: 115,
        attack: 25,
        baseAttackPoints: 25,
        counterAttackPoints: 16
    }
    
//Select what character you would like to fight    
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
    //Select who you would to try to kill
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
    $("#oogieHealth").text("Health: " + oogie.healthPoints);
    $("#sallyHealth").text("Health: " + sally.healthPoints);
    $("#santaHealth").text("Health: " + santa.healthPoints);
    $("#zeroHealth").text("Health: " + zero.healthPoints);
    if (eval(player).healthPoints <= 0) {
        $("#userPlayer").text("Try another Holiday - You're Dead");
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
            $("#userPlayer").text("You didn't die!");
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