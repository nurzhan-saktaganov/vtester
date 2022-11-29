var contexts, currentSource = 'rk2Context';

var class_ok = 'alert-success';
var class_wrong = 'alert-danger';

function shuffle(array)
{
	var currentIndex = array.length;
  
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  var randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }

function nextQuestion()
{
	if (!contexts) {
		contexts = {
			rk2Context: {
				currentQuestion: 0,
				data: rk2Data,
				name: 'rk2',
			},
			examContext: {
				currentQuestion: 0,
				data: examData,
				name: 'exam',
			},
			psychContext: {
				currentQuestion: 0,
				data: psychData,
				name: 'psych',
			},
		};
	}

	currentContext = contexts[currentSource];

	if (currentContext.currentQuestion == 0) {
		currentContext.data = shuffle(currentContext.data);
	}

	var len = currentContext.data.length;

	if (len === 0) {
		alert('Empty testData!');
		return
	}

	var question = currentContext.data[currentContext.currentQuestion++ % len];

	var divQuestion = document.getElementById('question');
	divQuestion.innerText = currentContext.name + '[' + currentContext.currentQuestion.toString() + '/' + len.toString() + "]: " + question.question;

	var answersDiv = document.getElementById('answers');

	// clear answers div content
	answersDiv.innerHTML = '';

	var correctAnswerKey = question.correctAnswer;

	var keys = Object.keys(question.answers);
	keys.sort();

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var answer = question.answers[key];

		var answerDiv = document.createElement("div");

		answerDiv.classList.add('alert');
		answerDiv.classList.add('alert-secondary');
		answerDiv.setAttribute("role", "alert");

		if (key == correctAnswerKey) {
			answerDiv.id = "correctAnswer";
		}

		// add handler
		answerDiv.setAttribute("onclick", "answer(this)");

		answerDiv.innerText = key + ') ' + answer;

		answersDiv.appendChild(answerDiv);
	}
}

function answer(divAnswer)
{
	var divCorrectAnswer = document.getElementById('correctAnswer');

	if (divCorrectAnswer.classList.contains(class_ok)) {
		// This question already has been answered
		return;
	}

	if (divAnswer == divCorrectAnswer) {
		divAnswer.classList.add(class_ok);
		return;
	}

	divAnswer.classList.add(class_wrong);
	divCorrectAnswer.classList.add(class_ok);
}

function selectSource(radio)
{
	if (radio.id == 'radioRK2') {
		currentSource = 'rk2Context';
	}

	if (radio.id == 'radioExam') {
		currentSource = 'examContext';
	}

	if (radio.id == 'radioPsych') {
		currentSource = 'psychContext';
	}
}
