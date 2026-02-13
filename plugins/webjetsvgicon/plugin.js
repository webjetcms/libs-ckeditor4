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

        editor.on( 'contentDom', function() {
		   var editable = editor.editable();
		   editable.attachListener( editable, 'mouseup', function(evt) {
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