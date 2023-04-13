/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.dialog.add( 'fileDialog', function( editor ) {

	var acceptedTypes = { file: 1 };

	function autoCommit( data ) {
		var element = data.element;
		var value = this.getValue();

		value ? element.setAttribute( this.id, value ) : element.removeAttribute( this.id );
	}

	function autoSetup( element ) {
		var value = element.hasAttribute( this.id ) && element.getAttribute( this.id );
		this.setValue( value || '' );
	}

	return {
		title: editor.lang.webjetcomponents.forms.file,
		minWidth: 350,
		minHeight: 150,
		onShow: function() {
			delete this.textField;

			var element = this.getParentEditor().getSelection().getSelectedElement();
			if ( element && element.getName() == 'input' && ( acceptedTypes[ element.getAttribute( 'type' ) ] || !element.getAttribute( 'type' ) ) ) {
				this.textField = element;
				this.setupContent( element );
			}
		},
		onOk: function() {
			var editor = this.getParentEditor(),
				element = this.textField,
				isInsertMode = !element;

			if ( isInsertMode ) {
				element = editor.document.createElement( 'input' );
				element.setAttribute( 'type', 'file' );
			}

			var data = { element: element };

			if ( isInsertMode )
				editor.insertElement( data.element );

			this.commitContent( data );

			// Element might be replaced by commitment.
			if ( !isInsertMode )
				editor.getSelection().selectElement( data.element );

            var form = data.element.$.form;
            if (form != null) form.setAttribute("enctype", "multipart/form-data");
		},
		onLoad: function() {
			this.foreach( function( contentObj ) {
				if ( contentObj.getValue ) {
					if ( !contentObj.setup )
						contentObj.setup = autoSetup;
					if ( !contentObj.commit )
						contentObj.commit = autoCommit;
				}
			} );
		},
		contents: [ {
			id: 'info',
			label: editor.lang.forms.textfield.title,
			title: editor.lang.forms.textfield.title,
			elements: [ {
				type: 'hbox',
				widths: [ '50%', '50%' ],
				children: [ {
					id: '_cke_saved_name',
					type: 'text',
					label: editor.lang.forms.textfield.name,
					'default': '',
					accessKey: 'N',
					setup: function( element ) {
						this.setValue( element.data( 'cke-saved-name' ) || element.getAttribute( 'name' ) || '' );
					},
					commit: function( data ) {
						var element = data.element;

						if ( this.getValue() )
							element.data( 'cke-saved-name', this.getValue() );
						else {
							element.data( 'cke-saved-name', false );
							element.removeAttribute( 'name' );
						}
					}
				} ]
			},
			{
				type: 'hbox',
				widths: [ '50%', '50%' ],
				children: [ {
					id: 'size',
					type: 'text',
					label: editor.lang.forms.textfield.charWidth,
					'default': '',
					accessKey: 'C',
					style: 'width:50px',
					validate: CKEDITOR.dialog.validate.integer( editor.lang.common.validateNumberFailed )
				} ],
				onLoad: function() {
					// Repaint the style for IE7 (#6068)
					if ( CKEDITOR.env.ie7Compat )
						this.getElement().setStyle( 'zoom', '100%' );
				}
			},
			{
				id: 'required',
				type: 'checkbox',
				label: editor.lang.webjetcomponents.forms.required,
				'default': '',
				accessKey: 'Q',
				value: 'required',
				setup: function( element ) {
					var cls = element.getAttribute( 'class' );
					var required = false;
					if (cls != null && cls.indexOf("required")!=-1) required = true;
					this.setValue( required );
				},
				commit: function( data ) {
					var element = data.element;
					if ( this.getValue() ) {
                        element.setAttribute('class', 'required');
                    }
					else {
                        element.setAttribute( 'class', '' );
                    }
				}
			} ]
		} ]
	};
} );
