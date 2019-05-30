'use strict'




class Engine {
	constructor() {

	}

	addClassOneElement(element, elements, cssClass) { //Добавить класс одному элементу, а у других убрать
		let addElement;
		if (typeof elements === "string") {
			addElement = document.querySelectorAll(elements);
		} else {
			addElement = elements;
		}
		for (let k = 0; k < addElement.length; k++) {
			addElement[k].classList.remove(cssClass);
		}
		element.classList.add(cssClass);
	}

	removeClassOneElement(element, elements, cssClass) { //Удалить класс одному элементу, а  другим добавить
		let removeElement;
		if (typeof elements === "string") {
			removeElement = document.querySelectorAll(elements);
		} else {
			removeElement = elements;
		}
		for (let k = 0; k < removeElement.length; k++) {
			removeElement[k].classList.add(cssClass);
		}
		element.classList.remove(cssClass);
	}

	addClassAllElement(element, cssClass) { //Добавить класс всем элементам
		let addElement;
		if (typeof element === "string") {
			addElement = document.querySelectorAll(element);
		} else {
			addElement = element;
		}
		for (let k = 0; k < addElement.length; k++) {
			addElement[k].classList.add(cssClass);
		}
	}

	removeClassAllElement(element, cssClass) { //Удалить класс всем элементам
		let removeElement;
		if (typeof element === "string") {
			removeElement = document.querySelectorAll(element);
		} else {
			removeElement = element;
		}
		for (let k = 0; k < removeElement.length; k++) {
			removeElement[k].classList.remove(cssClass);
		}
	}



}


class GetCode extends Engine {
	constructor() {
		super();

		this.getCode = document.querySelector('.btn-get-code');
		this.str = '';

		this.field = 'foto';

		this.triggerBtn = document.querySelectorAll('.trigger-btn');
		this.triggerFoto = document.querySelector('.trigger-foto');
		this.triggerSlider = document.querySelector('.trigger-slider');
		this.notSlider = document.querySelectorAll('.not-slider');
		this.withSlider = document.querySelectorAll('.with-slider');

		this.dataNum = {};
		this.options = {};
		this.clear = document.querySelector('.clear');



		this.triggerFoto.addEventListener('click', (event) => {
			let target = event.currentTarget;
			this.removeClassOneElement(target, this.triggerBtn, 'disabled');
			this.field = 'foto';
			this.changeOptionsField();
		}, false);

		this.triggerSlider.addEventListener('click', (event) => {
			let target = event.currentTarget;
			this.removeClassOneElement(target, this.triggerBtn, 'disabled');
			this.field = 'slider';
			this.changeOptionsField();
		}, false);

		this.getCode.addEventListener('click', (event) => {
			this.createData();
		}, false);

		this.clear.addEventListener('click', (event) => {
			this.clearInput('.data-num input');
		}, false);

		document.addEventListener('keyup', (event) => {
			if (event.keyCode === 27) { //Esc
				this.clearInput('.data-num input');
			} else if (event.keyCode === 13) { //Enter
				this.createData();
			} else if (event.keyCode === 32) { //Space
				this.changeCheckBox('.not-description', '.with-description');
			}
		}, false);

	}


	createData() {
		this.dataNum = {
			num: +document.querySelector('#num').value,
			startNum: +document.querySelector('#start-num').value,
			endNum: +document.querySelector('#end-num').value,
			only: +document.querySelector('#only').value,
			pass: +document.querySelector('#pass').value,
		};

		this.options = {
			withDescription: document.querySelector('.not-description').checked,
			withJpg: document.querySelector('.with-jpg').checked,
			withFrame: document.querySelector('.not-frame').checked,
			withObj: document.querySelector('.not-obj').checked,
			addClassImg: document.querySelector('#add-class-img').value,
			wrapperClass: document.querySelector('#wrapper-class').value,
			marginTop: document.querySelector('#margin-top').value,
			marginTopUnit: document.querySelector('#margin-top-unit').value,
			marginBottom: document.querySelector('#margin-bottom').value,
			marginBottomUnit: document.querySelector('#margin-bottom-unit').value,
			codeTop: document.querySelector('#code-top').value,
			codeBottom: document.querySelector('#code-bottom').value,
			path: document.querySelector('#path').value,
		};


		if (!this.dataNum.num) {
			if (!this.dataNum.endNum) {
				if (!this.dataNum.only) {
					this.dataNum.num = 1;
				} else {
					this.dataNum.num = this.dataNum.only;
				}
			} else {
				this.dataNum.num = this.dataNum.endNum;
			}
		} else {
			this.dataNum.num = +this.dataNum.num;
		}


		console.log(this.dataNum.num);







		if (this.field === 'foto') {
			this.createFotoCode();
		} else {
			this.createSliderCode();
		}
	}



	createFotoCode() {
		console.log('foto');
	}

	createSliderCode() {
		console.log('slider');
	}


	changeOptionsField() {
		if (this.field === 'foto') {
			this.removeClassAllElement(this.notSlider, 'd-n');
			this.addClassAllElement(this.withSlider, 'd-n');
		} else {
			this.removeClassAllElement(this.withSlider, 'd-n');
			this.addClassAllElement(this.notSlider, 'd-n');
		}
	}

	clearInput(selector) {
		let input = document.querySelectorAll(selector);
		for (let k = 0; k < input.length; k++) {
			input[k].value = '';
		}
	}

	changeCheckBox(one, two) {
		let oneCB = document.querySelector(one);
		let twoCB = document.querySelector(two);

		if (oneCB.checked) {
			oneCB.checked = false;
			twoCB.checked = true;
		} else {
			twoCB.checked = false;
			oneCB.checked = true;
		}
	}



}


const getCode = new GetCode();