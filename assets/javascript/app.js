let questionslist = {};
let trivia = {};

let questions;
let answers = ["A", "A", "A", "A", "A", "A", "A", "A"];

let intervalID;

timer = {

    time: 60,

    start: function () {
        $("#timer-display").text("00:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
      
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
       
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("OUT OF TIME!!!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
          
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 60;
        $("#timer-display").text("00:00");
        clearInterval(intervalID);
       
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};



function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "What was the name of the Unicorn car in the movie?",
            A: "Elenor",
            B: "Fastback Mustang",
            C: "Ford",
            D: "Mitsubishi",
        },
        q1: {
            question: "Who was the main actor in the movie?",
            A: "Nicolas Cage.",
            B: "George Washington.",
            C: "Adam Sandler.",
            D: "Barnie.",
        },
        q2: {
            question: "Where did the movie take place?",
            A: "Los Angeles",
            B: "Miami",
            C: "Chicago",
            D: "New York",
        },
        q3: {
            question: "How many total cars did they steal in the movie?",
            A: "50",
            B: "500",
            C: "5",
            D: "3",
        },
        q4: {
            question: "What color was the Unicorn car?",
            A: "Silver.",
            B: "Blue.",
            C: "Yellow.",
            D: "Green.",
        },
        q5: {
            question: "How long did the team have to steal the cars?",
            A: "12 hours.",
            B: "24 hours.",
            C: "48 hours.",
            D: "72 hours",
        },
        q6: {
            question: "What type of dog ate the mercedes keys?",
            A: "Bulldog.",
            B: "Husky.",
            C: "Lab",
            D: "Pug",
        },
        q7: {
            question: "What was Memphis Raines doing before he found out about his brothers situation? ",
            A: "Managing junior go cart racing",
            B: "Plumber",
            C: "Electrician",
            D: "Chef",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
 
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}



$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});