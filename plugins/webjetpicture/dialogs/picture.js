CKEDITOR.dialog.add('pictureDialog', function(editor) {
    var breakpoints = editor.config.pictureDialogBreakpoints || [
        { name: "Desktop", minWidth: 992, fallback: true },
        { name: "Tablet", minWidth: 768 },
        { name: "Mobile", minWidth: 0 }
    ];

    // Find the fallback breakpoint
    var fallbackBreakpoint = breakpoints.find(function(bp) {
        return bp.fallback === true;
    }) || breakpoints[0]; // Default to first if none marked as fallback

    // Elements for Pictures tab - only URL fields
    var pictureElements = [];
    breakpoints.forEach(function(bp) {
        pictureElements.push({
            type: 'hbox',
            padding: 0,
            widths: [ '95%', '5%' ],
            children: [
                {
                    type: 'text',
                    id: 'src' + bp.name,
                    label: bp.name + editor.lang.webjetpicture.imageUrl + (bp.fallback ? editor.lang.webjetpicture.fallback : ''),
                    validate: bp.fallback ? CKEDITOR.dialog.validate.notEmpty(editor.lang.webjetpicture.fallbackUrlRequired) : null,
                    className: 'wj-picture-url-input'
                }, {
                    type: 'html',
                    html: '<label class="cke_dialog_ui_labeled_label">&nbsp;</label><div class="cke_dialog_ui_labeled_content cke_dialog_ui_labeled_content_append"><div class="cke_dialog_ui_input_text"><i onclick="openLinkDialogWindow(\'ckEditorDialog\', \'pictures:src' + bp.name + '\');" class="wj-action-icon ti ti-focus-2"></i></div></div>'
                }
            ]
        });
    });

    // Elements for Advanced tab
    var advancedElements = [
        {
            type: 'text',
            id: 'alt',
            label: editor.lang.webjetpicture.altText
        },
        {
            type: 'text',
            id: 'pictureClass',
            label: editor.lang.webjetpicture.pictureClass
        },
        {
            type: 'text',
            id: 'width',
            label: editor.lang.webjetpicture.width
        },
        {
            type: 'text',
            id: 'height',
            label: editor.lang.webjetpicture.height
        }
    ];

    return {
        title: editor.lang.webjetpicture.title,
        minWidth: 500,
        minHeight: 400,
        contents: [
            {
                id: 'pictures',
                label: editor.lang.webjetpicture.pictures,
                elements: pictureElements
            },
            {
                id: 'advanced',
                label: editor.lang.webjetpicture.advanced,
                elements: advancedElements
            }
        ],
        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            var pictureElement = null;
            if (element && element.getName() === 'picture') {
                pictureElement = element;
            } else if (element && element.getName() === 'img') {
                pictureElement = element.getParent();
                if (pictureElement && pictureElement.getName() !== 'picture') {
                    pictureElement = null;
                }
            } else if (element) {
                pictureElement = element.getAscendant('picture', true);
            }

            if (pictureElement) {
                // Set CSS class to Advanced tab
                this.setValueOf('advanced', 'pictureClass', pictureElement.getAttribute('class') || '');

                var imgElement = pictureElement.findOne('img');
                if (imgElement) {
                    // Advanced tab values
                    this.setValueOf('advanced', 'alt', imgElement.getAttribute('alt') || '');
                    this.setValueOf('advanced', 'width', imgElement.getAttribute('width') || '');
                    this.setValueOf('advanced', 'height', imgElement.getAttribute('height') || '');

                    // Pictures tab - Fallback URL
                    this.setValueOf('pictures', 'src' + fallbackBreakpoint.name, imgElement.getAttribute('src') || '');
                }

                var sources = pictureElement.find('source');
                for (var i = 0; i < sources.count(); i++) {
                    var source = sources.getItem(i);
                    var media = source.getAttribute('media');
                    var srcset = source.getAttribute('srcset');
                    if (media && srcset) {
                        var minWidthMatch = media.match(/min-width:\s*(\d+)px/);
                        if (minWidthMatch) {
                            var minWidth = parseInt(minWidthMatch[1]);
                            breakpoints.forEach(function(bp) {
                                if (bp.minWidth === minWidth) {
                                    this.setValueOf('pictures', 'src' + bp.name, srcset);
                                }
                            }.bind(this));
                        }
                    }
                }
            }
        },
        onOk: function() {
            var dialog = this;

            // Values from Advanced tab
            var alt = dialog.getValueOf('advanced', 'alt');
            var width = dialog.getValueOf('advanced', 'width');
            var height = dialog.getValueOf('advanced', 'height');
            var pictureClass = dialog.getValueOf('advanced', 'pictureClass');

            var pictureHtml = '<picture';
            if (pictureClass && pictureClass.trim() !== '') {
                pictureHtml += ' class="' + CKEDITOR.tools.htmlEncode(pictureClass) + '"';
            }
            pictureHtml += '>';

            var sortedBreakpoints = breakpoints.slice().sort(function(a, b) {
                return b.minWidth - a.minWidth;
            });

            // Values from Pictures tab - exclude fallback from source elements
            sortedBreakpoints.forEach(function(bp) {
                if (!bp.fallback) {
                    var srcValue = dialog.getValueOf('pictures', 'src' + bp.name);
                    if (srcValue && srcValue.trim() !== '') {
                        pictureHtml += '<source media="(min-width: ' + bp.minWidth + 'px)" srcset="' + CKEDITOR.tools.htmlEncode(srcValue) + '">';
                    }
                }
            });

            var fallbackSrc = dialog.getValueOf('pictures', 'src' + fallbackBreakpoint.name);
            pictureHtml += '<img src="' + CKEDITOR.tools.htmlEncode(fallbackSrc) + '" alt="' + CKEDITOR.tools.htmlEncode(alt) + '"';
            if (width) pictureHtml += ' width="' + CKEDITOR.tools.htmlEncode(width) + '"';
            if (height) pictureHtml += ' height="' + CKEDITOR.tools.htmlEncode(height) + '"';
            pictureHtml += '>';

            pictureHtml += '</picture>';

            var selection = editor.getSelection();
            var element = selection.getStartElement();
            var pictureElement = null;

            if (element && element.getName() === 'picture') {
                pictureElement = element;
            } else if (element && element.getName() === 'img') {
                pictureElement = element.getParent();
                if (pictureElement && pictureElement.getName() !== 'picture') {
                    pictureElement = null;
                }
            } else if (element) {
                pictureElement = element.getAscendant('picture', true);
            }

            var newElement = CKEDITOR.dom.element.createFromHtml(pictureHtml);

            if (pictureElement) {
                newElement.replace(pictureElement);
            } else {
                editor.insertElement(newElement);
            }
        }
    };
});