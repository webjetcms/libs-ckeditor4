/*
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang( 'webjetcomponents', 'en', {
	title: 'Apps',
	forms:
	{
		form: 'Form',
		textfield: "Text field",
		textarea: "Text area",
		select: "Select box",
		checkbox: "Check box",
		radio: "Radio button",
		button: "Button",
		formAttributes: "Form properties",
		fileLimits: "File limits",
		required: "Required field",
		requiredType: "Allowed value",
		hidden: "Hidden field",
		label: "Label",
		editlabel: "Edit Label",
		labelname: "Label",
		forfield: "For field",
		labelProperties: "Label properties",
		labelcannotbeempty: "Label can't be empty",
		forcannotbeempty: "For field cannot be empty",
		labelAdvanced: "Advanced settings",
		labelBasic: "Basic settings",
		cssClass: "CSS class",
		cssStyle: "CSS style",
		captcha: "CAPTCHA",
		radioGroup: "Group of fields",
		radioMatrix: "Matrix of fields",
        file: "File"
	},
	templates: 'Blocks',
	wjbutton:
	{
		title: 'Link',
		text: 'Text',
		url: 'Page address of click',
		fontSize: 'Font size',
		borderRadius: 'Border radius',
		target: 'Link Target',
		bgColor: 'Background color',
		choose: 'Choose',
		textColor: 'Font color'
	}
} );

CKEDITOR.plugins.setLang( 'toolbar', 'en', {
	toolbarGroups:
	{
		clipboard: "Clipboard",
		fontAndStyle: "Font and Style",
		paragraphAndAlign: "Paragraph and Align",
		insert: "Insert",
		tools: "Tools",
		publish: "Save"
	}
});

try {
	//WebJET 9 preklady
	CKEDITOR.plugins.setLang( 'webjetadmin', 'en', {
		images: "Images",
		rel: "Relation",
		photobank: "Photobank",
		waitPlease: "Wait please",
		title: "Title",
		btnSendByAjax: "Send by AJAX (form will be sent in background withou page refresh, but it's not possible to send photo)",
		btnSubmit: "Submit",
		printPage: "Print"
	});
} catch (e) {}