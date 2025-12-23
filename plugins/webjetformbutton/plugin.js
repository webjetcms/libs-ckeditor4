
CKEDITOR.plugins.add('webjetformbutton', {
    requires: 'dialog',
    icons: 'formbutton',
    lang: 'sk,en,cs',

    init: function(editor) {

        // Allow button elements in the editor
        editor.filter.allow({
            button: {
                attributes: '!*',
                children: true
            }
        });

        // Add command for inserting/editing form buttons
        editor.addCommand('webjetformbutton', new CKEDITOR.dialogCommand('webjetformbuttonDialog'));

        // Add toolbar button
        editor.ui.addButton('WebjetFormButton', {
            label: editor.lang.webjetformbutton.buttonLabel,
            command: 'webjetformbutton',
            toolbar: 'insert',
            icon: this.path + 'icons/formbutton.svg'
        });

        // Register dialog
        CKEDITOR.dialog.add('webjetformbuttonDialog', this.path + 'dialogs/formbutton.js');

        // Double-click handler for editing existing buttons
        editor.on( 'contentDom', function() {
		   var editable = editor.editable();

		   // Function to find button element (including disabled ones)
		   function findButtonElement(target, editableElement) {
		       var current = target;
		       while (current && current !== editableElement.$) {
		           if (current.tagName === 'BUTTON') {
		               return current;
		           }
		           current = current.parentElement;
		       }
		       return null;
		   }

		   editable.attachListener( editable, 'mouseup', function(evt) {
		    	// Only handle left mouse button clicks (button 0)
		    	if (evt.data.$.button !== 0) {
		    		return;
		    	}

		    	var element = evt.data.$.target;
		    	var buttonElement = findButtonElement(element, editable);

		    	//console.log("CLICK 2 evt=", evt, "element=", element, "tagName=", element.tagName, "buttonElement=", buttonElement);

				if (buttonElement)
				{
                    ckEditorInstance.lastWjButton = buttonElement;
                    setTimeout(function () {
                            ckEditorInstance.execCommand('webjetformbutton');
                    }, 10);
                }
            });
        });

        // Context menu integration
        if (editor.addMenuItems) {
            editor.addMenuItems({
                webjetformbutton: {
                    label: editor.lang.webjetformbutton.title,
                    command: 'webjetformbutton',
                    group: 'form',
                    icon: this.path + 'icons/formbutton.svg'
                }
            });
        }

        if (editor.contextMenu) {
            editor.contextMenu.addListener(function(element) {
                if (element && !element.isReadOnly() && element.is('button')) {
                    return { webjetformbutton: CKEDITOR.TRISTATE_OFF };
                }
            });
        }
    }
});