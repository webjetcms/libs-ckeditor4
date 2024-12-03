/*
	Author	: Michael Janea (www.michaeljanea.com)
	Author  : Christoph M. Becker (3-magi.net)
	Version	: 1.3
*/

CKEDITOR.plugins.add('fontawesome', {
    requires: 'widget',
    icons: 'fontawesome',
    lang: 'sk,cs,en',
    init: function(editor) {
        editor.widgets.add('FontAwesome', {
            button: 'Insert Font Awesome',
            template: '<span class="" style=""></span>',
            dialog: 'fontawesomeDialog',
            allowedContent: 'span(!fa){style}',
            draggable: false,
            upcast: function(element) {
                //WebJET console.log("upcast, element=", element);
                return (element.name == 'span' || element.name == 'i') &&
                       (element.hasClass('fa-stack-2x') == false) &&
                       (element.hasClass('fa') || element.hasClass('fas') || element.hasClass('far') || element.hasClass('fal') || element.hasClass('fad') || element.hasClass('fab'));
            },
            init: function() {
                //console.log("init, element=", this.element, "parent=", this.element.parentElement);
                this.element.getParent().addClass("cke_widget_fontawesome");
                this.setData('classes', this.element.getAttribute('class'));
                this.setData('color', this.element.getStyle('color'));
                this.setData('size', this.element.getStyle('font-size'));
            },
            data: function() {
                //console.log("data, element=", this.element, "data=", this.data, "class=", this.element.getAttribute('class'));

                var istayl = '';

                //WebJET CMS upravy
                var validClasses = ["fa-stack", "fa-inverse", "fa-pulse", "fa-pull-", "fa-xs", "fa-xm", "fa-lg", "fa-2x", "fa-3x", "fa-5x", "fa-7x", "fa-10x"];
                var oldClasses = this.element.getAttribute('class').split(" ");
                var newClasses = this.data.classes;
                for (var i=0; i<oldClasses.length; i++) {
                    var cls = oldClasses[i];
                    if (cls == "fa" || cls=="fas" || cls=="far" || cls=="fal" || cls=="fad" || cls=="fab") {
                        newClasses = cls+" "+newClasses.substring(3);
                        continue;
                    }
                    else if (cls.indexOf("fa-")==0) {
                        var isValid = false;
                        //vynimky fa-xs ... fa-10x, fa-fw,
                        if (cls.length<=6) isValid = true;
                        //preiteruj validne triedy
                        for (var j=0; j<validClasses.length; j++) {
                            if (cls.indexOf(validClasses[j])==0) isValid = true;
                        }

                        if (isValid==false) continue;
                        newClasses = newClasses + " " + cls;
                    } else {
                        //ckeditor tam generoval nejake cisla, takto sa ich zbavujem
                        if (isNaN(Number(cls))) {
                            newClasses = newClasses + " " + cls;
                        }
                    }
                }
                //console.log("newClasses=", newClasses);
                this.element.setAttribute('class', newClasses);

                istayl += this.data.color != '' ? 'color:' + this.data.color + ';' : '';
                istayl += this.data.size != '' ? 'font-size:' + parseInt(this.data.size) + 'px;' : '';
                istayl != '' ? this.element.setAttribute('style', istayl) : '';
                istayl == '' ? this.element.removeAttribute('style') : ''
            }
        });
        if (typeof CKEDITOR.hasFA == "undefined") {
            //console.log("Appending dialog and FA styles");
            CKEDITOR.dialog.add('fontawesomeDialog', this.path + 'dialogs/fontawesome.js');
            var editorFontAwesomeCssPath = editor.config.editorFontAwesomeCssPath;
            if (typeof editorFontAwesomeCssPath != "undefined" && editorFontAwesomeCssPath != null && editorFontAwesomeCssPath != "") {
                var paths = editorFontAwesomeCssPath.split(/,|\r?\n/);
                for (var i = 0; i < paths.length; i++) {
                    CKEDITOR.document.appendStyleSheet(paths[i]);
                }
            }
            CKEDITOR.document.appendStyleSheet(CKEDITOR.plugins.getPath('fontawesome') + 'fontawesome.css');
            CKEDITOR.hasFA = true;
        }
    }
});
