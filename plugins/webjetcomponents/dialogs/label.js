CKEDITOR.dialog.add( 'labelDialog', function( editor ) {
    return {
        title: editor.lang.webjetcomponents.forms.labelProperties,
        minWidth: 400,
        minHeight: 200,

        contents: [
            {
                id: 'tab-basic',
                label: editor.lang.webjetcomponents.forms.labelBasic,
                elements: [
                    {
                        type: 'text',
                        id: 'label',
                        label: editor.lang.webjetcomponents.forms.labelname,
                        validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.webjetcomponents.forms.labelcannotbeempty ),

                        setup: function( element ) {
                            this.setValue( element.getText() );
                        },

                        commit: function( element ) {
                            element.setText( this.getValue() );
                        }
                    },
                    {
                        type: 'text',
                        id: 'for',
                        label: editor.lang.webjetcomponents.forms.forfield,
                        validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.webjetcomponents.forms.forcannotbeempty ),

                        setup: function( element ) {
                            this.setValue( element.getAttribute( "for" ) );
                        },

                        commit: function( element ) {
                            element.setAttribute( "for", this.getValue() );
                        }
                    }
                ]
            },

            {
                id: 'tab-adv',
                label: editor.lang.webjetcomponents.forms.labelAdvanced,
                elements: [
                    {
                        type: 'text',
                        id: 'class',
                        label: editor.lang.webjetcomponents.forms.cssClass,

                        setup: function( element ) {
                            this.setValue( element.getAttribute( "class" ) );
                        },

                        commit: function ( element ) {
                            var clss = this.getValue();
                            if ( clss )
                                element.setAttribute( 'class', clss );
                            else if ( !this.insertMode )
                                element.removeAttribute( 'class' );
                        }
                    },
{
                        type: 'text',
                        id: 'style',
                        label: editor.lang.webjetcomponents.forms.cssStyle,

                        setup: function( element ) {
                            this.setValue( element.getAttribute( "style" ) );
                        },

                        commit: function ( element ) {
                            var styl = this.getValue();
                            if ( styl )
                                element.setAttribute( 'style', styl );
                            else if ( !this.insertMode )
                                element.removeAttribute( 'style' );
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if ( element )
                element = element.getAscendant( 'label', true );

            if ( !element || element.getName() != 'label' ) {
                element = editor.document.createElement( 'label' );
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;
            if ( !this.insertMode )
                this.setupContent( this.element );
        },

        onOk: function() {
            var dialog = this;
            var label = this.element;
            this.commitContent( label );

            if ( this.insertMode )
                editor.insertElement( label );
        }
    };
});

