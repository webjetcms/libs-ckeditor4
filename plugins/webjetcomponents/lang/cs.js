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
		bgColor: 'Barva pozadí',
		choose: 'Vybrat',
		textColor: 'Barva písma',
		general: 'Obecné',
		advanced: 'Rozšířené',
		id: 'ID',
		rel: 'Vztah (rel)',
		advisoryTitle: 'Pomocný titulek',
		name: 'Název (name)',
		ariaLabel: 'Popis pro čtečky (aria-label)'
	},
	aibutton:
	{
		title: 'AI asistent'
	},
	deleteElement:
	{
		label: 'Odstranit element'
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
		printPage: "Vytisknout",

		thumbTabTitle: "Miniatura",
		thumbWidth: "Šířka",
		thumbHeight: "Výška",
		thumbIpMode: "Režim",
		thumbIp1: "Fixní šířka",
		thumbIp2: "Fixní výška",
		thumbIp3: "Fixní šířka a výška vyplněná barvou",
		thumbIp4: "Fixní šířka a výška vyplněná barvou - centrováno",
		thumbIp5: "Centrovaný s poměrem stran - zmenšen",
		thumbBackgroundColor: "Barva pozadí",
		thumbNoIp: "Vypnout bod zájmu",
		thumbWidthRequired: "Šířka je povinná pro tento režim",
		thumbHeightRequired: "Výška je povinná pro tento režim"
	});
} catch (e) {}