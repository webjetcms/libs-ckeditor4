/*
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang( 'webjetcomponents', 'sk', {
	title: 'Aplikácie',
	forms:
	{
		form: 'Formulár',
		textfield: "Textové pole",
		textarea: "Textová oblasť",
		select: "Výberové pole",
		checkbox: "Zaškrtávacie pole",
		radio: "Prepínač",
		button: "Tlačidlo",
		formAttributes: "Rozšírené nastavenia",
		fileLimits: "Limity na súbory",
		required: "Povinné pole",
		requiredType: "Povolená hodnota",
		hidden: "Skryté pole",
		label: "Popis poľa (LABEL)",
		editlabel: "Upraviť popis poľa (LABEL)",
		labelname: "Popis",
		forfield: "Pre pole",
		labelProperties: "Vlastnosti popisného poľa (LABEL)",
		labelcannotbeempty: "Popis poľa nemôže byť prázdne",
		forcannotbeempty: "Pre pole nemôže byť prázdne",
		labelAdvanced: "Rozšírené nastavenia",
		labelBasic: "Základné údaje",
		cssClass: "CSS trieda",
		cssStyle: "CSS štýl",
		captcha: "CAPTCHA",
		radioGroup: "Skupina polí",
		radioMatrix: "Matica polí",
        file: "Súbor"
	},
	templates: 'Bloky',
	wjbutton:
	{
		title: 'Odkaz',
		text: 'Text',
		url: 'Adresa stránky kliknutia',
		fontSize: 'Veľkosť písma',
		borderRadius: 'Zaoblenie rohov',
		target: 'Cieľ odkazu',
		bgColor: 'Farba pozadia',
		choose: 'Vybrať',
		textColor: 'Farba písma',
		general: 'Všeobecné',
		advanced: 'Rozšírené',
		id: 'ID',
		rel: 'Vzťah (rel)',
		advisoryTitle: 'Pomocný titulok',
		name: 'Názov (name)',
		ariaLabel: 'Popis pre čítačky (aria-label)'
	},
	aibutton:
	{
		title: 'AI asistent'
	},
	deleteElement:
	{
		label: 'Zmazať element'
	}
} );

CKEDITOR.plugins.setLang( 'toolbar', 'sk', {
	toolbarGroups:
	{
		clipboard: "Schránka",
		fontAndStyle: "Písmo a štýl",
		paragraphAndAlign: "Odstavec a zarovnanie",
		insert: "Vložiť",
		tools: "Nástroje",
		publish: "Uložiť"
	}
});

CKEDITOR.plugins.setLang( 'thumb', 'sk', {

});

try {
	//WebJET 9 preklady
	CKEDITOR.plugins.setLang( 'webjetadmin', 'sk', {
		images: "Obrázky",
		rel: "Vzťah",
		photobank: "Fotobanka",
		waitPlease: "Čakajte prosím",
		title: "Názov",
		btnSendByAjax: "Odoslať cez AJAX (formulár sa odošle na pozadí bez obnovenia stránky, nie je ale možné odosielať súbory)",
		btnSubmit: "Odoslať",
		printPage: "Vytlačiť",

		thumbTabTitle: "Miniatúra",
		thumbWidth: "Šírka",
		thumbHeight: "Výška",
		thumbIpMode: "Režim",
		thumbIp0: "Maximálne rozmery",
		thumbIp1: "Fixná šírka",
		thumbIp2: "Fixná výška",
		thumbIp3: "Fixná šírka a výška vyplnená farbou",
		thumbIp4: "Fixná šírka a výška vyplnená farbou - centrované",
		thumbIp5: "Centrovaný s pomerom strán - zmenšený",
		thumbBackgroundColor: "Farba pozadia",
		thumbNoIp: "Vypnúť bod záujmu",
		thumbWidthRequired: "Šírka je povinná pre tento režim",
		thumbHeightRequired: "Výška je povinná pre tento režim",
		allowedSize: "Povolený rozmer",
		allowedSizeRequired: "Vyberte povolený rozmer miniatúry",
		thumbQuality: "Kvalita"
	});
} catch (e) {}