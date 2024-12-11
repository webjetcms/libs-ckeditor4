/**
 * Floating-Tools
 * Author: Philipp Stracker (2013)
 * Project page: http://stracker-phil.github.com/Floating-Tools/
 */
(function() {

	var floatingtools = function() {
		this.dom = null;  // the main toolbar-object
		this.toolbars = [];
		this.is_visible = false;

		//webjet nastavene na false kvoli debugu aby sa dal inspectnut
		this.hide_on_blur = true; //!TODO: Make this an configuration option

		this.toolbarsize = false;
		this.editoroffset = false;
		this.mousepos = {x:0, y:0};

		this.lastSrcElement = null;
		this.lastHighlightedElement = null;

		this.allreadyInitialized = false;
	};

	CKEDITOR.plugins.add( 'webjetfloatingtools', {
		requires: 'toolbar',
		lang: 'sk,en,cs',

		init: function( editor ) {
			editor.ui.addButton("FloatImage", {
                label: editor.lang.webjetfloatingtools.imageProperties,
				icon: this.path+"image/image.png",
				name: 'floatImage',
                command: 'image'
            });

			editor.ui.addButton("FloatImageEdit", {
                label: editor.lang.webjetfloatingtools.imageEdit,
				icon: this.path+"image/edit.png",
				name: 'floatImageEdit',
                command: 'editImage'
            });

			editor.ui.addButton("FloatImageDelete", {
                label: editor.lang.webjetfloatingtools.imageDelete,
				icon: this.path+"image/delete.png",
				name: 'floatImageDelete',
                command : 'deleteImage'
            });

			editor.ui.addButton("FloatTable", {
                label: editor.lang.webjetfloatingtools.tableProperties,
				icon: this.path+"image/table.png",
				name: 'floatTable',
                command: 'tableProperties'
            });

			editor.ui.addButton("FloatTableDelete", {
                label: editor.lang.webjetfloatingtools.tableDelete,
				icon: this.path+"image/delete.png",
				name: 'floatTableDelete',
                command: 'deleteTable'
            });

			editor.ui.addButton("FloatForm", {
                label: editor.lang.webjetfloatingtools.formProperties,
				icon: this.path+"image/form.png",
				name: 'floatForm',
                command: 'form'
            });

			editor.ui.addButton("FloatFormDelete", {
                label: editor.lang.webjetfloatingtools.formDelete,
				icon: this.path+"image/delete.png",
				name: 'floatFormDelete',
                command: 'deleteForm'
            });

			editor.ui.addButton("FloatDiv", {
                label:  editor.lang.webjetfloatingtools.divProperties,
				icon: this.path+"image/edit.png",
				name: 'floatDiv',
                command: 'webjetfloatingtoolsDialog'
            });

			editor.ui.addButton("FloatDivDelete", {
                label:  editor.lang.webjetfloatingtools.divDelete,
				icon: this.path+"image/delete.png",
				name: 'floatDivDelete',
                command: 'deleteDiv'
            });
            editor.ui.addButton("FloatDivCopy", {
                label:  editor.lang.webjetfloatingtools.divCopy,
                icon: this.path+"image/copy.png",
                name: 'floatDivCopy',
                command: 'copyDiv'
            });
            editor.ui.addButton("FloatDivDeleteContent", {
                label:  editor.lang.webjetfloatingtools.divDeleteContent,
                icon: this.path+"image/deleteContent.png",
                name: 'floatDivDeleteContent',
                command: 'deleteContentDiv'
            });

			editor.addCommand( 'webjetfloatingtoolsDialog', new CKEDITOR.dialogCommand( 'webjetfloatingtoolsDialog' ));

			var wjComponentsIframe = null;
			CKEDITOR.dialog.addIframe(
				'webjetfloatingtoolsDialog',
				editor.lang.webjetfloatingtools.divProperties,
				this.path	+ 'dialogs/div_properties.jsp',
				780,
				545,
				function()
				{
					ckeditorFixIframeDialog(this.getElement().$);

					function getBorderValue(elem, direction) {
						var result = [];

						if (elem.css('border-' + direction + '-width') != '') {
							result.push(elem.css('border-' + direction + '-width'));
						}

						if (elem.css('border-' + direction + '-style') != '') {
							result.push(elem.css('border-' + direction + '-style'));
						}

						if (result[1] != 'none' && elem.css('border-' + direction + '-color') != '') {
							result.push(elem.css('border-' + direction + '-color'));
						}

						return result.join(' ');

					}
					// Iframe loaded callback.
					wjComponentsIframe = document.getElementById(this._.frameId);
					//wjComponentsIframe.style.overflow = "hidden";

					var editor = window.getCkEditorInstance();
					var selection = window.getCkEditorInstance().getSelection();
					var element = selection.getSelectedElement() || selection.getStartElement();

					editor.execCommand('hideFloatingTools');

					//upravene na element ktory sa klikol nie ktory je selectnuty
					if (editor.floatingtools.lastHighlightedElement != null)
					{
						element = editor.floatingtools.lastHighlightedElement;
						element.$ = element;
					}

					//console.log("Editing element:"+editor.floatingtools.lastHighlightedElement);
					//console.log(editor.floatingtools.lastHighlightedElement);
					//console.log(element);

					if (element == null) {
						console.log('Element is null');
						return false;
					}
					//console.log("section: "+$(element.$).is('section'));

					var elements = null;
					if ($(element.$).is('div') || $(element.$).is('section') || $(element.$).is('header')) {
						elements = $(element.$).parents('div,header,section').addBack();
						//lebo andSelf otoci poradie
						elements = $(elements.get().reverse());
					}
					else {
						elements = $(element.$).parents('div,header,section');
					}

					//cloud zobrazi vsetko
					//elements = $(element.$).parents().addBack();

					if (elements == null) {
						console.log('Elements are null');
						return false;
					}

					//console.log("Reversed elements 1a:");
					//console.log(elements);

					if (wjComponentsIframe.src.indexOf('?tabs') == -1) {
						var elems = [];
						elements.each(function()
						{
							var className = $(this).prop('class');
							//console.log(this.tagName);
							if (""==className) className = this.tagName+elems.length;
							elems.push(className);
						});

						wjComponentsIframe.src = wjComponentsIframe.src + '?tabs=' + elems.join(encodeURIComponent('|'));
					}
					else {
						var data = [];
						elements.each(function(){
							var el = $(this);

							var result = {};

							//console.log(el[0]);
							//console.log(el[0].style.backgroundColor);

							result.cssClass = el.prop('class');
							result.htmlId = el.prop('id');
							result.backgroundColor = el[0].style.backgroundColor != 'transparent' ? el[0].style.backgroundColor : '';
							result.backgroundImage = el.get(0).style.backgroundImage;
							result.backgroundAttachment = el.get(0).style.backgroundAttachment;

							if (el[0].style.backgroundColor == "rgba(0, 0, 0, 0)") {
								result.backgroundColor = "";
							}

							if (result.backgroundImage != '') {
								result.backgroundImage = result.backgroundImage.replace(/(url\(|\)|'|")/gi, '');
							}

							result.width = el.get(0).style.width;
							result.height = el.get(0).style.height;

							result.margin = {};
							/*
							result.margin.top = el.css('margin-top');
							result.margin.right = el.css('margin-right');
							result.margin.bottom = el.css('margin-bottom');
							result.margin.left = el.css('margin-left');
							*/
							//nechceme vypocitanu hodnotu ale realne zadanu v inline style (kvoli auto hodnote)
							result.margin.top = el[0].style.marginTop;
							result.margin.right = el[0].style.marginRight;
							result.margin.bottom = el[0].style.marginBottom;
							result.margin.left = el[0].style.marginLeft;

							//console.log("result.margin:");
							//console.log(result.margin);

							result.border = {};
							result.border.top = getBorderValue(el, 'top');
							result.border.right = getBorderValue(el, 'right');
							result.border.bottom = getBorderValue(el, 'bottom');
							result.border.left = getBorderValue(el, 'left');

							result.padding = {};
							result.padding.top = el[0].style.paddingTop;
							result.padding.right = el[0].style.paddingRight;
							result.padding.bottom = el[0].style.paddingBottom;
							result.padding.left = el[0].style.paddingLeft;

							data.push(result);
						});

						//console.log("Setting data to window: " + data);
						//console.log(data);

						wjComponentsIframe.contentWindow.setData(data);
					}
				},
				{
					onShow: function()
					{
						this.resize(780, 450);
					},
					onOk : function()
					{
						//console.log("onOK");
						if (wjComponentsIframe == null) {
							return true;
						}

						var okClicked = wjComponentsIframe.contentWindow.OkClick();

						if (!okClicked) {
							return false;
						}

						var data = wjComponentsIframe.contentWindow.getData();

						var editor = window.getCkEditorInstance();
						var selection = editor.getSelection();
						var element = selection.getSelectedElement() || selection.getStartElement();

						//upravene na element ktory sa klikol nie ktory je selectnuty
						if (editor.floatingtools.lastHighlightedElement != null)
						{
							element = editor.floatingtools.lastHighlightedElement;
							element.$ = element;
						}

						var elements = null;
						if ($(element.$).is('div') || $(element.$).is('section') || $(element.$).is('header')) {
							elements = $(element.$).parents('div,header,section').addBack();
							elements = $(elements.get().reverse());
						}
						else {
							elements = $(element.$).parents('div,header,section');
						}

						//elements = $(element.$).parents().addBack();

						elements.each(function(i, v){
							var el = $(this);
							//console.log("setting i="+i+" size="+data.length)
							if (i < data.length)
							{
								var elData = data[i];

								if (elData.cssClass==="") el.removeAttr("class");
								else el.prop('class', elData.cssClass);

								if (elData.htmlId==="") el.removeAttr("id");
								else el.prop('id', elData.htmlId);

								var css = {};

								//zakomentovane aby sa dala farba / pozadie zmazat
								//if (elData.backgroundColor != '') {
									css['background-color'] = elData.backgroundColor;
								//}

								//if (elData.backgroundImage != '') {
									css['background-image'] = 'url(\'' + elData.backgroundImage + '\')';
								//}
								if (elData.backgroundImage==="none") css['background-image'] = "none";

								//console.log("BGIMAGE: ", elData.backgroundImage, "actual=", el.css("background-image"));

								if (elData.width != '' && elData.width.indexOf('%')==-1 && elData.width.indexOf('px')==-1) elData.width = elData.width+"px";
								css['width'] = elData.width;
								css['min-width'] = elData.width;

								if (elData.height != '' && elData.height.indexOf('%')==-1 && elData.height.indexOf('px')==-1) elData.height = elData.height+"px";
								css['height'] = elData.height;
								css['min-height'] = elData.height;

								css['background-attachment'] = elData.backgroundAttachment;

								$.each(elData.data[0], function(key, val){
									$.each(val, function(k, va){
										css[key + "-" + k] = va;
									});
								});

								//console.log("css=", css);

								$.each(css, function(name, value) {
									var current = el.css(name);
									//console.log("Testing name=", name, "value=", value, "current=", current);

									if ("background-image"===name && "url('')"===value) css[name]="";
									else if (name.indexOf("border-")==0 && "0px none"===value && current.indexOf("0px none")==0) css[name]="";
									else if (name.indexOf("margin-")==0 && "0px"===value && current==="0px") css[name]="";
									else if (name.indexOf("padding-")==0 && "0px"===value && current==="0px") css[name]="";
								});

								//console.log("css fixed=", css);

								el.css(css);

								var style = el.attr("style");
								if (style==="") el.removeAttr("style");
							}
						});

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

			editor.addCommand('deleteImage', {
				exec: function( editor ) {
					editor.execCommand('hideFloatingTools');
					var element = find_element('img', editor.getSelection());

					if (element.length > 0) {
						element.remove();
					}
				}
			});

			editor.addCommand('deleteTable', {
				exec: function( editor ) {
					editor.execCommand('hideFloatingTools');
					var element = find_element('table', editor.getSelection());

					if (element.length > 0) {
						element.remove();
					}
				}
			});

			editor.addCommand('deleteForm', {
				exec: function( editor ) {
					editor.execCommand('hideFloatingTools');
					var element = find_element('form', editor.getSelection());

					if (element.length > 0) {
						element.remove();
					}
				}
			});

			editor.addCommand('deleteDiv', {
				exec: function( editor )
				{
					//skus najst ci jeho parent nema nastavenu CSS triedu cke_floatingtools_selected
					var element = editor.floatingtools.lastHighlightedElement;
					//console.log("DELETE DIV");
					//console.log(element);

					editor.execCommand('hideFloatingTools');

					if (element.length == 1)
					{
						//console.log(element);
						element[0].remove();
						return;
					}

					element = find_element('div,header,section', editor.getSelection());
					//console.log("Deleting element: "+element.attr("id"));
					//console.log(element);

					//div v ktorom je editor nemozeme zmazat
					if (element.attr("id")!=undefined && element.attr("id").indexOf("wjInline")!=-1) return;

					if (element.length > 0) {
						element.remove();
					}
				}
			});
            editor.addCommand('copyDiv', {
                exec: function( editor )
                {

                    editor.execCommand('hideFloatingTools');

                   // element = find_element('div,header,section', editor.getSelection());
					element = editor.floatingtools.lastHighlightedElement;

                    if (element.length > 0) {
                    	element.after(element.clone());
                    }

                }
            });
            editor.addCommand('deleteContentDiv', {
                exec: function( editor )
                {

                    editor.execCommand('hideFloatingTools');

                    element = editor.floatingtools.lastHighlightedElement;

                    if (element.length > 0) {
                        element.html("");
                    }
                }
            });

			editor.addCommand('editImage', {
				exec: function( editor ) {
					editor.execCommand('hideFloatingTools');

					var selection = editor.getSelection();
					if (selection != null) {
						var element = selection.getSelectedElement();

						if (element != null) {
							var $element = $(element.$);
							var src = $element.attr('src').split('?')[0];
							var dir = src.substring(0, src.lastIndexOf('/'));
							var name = src.substring(src.lastIndexOf('/') + 1);

							var width = 990;
							var height = 720;
							if (screen.height > 1200)
							{
								width=1300;
								height = screen.height - 150;
							}
							else if (screen.height > 800)
							{
								width = 1200;
								height = screen.height - 150;
							}

							var win = window.open("/admin/v9/apps/image-editor/?id=-1&dir=" + encodeURIComponent(dir) + "&name=" + encodeURIComponent(name) + "&showOnlyEditor=true", "tinyWindow", "toolbar=no,scrollbars=yes,resizable=yes,width=" + width + ",height=" + height + ";");
						}
					}
				}
			});

			find_element = function(elementType, selection) {
				var element = selection.getSelectedElement();

				if (element != null) {
					if ($(element.$).is(elementType)) {
						return $(element.$);
					}
				}

				element = selection.getStartElement();
				if (element != null) {
					if ($(element.$).is(elementType)) {
						return $(element.$);
					}

					element = $(element.$).closest(elementType);

					if (element.length > 0) {
						return element;
					}
				}

				return [];

			}

			/**
			 * Create the UI elements required by this plugin
			 * UI is the floating toolbar
			 * Many parts of this function are taken from the toolbar plugin
			 */
			editor.on( 'uiSpace', function( event ) {
				// Create toolbar only once...
				event.removeListener();

				editor.floatingtools = new floatingtools();

				var labelId = CKEDITOR.tools.getNextId();

				var output = [
					// Did not find a nicer way to include the CSS required for the toolbar...
					'<style>',
					'.pos-relative {position:relative}',
					'.cke_floatingtools{',
						'position:absolute;',
						'width: auto;',
						'left:-50000px;',
						'top:0;',
						'padding: 5px 0 0 6px;',
						'border:1px solid #b1b1b1;',
						'border-radius:3px;',
						'box-shadow: 0 1px 10px rgba(0,0,0,0.3);',
						'transition:opacity .1s;-o-transition:opacity .1s;-moz-transition:opacity .1s;-webkit-transition:opacity .1s;',
					'}',
					'</style>',
					'<span id="', labelId, '" class="cke_voice_label">', editor.lang.toolbar.toolbars, '</span>',
					'<span id="' + editor.ui.spaceId( 'floatingtools' ) + '" class="cke_floatingtools cke_top" role="group" aria-labelledby="', labelId, '" onmousedown="return false;">' ];

				//console.log("wjft: uiSpace, labelId="+labelId+" spaceId="+editor.ui.spaceId( 'floatingtools' ));

				var groupStarted, pendingSeparator;
				var toolbars = editor.floatingtools.toolbars,
					toolbar = getFloatingToolbarConfig( editor );

				// Build the toolbar
				for ( var r = 0; r < toolbar.length; r++ ) {
					var toolbarId,
						toolbarObj = 0,
						toolbarName,
						row = toolbar[ r ],
						items;

					// It's better to check if the row object is really
					// available because it's a common mistake to leave
					// an extra comma in the toolbar definition
					// settings, which leads on the editor not loading
					// at all in IE. (#3983)
					if ( !row )
						continue;

					if ( groupStarted ) {
						output.push( '</span>' );
						groupStarted = 0;
						pendingSeparator = 0;
					}

					if ( row === '/' ) {
						output.push( '<span class="cke_toolbar_break"></span>' );
						continue;
					}

					items = row.items || row;

					// Create all items defined for this toolbar.
					for ( var i = 0; i < items.length; i++ ) {
						var item = items[ i ],
							canGroup;

						if ( item ) {
							if ( item.type == CKEDITOR.UI_SEPARATOR ) {
								// Do not add the separator immediately. Just save
								// it be included if we already have something in
								// the toolbar and if a new item is to be added (later).
								pendingSeparator = groupStarted && item;
								continue;
							}

							canGroup = item.canGroup !== false;

							// Initialize the toolbar first, if needed.
							if ( !toolbarObj ) {
								// Create the basic toolbar object.
								toolbarId = CKEDITOR.tools.getNextId();
								toolbarObj = { id: toolbarId, items: [] };
								toolbarName = row.name && ( editor.lang.toolbar.toolbarGroups[ row.name ] || row.name );

								// Output the toolbar opener.
								output.push( '<span id="', toolbarId, '" class="cke_toolbar cke_toolbar_' + row.name + '"', ( toolbarName ? ' aria-labelledby="' + toolbarId + '_label"' : '' ), ' role="toolbar">' );

								// If a toolbar name is available, send the voice label.
								toolbarName && output.push( '<span id="', toolbarId, '_label" class="cke_voice_label">', toolbarName, '</span>' );

								output.push( '<span class="cke_toolbar_start"></span>' );

								// Add the toolbar to the "editor.toolbox.toolbars"
								// array.
								var index = toolbars.push( toolbarObj ) - 1;

								// Create the next/previous reference.
								if ( index > 0 ) {
									toolbarObj.previous = toolbars[ index - 1 ];
									toolbarObj.previous.next = toolbarObj;
								}
							}

							if ( canGroup ) {
								if ( !groupStarted ) {
									output.push( '<span class="cke_toolgroup" role="presentation">' );
									groupStarted = 1;
								}
							} else if ( groupStarted ) {
								output.push( '</span>' );
								groupStarted = 0;
							}

							function addItem( item ) {
								var itemObj = item.render( editor, output );
								index = toolbarObj.items.push( itemObj ) - 1;

								if ( index > 0 ) {
									itemObj.previous = toolbarObj.items[ index - 1 ];
									itemObj.previous.next = itemObj;
								}

								itemObj.toolbar = toolbarObj;

								// No need for keyboard handlers, the toolbar is only accessibly by mouse
								/*
								itemObj.onkey = itemKeystroke;

								// Fix for #3052:
								// Prevent JAWS from focusing the toolbar after document load.
								itemObj.onfocus = function() {
									if ( !editor.toolbox.focusCommandExecuted )
										editor.focus();
								};
								*/
							}

							if ( pendingSeparator ) {
								addItem( pendingSeparator );
								pendingSeparator = 0;
							}

							addItem( item );

						}
					}

					if ( groupStarted ) {
						output.push( '</span>' );
						groupStarted = 0;
						pendingSeparator = 0;
					}

					if ( toolbarObj )
						output.push( '<span class="cke_toolbar_end"></span></span>' );

				}


				output.push( '</span>' );
				event.data.html += output.join( '' );
			});



			/**
			 * Do the magic: Attach eventhandlers to see if text is selected
			 * When text is selected then show the floating toolbar, else hide it
			 */
			editor.on('contentDom', function( event )
			{
				//console.log("wjft: contentDom initialized="+editor.floatingtools.allreadyInitialized+" name="+editor.name);
				//if (editor.name != "wjInline-docdata") return;

				//if (editor.floatingtools.allreadyInitialized==true) return;
				//editor.floatingtools.allreadyInitialized = true;

				unfocus_toolbar();

				var editable = editor.editable();

				if (editable == null) {
					return;
				}

				var editorDocument = editor.document;
				if (editor.name.indexOf("wjInline")==0 || editor.name.indexOf("Editor")!=-1)
				{
					editorDocument = CKEDITOR.document.getById(editor.name);
				}

				//console.log("editorDocument");
				//console.log(editorDocument);

				/**
				 * Attach an eventhandler to the mouse-up event
				 */
				editable.attachListener( editorDocument, 'mouseup', function( mouse_event )
				{
					//console.log("wjft: mouseup");
					//console.log(editorDocument);
					//console.log(mouse_event);
					//if (1==1) return;
					//editorDocument.on('mouseup', function( mouse_event ) {

					// When user right-clicks, ctrl-clicks, etc. then do not show the toolbar
					var data = mouse_event.data.$;

					if (data.button !== 0 || data.ctrlKey || data.altKey || data.shiftKey) return true;
					if (data.target && data.target.className.indexOf("cke_")!=-1) return true;
					if (data.target && data.target.className.indexOf("input")!=-1)
					{
						return true;
					}

					//console.log("src: "+data.target);
					//console.log(data.target);
					removeElementHighlight();

					editor.floatingtools.lastSrcElement = data.target;

					// When the user clears the selection by single-clicking in the editor then this event is fired before the selection is removed
					// So we add a short delay to give the browser a chance to remove the selection before we do anything
					setTimeout( function()
					{
						if (is_selectable()) {
							// Save the current mouse-position
							set_mousepos(mouse_event.data.$);
							// when there is text selected after mouse-up: show the toolbar
							ckEditorInstance.execCommand('showFloatingTools');
							ckEditorInstance.execCommand('changePositionFloatingTools');
						} else {
							// when no text is selected then hide the toolbar
							ckEditorInstance.execCommand('hideFloatingTools');
						}
					}, 100);
				});

				editable.attachListener( editor.window, 'scroll', function( mouse_event ) {
					//console.log("SCROLL");
					if(editor.floatingtools.is_visible){ // kvoli viacnasobnej inicializacii editora
						editor.execCommand('changePositionFloatingTools');}
				});

				/**
				 * On keypress we will always hide the toolbar
				 * The toolbar is only accessible via mouse
				 */
				editorDocument.on('keyup', function( key_event )
				{
					//console.log("wjft: keyup");
					var data = key_event.data.$;
					//console.log(data.target);
					if (data.target && data.target.className.indexOf("input")!=-1)
					{
						return true;
					}

					ckEditorInstance.execCommand('hideFloatingTools');
				});


				/**
				 * On blur hide the toolbar (editor looses focus)
				 */
				editor.on('blur', function( e )
				{
					//console.log("wjft: blur");
					if (editor.floatingtools.hide_on_blur) {
						hide_toolbar();
					}
				});


				/**
				 * Attach the mouse-over event to the toolbar.
				 * When cursor is above the toolbar then set opacity to 1
				 */
				toolbar = get_element();
				toolbar.on('mouseover', function( mouse_event ) {
					focus_toolbar();
				});


				/**
				 * When the mouse moves out of the toolbar then make it transparent again
				 */
				toolbar.on('mouseout', function( mouse_event ) {
					unfocus_toolbar();
				})

				editor.container.addClass('pos-relative');

				editor.on('mode', function(e){
			        hide_toolbar();
			    });
                editor.on('beforeModeUnload', function(e) {
                    try { GridEditorDeinit(); } catch (e) {}
                });

				editor.on('afterCommandExec', function(e)
				{
					//console.log("After command ");
					//console.log(e);

					try
					{
						//otvoril sa dialog, nic neries lebo sa zmeni focus z dialogu do editora
						if (e.data && e.data.command && e.data.command.dialogName!=null)
						{
							//console.log("Is dialog, skipping");
							return;
						}
					}
					catch (e) {}

					try
					{
						//otvoril sa dialog, nic neries lebo sa zmeni focus z dialogu do editora
						if (e.data && e.data.command && (e.data.command.name=="undo" || e.data.command.name=="redo"))
						{
							//console.log("Is undo, skipping");
							return;
						}
					}
					catch (e) {}

					try
					{
						//v ie to bolo brutal pomale, preto zatial vypnute
						if (e.data && e.data.name && e.data.name.indexOf("FloatingTools")==-1)
						{
					        hide_toolbar();

					        setTimeout(function()
					        {
					        	if ("source"==ckEditorInstance.mode) return;
					        	//toto potrebujeme aby sa refreshol toolbar (ikony, napr. zarovnanie)
					        	ckEditorInstance.execCommand('showFloatingTools');
					        	ckEditorInstance.fire("activeFilterChange");
					        }, 300);
						}
					} catch (e) {}
			    });
			});

			show_toolbar_section = function(types) {
				$(toolbar.$).find('.cke_toolbar_styles').hide();
				$(toolbar.$).find('.cke_toolbar_format').hide();
				$(toolbar.$).find('.cke_toolbar_paragraph').hide();
				$(toolbar.$).find('.cke_toolbar_image').hide();
				$(toolbar.$).find('.cke_toolbar_table').hide();
				$(toolbar.$).find('.cke_toolbar_form').hide();
				$(toolbar.$).find('.cke_toolbar_div').hide();

				$.each(types, function(i, v){
					$(toolbar.$).find('.cke_toolbar_' + v).show();
				});
			}

			show_toolbar = function() {
				toolbar.show();
			}

			addElementHighlight = function(element)
			{
				editor.floatingtools.lastHighlightedElement = element;
				element.addClass("cke_floatingtools_selected");
			}

			removeElementHighlight = function() {
				if (editor.floatingtools.lastHighlightedElement != null)
				{
					//console.log(editor.floatingtools.lastHighlightedElement);
					editor.floatingtools.lastHighlightedElement.removeClass("cke_floatingtools_selected");
				}
			}

			/**
			 * Display the floating toolbar
			 */
			editor.addCommand( 'showFloatingTools', {
				exec : function( editor ) {
					//console.log("showFloatingTools selectable="+is_selectable());
					if (is_selectable()) {
						toolbar = get_element();
						//console.log("wjft: toolbar");
						//console.log(toolbar);
						unfocus_toolbar();
						toolbar.show();

						if (is_text_selected()) {
							show_toolbar_section(['styles', 'format', 'paragraph']);
						}

						else if (is_img_selected()) {
							show_toolbar_section(['image']);
						}

						else if (is_table_selected()) {

							show_toolbar_section(['table']);
						}

                        else if (is_div_selected()) {
                            show_toolbar_section(['div']);
                        }

						else if (is_form_selected()) {
							show_toolbar_section(['form']);
						}

						// Get the size of the toolbar
						size = get_toolbar_size()
						// Get the offset of the editor
						offset = get_editor_offset();
						// Get the mouse position
						pos = get_mousepos();

						// Calculate the position for the toolbar
						toolpos = calculate_position(pos, size, offset);
						//console.log("pos: "+toolpos.y);
						if (is_text_selected()==false)
						{
							if (is_table_selected() || is_img_selected() || is_form_selected() || is_div_selected()) {
								toolpos = calculate_position_fixed(editor, pos, size, offset);
							}
						}
						//console.log("pos 2: "+toolpos.y);
						toolbar.setStyles({
							'left' : toolpos.x + 'px',
							'top' : toolpos.y + 'px'
						});
						editor.floatingtools.is_visible = true;
					}
				}
			});

			editor.addCommand( 'changePositionFloatingTools', {
				exec : function( editor )
				{
					var toolbar = get_element();
					var isVisible = parseInt($(toolbar.$).css('left')) < 0 ? false : true;
					//console.log("changePositionFloatingTools, isVisible="+isVisible);
					if (isVisible) {
						// Get the size of the toolbar
						size = get_toolbar_size()
						// Get the offset of the editor
						offset = get_editor_offset();
						// Get the mouse position
						pos = get_mousepos();

						// Calculate the position for the toolbar
						toolpos = calculate_position(pos, size, offset);
						//console.log("changePositionFloatingTools setting pos 1: "+toolpos.x+" "+toolpos.y+" offset: ");
						//console.log("selected: "+is_table_selected()+" "+is_img_selected()+" "+is_form_selected()+" "+is_div_selected());
						if (is_text_selected()==false)
						{
							if (is_table_selected() || is_img_selected() || is_form_selected() || is_div_selected()) {
								toolpos = calculate_position_fixed(editor, pos, size, offset);
							}
						}

						toolbar.setStyles({
							'left' : toolpos.x + 'px',
							'top' : toolpos.y + 'px'
						});
						editor.floatingtools.is_visible = true;

						//console.log("changePositionFloatingTools setting pos 2: "+toolpos.x+" "+toolpos.y+" offset: ");
						//console.log(offset);
					}
				}
			});

			/**
			 * Hide the floating toolbar
			 */
			editor.addCommand( 'hideFloatingTools', {
				exec : function( editor ) {
					hide_toolbar();
				}
			});


			/**
			 * ===== Behind the scenes. Getters, setters, calculation, etc.
			 */
			hide_toolbar = function() {
				if (false != editor.floatingtools.is_visible) {
					toolbar = get_element();
					toolbar.hide();
					editor.floatingtools.is_visible = false;

					removeElementHighlight();
				}
			}


			/**
			 * Store the current mouse-position, so we can position the toolbar near the cursor
			 */
			set_mousepos = function(data) {

				var windowOffset = editor.window.getScrollPosition();

				editor.floatingtools.mousepos = {
					left: data.clientX,
					top: data.clientY + windowOffset.y
				};
			}



			/**
			 * Store the current mouse-position, so we can position the toolbar near the cursor
			 */
			get_mousepos = function() {
				return editor.floatingtools.mousepos;
			}


			/**
			 * Returns the main toolbar-object (the parent of all items in the floating-toolbar)
			 */
			get_element = function()
			{
				//console.log("editor.floatingtools.dom, id="+ckEditorInstance.ui.spaceId( 'floatingtools' ));
				//console.log(ckEditorInstance.floatingtools.dom);
				if (! ckEditorInstance.floatingtools.dom) {
					var dom_id = ckEditorInstance.ui.spaceId( 'floatingtools' );
					ckEditorInstance.floatingtools.dom = CKEDITOR.document.getById( dom_id );
				}

				return ckEditorInstance.floatingtools.dom;
			}



			/**
			 * Returns the offset of the editor area (effectively the height of the top-toolbar)
			 */
			get_editor_offset = function() {
				if (! editor.floatingtools.editoroffset)
				{
					var editor_id = editor.ui.spaceId( 'contents' );
					//console.log("editor_id="+editor_id);
					var obj = CKEDITOR.document.getById( editor_id );
					//console.log(obj);
					if (obj != null)
					{
						editor.floatingtools.editoroffset = {
							left:   obj.$.offsetLeft,
							top:    obj.$.offsetTop,
							width:  obj.$.offsetWidth,
							height: obj.$.offsetHeight
						};
					}
					else
					{
						var inlineToolbarElement = document.getElementById("wjInlineCkEditorToolbarOffsetElement");
						//console.log("inlineToolbarElement");
						//console.log(inlineToolbarElement);
						if (inlineToolbarElement != null)
						{
							//inline editacia, toolbar je vycentrovany v strede
							//console.log("inlineToolbarElement.offsetWidth="+inlineToolbarElement.offsetWidth);
							//console.log($(inlineToolbarElement).width());
							//console.log(inlineToolbarElement);

							var leftPos = inlineToolbarElement.offsetLeft;
							var topPos = inlineToolbarElement.offsetTop;

							var editoroffset = {
									left:   -leftPos,
									top:    -34, //-topPos,
									width:  inlineToolbarElement.offsetWidth,
									height: inlineToolbarElement.offsetHeight
								};

							//console.log("get_editor_offset: ");
							//console.log(editoroffset);

							return editoroffset;
						}
						else
						{
							//failsafe
							editor.floatingtools.editoroffset = {
								left:   0,
								top:    0,
								width:  0,
								height: 0
							};
						}
					}
				}
				return editor.floatingtools.editoroffset;
			}


			/**
			 * Calculates the position for the toolbar
			 */
			calculate_position = function(pos, toolbar_size, offset)
			{
				var borderTop = parseInt($("#cke_1_contents").css("border-top-width"));
				if (isNaN(borderTop))
				{
					borderTop = 0;
				}

				var windowOffset = editor.window.getScrollPosition();
				//console.log("windowOffset y="+windowOffset.y+" pos.top="+pos.top);

				toolpos = {
					x: pos.left + offset.left - (toolbar_size.width/2),
					y: pos.top + offset.top - windowOffset.y - (toolbar_size.height + 20) + borderTop
				}

				//console.log("pos.top="+pos.top + " offset.top=" + offset.top + " pos.left="+pos.left+" offset.left="+offset.left+" offset.width="+offset.width+" toolbar_size.height=" + toolbar_size.height+" toolbar_size.width="+toolbar_size.width+" borderTop="+borderTop+" toolpos.x="+toolpos.x+" toolpos.y="+toolpos.y);

				// make sure toolbar does not extend out of the left CKEditor border
				if (toolpos.x < offset.left + 2) toolpos.x = offset.left + 2;

				// make sure toolbar does not extend out of the right CKEditor border
				if (pos.left + (toolbar_size.width/2) >= offset.left + offset.width-2 )
					toolpos.x = offset.left + offset.width - toolbar_size.width - 2;

				// Make sure toolbar does no go into the top toolbar area
				if (toolpos.y < offset.top)
				{
					//toolpos.y = offset.top;
					//hide_toolbar();
				}

				// make sure toolbar does not cover the mouse-cursor when text in the top line is selected
				if (borderTop < 1)
				{
					//toto nejde v inline editacii, preto takto upodmienkovane borderTop < 1
					if (offset.top+pos.top > toolpos.y
					&& offset.top+pos.top < toolpos.y+toolbar_size.height)
						toolpos.y = offset.top + pos.top + 24; // display toolbar below the cursor
				}

				//console.log("calculate_position, returning toolpos.x="+toolpos.x+" .y="+toolpos.y);

				return toolpos;
			}

			find_form_element = function(element) {

				if (element == null) {
					return [];
				}

				var $element = $(element.$);

				if ($element.is('form')) {
					return $element;
				}

				if ($element.parents('form').first().length > 0) {
					return $element.parents('form').first();
				}

				return [];
			}

			calculate_position_fixed = function(editor, pos, toolbar_size, offset)
			{
				//console.log("calculate_position_fixed pos="+pos+" offset="+offset);
				//console.log(pos);
				//console.log(offset);

				//8 je vyska zobacika
				var ediorToolbarSize = $('#cke_1_top').outerHeight()-8;

				if ($('div.wj-control-line').length>0)
				{
					ediorToolbarSize = -$('div.wj-control-line').outerHeight()-8;
				}
				var selection = editor.getSelection();
				var selectedElement = selection.getSelectedElement();
				var startElement = selection.getStartElement();

				var elementOffset = null;
				var element = null;

				if (is_img_selected())
				{
					//aby sme mali dobru poziciu na img vlozenom v table
					if (selectedElement != null) element = $(selectedElement.$).closest('img');
					if (element == null) element = $(startElement.$).closest('img');
				}
				else if (is_table_selected()) {
					if (selectedElement != null) element = $(selectedElement.$).closest('table');
					if (element == null) element = $(startElement.$).closest('table');
				}
				else if (is_div_selected())
				{
					//console.log("in is_div_selected");
					//console.log(editor.floatingtools.lastSrcElement);
					selectedElement = null;
					element = $(editor.floatingtools.lastSrcElement).closest('div,header,section');

					// console.log("SELECTED:");
					// console.log(element);
					if (element.length == 1)
					{
						if ($(element[0]).hasClass("row") || $(element[0]).hasClass("container"))
						{
							//console.log("Je to row");
							var element2 = $(editor.floatingtools.lastSrcElement).closest('header,section');
							//console.log("element 2");
							//console.log(element2)
							if (element2.length == 1)
							{
								element = element2;
							}
						}
                        /*
						if ($(element[0]).hasClass("content") || $(element[0]).hasClass("box"))
                        {
                            console.log("Je to row");
                            var element2 = $(editor.floatingtools.lastSrcElement).closest('div[class^="col-"]');
                            console.log("element 2");
                            console.log(element2)
                            if (element2.length == 1)
                            {
                                element = element2;
                            }
                        }
                        */
					}

					/*
					if (selectedElement != null) element = $(selectedElement.$).closest('div');
					if (element == null) element = $(startElement.$).closest('div');
					*/

					//console.log("ELEMENT:");
					//console.log(element);
				}
                else if (is_form_selected()) {
                    if (selectedElement != null) element = $(selectedElement.$).closest('form');
                    if (element == null) element = $(startElement.$).closest('form');
                }

				var windowOffset = editor.window.getScrollPosition();

				//console.log("windowOffset");
				//console.log(windowOffset);

				if (element != null) {
					elementOffset = element.offset();
				}

				//console.log("element");
				//console.log(element);

				//console.log("elementOffset");
				//console.log(elementOffset);

				if (elementOffset != null)
				{
					addElementHighlight(element);

					//console.log("elementWidth: "+element.outerWidth());
					//console.log("pos.left="+pos.left+" windowOffset.x="+windowOffset.x+" toolbar_size.width="+toolbar_size.width+" (toolbar_size.width/2)="+(toolbar_size.width/2));

					//var x = pos.left + windowOffset.x - (toolbar_size.width/2);
					var x = windowOffset.x + elementOffset.left + (element.outerWidth()/2) - (toolbar_size.width/2);
					var y = ediorToolbarSize + elementOffset.top - windowOffset.y - toolbar_size.height;

					//console.log("x="+x+" toolbar_size.width="+toolbar_size.width);

					if (x < toolbar_size.width/2) {
						x = toolbar_size.width/2;
					}

					if (y < ediorToolbarSize && windowOffset.y > toolbar_size.height) {
						//hide_toolbar();
					}
					else {
						//show_toolbar();
					}

					if (offset.left < -1)
					{
						//pri inline editacii mame posunuty toolbar, musime odpocitat
						x = x + offset.left;
						y = y + offset.top;
						y = y - 10; //zobacik
					}

					toolpos = {
						x: x,
						y: y
					}

					//console.log("Returning toolpos fixed");
					//console.log(toolpos);

					return toolpos;
				}

				return calculate_position(pos, toolbar_size, offset);
			}

			/**
			 * Returns the size of the floating toolbar
			 */
			get_toolbar_size = function() {
				//if (! editor.floatingtools.toolbarsize) {
					var obj = get_element();
					//console.log(obj);

					editor.floatingtools.toolbarsize = {
						width: 0, //obj.$.offsetWidth,
						height: 36 //obj.$.offsetHeight
					};

					var i = 0;
					var len = obj.$.children.length;
					//console.log("len="+len);
					for (i=0; i<len; i++)
					{
						editor.floatingtools.toolbarsize.width = editor.floatingtools.toolbarsize.width + obj.$.children[i].offsetWidth;
						//editor.floatingtools.toolbarsize.height = obj.$.children[i].offsetHeight;
						//console.log("width["+i+"]="+editor.floatingtools.toolbarsize.width);
					}
				//}

				var offsetTop = document.getElementById("cke_1_top").offsetTop;
				var toolbarSize =
				{
					width: editor.floatingtools.toolbarsize.width + 8,
					height: editor.floatingtools.toolbarsize.height + offsetTop
				};
				//console.log("Toolbar size:");
				//console.log(toolbarSize);

				return toolbarSize;
			}

			is_selectable = function()
			{
				//ak je otvoreny dialog nerob nic
				if (CKEDITOR.dialog.getCurrent()!=null) return false;

				return (is_text_selected() || is_img_selected() || is_table_selected() || is_form_selected() || is_div_selected());
			}

			/**
			 * Check if text is selected.
			 * Retrns true when there is at least 1 character selected in the editor
			 */
			is_text_selected = function () {
				var text = ckEditorInstance.getSelection().getSelectedText();
				//console.log(":"+text+":");
				//console.log(ckEditorInstance.getSelection());
				//medzeru ma ked selectnes input vo forme
				if (text == null || text == ' ') return false;

				return text != '';
			}

			is_img_selected = function() {
				var element = ckEditorInstance.getSelection().getSelectedElement();
				if (element != null) {
					return element.is('img');
				}
			}

			is_table_selected = function() {
				var element = ckEditorInstance.getSelection().getSelectedElement();
				var startElement = ckEditorInstance.getSelection().getStartElement();

				if (element != null) {
					return element.is('table');
				}
				else if (startElement != null)
				{
					var isTable = startElement.is('td') || startElement.is('th');
					if (isTable == false && startElement.$.parentElement != null)
					{
						var tagName = startElement.$.parentElement.tagName;
						if (tagName == "TD" || tagName == "TH")
						{
							return true;
						}
					}
					return isTable;
				}
				return false;
			}

			is_form_selected = function() {
				var element = ckEditorInstance.getSelection().getSelectedElement();
				var startElement = ckEditorInstance.getSelection().getStartElement();

				var ret = false;
				if (element != null) {
					ret = $(element.$).parents('form').first().length > 0
				}
				else if (startElement != null) {
					ret = startElement.is('form') || $(startElement.$).parents('form').first().length > 0;
				}
				return ret;
			}

			is_div_selected = function() {

				/*
				var selection = ckEditorInstance.getSelection();
				var element = selection.getSelectedElement();
				var startElement = selection.getStartElement();
				*/
				var element = editor.floatingtools.lastSrcElement;
				if (element == undefined) return false;
				element.$ = element;
				var startElement = null;

				//console.log(element.tagName);

				if ("SECTION"==element.tagName || "HEADER"==element.tagName || "DIV"==element.tagName) return true;

				//console.log($(element).parents('div,section').first().length);

				if (element != null)
				{
					if ($(element.$).parents('div').first().hasClass("cke_editable")) return false;

					return $(element.$).parents('div,header,section').first().length > 0
				}
				else if (startElement != null)
				{
					if (startElement.hasClass("cke_editable") || $(startElement.$).parents('div').first().hasClass("cke_editable")) return false;

					return startElement.is('div,header,section') || $(startElement.$).parents('div,header,section').first().length > 0;
				}
			}

			/**
			 * Make the toolbar opaque
			 */
			focus_toolbar = function() {
				obj = get_element();
				obj.setOpacity(1);
			}


			/**
			 * Make the toolbar transparent
			 */
			unfocus_toolbar = function() {
				obj = get_element();
				obj.setOpacity(0.5);
			},


			/**
			 * Get the plugin configuration.
			 * Kidnapped from the toolbar-plugin...
			 */
			getFloatingToolbarConfig = function( editor ) {
				var removeButtons = editor.config.removeButtons;

				removeButtons = removeButtons && removeButtons.split( ',' );

				function buildToolbarConfig() {
					// Take the base for the new toolbar, which is basically a toolbar
					// definition without items.
					var toolbar = getPrivateFloatingToolbarGroups( editor );
					return populateToolbarConfig( toolbar );

				}

				// Returns an object containing all toolbar groups used by ui items.
				function getItemDefinedGroups() {
					var groups = {},
						itemName, item, itemToolbar, group, order;

					for ( itemName in editor.ui.items ) {
						item = editor.ui.items[ itemName ];
						itemToolbar = item.toolbar || 'others';
						if ( itemToolbar ) {
							// Break the toolbar property into its parts: "group_name[,order]".
							itemToolbar = itemToolbar.split( ',' );
							group = itemToolbar[ 0 ];
							order = parseInt( itemToolbar[ 1 ] || -1, 10 );

							// Initialize the group, if necessary.
							groups[ group ] || ( groups[ group ] = [] );

							// Push the data used to build the toolbar later.
							groups[ group ].push( { name: itemName, order: order} );
						}
					}

					// Put the items in the right order.
					for ( group in groups ) {
						groups[ group ] = groups[ group ].sort( function( a, b ) {
							return a.order == b.order ? 0 :
								b.order < 0 ? -1 :
								a.order < 0 ? 1 :
								a.order < b.order ? -1 :
								1;
						});
					}

					return groups;
				}

				function fillGroup( toolbarGroup, uiItems ) {
					if ( uiItems.length ) {
						if ( toolbarGroup.items )
							toolbarGroup.items.push( editor.ui.create( '-' ) );
						else
							toolbarGroup.items = [];

						var item, name;
						while ( ( item = uiItems.shift() ) ) {
							name = typeof item == 'string' ? item : item.name;

							// Ignore items that are configured to be removed.
							if ( !removeButtons || CKEDITOR.tools.indexOf( removeButtons, name ) == -1 ) {
								item = editor.ui.create( name );

								if ( !item )
									continue;

								if ( !editor.addFeature( item ) )
									continue;

								toolbarGroup.items.push( item );
							}
						}
					}
				}

				function populateToolbarConfig( config ) {
					var toolbar = [],
						i, group, newGroup;

					for ( i = 0; i < config.length; ++i ) {
						group = config[ i ];
						newGroup = {};

						if ( group == '/' )
							toolbar.push( group );
						else if ( CKEDITOR.tools.isArray( group) ) {
							fillGroup( newGroup, CKEDITOR.tools.clone( group ) );
							toolbar.push( newGroup );
						}
						else if ( group.items ) {
							fillGroup( newGroup, CKEDITOR.tools.clone( group.items ) );
							newGroup.name = group.name;
							toolbar.push( newGroup);
						}
					}

					return toolbar;
				}

				var toolbar = editor.config.floatingtools;

				// If it is a string, return the relative "toolbar_name" config.
				if ( typeof toolbar == 'string' )
					toolbar = editor.config[ 'floatingtools_' + toolbar ];

				return ( editor.toolbar = toolbar ? populateToolbarConfig( toolbar ) : buildToolbarConfig() );
			},


			/**
			 * Return the default toolbar configuration.
			 */
			getPrivateFloatingToolbarGroups = function( editor ) {

			    //console.log("editor._.floatingToolsGroups");
			    //console.log(editor._.floatingToolsGroups);
			    //console.log(editor.config.floatingToolsGroups);

				return editor._.floatingToolsGroups || ( editor._.floatingToolsGroups = editor.config.floatingToolsGroups);
			}
		}

	} );


})();
