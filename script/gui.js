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
				div.innerHTML = ['<div class="wrap-img-btn">\n<div>\n <img class="thumb" src="', e.target.result,
					'" title="', escape(theFile.name), '"/> \n </div>\n<button class="gui-btn-option" ><i class="material-icons">settings</i></button>\n</div> \n <strong data-name="', escape(theFile.name), '">', escape(theFile.name), '<i class="del-item material-icons">delete</i></strong> \n <textarea class="description"></textarea> \n <div class="wrapper-element"><div class="option-item">' + itemOption + '</div></div>'
				].join('');
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




document.getElementById('files').addEventListener('change', handleFileSelect, false);










let resultGui = $("#result-gui");
let strGui = '';

let guiSlider = false;


let guiOption = {};

function getGuiCode() {
	$(".gui-body .wrapper-element").each(function () {
		descr = $(this).prev(".description").val();

		guiOption.name = $(this).parent().find('strong').attr('data-name');
		guiOption.gFrame = $(this).find('#gui-frame').prop('checked');
		guiOption.gDataSize1 = $(this).find('#gui-dataSize1').val();
		guiOption.gDataSize2 = $(this).find('#gui-dataSize2').val();
		guiOption.gMyImgClass = $(this).find('#gui-my-img-class').val();
		guiOption.gMyClass = $(this).find('#gui-my-class').val();
		guiOption.gMTop = $(this).find('#gui-mTop').val();
		guiOption.gMBottom = $(this).find('#gui-mBottom').val();
		//guiOption.gPath = $(this).find('#gui-path').val();

		if (guiSlider) {
			sliderGui(guiOption, descr);
		} else {
			if (descr) {
				maxGui(guiOption, descr);
			} else {
				minGui(guiOption);
			}
		}
	});

	if (guiSlider) {
		guiOption.gMTop = guiOption.gMTop || "2";
		guiOption.gMBottom = guiOption.gMBottom || "2";
		strGui = '\n<div class="zooming sliding_gallery" itemscope style="margin:auto; margin-top: ' + guiOption.gMTop + 'rem; margin-bottom: ' + guiOption.gMBottom + 'rem;">\n' + strGui + '\n</div>\n';
	}
}



function minGui(guiOption) {
	let opt = checkOption(guiOption);

	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "2";
	strGui = strGui + opt.gMyClassStart + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + opt.gMTop + 'rem; margin-bottom: ' + opt.gMBottom + 'rem">\n<a href="' + opt.name + '" itemprop="contentUrl" data-size="">\n<img src="' + opt.name + '" itemprop="thumbnail" class="' + opt.gFrame + ' ' + opt.gMyImgClass + '" />\n</a>\n</figure>\n</div>\n' + opt.gMyClassEnd;
}

function maxGui(guiOption, description) {
	let opt = checkOption(guiOption);
	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "1";
	strGui = strGui + opt.gMyClassStart + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + opt.gMTop + 'rem; margin-bottom: ' + opt.gMBottom + 'rem">\n<a href="' + opt.name + '" itemprop="contentUrl" data-size="">\n<img src="' + opt.name + '" itemprop="thumbnail" class="' + opt.gFrame + ' ' + opt.gMyImgClass + '" />\n</a>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n</figure>\n</div>\n' + opt.gMyClassEnd + '<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n';
}

function sliderGui(guiOption, description) {
	let opt = checkOption(guiOption);
	strGui = strGui + '\n<figure itemprop="associatedMedia">\n<a href="' + opt.name + '" itemprop="contentUrl" data-size="">\n<img src="' + opt.name + '" itemprop="thumbnail" class="item ' + opt.gMyImgClass + '" />\n</a>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n<pswp__caption__center itemprop="caption description">\n<div class="caption_padding">\n' + description + '\n</div>\n</pswp__caption__center>\n</figure>\n';
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




$(".gui-btn-get-code").on("click", function () {
	strGui = '';
	resultGui.val('');
	getGuiCode();
	resultGui.val(strGui);

	//Автоматическое копирование в буфер обменм
	event.preventDefault();
	resultGui.select();
	document.execCommand("copy");
	//Автоматическое копирование в буфер обменм end

});


$(".gui-body").on("click", '.dad-block .gui-btn-option', function (e) {
	$(this).parent().siblings(".wrapper-element").fadeToggle("fast");
});




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


document.querySelector('.btn-gui-slider').addEventListener('click', function () {
	this.classList.toggle('btn-disables');
	guiSlider = !guiSlider;
}, false);

document.getElementById('sort').addEventListener('click', sort, false);



$(".gui-body").on("click", '.dad-block .del-item', function (e) {
	$(this).parents('.dad-block').remove();
	sort();
});