var questionNumber = 0;
var currentQuestion;
var answerChoices;
var userAnswer;
var correctAnswer;
var correct = 0;
var incorrect = 0;
var timedOut = 0;
var timeRemaining = 30;
var questions = [{
    question: "Businesswoman faces supply chain problems when starting new clothing line.",
    answerChoices: {
        a: "101 Dalmatians",
        b: "Devil Wears Prada",
        c: "What Women Want",
        d: "Sex and the City",
    },
    correctAnswer: "101 Dalmatians"
}, {
    question: "Transported to a surreal landscape, a young girl kills the first person she meets and then teams up with three stranger to kill again.",
    answerChoices: {
        a: "Battle Royale",
        b: "Wizard of Oz",
        c: "Pulp Fiction",
        d: "Donnie Darko",
    },
    correctAnswer: "Wizard of Oz"
}, {
    question: "A man weighs his options regarding who to sell his daughter to.",
    answerChoices: {
        a: "The Little Princess",
        b: "Princess Diaries",
        c: "Taken",
        d: "Aladdin",
    },
    correctAnswer: "Aladdin",
}, {
    question: "Billionaire dedicates fortune to cosplay and beating up the mentally ill.",
    answerChoices: {
        a: "Rain Man",
        b: "Beautiful Mind",
        c: "Jackass",
        d: "Dark Knight",
    },
    correctAnswer: "Dark Knight"
}, {
    question: "German scientist gives young man steroids who is able to lead the allies to victory in World War 2.",
    answerChoices: {
        a: "The Boy in the Stripped Pajamas",
        b: "Captain America",
        c: "The Monuments Men",
        d: "Superman",
    },
    correctAnswer: "Captain America"
}, {
    question: "Boy drops out of school to find and kill the man who has an unhealthy obsession with the boy and also killed his parents.",
    answerChoices: {
        a: "The Mask of Zorro",
        b: "Batman",
        c: "Harry Potter and the Deathly Hallows",
        d: "Man of Steel",
    },
    correctAnswer: "Harry Potter and the Deathly Hallows"
}, {
    question: "Children are picked at random to be trained and battle to the death as entertainment for the rich.",
    answerChoices: {
        a: "Gladiator",
        b: "The Hunger Games",
        c: "Nerve",
        d: "Incredibles",
    },
    correctAnswer: "The Hunger Games"
}, {
    question: "The first time Matt Damon had to be saved by a team of people.",
    answerChoices: {
        a: "The Martian",
        b: "Bourne Identity",
        c: "Team America",
        d: "Saving Private Ryan",
    },
    correctAnswer: "Saving Private Ryan"
}, {
    question: "Teenager joins a rebellion and blows up a government facility with the help of a voice in his head.",
    answerChoices: {
        a: "In the Name of the Father",
        b: "Star Wars: Episode IV - A New Hope",
        c: "Gangs of New York",
        d: "Deadpool",
    },
    correctAnswer: "Star Wars: Episode IV - A New Hope"
}, {
    question: "A team of scientists agree to a questionable proposition in order to secure grant funding.",
    answerChoices: {
        a: "Lake Placid",
        b: "Deep Blue Sea",
        c: "Jurassic Park",
        d: "Abyss",
    },
    correctAnswer: "Jurassic Park"
}, {
    question: "I forget",
    answerChoices: {
        a: "I-Robot",
        b: "Memento",
        c: "Punch Drunk Love",
        d: "iBoy",
    },
    correctAnswer: "Memento"
}];

//Timer
function questionTimer() { countdown = setInterval(decrement, 1000); }
function timerStop() { clearInterval(countdown); }

function decrement() {
    timeRemaining--;
    $("#timer").html(" " + timeRemaining + "s");
    var correctAnswer = currentQuestion.correctAnswer;
    if (timeRemaining === 0) {
        $("#displaySpace").html("Time's Up!");
        timedOut++;
        timerStop();
        $("#answer").html("<p>It was " + correctAnswer + "!</p>");
        $("#options").empty();
        $("#answer").show();
        $("#poster").html(image);
        questionNumber++;
        setTimeout(showQuestion, 3000);
    }
}

function showQuestion() {
    if (questionNumber === questions.length) {
        showEndScreen();
        return
    }
    else {
        $("#answer").hide();
        $("#poster").empty();
        var displayedQuestion = questions[questionNumber].question;
        currentQuestion = questions[questionNumber];
        image = "<img src='./assets/images/" + questionNumber + ".jpg' alt=poster width='200'>";
        $("#displaySpace").html(displayedQuestion);
        var answers = Object.values(currentQuestion.answerChoices);
        for (var i = 0; i < answers.length; i++) {
            $("#options").append("<div>" + answers[i] + "</div>")
        }
        timeRemaining = 30;
        $("#timer").html(" " + timeRemaining + "s");
        questionTimer();

    }
}

$(document).on("click", "#options div", userAnswer);
function userAnswer() {
    timerStop();
    var correctAnswer = currentQuestion.correctAnswer;
    var userAnswer = $(this).html();
    console.log("correct:" + correctAnswer);
    console.log("user:" + userAnswer)
    if (userAnswer === correctAnswer) {
        $("#displaySpace").html("Nice!");
        $("#options").empty();
        $("#answer").html("<div>" + correctAnswer + "</div>");
        $("#answer").show();
        $("#poster").html(image);
        correct++;
        questionNumber++;
        setTimeout(showQuestion, 3000);
        return
    }

    else {
        $("#displaySpace").html("Nice try...");
        incorrect++;
        $("#options").empty();
        $("#answer").html("<div>It was actually " + correctAnswer + "</div>");
        $("#answer").show();
        $("#poster").html(image);
        questionNumber++;
        setTimeout(showQuestion, 3000);
    }
}

function showEndScreen() {
    $("#gameArea").hide();
    $("#poster").empty();
    $("#answer").empty();
    $(".timer").hide();
    $("#correct").html(correct);
    $("#incorrect").html(incorrect);
    $("#timedOut").html(timedOut);
    $("#end-screen").show();
}

$(".restart").on('click', function () {
    questionNumber = 0;
    $("#end-screen").hide();
    $("#gameArea").show();
    showQuestion();
})

// $(window).load(function(){

$(".timer, .gameArea, #end-screen").hide();
$(".start").on("click", function () {
    showQuestion();
    $("#start-screen").hide();
    $(".timer, .gameArea").show();
});


// });
