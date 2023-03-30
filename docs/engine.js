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
				correctCnt: 0,
			},
			examContext: {
				currentQuestion: 0,
				data: examData,
				name: 'exam',
				correctCnt: 0,
			},
			psychContext: {
				currentQuestion: 0,
				data: psychData,
				name: 'psych',
				correctCnt: 0,
			},
			personTypeRKContext: {
				currentQuestion: 0,
				data: personTypeRKData,
				name: 'personTypeRK',
				correctCnt: 0,
			},
			personTypeExamContext: {
				currentQuestion: 0,
				data: personTypeExamData,
				name: 'personTypeExam',
				correctCnt: 0,
			},
		};
	}

	var currentContext = contexts[currentSource];

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
		answerDiv.setAttribute("onclick", "answer(this,'" + currentSource + "')");

		answerDiv.innerText = key + ') ' + answer;

		answersDiv.appendChild(answerDiv);
	}

	var divCorrectCnt = document.getElementById('correctCnt');
	divCorrectCnt.innerText = currentContext.correctCnt;

	var divWrongCnt = document.getElementById('wrongCnt');
	divWrongCnt.innerText = currentContext.currentQuestion - 1 - currentContext.correctCnt;
}

function answer(divAnswer, source)
{
	var divCorrectAnswer = document.getElementById('correctAnswer');

	if (divCorrectAnswer.classList.contains(class_ok)) {
		// This question already has been answered
		return;
	}

	if (divAnswer == divCorrectAnswer) {
		divAnswer.classList.add(class_ok);

		var currentContext = contexts[source];
		currentContext.correctCnt++;

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

	if (radio.id == 'radioPersonTypeRK') {
		currentSource = 'personTypeRKContext';
	}

	if (radio.id == 'radioPersonTypeExam') {
		currentSource = 'personTypeExamContext';
	}
}
