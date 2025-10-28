CKEDITOR.plugins.add('webjetpicture', {
    requires: 'dialog',
    icons: 'picture',
    lang: 'sk,en,cs',
    init: function(editor) {
        editor.addCommand('webjetpicture', new CKEDITOR.dialogCommand('pictureDialog'));

        editor.ui.addButton('WebjetPicture', {
            label: editor.lang.webjetpicture.buttonLabel,
            command: 'webjetpicture',
            toolbar: 'insert',
            icon: this.path + 'icons/picture.svg'
        });

        CKEDITOR.dialog.add('pictureDialog', this.path + 'dialogs/picture.js');

        // Allow picture elements in the editor
        editor.filter.allow({
            picture: {
                attributes: '!*',
                children: true
            },
            source: {
                attributes: '!media,!srcset,!src,!type'
            }
        });

        editor.on( 'contentDom', function() {
		   var editable = editor.editable();
		   editable.attachListener( editable, 'mouseup', function(evt) {
                try {
                    var element = evt.data.$.target;
                    //console.log("CLICK 2 evt=", evt, "tagName=", element.tagName, "parentTagName=", element.parentNode.tagName);
                    if ((element.tagName=="IMG" && element.parentNode.tagName=="PICTURE") ||
                        (element.tagName=="SOURCE" && element.parentNode.tagName=="PICTURE") ||
                        element.tagName=="PICTURE") {
                        //open picture dialog
                        editor.execCommand('webjetpicture');
                    }
                } catch (e) {
                    //console.error("Error in webjetpicture mouseup handler", e);
                }
		   });
		});
    }
});