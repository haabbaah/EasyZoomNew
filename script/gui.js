function handleFileSelect(evt) {


	let files = evt.target.files; // FileList object

	let itemOption = `<form class="item">
											<p>
												<label>
													<input type="checkbox" id="gui-frame" />
													<span>С рамкой</span>
												</label>
											</p>
										</form>
										<div class="input-field item">
											<input id="gui-my-img-class" type="text" placeholder="Класс для img">
										</div>
										<div class="input-field item">
											<input id="gui-my-class" type="text" placeholder="Обернуть в свой класс">
										</div>
										<div class="input-field item">
											<input id="gui-mTop" type="text" placeholder="Отступ сверху">
										</div>
										<div class="input-field item">
											<input id="gui-mBottom" type="text" placeholder="Отступ снизу">
										</div>`;


	// Loop through the FileList and render image files as thumbnails.
	for (let i = 0, f; f = files[i]; i++) {

		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}

		let reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				// Render thumbnail.
				let div = document.createElement('div');
				div.classList.add('dad-block');
				div.dataset.indexNumber = getNumFromText(escape(theFile.name));
				div.innerHTML = [`
				<div class="wrap-img-btn">
					<div>
						 <img class="thumb" src="${e.target.result}" title="${escape(theFile.name)}"/> 
					</div>
					<button class="gui-btn-option">
					<i class="material-icons">settings</i>
					</button>
				</div> 
				<strong data-name="${escape(theFile.name)}">${escape(theFile.name)}
					<i class="del-item material-icons">delete</i><label class="slider-connect"><input type="checkbox" /><span></span></label>
				</strong> 
				<textarea class="description"></textarea>
				<div class="wrapper-element">
					<div class="option-item">
						${itemOption}
					</div>
				</div>`].join('');
				document.getElementById('list').insertBefore(div, null);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}

	setTimeout(() => {
		sort();
	}, 150);

}


document.getElementById('files').addEventListener('change', handleFileSelect, false);








function getNumFromText(text) {
	text = +text.split('.')[0];
	return text;
}


function sort() {
	let items = $('#list .dad-block');
	let arItems = $.makeArray(items);
	arItems.sort(function (a, b) {
		return $(a).data("index-number") - $(b).data("index-number");
	});
	$(arItems).appendTo("#list");
}







let resultGui = $("#result-gui");
let strGui = '';
let strSlider = '';

let sliderID = 0;


//let guiSlider = false;


let guiOption = {};

function getGuiCode() {
	$(".gui-body .dad-block").each(function () {

		guiOption.sliderID = $(this).find('strong').attr('data-slider-id');
		if (guiOption.sliderID) {
			return;
		}

		descr = $(this).find(".description").val();

		guiOption.name = $(this).find('strong').attr('data-name');
		guiOption.gFrame = $(this).find('#gui-frame').prop('checked');
		guiOption.gDataSize1 = $(this).find('#gui-dataSize1').val();
		guiOption.gDataSize2 = $(this).find('#gui-dataSize2').val();
		guiOption.gMyImgClass = $(this).find('#gui-my-img-class').val();
		guiOption.gMyClass = $(this).find('#gui-my-class').val();
		guiOption.gMTop = $(this).find('#gui-mTop').val();
		guiOption.gMBottom = $(this).find('#gui-mBottom').val();
		//guiOption.gPath = $(this).find('#gui-path').val();



		if (descr) {
			maxGui(guiOption, descr);
		} else {
			minGui(guiOption);
		}

		/* if (guiSlider) {
			sliderGui(guiOption, descr);
		} else {
			if (descr) {
				maxGui(guiOption, descr);
			} else {
				minGui(guiOption);
			}
		} */
	});





	/* 
		if (guiSlider) {
			guiOption.gMTop = guiOption.gMTop || "2";
			guiOption.gMBottom = guiOption.gMBottom || "2";
			strGui = '\n<div class="zooming sliding_gallery" itemscope style="margin-top: ' + guiOption.gMTop + 'rem; margin-bottom: ' + guiOption.gMBottom + 'rem;">\n' + strGui + '\n</div>\n';
		} */
}

