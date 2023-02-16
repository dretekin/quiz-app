const quiz = [
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

// createCard();
let quizCounter = 0;
const quizLength = quiz.length - 1;
let playerScore = 0;
console.log(quizLength);

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const currQuizCard = document.querySelector(".quizCard");

	const userAnswer = currQuizCard.querySelector(
		'input[name="answer"]:checked'
	).value;

	if (userAnswer == quizAnswersArr[quizCounter]) playerScore++;

	if (quizCounter == quizLength) {
		currQuizCard.remove();

		form.querySelector("input[type=submit]").value = "try again";
		// player score start from 0
		if (playerScore) printResult(playerScore++);
		return;
	}

	console.log(playerScore);

	currQuizCard.remove();

	quizCounter++;

	createCard(quiz[quizCounter]);
});

function printResult() {
	const resultEle = document.createElement("p");
	resultEle.setAttribute("class", "result");
	const resultText = document.createTextNode(
		`You answered ${playerScore} out of 10 questions correctly!`
	);
	resultEle.appendChild(resultText);
	form.prepend(resultEle);
}

createCard(quiz[0]);

function createCard(quizObj) {
	const quizCard = document.createElement("section");
	quizCard.setAttribute("class", "quizCard");

	const answerItems = document.createElement("ul");
	answerItems.setAttribute("class", "answers");

	const question = document.createElement("h2");
	const questionText = document.createTextNode(quizObj.question);
	question.setAttribute("class", "question");
	question.appendChild(questionText);

	quizCard.appendChild(question);

	createAnswers(quizObj.answers);

	function createAnswers(asnwers) {
		const answerArr = asnwers;

		answerArr.forEach((answer, index) => {
			const answerItem = document.createElement("li");
			answerItem.setAttribute("class", "answer-option-item");

			answerItems.appendChild(answerItem);

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
	}

	quizCard.appendChild(answerItems);

	form.prepend(quizCard);
}
