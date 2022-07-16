import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from '../../node_modules/ngx-bootstrap';
import { QuestionClass } from './question-class';
import { ToastrService } from 'ngx-toastr';




@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number;
	questionObj = new QuestionClass();
	@ViewChild('submitModal') submitModal: ModalDirective;
	@ViewChild('addQuestionModal') addQuestionModal : ModalDirective;
	@ViewChild('answerModal') answerModal : ModalDirective;
	@ViewChild('questionForm') questionForm: any;
	@ViewChild('questionTest') questionTest : any;

	constructor( private toastr: ToastrService) { }

	answerArray = [];

	allQuestions: any = [{
		"id": 1,
		"question": "Which of the following numbers gives 240 when added to its own square?",
		"a": "15",
		"b": "20",
		"c": "16",
		"d": "18",
		"answer": "a"
	},
	{
		"id": 2,
		"question": "The simplest form of 1.5 : 2.5 is ………",
		"a": "6 : 10",
		"b": "15 : 25",
		"c": "0.75 : 1.25",
		"d": "3 : 5",
		"answer": "d"
	},
	{
		"id": 3,
		"question": "Evaluation of 83 × 82 × 8-5 is ………",
		"a": "1",
		"b": "0",
		"c": "8",
		"d": "None of these",
		"answer": "a"
	},
	{
		"id": 4,
		"question": "125 gallons of a mixture contains 20% water. What amount of additional water should be added such that water content be raised to 25%?",
		"a": "15/2 gallons",
		"b": "17/2 gallons",
		"c": "19/2 gallons",
		"d": "25/3 gallons",
		"answer": "d"
	}
	];

	/**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
				this.totalAnswered++;
				if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
					this.rightAnswer++;
				}
			}

		}
		this.submitModal.show();

	}

	startQuiz() {
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i]) {
				delete this.allQuestions[i]["selected"];
			}

		}
		this.questionTest.reset();
		this.isQuestionCardShow = true;

	}
	HomePage() {
		this.isQuestionCardShow = false;
	}
	addQuestion(){
		this.addQuestionModal.show();
	}
	submitAddQuestion(){
		let quesTemp = JSON.parse(JSON.stringify(this.questionObj));
		quesTemp["id"] = this.allQuestions.length+1;
		this.allQuestions.push(quesTemp);
		this.questionForm.reset();
		this.toastr.success("Question Added Successfully!!");
		this.addQuestionModal.hide();

	}
	checkAnswers(){
		this.submitModal.hide();
		this.answerModal.show();
	}

	ngOnInit() {



	}

}
