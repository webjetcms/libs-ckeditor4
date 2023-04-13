
CKEDITOR.editor.prototype.wjCreateFakeParserElement = function( realElement, className, realElementType, isResizable ) {
	var lang = this.lang.fakeobjects,
		label = lang[ realElementType ] || lang.unknown,
		html;

	var writer = new CKEDITOR.htmlParser.basicWriter();
	realElement.writeHtml( writer );
	html = writer.getHtml();

	if (html.indexOf("!INCLUDE")==-1) return null;

	var attributes = {
		'class': className,
		'data-cke-realelement': encodeURIComponent( html ),
		'data-cke-real-node-type': realElement.type,
		alt: label,
		title: label,
		align: realElement.attributes.align || '',
		'src' : '/admin/skins/webjet8/ckeditor/dist/plugins/webjetcomponents/component_preview.jsp'
	};

	if ( realElementType )
		attributes[ 'data-cke-real-element-type' ] = realElementType;

	if ( isResizable ) {
		attributes[ 'data-cke-resizable' ] = isResizable;
		var realAttrs = realElement.attributes,
			fakeStyle = new cssStyle();

		var width = realAttrs.width,
			height = realAttrs.height;

		width != undefined && ( fakeStyle.rules.width = cssLength( width ) );
		height != undefined && ( fakeStyle.rules.height = cssLength( height ) );
		fakeStyle.populate( attributes );
	}

	return new CKEDITOR.htmlParser.element( 'iframe', attributes );
};

CKEDITOR.editor.prototype.wjInsertUpdateComponent = function( includeText )
{
	//window.alert("includeText="+includeText);

	var actuallyEditedElement = this.document.$.getElementById("actuallyEditedComponent");
	if (actuallyEditedElement != null)
	{
		actuallyEditedElement.setAttribute("id", "");
	}

	var ranges = this.getSelection().getRanges( 1 );
	if (ranges.length > 0)
	{
		var element = ranges[0].getCommonAncestor(true, true);
		//window.alert("plugin.js html="+element.getOuterHtml());
		//if ("<p><br></p>" == element.getOuterHtml())
		//if ("<p><br></p>" == element.getOuterHtml())
		if (element.getOuterHtml().indexOf("</body")==-1)
		{
			var html = "<article>"+includeText+"</article>";
			var attributes = {
					'class': 'wj_component',
					'data-cke-realelement': encodeURIComponent( html ),
					'data-cke-real-node-type': 'article',
					'src' : '/admin/skins/webjet8/ckeditor/dist/plugins/webjetcomponents/component_preview.jsp'
			};
			attributes[ 'data-cke-real-element-type' ] = 'article';

			var elementInclude = new CKEDITOR.dom.element( 'iframe', CKEDITOR.document );
			elementInclude.setAttributes(attributes);

			elementInclude.insertAfter( element );

			//ak sa jedna o prazdny odstavec odstran ho
			//console.log(element.getOuterHtml());
			var outerHtml = element.getOuterHtml();
			if ("<p><br></p>" == outerHtml || "<p>&nbsp;</p>" == outerHtml || "<p></p>" == outerHtml) element.remove();

			return;
		}
	}

	this.insertHtml(includeText, "html");
};

