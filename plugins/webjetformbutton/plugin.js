
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

		function findDisabledButtonByPoint(domEvent, editableElement) {
			var buttons = editableElement.find('button[disabled]');
			var clientX = domEvent.clientX;
			var clientY = domEvent.clientY;
			var i;
			var button;
			var rect;

			if (typeof clientX !== 'number' || typeof clientY !== 'number') {
				return null;
			}

			for (i = 0; i < buttons.count(); i++) {
				button = buttons.getItem(i).$;
				rect = button.getBoundingClientRect();

				if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
					return button;
				}
			}

			return null;
		}

		// Function to check if element is allowed based on CSS class configuration
		function isElementAllowed(element, editor) {
			var config = editor.config.webjetformbutton || {};
			var className = element.className || '';
			var elementClasses = className.split(/\s+/);

			// Check denied classes first (blacklist takes precedence)
			var deniedClasses = config.deniedClasses || '';
			if (deniedClasses) {
				var deniedList = deniedClasses.split(',');
				for (var i = 0; i < deniedList.length; i++) {
					var deniedClass = deniedList[i].trim();
					if (deniedClass && elementClasses.indexOf(deniedClass) !== -1) {
						return false;
					}
				}
			}

			// Check allowed classes
			var allowedClasses = config.allowedClasses || '';
			if (allowedClasses) {
				var allowedList = allowedClasses.split(',');
				var hasAllowedClass = false;
				for (var j = 0; j < allowedList.length; j++) {
					var allowedClass = allowedList[j].trim();
					if (allowedClass && elementClasses.indexOf(allowedClass) !== -1) {
						hasAllowedClass = true;
						break;
					}
				}
				if (!hasAllowedClass) {
					return false;
				}
			}

			return true;
		}

        editor.on( 'contentDom', function() {
		   var editable = editor.editable();

		   editable.attachListener( editable, 'mouseup', function(evt) {
		    	// Only handle left mouse button clicks (button 0)
		    	if (evt.data.$.button !== 0) {
		    		return;
		    	}

		    	var element = evt.data.$.target;
		    	var buttonElement = findButtonElement(element, editable) || findDisabledButtonByPoint(evt.data.$, editable);

		    	//console.log("CLICK 2 evt=", evt, "element=", element, "tagName=", element.tagName, "buttonElement=", buttonElement);

				if (buttonElement && isElementAllowed(buttonElement, editor))
				{
				    ckEditorInstance.lastWjButton = buttonElement;
                    setTimeout(function () {
                            ckEditorInstance.execCommand('webjetformbutton');
                    }, 10);
                }
            });

			//right click handler
			editable.attachListener( editable, 'contextmenu', function(evt) {
		       ckEditorInstance.lastWjButton = findButtonElement(evt.data.$.target, editable) || findDisabledButtonByPoint(evt.data.$, editable);
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