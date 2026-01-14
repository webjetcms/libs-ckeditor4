CKEDITOR.dialog.add('webjetformbuttonDialog', function(editor) {
    // Reuse webjetsvgicon configuration
    var config = editor.config.webjetsvgicon || {};
    var spritePath = config.spritePath || '';
    var iconsConfig = config.icons || {};
    var iconWidth = config.iconWidth || 56;
    var iconHeight = config.iconHeight || 56;
    var gridHeight = config.gridHeight || 400;

    //custom config for button
    config = editor.config.webjetformbutton || {};
    var sizes = (config.sizes || 'btn-lg,btn-sm').split(',');
    var textHiddenClass = config.textHiddenClass || 'visually-hidden';

    // Get base class from webjetformbutton config if exists, otherwise use 'btn'
    var baseClass = config.baseClass || 'btn';
    var buttonTypes = config.types
        ? config.types.split(',')
        : ['btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark', 'btn-link', 'btn-outline-primary', 'btn-outline-secondary', 'btn-outline-success', 'btn-outline-danger', 'btn-outline-warning', 'btn-outline-info', 'btn-outline-light', 'btn-outline-dark'];

    // Parse icons configuration and build groups
    var iconNames = [];
    var allGroups = [];
    var iconToGroups = {};

    if (Object.keys(iconsConfig).length > 0) {
        iconNames = Object.keys(iconsConfig);
        iconNames.forEach(function(iconName) {
            var groups = iconsConfig[iconName] || [];
            iconToGroups[iconName] = groups;
            groups.forEach(function(group) {
                if (allGroups.indexOf(group) === -1) {
                    allGroups.push(group);
                }
            });
        });
    }

    // Sort groups alphabetically
    allGroups.sort();

    // Build selector items
    var groupItems = [[editor.lang.webjetformbutton.showAll, 'all']];
    allGroups.forEach(function(group) {
        groupItems.push([group, group]);
    });

    var sizeItems = [[editor.lang.webjetformbutton.defaultSize, '']];
    sizes.forEach(function(size) {
        sizeItems.push([size, size]);
    });

    var typeItems = [[editor.lang.webjetformbutton.defaultType, '']];
    buttonTypes.forEach(function(type) {
        typeItems.push([type, type]);
    });

    var selectedIconName = '';
    var shouldHideIconSelector = !spritePath;

    function filterIcons(dialog) {
        if (shouldHideIconSelector) return;

        var selectedGroup = "all";
        if (allGroups.length > 0) {
            selectedGroup = dialog.getValueOf('icons', 'iconGroup');
        }
        var searchTerm = dialog.getValueOf('icons', 'iconSearch').toLowerCase();
        var gridContainer = dialog.getContentElement('icons', 'iconGrid').getElement();
        var iconItems = gridContainer.find('.wj-icon-item');
        var visibleCount = 0;

        for (var i = 0; i < iconItems.count(); i++) {
            var item = iconItems.getItem(i);
            var iconName = item.getAttribute('title');
            var iconGroups = iconToGroups[iconName] || [];

            var groupMatch = selectedGroup === 'all' || iconGroups.indexOf(selectedGroup) !== -1;
            var searchMatch = iconName.toLowerCase().indexOf(searchTerm) !== -1;

            if (groupMatch && searchMatch) {
                item.show();
                visibleCount++;
            } else {
                item.hide();
            }
        }

        var noIconsMsg = gridContainer.findOne('.wj-no-icons-message');
        if (visibleCount === 0) {
            if (!noIconsMsg) {
                var msgElement = new CKEDITOR.dom.element('div');
                msgElement.addClass('wj-no-icons-message');
                msgElement.setHtml(editor.lang.webjetformbutton.noIconsFound);
                msgElement.setStyles({
                    'text-align': 'center',
                    'padding': '20px',
                    'color': '#666',
                    'font-style': 'italic'
                });
                gridContainer.append(msgElement);
            } else {
                noIconsMsg.show();
            }
        } else if (noIconsMsg) {
            noIconsMsg.hide();
        }
    }

    function loadIconSprite(dialog) {
        if (shouldHideIconSelector) return;

        var gridContainer = dialog.getContentElement('icons', 'iconGrid').getElement();

        // Show loading message
        gridContainer.setHtml('<div class="wj-loading-message" style="text-align: center; padding: 20px; color: #666;">' +
                             editor.lang.webjetformbutton.loadingIcons + '</div>');

        CKEDITOR.ajax.loadXml(spritePath, function(xml) {
            if (xml) {
                // Create hidden sprite container
                var spriteContainer = CKEDITOR.document.getById('wj-svg-sprite-container');
                if (!spriteContainer) {
                    spriteContainer = new CKEDITOR.dom.element('div');
                    spriteContainer.setAttributes({
                        'id': 'wj-svg-sprite-container',
                        'style': 'display: none; position: absolute; top: -9999px;'
                    });
                    CKEDITOR.document.getBody().append(spriteContainer);

                    // Extract SVG content and inject it
                    var svgContent = xml.documentElement ? xml.documentElement.outerHTML : (new XMLSerializer()).serializeToString(xml.baseXml.childNodes[0]);
                    spriteContainer.setHtml(svgContent);
                }

                buildIconGrid(dialog, spriteContainer.$);
            } else {
                gridContainer.setHtml('<div class="wj-error-message" style="text-align: center; padding: 20px; color: #d32f2f;">' +
                                     editor.lang.webjetformbutton.loadError + '</div>');
            }
        });
    }

    function buildIconGrid(dialog, xml) {
        var gridContainer = dialog.getContentElement('icons', 'iconGrid').getElement();
        var symbols = xml.getElementsByTagName('symbol');
        var availableIcons = [];

        // Filter symbols to only include configured icons
        var iconNamesEmpty = iconNames.length === 0;
        for (var i = 0; i < symbols.length; i++) {
            var symbolId = symbols[i].getAttribute('id');
            if (iconNamesEmpty === true) {
                // We don't have predefined list of icons, so accept all from sprite
                iconNames.push(symbolId);
            }
            if (iconNames.indexOf(symbolId) !== -1) {
                availableIcons.push(symbolId);
            }
        }

        var gridHtml = '<div class="wj-icon-grid" style="' +
            'display: grid; ' +
            'grid-template-columns: repeat(auto-fit, minmax(' + (iconWidth + 2 + 8) + 'px, 1fr)); ' +
            'gap: 4px; ' +
            'max-height: ' + gridHeight + 'px; ' +
            'overflow-y: auto; ' +
            'padding: 10px; ' +
            'border: 1px solid #ccc; ' +
            'background: #fff;' +
        '">';

        availableIcons.forEach(function(iconName) {
            gridHtml += '<div class="wj-icon-item" title="' + iconName + '" style="' +
                'display: flex; ' +
                'flex-direction: column; ' +
                'align-items: center; ' +
                'padding: 2px; ' +
                'border: 2px solid transparent; ' +
                'border-radius: 4px; ' +
                'cursor: pointer; ' +
                'transition: all 0.2s; ' +
                'width: ' + iconWidth + 'px; ' +
                'height: ' + (iconHeight + 26) + 'px; ' +
                'justify-content: center;' +
                'overflow: hidden;' +
            '">' +
                '<div class="wj-icon-placeholder" style="' +
                    'width: ' + iconWidth + 'px; ' +
                    'height: ' + iconHeight + 'px; ' +
                    'border: 1px dashed #ccc; ' +
                    'display: flex; ' +
                    'align-items: center; ' +
                    'justify-content: center; ' +
                    'margin-bottom: 4px;' +
                '">Loading...</div>' +
                '<div class="wj-icon-name" style="' +
                    'font-size: 10px; ' +
                    'text-align: center; ' +
                    'word-break: break-all; ' +
                    'line-height: 1;' +
                    'width: ' + iconWidth + 'px; ' +
                    'height: 2em; ' +
                    'white-space: normal;' +
                '">' + iconName + '</div>' +
            '</div>';
        });

        gridHtml += '</div>';
        gridContainer.setHtml(gridHtml);

        // Attach click handlers and setup intersection observer
        setupIconGrid(dialog);
    }

    function setupIconGrid(dialog) {
        var gridContainer = dialog.getContentElement('icons', 'iconGrid').getElement();
        var iconItems = gridContainer.find('.wj-icon-item');

        // Setup intersection observer for lazy loading
        if (window.IntersectionObserver) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        loadIconSvg(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            for (var i = 0; i < iconItems.count(); i++) {
                var item = iconItems.getItem(i);
                observer.observe(item.$);

                // Add click handler
                item.on('click', function() {
                    selectIcon(dialog, this);
                });

                // Add hover effects
                item.on('mouseenter', function() {
                    if (!this.hasClass('wj-selected')) {
                        this.setStyle('background-color', '#f5f5f5');
                    }
                });

                item.on('mouseleave', function() {
                    if (!this.hasClass('wj-selected')) {
                        this.setStyle('background-color', '');
                    }
                });
            }
        } else {
            // Fallback for older browsers - load all icons immediately
            for (var i = 0; i < iconItems.count(); i++) {
                var item = iconItems.getItem(i);
                loadIconSvg(item.$);
                item.on('click', function() {
                    selectIcon(dialog, this);
                });
            }
        }
    }

    function loadIconSvg(itemElement) {
        var iconName = itemElement.getAttribute('title');
        var placeholder = itemElement.querySelector('.wj-icon-placeholder');

        if (placeholder && iconName) {
            placeholder.innerHTML = '<svg width="' + iconWidth + '" height="' + iconHeight + '" style="max-width: 100%; max-height: 100%;">' +
                '<use href="#' + iconName + '"></use>' +
                '</svg>';
        }
    }

    function selectIcon(dialog, iconElement) {
        var gridContainer = dialog.getContentElement('icons', 'iconGrid').getElement();
        var allItems = gridContainer.find('.wj-icon-item');
        var isCurrentlySelected = iconElement.hasClass('wj-selected');

        // Clear previous selection
        for (var i = 0; i < allItems.count(); i++) {
            var item = allItems.getItem(i);
            item.removeClass('wj-selected');
            item.setStyles({
                'border-color': 'transparent',
                'background-color': ''
            });
        }

        // If this icon was already selected, deselect it (don't select it again)
        if (isCurrentlySelected) {
            selectedIconName = '';
        } else {
            // Set new selection
            iconElement.addClass('wj-selected');
            iconElement.setStyles({
                'border-color': '#2196f3',
                'background-color': '#e3f2fd'
            });
            selectedIconName = iconElement.getAttribute('title');
        }
    }

    function parseExistingClasses(element) {
        var cssClass = element.getAttribute('class') || '';
        var classes = cssClass.split(/\s+/);
        var result = { size: '', type: '', custom: [] };

        classes.forEach(function(cls) {
            if (cls === baseClass) {
                // Skip base class
                return;
            } else if (sizes.indexOf(cls) !== -1) {
                result.size = cls;
            } else if (buttonTypes.indexOf(cls) !== -1) {
                result.type = cls;
            } else {
                result.custom.push(cls);
            }
        });

        //console.log("parseExistingClasses cssClass=", cssClass, "result=", result);

        return result;
    }

    function buildButtonClasses(size, type, customClasses) {
        var classes = [baseClass];

        if (size) classes.push(size);
        if (type) classes.push(type);

        // Add custom classes, filtering out conflicting size/type classes
        if (customClasses) {
            var customArray = customClasses.split(/\s+/).filter(function(cls) {
                if (!cls) return false;
                if (cls === baseClass) return false;
                if (sizes.indexOf(cls) !== -1 || buttonTypes.indexOf(cls) !== -1) return false;
                return true;
            });
            classes = classes.concat(customArray);
        }

        return classes.join(' ');
    }

    // Build dialog elements based on whether icons are available
    var generalElements = [
        {
            type: 'text',
            id: 'text',
            label: editor.lang.webjetformbutton.text,
            'default': '',
            setup: function(element) {
                // Extract text content excluding icons and hidden spans
                var text = '';
                var children = element.getChildren();
                //console.log("setting text, children=", children, "element=", element);
                for (var i = 0; i < children.count(); i++) {
                    var child = children.getItem(i);
                    if (child.type === CKEDITOR.NODE_TEXT) {
                        text += child.getText();
                    } else if (child.is && child.is('span') && child.hasClass(textHiddenClass)) {
                        text = child.getText();
                        break;
                    } else if (!child.is || (!child.is('svg') && !child.is('use'))) {
                        text += child.getText();
                    }
                }
                this.setValue(text.trim());
            }
        },
        {
            type: 'text',
            id: 'name',
            label: editor.lang.webjetformbutton.name,
            setup: function(element) {
                this.setValue(element.getAttribute('name') || '');
            }
        },
        {
            type: 'text',
            id: 'onclick',
            label: editor.lang.webjetformbutton.onclick,
            setup: function(element) {
                var onclickValue = '';

                // First try to get onclick as an attribute
                onclickValue = element.getAttribute('onclick') || '';

                // If not found as attribute, try to get it as a property from the native DOM element
                if (!onclickValue && element.$ && element.$.onclick) {
                    // Convert function to string and remove 'function onclick(event) {' wrapper if present
                    var funcStr = element.$.onclick.toString();
                    if (funcStr.indexOf('function onclick(event)') === 0) {
                        // Remove function wrapper and extract just the body
                        funcStr = funcStr.replace(/^function onclick\(event\)\s*\{\s*/, '').replace(/\s*\}$/, '');
                    } else if (funcStr.indexOf('function anonymous(') === 0) {
                        // Handle anonymous function format
                        funcStr = funcStr.replace(/^function anonymous\([^)]*\)\s*\{\s*/, '').replace(/\s*\}$/, '');
                    }
                    onclickValue = funcStr.trim();
                }

                this.setValue(onclickValue);
            }
        },
        {
            type: 'select',
            id: 'buttonType',
            label: editor.lang.webjetformbutton.buttonType,
            'default': '',
            items: typeItems,
            setup: function(element) {
                var parsedClasses = parseExistingClasses(element);
                this.setValue(parsedClasses.type);
            }
        },
        {
            type: 'select',
            id: 'size',
            label: editor.lang.webjetformbutton.size,
            'default': '',
            items: sizeItems,
            setup: function(element) {
                var parsedClasses = parseExistingClasses(element);
                this.setValue(parsedClasses.size);
            }
        },
        {
            type: 'text',
            id: 'customClass',
            label: editor.lang.webjetformbutton.customClass,
            setup: function(element) {
                var parsedClasses = parseExistingClasses(element);
                this.setValue(parsedClasses.custom.join(' '));
            }
        },
        {
            type: 'checkbox',
            id: 'disabled',
            label: editor.lang.webjetformbutton.disabled,
            setup: function(element) {
                this.setValue(element.hasAttribute('disabled'));
            }
        }
    ];

    // Add hideText checkbox only if icons are available
    if (!shouldHideIconSelector) {
        generalElements.push({
            type: 'checkbox',
            id: 'hideText',
            label: editor.lang.webjetformbutton.hideText,
            setup: function(element) {
                var hiddenSpan = element.findOne('span.' + textHiddenClass);
                this.setValue(!!hiddenSpan);
            }
        });
    }

    // Icon elements (only if spritePath is available)
    var iconElements = [];
    if (!shouldHideIconSelector) {
        iconElements = [
            {
                type: 'hbox',
                padding: 0,
                widths: allGroups.length <= 1 ? ['100%'] : ['49%', '2%', '49%'],
                children: allGroups.length <= 1 ? [
                    {
                        type: 'text',
                        id: 'iconSearch',
                        label: editor.lang.webjetformbutton.iconSearch,
                        onKeyUp: function() {
                            filterIcons(this.getDialog());
                        }
                    }
                ] : [
                    {
                        type: 'select',
                        id: 'iconGroup',
                        label: editor.lang.webjetformbutton.iconGroup,
                        items: groupItems,
                        'default': 'all',
                        onChange: function() {
                            filterIcons(this.getDialog());
                        }
                    },
                    {
                        type: 'html',
                        html: '&nbsp;'
                    },
                    {
                        type: 'text',
                        id: 'iconSearch',
                        label: editor.lang.webjetformbutton.iconSearch,
                        onKeyUp: function() {
                            filterIcons(this.getDialog());
                        }
                    }
                ]
            },
            {
                type: 'html',
                id: 'iconGrid',
                html: '<div style="min-height: ' + gridHeight + 'px;"></div>'
            }
        ];
    }

    // Build dialog contents
    var dialogContents = [
        {
            id: 'general',
            label: editor.lang.webjetformbutton.general,
            elements: generalElements
        }
    ];

    // Add icons tab only if spritePath is available
    if (!shouldHideIconSelector) {
        dialogContents.push({
            id: 'icons',
            label: editor.lang.webjetformbutton.icons,
            elements: iconElements
        });
    }

    return {
        title: editor.lang.webjetformbutton.title,
        minWidth: 800,
        minHeight: shouldHideIconSelector ? 400 : 400,
        contents: dialogContents,

        getModel: function(editor) {
            return editor.getSelection().getSelectedElement();
        },

        onShow: function() {
            var dialog = this;
            var element = this.getModel(editor);

            if (typeof ckEditorInstance.lastWjButton != "undefined" && ckEditorInstance.lastWjButton != null)
			{
				element = new CKEDITOR.dom.element(ckEditorInstance.lastWjButton);
                ckEditorInstance.lastWjButton = null;
			}

            //console.log("dialog onShow element=", element);

            selectedIconName = '';

            // Clear search field if available
            if (!shouldHideIconSelector) {
                this.setValueOf('icons', 'iconSearch', '');
                // Load sprite and build grid
                loadIconSprite(dialog);
            }

            if (element && element.is('button')) {
                this.setupContent(element);

                // Find selected icon if editing existing button
                if (!shouldHideIconSelector) {
                    var svgElement = element.findOne('svg use');
                    if (svgElement) {
                        var href = svgElement.getAttribute('xlink:href') || svgElement.getAttribute('href') || '';
                        if (href && href.indexOf('#') !== -1) {
                            selectedIconName = href.substring(href.indexOf('#') + 1);
                            // Set search to show the icon
                            this.setValueOf('icons', 'iconSearch', selectedIconName);
                        }
                    }
                }
            }

            setTimeout(function() {
                // Highlight selected icon if editing
                if (selectedIconName && !shouldHideIconSelector) {
                    var gridContainer = dialog.getContentElement('icons', 'iconGrid').getElement();
                    var iconItems = gridContainer.find('.wj-icon-item');
                    for (var i = 0; i < iconItems.count(); i++) {
                        var item = iconItems.getItem(i);
                        var iconName = item.getAttribute('title');
                        if (iconName === selectedIconName) {
                            item.addClass('wj-selected');
                            item.setStyles({
                                'border-color': '#2196f3',
                                'background-color': '#e3f2fd'
                            });
                            break;
                        }
                    }
                }
            }, 500);

            this.element = element;
        },

        onOk: function() {
            var dialog = this;
            var element = this.element;
            var isInsertMode = !element || !element.is('button');

            //console.log("dialog onOk element=", element, "isInsertMode=", isInsertMode);

            var buttonText = dialog.getValueOf('general', 'text') || editor.lang.webjetformbutton.defaultText;
            var buttonType = 'button';
            var buttonName = dialog.getValueOf('general', 'name');
            var buttonOnclick = dialog.getValueOf('general', 'onclick');
            var buttonSize = dialog.getValueOf('general', 'size');
            var buttonBtnType = dialog.getValueOf('general', 'buttonType');
            var customClass = dialog.getValueOf('general', 'customClass');
            var isDisabled = dialog.getValueOf('general', 'disabled');
            var hideText = false;
            if (!shouldHideIconSelector) hideText = dialog.getValueOf('general', 'hideText');

            var buttonHtml = '<button type="' + CKEDITOR.tools.htmlEncode(buttonType) + '"';

            if (buttonName) {
                buttonHtml += ' name="' + CKEDITOR.tools.htmlEncode(buttonName) + '"';
            }

            if (buttonOnclick) {
                // Properly escape JavaScript for use in onclick attribute
                var escapedOnclick = buttonOnclick
                    .replace(/\\/g, '\\\\')  // Escape backslashes first
                    .replace(/"/g, '&quot;')    // Escape double quotes
                    .replace(/\n/g, '\\n')   // Escape newlines
                    .replace(/\r/g, '\\r');  // Escape carriage returns
                buttonHtml += ' onclick="' + escapedOnclick + '"';
            }

            var classes = buildButtonClasses(buttonSize, buttonBtnType, customClass);
            buttonHtml += ' class="' + CKEDITOR.tools.htmlEncode(classes) + '"';

            if (isDisabled) {
                buttonHtml += ' disabled="disabled" aria-disabled="true"';
            }

            buttonHtml += '>';

            // Add icon if selected
            if (selectedIconName && spritePath) {
                var iconClass = 'icon ' + buttonSize.replace('btn', 'icon');
                if (hideText && selectedIconName) {

                } else {
                    iconClass += ' btn__icon-left';
                }
                buttonHtml += '<svg class="' + iconClass + '" aria-hidden="true">';
                buttonHtml += '<use xlink:href="' + CKEDITOR.tools.htmlEncode(spritePath + '#' + selectedIconName) + '"></use>';
                buttonHtml += '</svg>';
            }

            // Add text
            if (hideText && selectedIconName) {
                buttonHtml += '<span class="' + textHiddenClass + '">' + CKEDITOR.tools.htmlEncode(buttonText) + '</span>';
            } else {
                buttonHtml += CKEDITOR.tools.htmlEncode(buttonText);
            }

            buttonHtml += '</button>';

            var newElement = CKEDITOR.dom.element.createFromHtml(buttonHtml, editor.document);

            if (isInsertMode) {
                editor.insertElement(newElement);
            } else {
                newElement.replace(element);
                editor.getSelection().selectElement(newElement);
            }
        }
    };
});