function getGuiCodeSlider() {
	let sliderArray = [];

	for (let k = 0; k < sliderID; k++) {
		let item = document.querySelectorAll('.gui-body .dad-block strong[data-slider-id ="' + k + '"]');
		sliderArray[k] = item;
	}

	for (let m = 0; m < sliderArray.length; m++) {
		let str = '';
		for (const iterator of sliderArray[m]) {
			let descr = iterator.nextElementSibling.value;
			let name = iterator.getAttribute('data-name');
			str = sliderGui(name, descr, str);
		}
		strGui = strGui + `
		<div class = "zooming sliding_gallery" itemscope style = "margin-top: 2rem; margin-bottom: 2rem;"> 
		  ${str}
    </div>
		`;
	}

}




function sliderGui(name, description, strInner) {
	strInner = strInner + `
	<figure itemprop="associatedMedia">
		<a href="${name}" itemprop="contentUrl" data-size="">
			<img src="${name}" itemprop="thumbnail" class="item " />
		</a>
		<figcaption itemprop="caption description">
			${description}
		</figcaption>
		<pswp__caption__center itemprop="caption description">
			<div class="caption_padding">
				${description}
			</div>
		</pswp__caption__center>
	</figure>
	`;
	return strInner;
}


function minGui(guiOption) {
	let opt = checkOption(guiOption);

	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "2";
	strGui = strGui + opt.gMyClassStart + `
	<div class="zooming">
		<figure itemprop="associatedMedia" style="margin-top: ${opt.gMTop}rem; margin-bottom: ${opt.gMBottom}rem">
			<a href="${opt.name}" itemprop="contentUrl" data-size="">
				<img src="${opt.name}" itemprop="thumbnail" class="${opt.gFrame} ${opt.gMyImgClass}" />
			</a>
		</figure>
	</div>
	` + opt.gMyClassEnd;
}

function maxGui(guiOption, description) {
	let opt = checkOption(guiOption);
	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "1";
	strGui = strGui + opt.gMyClassStart + `
	<div class="zooming">
		<figure itemprop="associatedMedia" style="margin-top: ${opt.gMTop}rem; margin-bottom: ${opt.gMBottom}rem">
			<a href="${opt.name}" itemprop="contentUrl" data-size="">
				<img src="${opt.name}" itemprop="thumbnail" class="${opt.gFrame} ${opt.gMyImgClass}" />
			</a>
			<figcaption itemprop="caption description">
				${description}
			</figcaption>
		</figure>
	</div>${opt.gMyClassEnd}
	<figcaption itemprop="caption description">
		${description}
	</figcaption>
	`;
}























function checkOption(guiOption) {
	guiOption.gFrame ? guiOption.gFrame = 'frame' : guiOption.gFrame = '';

	if (!guiOption.gMyImgClass) {
		guiOption.gMyImgClass = '';
	}


	if (guiOption.gMyClass) {
		guiOption.gMyClassStart = '\n<div class="' + guiOption.gMyClass + '">';
		guiOption.gMyClassEnd = '</div>\n';
	} else {
		guiOption.gMyClassStart = '';
		guiOption.gMyClassEnd = '';
	}

	return guiOption;
}



function connectItemsInSlider() {
	const randomColor = getRandomColor(.5);
	let sliderIdInner = sliderID++;
	$(".gui-body .dad-block strong").each(function () {
		let input = $(this).find('input').prop('checked');
		if (input) {
			$(this).css("background-color", randomColor);
			$(this).attr('data-slider-id', sliderIdInner);
			$(this).parent(".dad-block").attr('data-slider-id', sliderIdInner);
			$(this).find('input').prop('checked', false);
		}
		/* else {
			$(this).css("background-color", '#fff');
		} */
	});
}


function getRandomColor(opacity) {
	return `hsla(${Math.random() * 360}, 100%, 70%, ${opacity})`;
}




$(".gui-btn-get-code").on("click", function () {
	strGui = '';
	resultGui.val('');
	getGuiCode();
	getGuiCodeSlider();
	resultGui.val(strGui);

	//Автоматическое копирование в буфер обменм
	event.preventDefault();
	resultGui.select();
	document.execCommand("copy");
	//Автоматическое копирование в буфер обменм end

});








//Общие настройки
$("#gui-comm-frame").on("input", function (e) {
	if ($(this).prop('checked')) {
		$(".drag-create .wrapper-element #gui-frame").each(function () {
			$(this).prop("checked", true);
		});
	} else {
		$(".drag-create .wrapper-element #gui-frame").each(function () {
			$(this).prop("checked", false);
		});
	}
});


