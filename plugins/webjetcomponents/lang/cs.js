/*
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang( 'webjetcomponents', 'cs', {
	title: 'Aplikace',
	forms:
	{
		form: 'Formulář',
		textfield: "Textové pole",
		textarea: "Textová oblast",
		select: "Výběrové pole",
		checkbox: "Zaškrtávací pole",
		radio: "Přepínač",
		button: "Tlačítko",
		formAttributes: "Rozšířené nastavení",
		fileLimits: "Limity na soubory",
		required: "Povinné pole",
		requiredType: "Povolená hodnota",
		hidden: "Skryté pole",
		label: "Popis pole (LABEL)",
		editlabel: "Upravit popis pole (LABEL)",
		labelname: "Popis",
		forfield: "Pre pole",
		labelProperties: "Vlastnosti popisného pole (LABEL)",
		labelcannotbeempty: "Popis pole nemůže být prázdne",
		forcannotbeempty: "Pre pole nemůže být prázdne",
		labelAdvanced: "Rozšířené nastavení",
		labelBasic: "Základní údaje",
		cssClass: "CSS třída",
		cssStyle: "CSS styl",
		captcha: "CAPTCHA",
		radioGroup: "Skupina polí",
		radioMatrix: "Matica polí",
        file: "Soubor"
	},
	templates: 'Bloky',
	wjbutton:
	{
		title: 'Odkaz',
		text: 'Text',
		url: 'Adresa stránky kliknutí',
		fontSize: 'Velikost písma',
		borderRadius: 'Zaoblení rohů',
		target: 'Cíl odkazu',
		bgColor: 'Farba pozadí',
		choose: 'Vybrat',
		textColor: 'Farba písma'
	}
} );

CKEDITOR.plugins.setLang( 'toolbar', 'cs', {
	toolbarGroups:
	{
		clipboard: "Schránka",
		fontAndStyle: "Pismo a styl",
		paragraphAndAlign: "Odstavec a zarovnání",
		insert: "Vložit",
		tools: "Nástroje",
		publish: "Uložit"
	}
});

try {
	//WebJET 9 preklady
	CKEDITOR.plugins.setLang( 'webjetadmin', 'cs', {
		images: "Obrázky",
		rel: "Vztah",
		photobank: "Fotobanka",
		waitPlease: "Čekejte prosím",
		title: "Název",
		btnSendByAjax: "Odeslat přes AJAX (formulář se odešle na pozadí bez obnovení stránky, není ale možné odesílat fotografie)",
		btnSubmit: "Odeslat",
		printPage: "Vytisknout"
	});
} catch (e) {}