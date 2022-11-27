var currentQuestion = 0;
var shuffled = 0;

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
	if (shuffled === 0) {
		testData = shuffle(testData);
		shuffled = 1;
	}

	var len = testData.length;

	if (len === 0) {
		alert('Empty testData!');
		return
	}

	var question = testData[currentQuestion++ % len];

	var divQuestion = document.getElementById('question');

	divQuestion.innerText = question.question;

	var order = shuffle([1, 2, 3, 4, 5]);
	var classes = ['answerA', 'answerB', 'answerC', 'answerD', 'answerE'];

	for (var i = 0; i < classes.length; i++) {
		var className = classes[i];
		var divAnswer = document.getElementsByClassName(className)[0];
		var id = order.splice(-1);

		divAnswer.id = id;
		divAnswer.firstElementChild.innerText = question.answers[id];

		divAnswer.classList.remove(class_ok);
		divAnswer.classList.remove(class_wrong);
	}
}

function answer(divAnswer)
{
	var divCorrectAnswer = document.getElementById('1');

	if (divCorrectAnswer.classList.contains(class_ok)) {
		return;
	}

	if (divAnswer == divCorrectAnswer) {
		divAnswer.classList.add(class_ok);
		return;
	}

	divAnswer.classList.add(class_wrong);
	divCorrectAnswer.classList.add(class_ok);
}