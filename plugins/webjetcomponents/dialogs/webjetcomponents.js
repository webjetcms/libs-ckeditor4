// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'webjetcomponentsDialog', function( editor ) {
	return {
		title: 'Component Properties',
        minWidth: 400,
        minHeight: 200,

        contents: [
               {
                   id: 'tab-basic',
                   label: 'Basic Settings',
                   elements: [
                       {
                           type: 'text',
                           id: 'includeText',
                           label: 'Component text',
                           validate: CKEDITOR.dialog.validate.notEmpty( "Component field cannot be empty" ),
                           setup: function( element )
                           {
                               this.setValue( decodeURIComponent(element.data("cke-realelement")) );
                           },
                           commit: function ( element )
                           {
                        	   element.data("cke-realelement", encodeURIComponent(this.getValue()));
                           }
                       }
                   ]
               }
           ],

           onShow: function()
           {
               var selection = editor.getSelection(),
               element = selection.getStartElement();

               window.alert("Start");
               window.alert(element);
               window.alert(element.getName());
               window.alert(element.data("cke-realelement"));

               if ( !element || !element.data( 'cke-realelement' ) )
               {
                   //element = editor.document.createElement( 'abbr' );
            	   element = null;
                   this.insertMode = true;
               }
               else
                   this.insertMode = false;

               this.element = element;

               if ( !this.insertMode )
                   this.setupContent( this.element );
           },

           onOk: function()
           {
               var dialog = this;

               this.commitContent( this.element );

               if (this.insertMode)
               {
            	   var abbr = editor.document.createElement( 'div' );
            	   abbr.setText( dialog.getValueOf( 'tab-basic', 'includeText' ) );

            	   editor.insertElement( abbr );
               }
               else
               {

               }

               this.element.setAttribute("src", "/admin/skins/webjet8/ckeditor/dist/plugins/webjetcomponents/component_preview.jsp?a=1");
           }
	};
} );