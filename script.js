const quizData = [
	{
		question:
			"What tag is used to define a container for an external app or plug-in",
		answers: ["<caption>", "<!DOCTYPE>", "<code>", "<embed>"],
	},
	{
		question: "What tag is used to define a standard cell inside a table",
		answers: ["<h1> to <h6>", "<td>", "<button>", "<footer>"],
	},
	{
		question: "What tag is used to define a hyperlink, or link to another page",
		answers: ["<a>", "<em>", "<strong>", "<blockquote>"],
	},
	{
		question: "What tag is used to define a list item (in a bulleted list)",
		answers: ["<s>", "<ul>", "<u>", "<li>"],
	},
	{
		question:
			"What tag is used to define an interactive field where users can enter data?",
		answers: ["<dialog>", "<enterpoint>", "<datalist>", "<input>"],
	},
	{
		question:
			"What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
		answers: ["<head></head>", "<br></br>", "<body></body>", "<title></title>"],
	},
	{
		question:
			"What tag is used to specify a section of text that provides an example of computer code?",
		answers: ["<embed>", "<code>", "<caption>", "<!DOCTYPE>"],
	},
	{
		question:
			"What tag is used to specify a section of text that has been quoted from another source?",
		answers: ["<em>", "<strong>", "<blockquote>", "<a>"],
	},
	{
		question:
			"What tag can be used to insert a line break or blank line in an HTML document?",
		answers: ["<br></br>", "<body></body>", "<head></head>", "<title></title>"],
	},

	{
		question: "What tag is used to define a table or image notation (caption)?",
		answers: ["<caption>", "<code>", "<embed>", "<!DOCTYPE>"],
	},
];

const quizAnswersArr = [
	"<embed>",
	"<td>",
	"<a>",
	"<li>",
	"<input>",
	"<head></head>",
	"<code>",
	"<blockquote>",
	"<br></br>",
	"<caption>",
];

const form = document.querySelector("form");

let quizCount = 0;
let correctScoreCount = 0;
// let totalScore = 0;
let quizComplete = false;

form.addEventListener("submit", (event) => {
	event.preventDefault();

	// if (userAnswer == quizAnswersArr[quizCounter]) playerScore++;

	// if (quizCounter == quizLength) {
	// 	currquestionAndAnswers.remove();

	// 	form.querySelector("input[type=submit]").value = "try again";
	// 	// player score start from 0
	// 	if (playerScore) printResult(playerScore++);
	// 	return;
	// }

	// console.log(playerScore);

	const currQuestionAndAnswers = document.querySelector(
		".question-and-answers-container"
	);

	// check for last card
	if (!quizComplete && quizCount >= quizData.length) {
		getAndMarkUserAnswer();
		currQuestionAndAnswers.remove();
		quizComplete = true;
		setFormHeight(0);

		const totalScore = (correctScoreCount / quizData.length) * 100;
		form.prepend(createScoreEle(totalScore));

		document.querySelector("input[type=submit]").value = "Restart";

		return;
	}

	if (quizComplete) {
		window.location.reload();
		return;
	}

	// if (quizCount >= quizData.length - 1) {

	// }
	getAndMarkUserAnswer();

	currQuestionAndAnswers.remove();

	createCard(quizData[quizCount]);

	// setFormHeight(100);

	// quizCounter++;

	function getAndMarkUserAnswer() {
		const userAnswer = currQuestionAndAnswers.querySelector(
			'input[name="answer"]:checked'
		).value;

		if (userAnswer == quizAnswersArr[quizCount - 1]) correctScoreCount++;
	}
});

createCard(quizData[quizCount]);
// createCard(quizData[1], createAnswers);

/**
 *
 * @param {number} questionAndAnswersContainerHeight
 */
function setFormHeight(questionAndAnswersContainerHeight) {
	document.documentElement.style.setProperty(
		"--form-top-padding",
		`${questionAndAnswersContainerHeight}px`
	);
}

/**
 *
 * @param {number} score
 * @returns html element
 */
function createScoreEle(score) {
	const scoreEle = document.createElement("h2");
	const scoreText = document.createTextNode(`Your score is ${score}%`);
	scoreEle.setAttribute("class", "result");
	scoreEle.appendChild(scoreText);
	return scoreEle;
}

/**
 *
 * @param {object} questionAndAnswers
 */
function createCard(questionAndAnswers) {
	quizCount++;
	// question and aswers container
	const questionAndAnswersContainer = document.createElement("section");
	questionAndAnswersContainer.setAttribute(
		"class",
		"question-and-answers-container"
	);

	// question container
	const question = document.createElement("h2");
	const questionText = document.createTextNode(questionAndAnswers.question);
	question.setAttribute("class", "question");
	question.appendChild(questionText);

	questionAndAnswersContainer.appendChild(question);

	const answerItems = createAnswers(questionAndAnswers.answers);

	questionAndAnswersContainer.appendChild(answerItems);

	form.prepend(questionAndAnswersContainer);

	const currQuestionAndAnswersContainerHeight =
		questionAndAnswersContainer.getBoundingClientRect().height;

	setFormHeight(currQuestionAndAnswersContainerHeight);
}

/**
 *
 * @param {array} asnwers
 */
function createAnswers(answersArray) {
	// answers items container
	const answerItems = document.createElement("ul");
	answerItems.setAttribute("class", "answers");

	answersArray.forEach((answer, index) => {
		const answerItem = document.createElement("li");
		answerItem.setAttribute("class", "answer-option-item");

		// answerItems.appendChild(answerItem);

		const answerInput = document.createElement("input");
		answerInput.setAttribute("type", "radio");
		answerInput.setAttribute("id", "option-" + index);
		answerInput.setAttribute("class", "answer-input");
		answerInput.setAttribute("name", "answer");
		answerInput.setAttribute("value", answer);
		answerInput.required = true;

		answerItem.appendChild(answerInput);

		const inputLabel = document.createElement("label");
		const inputLabelText = document.createTextNode(answer);
		const codeFormat = document.createElement("code");
		codeFormat.appendChild(inputLabelText);
		inputLabel.appendChild(codeFormat);
		inputLabel.setAttribute("for", "option-" + index);
		inputLabel.setAttribute("class", "answer-label");

		answerItem.appendChild(inputLabel);

		answerItems.appendChild(answerItem);
	});

	return answerItems;
}
