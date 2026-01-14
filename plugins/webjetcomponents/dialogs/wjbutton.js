/*
	This file is a part of simplebuttion project.
	Copyright (C) Thanh D. Dang <thanhdd.it@gmail.com>
	simplebuttion is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	simplebuttion is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.
	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

CKEDITOR.dialog.add( 'wjbuttonDialog', function( editor ) {

	var config = editor.config.webjetsvgicon || {};
    var sizes = (config.sizes || 'btn-lg,btn-sm').split(',');

    // Get base class from webjetformbutton config if exists, otherwise use 'btn'
    var baseClass = (editor.config.webjetformbutton && editor.config.webjetformbutton.baseClass) || 'btn';
    var buttonTypes = (editor.config.webjetformbutton && editor.config.webjetformbutton.types)
        ? editor.config.webjetformbutton.types.split(',')
        : ['btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark', 'btn-link', 'btn-outline-primary', 'btn-outline-secondary', 'btn-outline-success', 'btn-outline-danger', 'btn-outline-warning', 'btn-outline-info', 'btn-outline-light', 'btn-outline-dark'];

	var sizeItems = [[editor.lang.webjetformbutton.defaultSize, '']];
    sizes.forEach(function(size) {
        sizeItems.push([size, size]);
    });

    var typeItems = [[editor.lang.webjetformbutton.defaultType, '']];
    buttonTypes.forEach(function(type) {
        typeItems.push([type, type]);
    });

	function parseExistingClasses(element) {
        var cssClass = element.getAttribute('class') || '';
        var classes = cssClass.split(/\s+/);
        var result = { size: '', type: '', custom: [] };

        classes.forEach(function(cls) {
            if (cls === baseClass) {
                // Skip base class
                return;
            } else if (sizes.indexOf(cls) !== -1) {
                result.size = cls;
            } else if (buttonTypes.indexOf(cls) !== -1) {
                result.type = cls;
            } else {
                result.custom.push(cls);
            }
        });

        //console.log("parseExistingClasses cssClass=", cssClass, "result=", result);

        return result;
    }

    function buildButtonClasses(size, type, customClasses) {
        var classes = [baseClass];

        if (size) classes.push(size);
        if (type) classes.push(type);

        // Add custom classes, filtering out conflicting size/type classes
        if (customClasses) {
            var customArray = customClasses.split(/\s+/).filter(function(cls) {
                if (!cls) return false;
                if (cls === baseClass) return false;
                if (sizes.indexOf(cls) !== -1 || buttonTypes.indexOf(cls) !== -1) return false;
                return true;
            });
            classes = classes.concat(customArray);
        }

        return classes.join(' ');
    }

	return {
		title: editor.lang.webjetcomponents.wjbutton.title,
		minWidth: 450,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				elements: [
					{
						type: 'text',
						id: 'button-text',
						label: editor.lang.webjetcomponents.wjbutton.text,
						validate: CKEDITOR.dialog.validate.notEmpty( "Text field cannot be empty." ),
						setup: function( element ) {
							this.setValue( element.getHtml() );
						},
						commit: function( element ) {
							element.setHtml( this.getValue() );
						}
					},
					{
						type: 'hbox',
						padding: 0,
						widths: [ '95%', '5%' ],
						children: [
						{
							type: 'text',
							id: 'url',
							label: editor.lang.webjetcomponents.wjbutton.url,
							setup: function( element ) {
								this.setValue( element.getAttribute( "href" ) );
							},
							commit: function( element ) {
								var href = this.getValue();
								element.setAttribute( "href", href );
								element.removeAttribute('data-cke-saved-href');

								if (href.indexOf("http")==0 || href.indexOf("www.")==0){
									element.setAttribute('rel',"nofollow noopener noreferrer");
								}else {
									if ("nofollow noopener noreferrer"==element.getAttribute('rel')) element.removeAttribute('rel');
								}
							}
						},
						{
							type: 'html',
							html: '&nbsp;<br/><i style="margin-top:15px; margin-left: 8px;display: block; font-size: 18px; cursor: pointer;" onclick="openLinkDialogWindow(\'ckEditorDialog\', \'tab-basic:url\');" class="wj-action-icon ti ti-focus-2"></i>'
						}]
					},
					{
						type: 'select',
						id: 'target',
						label: editor.lang.webjetcomponents.wjbutton.target,
						style: 'width:100%',
						// accessKey: 'E',
						'default': '',
						setup: function( element ) {
							var v = element.getAttribute('target');
							if(v == undefined || v == null || v == ""){
								var href = element.getAttribute('href');
								if (typeof href != "undefined" && href != null){
									if (href.indexOf("http")==0 || href.indexOf("www.")==0 || href.indexOf("/files/")==0){
										v = "_blank";
									}
								}
							}

							this.setValue( v );
						},
						commit: function( element ) {
							var v = this.getValue();

							if(v == ''){
								var dialog = this.getDialog();
								var href = dialog.getContentElement('tab-basic', 'url').getValue();
								if (href.indexOf("http")==0 || href.indexOf("www.")==0 || href.indexOf("/files/")==0){
									element.setAttribute('target', "_blank");
								} else {
									element.removeAttribute('target');
								}
							}
							else {
								element.setAttribute('target',v);
							}
						},
						items: [
							[ '' ],
							[ '_self' ],
							[ '_blank' ]
						]
					},
					{
						type: 'select',
						id: 'buttonType',
						label: editor.lang.webjetformbutton.buttonType,
						'default': '',
						items: typeItems,
						setup: function(element) {
							var parsedClasses = parseExistingClasses(element);
							this.setValue(parsedClasses.type);
						}
					},
					{
						type: 'select',
						id: 'size',
						label: editor.lang.webjetformbutton.size,
						'default': '',
						items: sizeItems,
						setup: function(element) {
							var parsedClasses = parseExistingClasses(element);
							this.setValue(parsedClasses.size);
						}
					},
					{
						type: 'text',
						id: 'customClass',
						label: editor.lang.webjetformbutton.customClass,
						setup: function(element) {
							var parsedClasses = parseExistingClasses(element);
							this.setValue(parsedClasses.custom.join(' '));
						}
					}
				]
			}
		],

		onShow: function() {

			var selection = editor.getSelection();
			var element = selection.getStartElement();

			if (typeof ckEditorInstance.lastWjButton != "undefined" && ckEditorInstance.lastWjButton != null)
			{
				element = new CKEDITOR.dom.element(ckEditorInstance.lastWjButton);
                ckEditorInstance.lastWjButton = null;
			}

			if ( !element ) {
				element = editor.document.createElement( 'a' );
				element.setAttribute('class', 'wj-button');
				var style_button = 'display:inline-block;background-color:#27AE61;border:1px solid #27AE61;color:#fff !important;padding:5px 10px;border-radius:5px;font-size:14px;text-decoration: none !important; cursor: pointer;';
				element.setAttribute( "style", style_button );
				element.setText( 'Text' );
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			this.element = element;

			this.setupContent( this.element );
		},

		onOk: function() {
			var dialog = this;
			var simple_btn = this.element;
			this.commitContent( simple_btn );

            var buttonSize = dialog.getValueOf('tab-basic', 'size');
            var buttonBtnType = dialog.getValueOf('tab-basic', 'buttonType');
            var customClass = dialog.getValueOf('tab-basic', 'customClass');

			var classes = buildButtonClasses(buttonSize, buttonBtnType, customClass);
			simple_btn.setAttribute('class', classes);

			if ( this.insertMode )
				editor.insertElement( simple_btn );
		}
	};
});