//Vlozi HTML kod do stranky, ak je tam prazdny P element za vlozenym kodom tak ho odstrani
CKEDITOR.editor.prototype.wjInsertHtml = function( includeText )
{
	//console.log("includeText="+includeText);
	var insertInline = false;
    if (includeText.indexOf("<a")==0 || includeText.indexOf("<span")==0  || includeText.indexOf("!INCLUDE") == 0) insertInline = true;

	var elementsCount = $("<span id='counter'>"+includeText+"</span>").children().length;
	var ranges = this.getSelection().getRanges( 1 );
	//console.log("ranges.length="+ranges.length+" elementsCount="+elementsCount+" insertInline="+insertInline);
	if (insertInline == false && ranges.length > 0)
	{
		var element = ranges[0].getCommonAncestor(true, true);
		if (element.getOuterHtml().indexOf("</body")==-1 && elementsCount==1)
		{
			var elementInclude = CKEDITOR.dom.element.createFromHtml(includeText);
			elementInclude.insertAfter( element );
			//ak sa jedna o prazdny odstavec odstran ho
			//console.log("outerHTML 2="+element.getOuterHtml());
			var outerHtml = element.getOuterHtml();
            //console.log("outerHtml="+outerHtml);
			if ("<p><br></p>" == outerHtml || "<p>&nbsp;</p>" == outerHtml || "<p></p>" == outerHtml || "<p>&nbsp;<br></p>" == outerHtml)
			{
				//console.log("removing element");
				//console.log(element);
				element.remove();
			}

			if (includeText.indexOf("!INCLUDE")!=-1)
			{
				var scrollTop = 0;
				try { scrollTop = document.getElementById(ckEditorInstance.id+"_contents").getElementsByTagName('iframe')[0].contentWindow.scrollY } catch (e) {}

				//console.log("GET SET DATA, scrollTop="+scrollTop);
                //toto musime spravit aby sme korektne inicializovali data, widgety a podobne
                this.setData(this.getData());

				if (scrollTop > 0)
				{
					setTimeout(function() {
                        try {
                        	//console.log("Setting scroll to: "+scrollTop);
                        	document.getElementById(ckEditorInstance.id+"_contents").getElementsByTagName('iframe')[0].contentWindow.scrollBy(0, scrollTop);
                        } catch (e) {console.log(e);}
					}, 500);
				}
            }

			return;
		}
	}

	this.insertHtml(includeText, "html");
};


