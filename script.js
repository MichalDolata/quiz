/**
 * Created by preb on 19.05.16.
 */
(function(){
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    var quiz = {
        questions: [],
        currentQuestion: 1,
        points: 0,
        quizDOM: document.getElementById("quiz"),
    
        init: function() {
            var button = document.getElementById("next");
            var quiz = this;
            this.loadQuestions();
            if(!button.onclick) {
                button.onclick = function () {
                    quiz.nextQuestion();
                }
            }
            this.displayQuestion();
        },

        loadQuestions: function() {
            this.questions.push(new Question("Question 1", ["answer1", "answer2",
                "answer3", "answer4"], 1));
            this.questions.push(new Question("Question 2", ["odpowiedz1", "odpowiedz2",
                "odpowiedz3", "odpowiedz4"], 2));
            this.questions.push(new Question("Question 3", ["answer1", "answer2",
                "answer3", "answer4"], 3));
            this.questions.push(new Question("Question 4", ["answer1", "answer2",
                "answer3", "answer4"], 4));
        },
        
        displayQuestion: function() {
            var question = this.questions[this.currentQuestion-1], i;
            if(this.currentQuestion === 1) {
                document.getElementById("question").innerHTML = question.question;
                for(i = 0; i < 4; i++) {
                    document.getElementById("answer" + (i + 1)).innerHTML = question.answers[i];
                }
            } else {
                document.getElementById("question").classList.add("hidden");
                document.getElementById("answers-form").classList.add("hidden");
                setTimeout(function () {
                    document.getElementById("question").innerHTML = question.question;
                    for(i = 0; i < 4; i++) {
                        document.getElementById("answer" + (i + 1)).innerHTML = question.answers[i];
                    }
                    document.getElementById("question").classList.remove("hidden");
                    document.getElementById("answers-form").classList.remove("hidden");
                }, 500);
            }
            document.getElementById("bar").style.width = ((this.currentQuestion - 1) /
                this.questions.length) * 100 + "%";
        },
        
        nextQuestion: function() {
            var answers = document.getElementById("answers-form");
            var answer = "";
            var i;
            for(i = 0; i < 4; i++) {
                if(answers[i].checked) {
                    answer = answers[i].value;
                    break
                }
            }

            if(answer === "") {
                console.log("ERROR");
            } else {
                if(answer == this.questions[this.currentQuestion-1].correctAnswer) {
                    console.log("GOOD JOB");
                    this.points++;
                } else {
                    console.log("BAD JOB");
                }
                this.currentQuestion++;
                if(this.currentQuestion <= this.questions.length) {
                    this.displayQuestion();
                } else {
                    this.displayResult();
                }
            }
        },

        displayResult: function() {
            var quiz = this;
            document.getElementById("question").classList.add("hidden");
            document.getElementById("answers-form").classList.add("hidden");
            setTimeout(function() {
                document.getElementById("answers").innerHTML = "<span class=\"hidden\">" + quiz.points + " points</span>";
                document.getElementById("bar").style.width = "100%";
                document.getElementById("question").innerHTML = "Your result:";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("question").classList.remove("hidden");
            }, 500);
            setTimeout(function () {
                document.getElementById("answers").getElementsByTagName("span")[0].classList.remove("hidden");
            }, 600);

        }
    };

    quiz.init();
})();