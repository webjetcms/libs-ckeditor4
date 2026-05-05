CKEDITOR.plugins.add('webjetsvgicon', {
    requires: 'dialog',
    icons: 'svgicon',
    lang: 'sk,en,cs',
    init: function(editor) {
        editor.addCommand('webjetsvgicon', new CKEDITOR.dialogCommand('svgiconDialog'));

        editor.ui.addButton('WebjetSvgIcon', {
            label: editor.lang.webjetsvgicon.buttonLabel,
            command: 'webjetsvgicon',
            toolbar: 'insert',
            icon: this.path + 'icons/svgicon.svg'
        });

        CKEDITOR.dialog.add('svgiconDialog', this.path + 'dialogs/svgicon.js');

        // Allow SVG elements in the editor
        editor.filter.allow({
            svg: {
                attributes: '!*',
                children: true
            },
            use: {
                attributes: '!*'
            }
        });

        // Ensure cursor can be placed after any inline element (SVG, SPAN, etc.)
        // that is the last child of a block. appendBogus() adds a <br> that acts
        // as a cursor target; htmldataprocessor.cleanBogus() strips it on getData().
        var blockTags = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1,
                          li: 1, td: 1, th: 1, blockquote: 1, pre: 1, address: 1 };

        function ensureBlockFiller( editable ) {
            var blocks = editable.find( Object.keys( blockTags ).join( ',' ) );
            for ( var i = 0; i < blocks.count(); i++ ) {
                var block = blocks.getItem( i );
                var last = block.getLast();
                // Skip trailing whitespace-only text nodes to find the real last child
                while ( last && last.type === CKEDITOR.NODE_TEXT &&
                        !CKEDITOR.tools.rtrim( last.getText() ) ) {
                    last = last.getPrevious();
                }
                // If the last meaningful child is an element (not already a <br>),
                // add a bogus <br> so the browser can place a cursor after it.
                if ( last && last.type === CKEDITOR.NODE_ELEMENT && !last.is( 'br' ) ) {
                    block.appendBogus();
                }
            }
        }

        editor.on( 'contentDom', function() {
            ensureBlockFiller( editor.editable() );

		   var editable = editor.editable();
		   editable.attachListener( editable, 'mousedown', function(evt) {
                try {
                    var element = evt.data.$.target;
                    if (element.tagName.toUpperCase() =="SVG" ||
                        (element.tagName.toUpperCase()=="USE" && element.parentNode.tagName.toUpperCase()=="SVG")) {

                        //we need to mark icon with CSS class svg-icon-selected as selected so dialog can change its properties
                        var svgElement = (element.tagName.toUpperCase()=="SVG") ? element : element.parentNode;

                        if (svgElement.classList.contains('icon') === false) {
                            //it's not our SVG icon, ignore
                            return;
                        }

                        //normal click should open dialog
                        if (evt.data.$.button === 0) {
                            //remove previously selected icons
                            var previouslySelected = editor.document.find('.svg-icon-selected');
                            for (var i=0; i<previouslySelected.count(); i++) {
                                previouslySelected.getItem(i).removeClass('svg-icon-selected');
                            }
                            //add class to currently selected icon
                            svgElement.classList.add('svg-icon-selected');

                            //open svg icon dialog
                            editor.execCommand('webjetsvgicon');
                        } else if (evt.data.$.button === 2) {
                            //right click should show delete confirmation
                            evt.data.$.preventDefault();
                            evt.data.$.stopPropagation();

                            var confirmMessage = editor.lang.webjetsvgicon.deleteConfirm || 'Do you want to delete this icon?';

                            if (confirm(confirmMessage)) {
                                //remove the SVG element
                                var svgCKElement = new CKEDITOR.dom.element(svgElement);
                                svgCKElement.remove();

                                //update editor content
                                editor.fire('change');
                            }
                        }
                    }
                } catch (e) {
                    console.error("Error in webjetsvgicon mouseup handler", e);
                }
		   });
		});

        // Re-run after paste / insertHtml so pasted blocks ending with inline
        // elements also get a bogus filler.
        editor.on( 'afterInsertHtml', function() {
            ensureBlockFiller( editor.editable() );
        } );
    }
});