$("#gui-comm-img-class").on("input", function (e) {
	let c = $(this).val();
	$(".gui-body .wrapper-element #gui-my-img-class").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-my-class").on("input", function (e) {
	let c = $(this).val();
	$(".gui-body .wrapper-element #gui-my-class").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-mTop").on("input", function (e) {
	let c = $(this).val();
	$(".drag-create .wrapper-element #gui-mTop").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-mBottom").on("input", function (e) {
	let c = $(this).val();
	$(".drag-create .wrapper-element #gui-mBottom").each(function () {
		$(this).val(c);
	});
});














//Объединение в слайдер
document.querySelector('.btn-gui-slider').addEventListener('click', function () {
	connectItemsInSlider();
	//sortSlider();
}, false);


//Сортировка
document.getElementById('sort').addEventListener('click', sort, false);


//Удаление элемента
$(".gui-body").on("click", '.dad-block .del-item', function (e) {
	$(this).parents('.dad-block').remove();
	sort();
});


//Раскрытие/скрытие опций
$(".gui-body").on("click", '.dad-block .gui-btn-option', function (e) {
	$(this).parent().siblings(".wrapper-element").fadeToggle("fast");
});







//Удобное выделение для слайдера


document.addEventListener('keyup', addHotKeySlider, false);
let sliderBkg = document.querySelector('.slider-bkg');
let bodyGradient = document.querySelector('.body-gradient');

let sliderFlag = true;

function addHotKeySlider(event) {
	if (sliderFlag) {
		$('.gui-body').on('click', '.wrap-img-btn div', function () {
			$(this).parent(".wrap-img-btn").next().find('input').prop('checked', true);
		});
		sliderFlag = false;
	} else {
		$('.gui-body').off('click', '.wrap-img-btn div');
		sliderFlag = true;
	}


	bodyGradient.classList.toggle('d-n');

	if (event.keyCode === 16) { //Shift
		sliderBkg.classList.toggle('d-n');
	}
}





//Прилипание блокок к верху
Array.prototype.slice.call(document.querySelectorAll('.btn-gui-slider, .gui-btn-get-code')).forEach(function (a) { // селекторы блоков, которые будут фиксироваться. Может быть как один блок, так два и более
	var b = null,
		P = 0;
	window.addEventListener('scroll', Ascroll, false);
	document.body.addEventListener('scroll', Ascroll, false);

	function Ascroll() {
		if (b == null) {
			var Sa = getComputedStyle(a, ''),
				s = '';
			for (var i = 0; i < Sa.length; i++) {
				if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
					s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
				}
			}
			b = document.createElement('div');
			b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
			a.insertBefore(b, a.firstChild);
			var l = a.childNodes.length;
			for (var i = 1; i < l; i++) {
				b.appendChild(a.childNodes[1]);
			}
			a.style.height = b.getBoundingClientRect().height + 'px';
			a.style.padding = '0';
			a.style.border = '0';
		}
		var Ra = a.getBoundingClientRect(),
			R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('body').getBoundingClientRect().bottom + 0);
		if ((Ra.top - P) <= 0) {
			if ((Ra.top - P) <= R) {
				b.className = 'stop';
				b.style.top = -R + 'px';
				b.style.left = 0;
			} else {
				b.className = 'sticky';
				b.style.top = P + 'px';
				b.style.left = Ra.left + 'px';
			}
		} else {
			b.className = '';
			b.style.top = '';
			b.style.left = '';
		}
		window.addEventListener('resize', function () {
			a.children[0].style.width = getComputedStyle(a, '').width;
			b.style.left = (b.className == 'sticky' ? (a.getBoundingClientRect().left + 'px') : '0');
		}, false);
	}
})
























/* $("#gui-comm-path").on("input", function (e) {
	let c = $(this).val();
	$(".drag-create .wrapper-element #gui-path").each(function () {
		$(this).val(c);
	});
});
 */



/* 
$("#default-screen").on("input", function (e) {
	if ($(this).prop('checked')) {
		localStorage.setItem("defaultScreen", true);
	} else {
		localStorage.setItem("defaultScreen", false);
	}
}); */

/* 
document.querySelector('.btn-gui-slider').addEventListener('click', function () {
	this.classList.toggle('btn-disables');
	guiSlider = !guiSlider;
}, false); */