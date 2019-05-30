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
		this.getCodeTextarea = document.querySelector('#field-get-code');
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
			} else if (event.keyCode === 32 && event.ctrlKey) { //Ctrl + Space
				this.changeCheckBox('.not-description', '.with-description');
			}
		}, false);

	}


	createData() {
		this.dataNum = {
			num: +document.querySelector('#num').value,
			startNum: +document.querySelector('#start-num').value,
			endNum: +document.querySelector('#end-num').value,
			only: document.querySelector('#only').value,
			pass: document.querySelector('#pass').value,
		};

		this.options = {
			notDescription: document.querySelector('.not-description').checked,
			withJpg: document.querySelector('.with-jpg').checked,
			notFrame: document.querySelector('.not-frame').checked,
			notObj: document.querySelector('.not-obj').checked,
			addClassImg: document.querySelector('#add-class-img').value,
			//wrapperClass: document.querySelector('#wrapper-class').value,
			marginTop: document.querySelector('#margin-top').value,
			marginTopUnit: document.querySelector('#margin-top-unit').value,
			marginBottom: document.querySelector('#margin-bottom').value,
			marginBottomUnit: document.querySelector('#margin-bottom-unit').value,
			codeTop: document.querySelector('#code-top').value,
			codeBottom: document.querySelector('#code-bottom').value,
			path: document.querySelector('#path').value,
		};


		this.dataNum.arrOnly = this.dataNum.only.split(' ');
		this.dataNum.max = Math.max.apply(null, this.dataNum.arrOnly); //максимальное число из массива

		this.dataNum.startNum = this.dataNum.startNum || 1; //начать с


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
		}


		this.options.withJpg ? this.options.withJpg = 'jpg' : this.options.withJpg = 'png';
		this.options.notFrame ? this.options.notFrame = '' : this.options.notFrame = 'frame';
		this.options.notObj ? this.options.notObj = '' : this.options.notObj = 'obj';


		this.options.marginTop = this.options.marginTop || "2";
		this.options.marginBottom = this.options.marginBottom || "2";
		this.options.marginTopUnit = this.options.marginTopUnit || "rem";
		this.options.marginBottomUnit = this.options.marginBottomUnit || "rem";




		if (this.dataNum.startNum > this.dataNum.num) {
			this.dataNum.num = this.dataNum.startNum;
		}




		console.log(this.dataNum.startNum);
		console.log(this.dataNum.num);



		if (this.field === 'foto') {
			this.createFotoCode();
		} else {
			this.createSliderCode();
		}
	}




	createFotoCode() {
		if (this.options.notDescription) {
			for (let k = this.dataNum.startNum; k <= this.dataNum.num; k++) {
				if (k < 10) {
					k = "0" + k;
				}
				this.str = this.str + this.options.codeTop + `\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ${this.options.marginTop}${this.options.marginTopUnit}; margin-bottom: ${this.options.marginBottom}${this.options.marginBottomUnit}">\n<a href="${this.options.path + k}.${this.options.withJpg}" itemprop="contentUrl" data-size="">\n<img src="${this.options.path + k}.${this.options.withJpg}" itemprop="thumbnail" class="${this.options.addClassImg} ${this.options.notFrame}" />\n</a>\n</figure>\n</div>\n` + this.options.codeBottom;
			}
		} else {
			for (let k = this.dataNum.startNum; k <= this.dataNum.num; k++) {
				if (k < 10) {
					k = "0" + k;
				}
				this.str = this.str + `\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ${this.options.marginTop}${this.options.marginTopUnit}; margin-bottom: ${this.options.marginBottom}${this.options.marginBottomUnit}">\n<a href="${this.options.path + k}.${this.options.withJpg}" itemprop="contentUrl" data-size="">\n<img src="${this.options.path + k}.${this.options.withJpg}" itemprop="thumbnail" class="${this.options.addClassImg} ${this.options.notFrame}" />\n</a>\n<figcaption itemprop="caption description">\n\n </figcaption>\n</figure>\n</div>\n<figcaption itemprop="caption description">\n\n</figcaption>\n`;
			}
		}

		this.copyCode();
	}



	createSliderCode() {
		console.log('slider');
	}






	copyCode() {

		this.getCodeTextarea.value = this.str;

		//Автоматическое копирование в буфер обменм
		this.getCodeTextarea.select();
		document.execCommand("copy");
		//Автоматическое копирование в буфер обменм end

		this.str = '';
	}





	changeOptionsField() { //Смена между фото и слайдером
		if (this.field === 'foto') {
			this.removeClassAllElement(this.notSlider, 'd-n');
			this.addClassAllElement(this.withSlider, 'd-n');
		} else {
			this.removeClassAllElement(this.withSlider, 'd-n');
			this.addClassAllElement(this.notSlider, 'd-n');
		}
	}

	clearInput(selector) { // очистить определенные input
		let input = document.querySelectorAll(selector);
		for (let k = 0; k < input.length; k++) {
			input[k].value = '';
		}
	}

	changeCheckBox(one, two) { // поменять включение между двумя чекбоксами
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