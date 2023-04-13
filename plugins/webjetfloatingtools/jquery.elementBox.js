;( function( $, window, document, undefined ) {

	"use strict";
		var self;
		var pluginName = "elementBox",
			defaults = {
				texts: {
					margin: 'margin',
					border: 'border',
					padding: 'padding',
					position: 'position',
					submit: 'OK',
					valueInputLabel: 'Width',
					borderSelectLabel: 'Style',
					colorInputLabel: 'Color',
					allInputLabel: 'Set value to all'
				},
				dimension: '200px',
				elements: [
					{
						name: 'element'
					},
					{
						name: 'padding'
					},
					{
						name: 'border'
					},
					{
						name: 'margin'
					}
				],
				borders: [
				    'none',
				    'dotted',
				    'dashed',
				    'solid'
				]
			};

		var commands = {
	        values: values
	    };

		function Plugin ( element, options ) {
			self = this;

			this.element = $(element);

			this.settings = $.extend( true, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		function values(values)
		{
			var types = ['margin', 'border', 'padding'];

			if (!isUndefined(values)) {
				$.each(types, function(i, v){
					if (isUndefined(values[v])) {
						return true;
					}

					var typeEl = self.element.find('.' + v);

					typeEl.children('.valueBox').each(function(){
						var direction = $.trim($(this).prop('class').replace(/valueBox/gi, ''));
						var valEl = $(this).find('.value');
						var val = 0;

						if (!isUndefined(values[v][direction])) {
							var value = values[v][direction]

							if (v == 'border') {
								value = validateBorderValue(value);
							}
							else {
								value = validateValue(value);
							}

							val = value;
						}

						valEl.text(val).prop('title', val);
					});
				});
			}
			else {
				var result = [];

				self.element.each(function(iter, val){
					var el = $(this);
					var elResult = {};

					$.each(types, function(i, v){
						var typeEl = $(el).find('.' + v);
						if (isUndefined(elResult[v])) {
							elResult[v] = {};
						}

						typeEl.children('.valueBox').each(function(){
							var direction = $.trim($(this).prop('class').replace(/valueBox/gi, ''));
							var valEl = $(this).find('.value');
							var val = valEl.text();

							elResult[v][direction] = val;
						});
					});

					result.push(elResult);
				});

				return result;
			}
		}

		function validateBorderValue(value) {

			if (isUndefined(value) || value == 0) {
				return 0;
			}


			var color = '';
			if (value.indexOf('#') != -1) {
				color = $.trim(value.substring(value.indexOf('#')));
				value = value.substring(0, value.indexOf('#'));

				if (color.length == 4) {
					color = color + color.substring(1);
				}

				color = convertHex(color, 100);
			}

			if (value.indexOf('rgb') != -1) {
				color = $.trim(value.substring(value.indexOf('rgb')));
				value = value.substring(0, value.indexOf('rgb'));

				if (color.indexOf('rgb') != -1 && color.indexOf('rgba') == -1) {
					color = color.replace(')', ', 1)').replace('rgb', 'rgba')
				}
			}

			var values = value.split(' ');
			var width = validateValue(values[0]);
			var style = values[1];

			var result = $.trim(width + ' ' + style + ' ' + color);

			return result;
		}

		function convertHex(hex,opacity){
		    hex = hex.replace('#','');
		    var r = parseInt(hex.substring(0,2), 16);
		    var g = parseInt(hex.substring(2,4), 16);
		    var b = parseInt(hex.substring(4,6), 16);

		    var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
		    return result;
		}

		function renderInputs()
		{
			var template = '<div class="elementBoxInputBoxOverlay"></div>';
				template += '<div class="elementBoxInputBox"><form class="clearfix">';
				template += '<div class="valueInputBox">';
				template += '<label for="valueInput">' + translate('valueInputLabel') + '</label>';
				template += '<input type="text" autocomplete="off" id="valueInput" name="valueInput" class="form-control valueInput" />';
				template += '</div>';
				template += '<div class="borderSelectBox">';
				template += '<label for="borderSelect">' + translate('borderSelectLabel') + '</label>';
				template += '<select name="select" id="borderSelect" class="form-control borderSelect">';
				template += getBorderOptions();
				template += '</select>';
				template += '</div>';
				template += '<div class="colorInputBox">';
				template += '<label for="colorInput">' + translate('colorInputLabel') + '</label>';
				template += '<input type="text" autocomplete="off" name="colorInput" id="colorInput" class="form-control colorInput color-picker" value="#ffffff" />';
				template += '</div>';
				template += '<div class="allInputBox">';
				template += '<label for="allInput">' + translate('allInputLabel') + '</label>';
				template += '<input type="checkbox" id="allInput" name="allInput" checked="false" />';
				template += '</div>';


				template += '<input type="submit" class="btn btn-primary" value="' + translate('submit') + '" />';
				template += '</form></div>';


			$('body').append(template);

			/*
			$(".elementBoxInputBox .color-picker").minicolors({
				changeDelay: 400,
				opacity: true
			});
			*/

			$('.elementBoxInputBoxOverlay').hide();
			$('.elementBoxInputBox').hide();
		}

		function renderElementBox(el)
		{
			var directions = ['top', 'right', 'bottom', 'left'];
			var template = '';
			var inputs = '';

			$.each(self.settings.elements, function(i, o) {
				var name = o.name, width = o.width, height = o.height;

				var tempStart = '<div class="' + name + ' box">';

				if (name != 'element') {
					$.each(directions, function(i, v) {
						var UCdirection = firstToUpperCase(v);

						tempStart += '<div class="' + v + 'ValueBox valueBox">';
						tempStart += '<span class="'+ v +'Value value ' + name + 'BoxValue">0</span>';
						tempStart += '</div>';
					});

					//tempStart += '<span class="name">' + translate(name) + '</span>';
				}

				var tempEnd = '</div>';

				template = tempStart + template + tempEnd;
			});

			el.html(template);

			var legend = '<div class="legendBox">';

			var elements = self.settings.elements.slice();
			elements.reverse();

			legend += '<ul>';
			$.each(elements, function(i, o) {
				var name = o.name

				if (name != 'element') {
					legend += '<li class="' + name + '"><span></span>' + translate(name) + '</li>';
				}
			});
			legend += '</ul>';
			legend += '</div>';

			el.append(legend);
		}

		function getBorderOptions()
		{
			var options = '';

			$.each(self.settings.borders, function(i, v) {
				options += '<option value="' + v + '">' + translate(v) + '</option>';
			});

			return options;
		}

		function translate(str) {
			if (isUndefined(self.settings.texts[str])) {
				return str;
			}
			return self.settings.texts[str];
		}

		function showHideColor()
		{
			var select = $('.elementBoxInputBox select.borderSelect');

			var valueInput =  $('.elementBoxInputBox .valueInput');
			var colorInput = $('.elementBoxInputBox .minicolors');
			if (select.val() == 'none') {
				valueInput.val('0').parent().hide();
				colorInput.parent().hide();
			}
			else {
				valueInput.parent().show();
				colorInput.parent().show();
			}
		}

		function bindEvents()
		{
			$('body').data('eventsBound', true).on('click', '.valueBox .value', function(){
				hideInputBox();

				var el = $(this);
				var inputBox = $('.elementBoxInputBox');
				var valueEl = $(this);
				var isBorder = el.hasClass('borderBoxValue');

				var value = 0;
				if (isBorder) {
					var value = parseBorderValue(valueEl.text());

					inputBox.find('.valueInput').val(value.width);
					inputBox.find('.borderSelect').val(value.border);
					inputBox.find('.colorInput').minicolors('value', rgbaToHexObject(value.color));
				}
				else {
					var value = valueEl.text();
					inputBox.find('input.valueInput').val(value);
				}

				showInputBox(el, isBorder);

				if (inputBox.find('input:first').val() == '0') {
					inputBox.find('input:first').val('');
				}

				inputBox.find('input:first').focus();

			});

			$('body').on('click', '.elementBoxInputBox input:submit', subitClicked);

			$('body').on('change', '.elementBoxInputBox select.borderSelect', function(){
				showHideColor();
			});

			$('body').on('mouseover', 'div.box:not(.element)', function(event){
		        event.stopPropagation();
		        $('div.box').removeClass('hover');
		        $(this).addClass('hover');

		        var classes = $(this).prop('class').split(' ');
		        $.each(classes, function(i,v) {
		        	if (v == 'box') return true;

		        	if ($('.legendBox').find('li.' + v).length > 0) {
		        		$('.legendBox').find('li.' + v).addClass('hover');
		        	}
		        });
		    }).on('mouseout', 'div.box:not(.element)', function(event){
		    	event.stopPropagation();
		    	$(this).removeClass('hover');
		    	$('.legendBox li.hover').removeClass('hover');
		    });

			$('body').on('mouseover', 'div.element', function(event){
				event.stopPropagation();
		        $('div.box').removeClass('hover');
		        $('.legendBox li.hover').removeClass('hover');
			});

			$('.elementBoxInputBoxOverlay').click(hideInputBox);
		}

		function showInputBox(element, isBorder) {
			var inputBox = $('.elementBoxInputBox'),
				overlay = $('.elementBoxInputBoxOverlay');

			inputBox.data('element', element);

			inputBox.find('.allInputBox input').prop('checked', false);
			$.uniform.update();
			inputBox.find('.allInputBox').show();

			if (isBorder) {
				inputBox.find('.borderSelectBox').show();
				showHideColor();
			}
			else {
				inputBox.find('.valueInputBox').show();
				inputBox.find('.borderSelectBox').hide();
				inputBox.find('.colorInputBox').hide();
			}

			inputBox.show();
			overlay.show();
			setTimeout(setInputBoxPosition, 1);
			//setInputBoxPosition();

			function setInputBoxPosition() {
				var elPosition = getElementPosition();

				var elWidth = element.outerWidth();
				var elHeight = element.outerHeight();
				var boxWidth = inputBox.outerWidth();
				var boxHeight = inputBox.outerHeight();

				var inputPosition = {
					left: elPosition.left + (elWidth / 2) - (boxWidth / 2),
					top: elPosition.top + (elHeight / 2) - (boxHeight / 2)
				}


				if (inputPosition.left < 0) {
					inputPosition.left = 0;
				}

				if (inputPosition.top < 0) {
					inputPosition.top = 0;
				}

				inputBox.css(inputPosition);
			}

			function getElementPosition()
			{
				return element.offset();
			}
		}

		function rgbaToHexObject(rgba) {
			var result = {
					color: rgb2hex(rgba),
					opacity: rgbaOpacity(rgba)
			};

			return result;
		}

		function rgbaOpacity(rgba) {
			var result = $.trim(rgba.replace(/^.*,(.+)\)/,'$1'));

			return result;
		}

		function rgb2hex(rgb){
			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		}

		function hideInputBox() {
			var inputBox = $('.elementBoxInputBox'),
				overlay = $('.elementBoxInputBoxOverlay');

			inputBox.data('element', null);

			inputBox.hide();
			overlay.hide();
		}

		function parseBorderValue(val) {
			var value = val.split(' ');
			var result = {
				width: isUndefined(value[0]) ? '' : value[0],
				border: isUndefined(value[1]) ? 'none' : value[1],
				color: isUndefined(value[2]) ? 'rgba(255, 255, 255, 1)' : value[2]
			}

			if (val.indexOf('rgb') != -1) {
				result.color = val.substring(val.indexOf('rgb'));
			}

			return result;
		}

		function subitClicked()
		{
			var inputBox = $('.elementBoxInputBox');
			var valueEl = $(this).siblings('.value');
			var value = 0;

			var valueEl = inputBox.data('element');
			if (valueEl == null) {
				console.log('element null');
				return false;
			}

			var isBorder = valueEl.hasClass('borderBoxValue');

			if (isBorder) {
				value = validateValue(inputBox.find('.valueInput').val());
				value += ' ';
				value += inputBox.find('.borderSelect').val();

				if (inputBox.find('.borderSelect').val() != 'none') {
					value += ' ';
					value += inputBox.find('.colorInput').minicolors('rgbaString');
				}
			}
			else {
				value = validateValue(inputBox.find('input').val());
			}

			hideInputBox();

			if ($('#allInput').is(':checked')) {
				valueEl.closest('.box').children('.valueBox').find('span').each(function(){
					var el = $(this);
					el.attr('title', value);
					el.text(value);
					el.show();
				});
			}
			else {
				valueEl.attr('title', value);
				valueEl.text(value);
				valueEl.show();
			}

			return false;
		}

		function validateValue(value) {
			if (value == "") {
				return "";
			}

			if (!isNaN(value)) {
				return $.trim(Math.round(value)) + "px";
			}

			if (value.endsWith('%')) {
				var val = $.trim(value.replace('%', ''));

				if (!isNaN(val)) {
					return Math.round(val) + '%';
				}
			}

			if (value.endsWith('px')) {
				var val = $.trim(value.replace('px', ''));
				if (!isNaN(val)) {
					return Math.round(val) + 'px';
				}
			}

			return 0;
		}

		function isUndefined(el)
		{
			if (typeof el == 'undefined') {
				return true;
			}
			return false;
		}

		function firstToUpperCase(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		$.extend( Plugin.prototype, {
			init: function() {
				self.element.addClass('clearfix elementBox');
				renderElementBox(this.element);

				if ($('body').data('eventsBound') == null) {
					renderInputs();
					bindEvents();
				}
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options, value ) {

			if (typeof arguments[0] === 'string') {
	            //execute string comand on mediaPlayer
	            var property = arguments[1];
	            //remove the command name from the arguments
	            var args = Array.prototype.slice.call(arguments);
	            args.splice(0, 1);

	            if (typeof commands[arguments[0]] != "undefined") {
	            	self = this;
	            	this.element = $(this);

		            var ret = commands[arguments[0]].apply(this, args);
		            if (typeof ret != "undefined") {
		            	return ret;
		            }
	            }
	        }

			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );