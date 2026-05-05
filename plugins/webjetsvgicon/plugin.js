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

        var blockTags = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1,
                          li: 1, td: 1, th: 1, blockquote: 1, pre: 1, address: 1 };

        // Returns true if element is an inline element AND the last meaningful
        // direct child of its parent block (ignoring trailing whitespace / bogus BR).
        function isBlockTerminalInline( element ) {
            if ( !element || element.type !== CKEDITOR.NODE_ELEMENT ) return false;
            if ( element.is( blockTags ) ) return false;
            var parent = element.getParent();
            if ( !parent || !parent.is( blockTags ) ) return false;
            var next = element.getNext( function( n ) {
                if ( n.type === CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim( n.getText() ) ) return false;
                if ( n.type === CKEDITOR.NODE_ELEMENT && n.is( 'br' ) ) return false;
                return true;
            } );
            return !next;
        }

        // Move cursor to immediately after element, outside any inline wrapper.
        function exitInlineElement( element ) {
            var range = editor.createRange();
            range.setStartAfter( element );
            range.collapse( true );
            editor.getSelection().selectRanges( [ range ] );
            editor.focus();
        }

        // If cursor is at the very end of a chain of block-terminal inline elements,
        // return the outermost direct-child-of-block element. Otherwise returns null.
        function getBlockTerminalInlineAtCursorEnd() {
            var sel = editor.getSelection();
            if ( !sel ) return null;
            var ranges = sel.getRanges();
            if ( !ranges[ 0 ] || !ranges[ 0 ].collapsed ) return null;

            var range = ranges[ 0 ];
            var container = range.startContainer;
            var offset = range.startOffset;
            var editable = editor.editable();
            var node;

            if ( container.type === CKEDITOR.NODE_TEXT ) {
                if ( offset < container.getLength() ) return null;
                node = container.getParent();
            } else if ( container.type === CKEDITOR.NODE_ELEMENT ) {
                if ( offset < container.getChildCount() ) return null;
                node = container;
            } else {
                return null;
            }

            while ( node && !node.equals( editable ) ) {
                if ( node.is( blockTags ) ) return null;
                var parent = node.getParent();
                if ( !parent ) return null;
                if ( parent.is( blockTags ) ) {
                    return isBlockTerminalInline( node ) ? node : null;
                }
                // Still inside a nested inline — check we are at the end of this parent too
                var nextSib = node.getNext( function( n ) {
                    return !( n.type === CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim( n.getText() ) );
                } );
                if ( nextSib ) return null;
                node = parent;
            }
            return null;
        }

        editor.on( 'contentDom', function() {
		   var editable = editor.editable();
		   var doc = editor.document;

		   // --- Hover indicator: shown next to block-terminal inline elements ---
		   // Remove any stale indicator from a previous contentDom cycle.
           var wjInlineExitIndID = 'wj-inline-exit-ind-'+editor.id;
		   var staleInd = doc.getById( wjInlineExitIndID );
		   if ( staleInd ) staleInd.remove();

		   var indicator = new CKEDITOR.dom.element( 'span', doc );
		   indicator.setAttributes( {
		       id: wjInlineExitIndID,
		       contenteditable: 'false',
		       'data-cke-temp': '1',
		       title: ( editor.lang.webjetsvgicon && editor.lang.webjetsvgicon.insertAfterLabel ) || '→'
		   } );
		   indicator.setStyles( {
		       display: 'none',
		       position: 'absolute',
		       cursor: 'pointer',
		       background: '#F7CA18',
		       border: '1px solid #F7CA18',
		       'border-radius': '6px',
		       padding: '0 5px',
		       'font-size': '17px',
		       'line-height': '16px',
		       'z-index': '10100',
		       '-webkit-user-select': 'none',
		       'user-select': 'none',
               'font-weight': 'bold',
		   } );
		   indicator.setHtml( '&#x21E5;' ); // ⇥
		   doc.getBody().append( indicator );

		   var indicatorTarget = null;
		   var hideIndicatorTimer = null;

		   function hideIndicator() {
		       clearTimeout( hideIndicatorTimer );
		       indicator.setStyle( 'display', 'none' );
		       indicatorTarget = null;
		   }

		   indicator.on( 'mousedown', function( evt ) {
		       evt.data.$.preventDefault();
		       if ( indicatorTarget ) {
		           exitInlineElement( indicatorTarget );
		           hideIndicator();
		       }
		   } );
		   indicator.on( 'mouseover', function() {
		       clearTimeout( hideIndicatorTimer );
		   } );
		   indicator.on( 'mouseout', function() {
		       hideIndicatorTimer = setTimeout( hideIndicator, 200 );
		   } );

		   // Show indicator when hovering over a block-terminal inline element.
		   // Also handles the case where pointer-events:none on the inline element
		   // (e.g. SVG icons) causes mouse events to fire on the parent block instead.
		   editable.attachListener( editable, 'mousemove', function( evt ) {
		       var target = evt.data.$.target;
		       if ( !target ) return;
		       if ( target === indicator.$ || indicator.$.contains( target ) ) return;

		       var node = new CKEDITOR.dom.element( target );
		       while ( node && !node.equals( editable ) ) {
		           if ( isBlockTerminalInline( node ) ) {
		               clearTimeout( hideIndicatorTimer );
		               indicatorTarget = node;
		               var pos = node.getDocumentPosition( doc );
		               var bcr = node.$.getBoundingClientRect();
		               indicator.setStyles( {
		                   display: 'inline-block',
		                   top: ( pos.y + Math.max( 0, Math.floor( ( bcr.height - 18 ) / 2 ) ) ) + 'px',
		                   left: ( pos.x + bcr.width + 2 ) + 'px'
		               } );
		               return;
		           }
		           node = node.getParent();
		       }
		       clearTimeout( hideIndicatorTimer );
		       hideIndicatorTimer = setTimeout( hideIndicator, 200 );
		   } );

		   // RIGHT ARROW: escape block-terminal inline element when cursor is at its end
		   editable.attachListener( editable, 'keydown', function( evt ) {
		       if ( evt.data.$.keyCode !== 39 ) return; // RIGHT arrow only
		       var inlineEl = getBlockTerminalInlineAtCursorEnd();
		       if ( inlineEl ) {
		           evt.data.$.preventDefault();
		           exitInlineElement( inlineEl );
		       }
		   } );

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

    }
});