// Register the plugin within the editor.
CKEDITOR.plugins.add( 'webjetcomponents', {
	// This plugin requires the Widgets System defined in the 'widget' plugin.
	requires: ['widget', 'iframedialog', 'toolbar', 'dialog', 'fakeobjects', 'forms'],

	lang: 'sk,en,cs',

	// Register the icon used for the toolbar button. It must be the same
	// as the name of the widget.
	icons: 'webjetcomponents',

	// The plugin initialization logic goes inside this method.
	init: function( editor )
	{
		// CTRL + Q
		editor.setKeystroke( CKEDITOR.CTRL + 81, 'source' );

		editor.dataProcessor.dataFilter.addRules(
	    {
	        elements :
	        {
	            'article' : function( element )
	            {
	            	var fake = editor.wjCreateFakeParserElement(element, 'wj_component', 'article', false);

	            	if (fake == null) return element;

                    fake.attributes["data-cke-realelement"] = fake.attributes["data-cke-realelement"].replace(/%26amp%3B/gi, '%26'); //fix double encoding on ampersands in src
                    return fake;
	            },
	            'div' : function( element )
	            {
	            	var style = element.attributes.style;
	            	//console.log(style);
	            	if (style !== undefined && style.indexOf("background-image")!=-1)
	            	{
	            		//fix bugu v chrome ktory nezobrazuje obrazky ktore nemaju komplet domenu, deje sa na cloude
	            		style = style.replace(/background-image:\s*url\(\/images\//gi, "background-image: url("+window.location.origin+"/images/");
	            		element.attributes.style = style;
	            	}

                    return element;
	            }
	        }
	    });

		editor.on( 'contentDom', addListeners, this );

		function addListeners() {
			var editable = editor.editable();

			editable.attachListener( editor, 'toDataFormat', function(evt) {
				try
				{
					var htmlCode = evt.data.dataValue;
					if (htmlCode.indexOf("background-image")!=-1)
					{
						//fix bugu v chrome ktory nezobrazuje obrazky ktore nemaju komplet domenu, deje sa na cloude
						//odstranime celu cestu k bg image ktore musime pridat kvoli chrome
						var re = new RegExp("background-image:\\s*url\\("+window.location.origin+"\\/images\\/","gi");
						htmlCode = htmlCode.replace(re, "background-image: url(/images/");
						evt.data.dataValue = htmlCode;
					}

				} catch (e) { console.log(e); }
			}, null, null, 20 );

		}

		/*
		 * toto nefunguje, pretoze sa neviem rozumne dostat na element node
		editor.dataProcessor.dataFilter.addRules( {
			text: function( text, element ) {
				console.log("TEXT: "+text+" node="+element.name);

				var fake = editor.createFakeParserElementWJ(element.parent, 'cke_code', 'p', false);

            	if (fake == null) return text;

                fake.attributes["data-cke-realelement"] = fake.attributes["data-cke-realelement"].replace(/%26amp%3B/gi, '%26'); //fix double encoding on ampersands in src
                return fake;
			}
		});
		*/

		editor.addCommand( 'webjetcomponentsDialog', new CKEDITOR.dialogCommand( 'webjetcomponentsDialog' ) );

		editor.ui.addButton( 'Components', {
		    label: editor.lang.webjetcomponents.title,
		    command: 'webjetcomponentsDialog',
		    toolbar: 'wjcomponents',
		    icon: '/components/_common/admin/inline/editor-components.gif'
		});

		//CKEDITOR.dialog.add( 'webjetcomponentsDialog', this.path + 'dialogs/webjetcomponents.js' );

		var wjComponentsIframe = null;

		CKEDITOR.dialog.addIframe(
				'webjetcomponentsDialog',
				editor.lang.webjetcomponents.title,
				this.path	+ 'dialogs/webjetcomponet.jsp',
				976,
				565,
				function()
				{
					// Iframe loaded callback.
					wjComponentsIframe = document.getElementById(this._.frameId);
					//wjComponentsIframe.style.overflow = "hidden";
					//console.log("loaded callback");

					ckeditorFixIframeDialog(this.getElement().$);
				},
				{
					onShow: function()
					{
						this.resize(976, 565);
						//console.log("onShow, this=", this, " element=", this.getElement());
						//window.dialog = this;
						//--this.move(10, 10);
					},
					onOk : function()
					{
						// Notify your iframe scripts here...
						//window.alert("Components OkClick, wjComponentsIframe=" + wjComponentsIframe.contentWindow);
						var okClicked = wjComponentsIframe.contentWindow.OkClick();
						//window.alert(okClicked);
						if (!okClicked) return false;
						return true;
					},
					onCancel : function()
					{
						//zrus zapamatanie elementu actuallyEditedComponent aby bolo mozne po cancel vlozit novu komponentu
						var editor = window.getCkEditorInstance(); //CKEDITOR.currentInstance;
						var actuallyEditedComponent = editor.document.$.getElementById("actuallyEditedComponent");
						if (actuallyEditedComponent != null) actuallyEditedComponent.setAttribute("id", "");
					}
				}
		);

		editor.addCommand( 'webjethtmlboxDialog', new CKEDITOR.dialogCommand( 'webjethtmlboxDialog' ) );

		editor.ui.addButton( 'Htmlbox', {
		    label: editor.lang.webjetcomponents.templates,
		    command: 'webjethtmlboxDialog',
		    toolbar: 'wjhtmlbox',
		    icon: '/components/_common/admin/inline/templates.png'
		});


        editor.ui.addButton( 'GridEditor', {
            label: 'edit grid of content',
            // label: editor.lang.webjetcomponents.grideditor.init,
            command: 'GridEditorInit',
            toolbar: 'GridEditorToolbar',
            icon: '/components/grideditor/icon-grideditor.png'
        });
        editor.addCommand( 'GridEditorInit', {
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            exec: function() {
                if (typeof GridEditorInit !== "undefined") {
                    GridEditorInit();
                }
            }
        } );
        editor.ui.addButton( 'layout-desktop', {
            label: 'set layout width to desktop',
            // label: editor.lang.webjetcomponents.grideditor.desktop,
            command: 'setLayoutDesktop',
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            toolbar: 'GridEditorToolbar',
            icon: '/components/grideditor/icon-layout-desktop.png'
        });
        editor.addCommand( 'setLayoutDesktop', {
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            exec: function( editor ) {
                var ge_canvas  = $(editor.document.$).find('.ge-canvas');

                if(ge_canvas .data('grideditor') != undefined ){
                    ge_canvas .data('grideditor').switchLayout(0);
                    ge_canvas .data('grideditor').resetColumnTools();
				}else {
                	// inline editor
                	var el = $('#wjInline-docdata');
                	if(el.length == 0) {
                		// sme v editore
                		el = $('.cke_wysiwyg_frame').contents().find("#WebJETEditorBody");
					}
					el.removeClass('ge-layout-mobile');
                	el.removeClass('ge-layout-tablet');
				}
            }
        } );
        editor.ui.addButton( 'layout-tablet', {
            label: 'set layout width to tablet',
            // label: editor.lang.webjetcomponents.grideditor.tablet,
            command: 'setLayoutTablet',
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            toolbar: 'GridEditorToolbar',
            icon: '/components/grideditor/icon-layout-tablet.png'
        });
        editor.addCommand( 'setLayoutTablet', {
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            exec: function( editor ) {
                var ge_canvas  = $(editor.document.$).find('.ge-canvas ');

                if(ge_canvas .data('grideditor') != undefined ){
                    ge_canvas .data('grideditor').switchLayout(1);
                    ge_canvas .data('grideditor').resetColumnTools();
                }else {
                    // inline editor
                    var el = $('#wjInline-docdata');
                    if(el.length == 0) {
                        // sme v editore
                        el = $('.cke_wysiwyg_frame').contents().find("#WebJETEditorBody");
                    }
                    el.removeClass('ge-layout-mobile');
                    el.addClass('ge-layout-tablet');
                }
            }
        } );
        editor.ui.addButton( 'layout-mobile', {
            label: 'set layout width to mobile',
            // label: editor.lang.webjetcomponents.grideditor.phone,
            command: 'setLayoutMobile',
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            toolbar: 'GridEditorToolbar',
            icon: '/components/grideditor/icon-layout-mobile.png'
        });
        editor.addCommand( 'setLayoutMobile', {
            modes: {wysiwyg: 1, readOnly: 1},
            readOnly: 1,
            exec: function( editor ) {
                var ge_canvas = $(editor.document.$).find('.ge-canvas');

                if(ge_canvas .data('grideditor') != undefined ){
                    ge_canvas .data('grideditor').switchLayout(2);
                    ge_canvas .data('grideditor').resetColumnTools();
                }else {
                    // inline editor
                    var el = $('#wjInline-docdata');
                    if(el.length == 0) {
                        // sme v editore
                        el = $('.cke_wysiwyg_frame').contents().find("#WebJETEditorBody");
                    }
                    el.addClass('ge-layout-mobile');
                    el.removeClass('ge-layout-tablet');
                }
            }
        } );


		//CKEDITOR.dialog.add( 'webjetcomponentsDialog', this.path + 'dialogs/webjetcomponents.js' );

		//var wjHtmlboxIframe = null;

		CKEDITOR.dialog.addIframe(
				'webjethtmlboxDialog',
				editor.lang.webjetcomponents.templates,
				this.path	+ 'dialogs/webjetcomponet.jsp?componentName=htmlbox',
				900,
				680,
				function()
				{
					// Iframe loaded callback.
					//wjHtmlboxIframe = document.getElementById(this._.frameId);
					//wjComponentsIframe.style.overflow = "hidden";
					ckeditorFixIframeDialog(this.getElement().$);
				},
				{
					onShow: function()
					{
						//console.log("onShow");
						//chrome malo nejaky psychycky problem pri zobrazeni tohto dialogu so 100% vyskou, takze obabrane takto
						var that = this;
						setTimeout(function() {
							var height = $("#"+that._.contents.iframe.undefined.domId).parent().height();
							//console.log("Parent height: ", height);
							$("#"+that._.contents.iframe.undefined.domId).css("min-height", height+"px");
						}, 2000);
						this.resize(900, 680);
						//--this.move(10, 10);
					},
					onOk : function()
					{
						// Notify your iframe scripts here...
						//window.alert("Components OkClick, wjComponentsIframe=" + wjComponentsIframe.contentWindow);
						var wjHtmlboxIframe = document.getElementById(this._.contents.iframe.undefined.domId);
						var okClicked = wjHtmlboxIframe.contentWindow.OkClick();
						//window.alert(okClicked);
						if (!okClicked) return false;

                        setTimeout(function() { try { ckEditorInstance.focus(); } catch (e) {} }, 300);

						return true;
					},
					onCancel : function()
					{
						//zrus zapamatanie elementu actuallyEditedComponent aby bolo mozne po cancel vlozit novu komponentu
                        var editor = ckEditorInstance; // CKEDITOR.currentInstance;
						var actuallyEditedComponent = editor.document.$.getElementById("actuallyEditedComponent");
						if (actuallyEditedComponent != null) actuallyEditedComponent.setAttribute("id", "");
					}
				}
		);

		editor.addCommand( 'radioGroup', new CKEDITOR.dialogCommand( 'radioGroup' ) );
		editor.addCommand( 'radioMatrix', new CKEDITOR.dialogCommand( 'radioMatrix' ) );

		CKEDITOR.dialog.addIframe(
				'radioGroup',
				editor.lang.webjetcomponents.forms.radioGroup,
				'/admin/skins/webjet8/ckeditor/dist/plugins/webjetcomponents/dialogs/radio_group.jsp',
				780,
				545,
				function()
				{
					// Iframe loaded callback.
					//wjHtmlboxIframe = document.getElementById(this._.frameId);
					//wjComponentsIframe.style.overflow = "hidden";
					ckeditorFixIframeDialog(this.getElement().$);
				},
				{
					onShow: function()
					{
						this.resize(780, 545);
						//--this.move(10, 10);
					},
					onOk : function()
					{
						// Notify your iframe scripts here...
						//window.alert("Components OkClick, wjComponentsIframe=" + wjComponentsIframe.contentWindow);
						var wjHtmlboxIframe = document.getElementById(this._.contents.iframe.undefined.domId);
						var okClicked = wjHtmlboxIframe.contentWindow.OkClick();
						var htmlCode = wjHtmlboxIframe.contentWindow.htmlCode;

						//console.log();

						// paragraph na konci som musle vlozit lebo ckeditor inak do tabulky pridat prazdne tr kam vlozi kurzor
						editor.insertHtml(htmlCode + '<p></p>');

						if (!okClicked) return false;
						return true;
					},
					onCancel : function()
					{
						//zrus zapamatanie elementu actuallyEditedComponent aby bolo mozne po cancel vlozit novu komponentu
						var editor = window.getCkEditorInstance();
						var actuallyEditedComponent = editor.document.$.getElementById("actuallyEditedComponent");
						if (actuallyEditedComponent != null) actuallyEditedComponent.setAttribute("id", "");
					}
				}
		);

		CKEDITOR.dialog.addIframe(
				'radioMatrix',
				editor.lang.webjetcomponents.forms.radioMatrix,
				'/admin/skins/webjet8/ckeditor/dist/plugins/webjetcomponents/dialogs/radio_matrix.jsp',
				780,
				545,
				function()
				{
					// Iframe loaded callback.
					//wjHtmlboxIframe = document.getElementById(this._.frameId);
					//wjComponentsIframe.style.overflow = "hidden";
					ckeditorFixIframeDialog(this.getElement().$);
				},
				{
					onShow: function()
					{
						this.resize(780, 545);
						//--this.move(10, 10);
					},
					onOk : function()
					{
						// Notify your iframe scripts here...
						//window.alert("Components OkClick, wjComponentsIframe=" + wjComponentsIframe.contentWindow);
						var wjHtmlboxIframe = document.getElementById(this._.contents.iframe.undefined.domId);
						var okClicked = wjHtmlboxIframe.contentWindow.OkClick();
						var htmlCode = wjHtmlboxIframe.contentWindow.htmlCode;

						// paragraph na konci som musle vlozit lebo ckeditor inak do tabulky pridat prazdne tr kam vlozi kurzor
						editor.insertHtml(htmlCode + '<p></p>');

						if (!okClicked) return false;
						return true;
					},
					onCancel : function()
					{
						//zrus zapamatanie elementu actuallyEditedComponent aby bolo mozne po cancel vlozit novu komponentu
						var editor = window.getCkEditorInstance();
						var actuallyEditedComponent = editor.document.$.getElementById("actuallyEditedComponent");
						if (actuallyEditedComponent != null) actuallyEditedComponent.setAttribute("id", "");
					}
				}
		);

		//zatial je to tu, malo by sa ale presunut do nejakeho vseobecneho WJ
		editor.ui.add( '|', "toolbarcol", { } );
		editor.ui.addHandler( "toolbarcol",
		{
			create: function(definition)
			{
				CKEDITOR.tools.extend( this, definition,
						// Set defaults.
						{
							// The combo won't participate in toolbar grouping.
							canGroup: false
						} );

				return {
					render: function( editor, output )
					{
						output.push( '<span class="cke_toolbar_col" role="separator"></span>' );
						return {};
					},

					canGroup: false
				};
			}
		} );

		editor.ui.add( ';', "toolbarrow", { } );
		editor.ui.addHandler( "toolbarrow",
		{
			create: function(definition)
			{
				CKEDITOR.tools.extend( this, definition,
						// Set defaults.
						{
							// The combo won't participate in toolbar grouping.
							canGroup: false
						} );

				return {
					render: function( editor, output )
					{
						output.push( '<span class="cke_toolbar_row" role="separator"></span>' );
						return {};
					}
				};
			}
		} );

		//Forms
		//{
			editor.addCommand( 'file', new CKEDITOR.dialogCommand( 'fileDialog', {
				allowedContent: 'input'
			} ) );

			editor.ui.addButton( 'File', {
				label: editor.lang.webjetcomponents.forms.file,
				icon: this.path + 'icons/file.png',
				command: 'file'
			});

			if ( editor.contextMenu ) {
				editor.addMenuGroup( 'fileGroup' );
				editor.addMenuItem( 'fileItem', {
					label: editor.lang.webjetcomponents.forms.file,
					icon: this.path + 'icons/file.png',
					command: 'file',
					group: 'fileGroup'
				});

				editor.contextMenu.addListener( function( element ) {
					if ( element.$.tagName=="INPUT" && element.$.type=="file" ) {
						return { fileItem: CKEDITOR.TRISTATE_OFF };
					}
				});
			}

        	CKEDITOR.dialog.add( 'fileDialog', this.path + 'dialogs/file.js' );

			editor.addCommand( 'label', new CKEDITOR.dialogCommand( 'labelDialog', {
			    allowedContent: 'label'
			} ) );

			editor.ui.addButton( 'Label', {
			            label: editor.lang.webjetcomponents.forms.label,
			            icon: this.path + 'icons/label.png',
			            command: 'label'
			});

	        if ( editor.contextMenu ) {
	            editor.addMenuGroup( 'labelGroup' );
	            editor.addMenuItem( 'labelItem', {
	                label: editor.lang.webjetcomponents.forms.editlabel,
	                icon: this.path + 'icons/label.png',
	                command: 'label',
	                group: 'labelGroup'
	            });

	            editor.contextMenu.addListener( function( element ) {
	                if ( element.getAscendant( 'label', true ) ) {
	                    return { labelItem: CKEDITOR.TRISTATE_OFF };
	                }
	            });
	        }

	        editor.ui.addButton( 'Captcha', {
	            label: editor.lang.webjetcomponents.forms.captcha,
	            icon: this.path + 'icons/captcha.png',
	            command: 'wjInsertCaptcha'
	        });

	        CKEDITOR.dialog.add( 'labelDialog', this.path + 'dialogs/label.js' );

	        editor.addCommand( 'wjInsertCaptcha', {
	            exec: function( editor ) {
	            	//console.log(editor);
	               //editor.insertHtml("!INCLUDE(/components/form/captcha.jsp)!");
	            	editor.wjInsertUpdateComponent("!INCLUDE(/components/form/captcha.jsp)!");
	            }
	        } );

            var  items = {};

            editor.addMenuGroup( 'wj_forms_group' );

            items.form = {
                label: editor.lang.webjetcomponents.forms.form,
                group: 'wj_forms_group',
                command: 'form',
                order: 1
            };

            items.textfield = {
                    label: editor.lang.webjetcomponents.forms.textfield,
                    group: 'wj_forms_group',
                    command: 'textfield',
                    order: 2
            };

            items.textarea = {
                    label: editor.lang.webjetcomponents.forms.textarea,
                    group: 'wj_forms_group',
                    command: 'textarea',
                    order: 3
            };

            items.select = {
                    label: editor.lang.webjetcomponents.forms.select,
                    group: 'wj_forms_group',
                    command: 'select',
                    order: 4
            };

            items.checkbox = {
                label: editor.lang.webjetcomponents.forms.checkbox,
                group: 'wj_forms_group',
                command: 'checkbox',
                order: 5
            };

            items.radio = {
                label: editor.lang.webjetcomponents.forms.radio,
                group: 'wj_forms_group',
                command: 'radio',
                order: 6
            };

            items.radioGroup = {
                label: editor.lang.webjetcomponents.forms.radioGroup,
                group: 'wj_forms_group',
                command: 'radioGroup',
                order: 7,
                icon: this.path + 'icons/radio.png'
            };

            items.radioMatrix = {
                label: editor.lang.webjetcomponents.forms.radioMatrix,
                group: 'wj_forms_group',
                command: 'radioMatrix',
                order: 8,
                icon: this.path + 'icons/radio.png'
            };

            items.button = {
                    label: editor.lang.webjetcomponents.forms.button,
                    group: 'wj_forms_group',
                    command: 'button',
                    order: 9
            };

            items.hiddenfield = {
                    label: editor.lang.webjetcomponents.forms.hidden,
                    group: 'wj_forms_group',
                    command: 'hiddenfield',
                    order: 10
            };

            items.label = {
                    label: editor.lang.webjetcomponents.forms.label,
                    group: 'wj_forms_group',
                    command: 'label',
                    order: 11
            };

			items.file = {
				label: editor.lang.webjetcomponents.forms.file,
				group: 'wj_forms_group',
				command: 'file',
				order: 12
			};

            items.captcha = {
                    label: editor.lang.webjetcomponents.forms.captcha,
                    group: 'wj_forms_group',
                    command: 'wjInsertCaptcha',
                    order: 13
            };

            editor.addMenuItems( items );

            editor.ui.add( 'WJForms', CKEDITOR.UI_MENUBUTTON, {
                label: editor.lang.forms.form.title,
                // Disable in source mode.
                modes: {
                    wysiwyg: 1
                },
                allowedContent: 'form,input',
                requiredContent: 'form,input',
                icon: 'Form',
                onMenu: function() {
                    var active = {};

                    // Make all items active.
                    for ( var p in items )
                    {
                    	//console.log(p+" g="+items[p].group+" o="+items[p].order);
                        active[ p ] = CKEDITOR.TRISTATE_OFF;
                    }

                    return active;
                }
            } );
        //}


        //nbsp plugin
        editor.addCommand('insertNbsp', {
			exec : function(editor) {
				editor.insertHtml('&nbsp;');
			}
        });

		editor.keystrokeHandler.keystrokes[CKEDITOR.SHIFT + 32 /* SPACE */] = 'insertNbsp';

		editor.addCommand('wjInlinePublish', {
			exec : function(editor) {
				console.log("saveInlineEditing");
				saveInlineEditing();
			}
        });

		editor.ui.addButton( 'InlinePublish', {
		    label: editor.lang.webjetcomponents.templates,
		    command: 'wjInlinePublish',
		    toolbar: 'wjPublish',
		    icon: '/components/_common/admin/inline/editor-publish.png'
		});

		//wj button
		editor.addCommand( 'wjbutton', new CKEDITOR.dialogCommand( 'wjbuttonDialog' ) );
		/*
		editor.ui.addButton( 'wjbutton', {
			label: 'Button',
			command: 'wjbutton',
			icon: this.path + 'images/wjbutton.png'
		});
		*/
		editor.on( 'contentDom', function() {
		   var editable = editor.editable();
		   editable.attachListener( editable, 'mouseup', function(evt) {
		    	var element = evt.data.$.target;
		    	//console.log("CLICK 2 evt=", evt);
				if (element.tagName=="A")
				{
					//pre display block alebo inline-block tiez musime zobrazit editor
               var displayStyle = window.getComputedStyle(element, null).getPropertyValue("display");
               if (displayStyle == null) displayStyle = "";
					if (element.className.indexOf('btn-')!=-1 || displayStyle.indexOf("block")!=-1)
					{
						ckEditorInstance.lastWjButton = element;
						setTimeout(function () {
								ckEditorInstance.execCommand('wjbutton');
						}, 10);
               }
				}
				else if (element.tagName=="IMG")
				{
					if (element.className.indexOf('fixedSize')!=-1 || element.className.indexOf('w-100')!=-1 || element.className.indexOf('autoimg')!=-1) {
						setTimeout(function () {
								ckEditorInstance.execCommand('image');
						}, 10);
					}
				}
		   });
		});

        CKEDITOR.dialog.add( 'wjbuttonDialog', this.path + 'dialogs/wjbutton.js' );
	}
} );