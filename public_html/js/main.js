var App = {
    correctWords: 0,
    incorrectWords: 0,
    words: [],
    currentWord: null,
    time: 60
};

App.start = function () {
    this.correctWords = 0;
    this.incorrectWords = 0;
};

App.randAndSetCurrentWord = function () {
    var index = Math.random() * (this.words.length + 1);
    this.currentWord = this.words[index.toFixed()];
    $("#word").html(this.currentWord);
};

App.setCustomWords = function () {
    var content = $("#custom-words").val();
    var buf = content.split(" ");
    this.words = [];
    var that = this;
    buf.forEach(function (word) {
        that.words.push(word.replace(/[.,:;?! ]+/g, '').toLowerCase());
    });
};

App.initTimer = function () {
    $("#time").html("1:00");
    var time = this.time;
    var that = this;
    var timer = setInterval(function () {
        time--;
        var timeStr = "0:" + (time < 10 ? "0" + time : time);
        $("#time").html(timeStr);
        if (time === 0) {
            clearInterval(timer);
            $("#correct-words").html(that.correctWords);
            $("#incorrect-words").html(that.incorrectWords);
            var score = ((that.correctWords / (that.correctWords + that.incorrectWords)) * 100).toFixed();
            $("#score").html(score);
            that.showScore();
        }
    }, 1000);
};

App.initListeners = function () {
    var that = this;
    $("#save-custom-words").on('click', function () {
        that.setCustomWords();
        that.initGame();
    });
    
    $("#word-input").on('keyup', function (evt) {
        if (evt.keyCode === 13) {
            if (that.correctWords + that.incorrectWords === 0) {
                that.initTimer();
            }
            $("#previous-word").html(that.currentWord);
            if ($(this).val() === that.currentWord) {
                $("#previous-word").css('color', 'green');
                that.correctWords++;
            } else {
                $("#previous-word").css('color', 'red');
                that.incorrectWords++;
            }
            $(this).val(that.randAndSetCurrentWord());
        }
    });

    $("#try-again").on('click', function () {
        that.showTyper();
        that.initGame();
    });

    $("#new-words").on('click', function () {
        that.showWordsInput();
    });

};

App.showScore = function () {
    $("#main").hide();
    $("#custom-words-container").hide();
    $("#score-container").show();
};

App.showTyper = function () {
    $("#main").show();
    $("#custom-words-container").hide();
    $("#score-container").hide();
};

App.showWordsInput = function () {
    $("#main").hide();
    $("#custom-words-container").show();
    $("#score-container").hide();
};

App.initGame = function () {
    $("#previous-word").html("");
    this.correctWords = 0;
    this.incorrectWords = 0;
    this.setCustomWords();
    this.randAndSetCurrentWord();
    this.showTyper();
};

$(document).ready(function () {
    App.initListeners();
});

