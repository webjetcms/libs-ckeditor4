/**
 * WebJET style picker. CSS classes are composed independently of semantic block formatting.
 * Copyright (c) InterWay. Licensed under the same terms as CKEditor.
 */
(function() {
	'use strict';
	var activePicker;
	var blockTags = 'p h1 h2 h3 h4 h5 h6 pre blockquote li td th div section article aside header footer ul ol table figure';

	function words(value) { return (value || '').trim().split(/[\s,]+/).filter(Boolean); }
	function unique(items) { return items.filter(function(item, index) { return items.indexOf(item) === index; }); }
	function plain(value) { return CKEDITOR.tools.htmlDecode(String(value || '').replace(/<[^>]*>/g, '')).trim(); }
	function fold(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
	/** Recognize common category terminology without depending on template class names. */
	function categoryIcon(category) {
		var name = fold(category);
		var icons = [
			[/pozad|background/, 'paint'],
			[/farb|barv|colou?r/, 'palette'],
			[/typograf|typograph|pism|font/, 'typography'],
			[/odsaden|odsazen|spacing|margin|padding/, 'spacing-vertical'],
			[/rozmer|dimension|velkost|velikost|size/, 'ruler-2'],
			[/sekci|section|layout/, 'layout'],
			[/zoznam|seznam|list/, 'list'],
			[/tabul|table/, 'table'],
			[/tlacid|tlacit|button/, 'click'],
			[/odkaz|link/, 'link'],
			[/banner|baner|slideshow/, 'slideshow'],
			[/upozornen|alert|warning/, 'alert-circle'],
			[/obraz|image|photo/, 'photo']
		];
		for (var i = 0; i < icons.length; i++) if (icons[i][0].test(name)) return icons[i][1];
		return 'adjustments';
	}
	function has(element, classes) { return classes.every(function(name) { return element.classList.contains(name); }); }
	function tag(element) { return element.tagName.toLowerCase(); }
	function parent(node) { return node && (node.nodeType === 1 ? node : node.parentElement); }
	function editableNode(element, root) {
		for (var node = element; node && node !== root; node = node.parentElement) {
			if (node.getAttribute('contenteditable') === 'false') return false;
		}
		return element === root || root.contains(element);
	}
	function nativeRange(range) {
		var result = range.document.$.createRange();
		result.setStart(range.startContainer.$, range.startOffset);
		result.setEnd(range.endContainer.$, range.endOffset);
		return result;
	}
	function selectedText(ranges, root) {
		var result = [];
		ranges.forEach(function(range) {
			if (range.collapsed) return;
			var walker = root.ownerDocument.createTreeWalker(range.commonAncestorContainer, 4);
			var node = range.commonAncestorContainer.nodeType === 3 ? range.commonAncestorContainer : walker.nextNode();
			while (node) {
				if (node.nodeValue.length && range.intersectsNode(node) && editableNode(node.parentElement, root) &&
					!node.parentElement.closest('[data-cke-bookmark]')) {
					var start = node === range.startContainer ? range.startOffset : 0;
					var end = node === range.endContainer ? range.endOffset : node.length;
					if (end > start) result.push({ node: node, start: start, end: end });
				}
				node = walker.nextNode();
			}
		});
		return result;
	}

	/** One model per editor; no template class names or global style overrides. */
	function Picker(editor, path) {
		this.editor = editor;
		this.lang = editor.lang.wjstylescombo;
		this.path = path;
		this.items = [];
		this.ranges = [];
		this.contexts = [];
		this.scope = null;
		this.external = [];
		this.revision = 0;
		this.query = '';
		this.collapsedCategories = Object.create(null);
		this.searchCollapsedCategories = Object.create(null);
		this.all = false;
	}
	Picker.prototype = {
		setStyles: function(definitions) {
			var self = this;
			this.close(false);
			this.categoryIcons = Object.create(null);
			this.items = definitions.filter(function(def) {
				if (!def.attributes || !def.attributes['class']) return false;
				var meta = def.wj || {}, category = meta.category || self.lang.other;
				var icon = String(meta.categoryIcon || '').trim();
				// Resolve icons in catalog order, before filtering by allowed content or current target.
				if (!self.categoryIcons[category] && /^ti-[a-z0-9-]+$/.test(icon)) self.categoryIcons[category] = icon.slice(3);
				var style = new CKEDITOR.style(def);
				if (self.editor.filter.customConfig) return self.editor.filter.check(style);
				self.editor.filter.allow(style, 'wjstylescombo');
				return true;
			}).map(function(def, index) {
				var meta = def.wj || {}, classes = words(def.attributes['class']);
				var tags = meta.tag ? words(meta.tag) : (typeof def.element === 'string' ? words(def.element) : ['*']);
				var targets = words(meta.targets);
				var base = words(meta.base);
				var required = meta.requires ? words(meta.requires) : base;
				return { id: index, label: plain(def.name), classes: classes, base: base, required: required,
					changes: classes.filter(function(name) { return base.indexOf(name) < 0; }),
					tags: tags, targets: targets, inline: tags.length === 1 && tags[0] === 'span' && !targets.length,
					category: meta.category || self.lang.other, group: meta.group || '', members: words(meta.members),
					selector: (meta.tag === '*' ? '' : tags.join(',')) + '.' + classes.join('.') };
			});
			this.capture();
		},
		matches: function(item, element) {
			return element && (item.tags.indexOf('*') >= 0 || item.tags.indexOf(tag(element)) >= 0) &&
				(!item.targets.length || item.targets.indexOf(tag(element)) >= 0) && has(element, item.required);
		},
		root: function() { return this.editor.editable() && this.editor.editable().$; },
		capture: function() {
			if (!this.root() || this.editor.mode !== 'wysiwyg' || this.busy) return;
			var selection = this.editor.getSelection(), self = this;
			if (!selection) return;
			this.ranges = selection.getRanges().map(nativeRange);
			this.selectedElement = selection.getSelectedElement();
			this.selectedElement = this.selectedElement && this.selectedElement.$;
			this.scope = null;
			var text = selectedText(this.ranges, this.root());
			var starts = text.map(function(part) { return part.node.parentElement; });
			if (this.selectedElement) starts = [this.selectedElement];
			if (!starts.length && selection.getStartElement()) starts = [selection.getStartElement().$];
			this.starts = unique(starts);
			var contextTags = blockTags.split(' ').concat(['a', 'img', 'button']);
			if (this.ranges.length === 1 && this.ranges[0].collapsed) contextTags.push('span');
			this.contexts = unique(starts.map(function(element) {
				while (element !== self.root() && contextTags.indexOf(tag(element)) < 0 && !self.structureType(element))
					element = element.parentElement;
				return element;
			}));
			this.updateSummary();
			if (this.panel && !this.panel.hidden) this.render();
		},
		targets: function(item) {
			var self = this;
			if (this.scope) return this.matches(item, this.scope) ? [this.scope] : [];
			if (item.inline) {
				if (this.selectedElement) return [];
				var text = selectedText(this.ranges, this.root());
				if (text.length) return unique(text.map(function(part) { return part.node.parentElement; }));
				if (this.ranges.length !== 1 || !this.ranges[0].collapsed) return [];
				var start = parent(this.ranges[0].startContainer), span = this.contexts.length === 1 && this.contexts[0];
				return span && tag(span) === 'span' && this.root().contains(span) && editableNode(start, this.root()) && this.matches(item, span) ? [span] : [];
			}
			return this.contexts.filter(function(element) { return self.matches(item, element); });
		},
		inlineHas: function(item, node) {
			for (var element = parent(node); element; element = element.parentElement) {
				if (tag(element) === 'span' && has(element, item.classes)) return true;
				if (element === this.root()) break;
			}
			return false;
		},
		state: function(item) {
			var self = this, targets = this.targets(item), matched;
			if (item.inline && !this.scope && this.ranges.some(function(range) { return !range.collapsed; })) {
				matched = targets.filter(function(node) { return self.inlineHas(item, node); }).length;
			} else matched = targets.filter(function(element) { return has(element, item.classes); }).length;
			return matched ? (matched === targets.length ? 'true' : 'mixed') : 'false';
		},
		conflicts: function(item, element) {
			var self = this, names = item.members.slice();
			if (item.group) this.items.forEach(function(other) {
				if (other.group === item.group && (item.inline ? other.inline : self.matches(other, element)))
					names = names.concat(other.changes, other.members);
			});
			return unique(names).filter(function(name) { return item.base.indexOf(name) < 0; });
		},
		restore: function() {
			var editor = this.editor;
			editor.focus();
			if (this.selectedElement && this.selectedElement.isConnected) {
				editor.getSelection().selectElement(new CKEDITOR.dom.element(this.selectedElement));
			} else {
				var ranges = this.ranges.map(function(range) {
					var result = editor.createRange();
					result.setStart(new CKEDITOR.dom.node(range.startContainer), range.startOffset);
					result.setEnd(new CKEDITOR.dom.node(range.endContainer), range.endOffset);
					return result;
				});
				if (ranges.length) editor.getSelection().selectRanges(ranges);
			}
		},
		/** Splits only inline spans at range boundaries; unrelated attributes and markup survive. */
		changeText: function(item, remove, clearGroup) {
			var self = this, editor = this.editor, selection = editor.getSelection();
			var bookmarks = selection.createBookmarks();
			var names = unique(item.changes.concat(this.conflicts(item, this.root())));
			// Splitting at bookmarks isolates partially selected spans before removing a class.
			bookmarks.forEach(function(bookmark) {
				[bookmark.endNode, bookmark.startNode].forEach(function(marker) {
					if (!marker) return;
					var ancestor = marker.getParent();
					while (ancestor && !ancestor.equals(editor.editable())) {
						if (ancestor.getName() === 'span' && names.some(function(name) { return ancestor.hasClass(name); })) {
						var outer = ancestor.getParent();
						var boundary = editor.createRange();
						boundary.setStartBefore(marker);
						boundary.collapse(true);
						boundary.splitElement(ancestor);
						ancestor = outer;
					} else ancestor = ancestor.getParent();
				}
				});
				var domRange = editor.document.$.createRange();
				domRange.setStartAfter(bookmark.startNode.$);
				domRange.setEndBefore(bookmark.endNode.$);
				var chunks = selectedText([domRange], self.root());
				var spans = [];
				chunks.forEach(function(part) {
					for (var node = part.node.parentElement; node && node !== self.root(); node = node.parentElement) {
						if (tag(node) === 'span') spans.push(node);
					}
				});
				unique(spans).forEach(function(span) {
					(remove ? (clearGroup ? names : item.changes) : names).forEach(function(name) { span.classList.remove(name); });
					if (!span.className) span.removeAttribute('class');
				});
				if (!remove) chunks.forEach(function(part) {
					var text = part.node;
					if (part.end < text.length) text.splitText(part.end);
					if (part.start) text = text.splitText(part.start);
					var wrapper = editor.document.$.createElement('span');
					wrapper.className = item.classes.join(' ');
					text.parentNode.insertBefore(wrapper, text);
					wrapper.appendChild(text);
				});
			});
			selection.selectBookmarks(bookmarks);
		},
		protectedClasses: function(element) {
			var self = this;
			return unique([].concat.apply([], this.items.filter(function(item) { return self.matches(item, element); }).map(function(item) { return item.base; })));
		},
		changeElement: function(item, element, remove, clearGroup) {
			var names = remove && !clearGroup ? item.changes : this.conflicts(item, element);
			var protectedClasses = this.protectedClasses(element);
			names.filter(function(name) { return protectedClasses.indexOf(name) < 0; }).forEach(function(name) { element.classList.remove(name); });
			if (!remove) item.changes.forEach(function(name) { element.classList.add(name); });
			if (!element.className) element.removeAttribute('class');
		},
		apply: function(item, clearGroup, forceRemove) {
			if (this.editor.readOnly || !this.targets(item).length) return;
			var self = this, scope = this.scope, targets = this.targets(item), remove = forceRemove || clearGroup || this.state(item) === 'true';
			var focus = this.panel && this.panel.ownerDocument.activeElement;
			var focusId = focus && focus.getAttribute('data-style-id');
			this.busy = true;
			try {
				this.restore();
				this.editor.fire('saveSnapshot');
				if (item.inline && !scope && this.ranges.some(function(range) { return !range.collapsed; })) this.changeText(item, remove, clearGroup);
				else {
					var changes = [];
					targets.forEach(function(element) {
						var before = words(element.className);
						self.changeElement(item, element, remove, clearGroup);
						if (element === self.root() || !self.root().contains(element)) {
							var after = words(element.className);
							var watched = unique(self.conflicts(item, element).concat(item.changes));
							changes.push({ element: element, watched: watched, before: before.filter(function(name) { return watched.indexOf(name) >= 0; }), after: after.filter(function(name) { return watched.indexOf(name) >= 0; }), added: after.filter(function(name) { return before.indexOf(name) < 0; }),
								removed: before.filter(function(name) { return after.indexOf(name) < 0; }) });
						}
					});
					if (changes.length) {
						self.external.splice(self.revision);
						self.external.push(changes);
						self.revision++;
					}
				}
				this.editor.fire('saveSnapshot');
				this.editor.fire('change');
			} finally { this.busy = false; }
			this.capture();
			this.scope = scope;
			this.updateSummary();
			this.render();
			if (this.panel && !this.panel.hidden) {
				var restoreFocus = focusId !== null ? this.list.querySelector('[data-style-id="' + focusId + '"]') : null;
				(restoreFocus || this.search).focus();
			}
			if (this.status) this.status.textContent = item.label + ': ' + (remove ? this.lang.removed : this.lang.applied);
		},
		/** Read the native format configuration while respecting custom and active content filters. */
		formats: function() {
			var editor = this.editor, self = this;
			if (!this.formatItems) this.formatItems = (editor.config.format_tags || '').split(';').filter(Boolean).map(function(name, index) {
				var definition = editor.config['format_' + name];
				if (!definition) return null;
				var style = new CKEDITOR.style(definition);
				if (style.type !== CKEDITOR.STYLE_BLOCK || (editor.filter.customConfig && !editor.filter.check(style))) return null;
				if (!editor.filter.customConfig) editor.filter.allow(style, 'wjstylescombo');
				style._.enterMode = editor.config.enterMode;
				var label = self.lang.elements[name] || editor.lang.format['tag_' + name] || name;
				if (/^h[1-6]$/.test(name)) label += ' (' + name.toUpperCase() + ')';
				return { id: index, name: name, label: label, style: style };
			}).filter(Boolean);
			return this.formatItems.filter(function(format) { return editor.activeFilter.check(format.style); });
		},
		/** Resolve text blocks; an explicit target can format only the block containing the selection. */
		formatTargets: function() {
			var editor = this.editor, root = this.root(), paths = [], blocks = [];
			var target = this.scope || this.contexts[0];
			if (!root || editor.readOnly || editor.blockless || this.selectedElement || !this.ranges.length || (target && tag(target) === 'span')) return paths;
			(this.starts || []).forEach(function(element) {
				if (!editableNode(element, root)) return;
				var path = new CKEDITOR.dom.elementPath(new CKEDITOR.dom.element(element), editor.editable());
				var block = (path.block || path.blockLimit).$;
				if (blocks.indexOf(block) < 0) { blocks.push(block); paths.push(path); }
			});
			if (this.scope && (this.scope === root || paths.length !== 1 || !paths[0].block || paths[0].block.$ !== this.scope)) return [];
			return paths.every(function(path) { return path.isContextFor('p'); }) ? paths : [];
		},
		formatState: function(format) {
			var editor = this.editor, targets = this.formatTargets();
			var matches = targets.filter(function(path) { return format.style.checkActive(path, editor); }).length;
			return matches ? (matches === targets.length ? 'true' : 'mixed') : 'false';
		},
		/** Apply native block conversion without removing independent CSS appearance or closing the panel. */
		applyFormat: function(format) {
			var editor = this.editor, targets = this.formatTargets(), scope = this.scope;
			if (!targets.length || !editor.activeFilter.check(format.style) || this.formatState(format) === 'true' ||
				!targets.every(function(path) { return format.style.checkApplicable(path, editor); })) return;
			this.busy = true;
			try {
				this.restore();
				editor.fire('saveSnapshot');
				editor.applyStyle(format.style);
				editor.fire('saveSnapshot');
				editor.fire('change');
			} finally { this.busy = false; }
			this.capture();
			if (scope) {
				var path = editor.elementPath();
				this.scope = path && path.block ? path.block.$ : null;
				this.updateSummary(); this.render();
			}
			if (this.panel && !this.panel.hidden) {
				var row = this.list.querySelector('[data-style-id="format-' + format.id + '"]');
				(row || this.search).focus();
			}
			if (this.status) this.status.textContent = format.label + ': ' + this.lang.applied;
		},
		/** Append semantic formats as the first searchable accordion in the list. */
		renderFormats: function(query, collapsed) {
			var self = this, lang = this.lang, el = this.el;
			var formats = this.formats().filter(function(format) {
				return fold(lang.paragraphFormat + ' ' + format.label + ' ' + format.name).indexOf(query) >= 0;
			});
			if (!formats.length) return 0;
			var targets = this.formatTargets();
			function applicable(format) {
				return targets.every(function(path) { return format.style.checkApplicable(path, self.editor); });
			}
			if (!targets.length || !formats.some(applicable)) return 0;
			var section = el('section', 'wj-styles__group wj-styles__formats', '', this.list);
			var heading = el('h3', '', '', section);
			var toggle = el('button', 'wj-styles__group-toggle', '', heading);
			toggle.type = 'button';
			this.icon('chevron-down', toggle); this.icon('pilcrow', toggle);
			el('span', 'wj-styles__group-name', lang.paragraphFormat, toggle);
			el('span', 'wj-styles__count', String(formats.length), toggle);
			var content = el('div', 'wj-styles__group-content', '', section);
			content.id = this.panel.id + '-formats';
			content.hidden = !!collapsed['__formats'];
			toggle.setAttribute('aria-controls', content.id);
			toggle.setAttribute('aria-expanded', String(!content.hidden));
			toggle.onclick = function() {
				content.hidden = !content.hidden;
				collapsed['__formats'] = content.hidden;
				toggle.setAttribute('aria-expanded', String(!content.hidden));
				self.updateToggleAll();
			};
			var hint = el('p', 'wj-styles__format-hint', lang.formatHint, content);
			hint.id = content.id + '-hint';
			var choices = el('div', 'wj-styles__format-options', '', content);
			choices.setAttribute('role', 'group');
			choices.setAttribute('aria-label', lang.paragraphFormat + ' · ' + lang.singleChoice);
			choices.setAttribute('aria-describedby', hint.id);
			formats.forEach(function(format) {
				var state = self.formatState(format);
				var row = el('button', 'wj-styles__item wj-styles__item--exclusive wj-styles__format', '', choices);
				row.type = 'button';
				row.disabled = !applicable(format);
				row.setAttribute('data-format', format.name);
				row.setAttribute('data-style-id', 'format-' + format.id);
				row.setAttribute('aria-pressed', state);
				el('span', 'wj-styles__check', state === 'mixed' ? '−' : '', row).setAttribute('aria-hidden', 'true');
				el('span', '', format.label, row);
				row.onclick = function() { self.applyFormat(format); };
			});
			return formats.length;
		},
		resetComponent: function() {
			var self = this, element = this.scope || this.contexts[0];
			if (!element) return;
			var items = this.items.filter(function(item) { return self.matches(item, element); });
			var base = unique([].concat.apply([], items.map(function(item) { return item.base; })));
			var changes = unique([].concat.apply([], items.map(function(item) { return item.changes.concat(item.members); })));
			this.apply({ label: this.lang.reset, tags: [tag(element)], targets: [], required: [], base: base,
				classes: [], changes: changes.filter(function(name) { return base.indexOf(name) < 0; }), members: [], group: '' }, false, true);
		},
		ancestors: function() {
			var result = [], node = this.contexts[0], root = this.root();
			if (!node || this.contexts.length > 1) return result;
			var textTarget = tag(node) === 'span';
			var boundary = this.editor.config.wjstylescombo_scope;
			boundary = boundary && boundary(this.editor);
			while (node && node !== root.ownerDocument.body) {
				if (node === root && !boundary) break;
				if (node !== this.contexts[0] && (this.structureType(node) || (textTarget && /^(p|h[1-6])$/.test(tag(node))) ||
					this.items.some(function(item) { return item.tags.indexOf('*') < 0 && this.matches(item, node); }, this))) result.push(node);
				if (node === (boundary || root)) break;
				node = node.parentElement;
			}
			return result;
		},
		active: function() {
			var self = this;
			var seen = [];
			return this.items.filter(function(item) {
				var key = (item.inline ? 'inline:' : 'block:') + item.classes.slice().sort().join(' ');
				if (self.state(item) === 'false' || seen.indexOf(key) >= 0) return false;
				seen.push(key); return true;
			});
		},
		button: function() {
			var button = this.editor.ui.get('WJStyles');
			return button && CKEDITOR.document.$.getElementById(button._.id);
		},
		/** Classify elements using the selectors supplied by the editor configuration. */
		structureType: function(element) {
			var selectors = this.editor.config.wjstylescombo_structure;
			if (!element || !selectors) return '';
			var types = ['column', 'row', 'container', 'section'];
			for (var i = 0; i < types.length; i++) {
				var selector = selectors[types[i]];
				if (typeof selector !== 'string' || !selector.trim()) continue;
				try {
					if (element.matches(selector)) return types[i];
				} catch (error) { /* An invalid custom selector must not disable the style picker. */ }
			}
			return '';
		},
		elementLabel: function(element) {
			var name = tag(element);
			return this.lang.structure[this.structureType(element)] || this.lang.elements[name] || name;
		},
		updateSummary: function() {
			var button = this.button();
			if (!button) return;
			var self = this, names = this.active().map(function(item) {
				return item.label + (self.state(item) === 'mixed' ? ' (' + self.lang.mixed + ')' : '');
			});
			var targets = this.scope ? [this.scope] : this.contexts, tags = unique(targets.map(tag));
			var context = tags.length === 1 ? (names.length ? tags[0].toUpperCase() : this.elementLabel(targets[0])) : targets.length ? this.lang.selection : '';
			var label = button.querySelector('.cke_button_label');
			var full = names.length ? (context ? context + ' + ' : '') + names.join(', ') : context || this.lang.label;
			button.title = full;
			if (this.summaryTip) this.summaryTip.textContent = full;
			button.setAttribute('aria-label', this.lang.label + ': ' + full);
			button.setAttribute('aria-haspopup', 'dialog');
			label.textContent = full;
		},
		create: function() {
			var self = this, doc = this.button().ownerDocument, lang = this.lang;
			function el(name, cls, text, into) {
				var element = doc.createElement(name);
				element.className = cls || '';
				if (text) element.textContent = text;
				if (into) into.appendChild(element);
				return element;
			}
			this.el = el;
			this.icon = function(name, into) {
				var icon = el('i', 'ti ti-' + name, '', into);
				icon.setAttribute('aria-hidden', 'true');
				return icon;
			};
			var panel = this.panel = el('div', 'wj-styles');
			panel.id = 'wj-styles-' + this.editor.id;
			// Background clicks must focus the dialog instead of blurring it to the document body.
			panel.tabIndex = -1;
			panel.setAttribute('role', 'dialog');
			panel.setAttribute('aria-label', lang.label);
			panel.dir = this.editor.lang.dir;
			panel.addEventListener('inserted.bs.tooltip', function(event) {
				var tip = doc.getElementById(event.target.getAttribute('aria-describedby'));
				if (tip) tip.style.zIndex = self.layer() + 1;
			});
			var header = el('div', 'wj-styles__header', '', panel);
			var top = el('div', 'wj-styles__top', '', header);
			var dragHandle = this.dragHandle = el('button', 'wj-styles__drag', '', top);
			dragHandle.type = 'button'; dragHandle.title = lang.move; dragHandle.setAttribute('aria-label', lang.move);
			this.icon('grip-vertical', dragHandle);
			dragHandle.onpointerdown = function(event) {
				if (event.button !== 0 || event.isPrimary === false) return;
				event.preventDefault(); event.stopPropagation();
				dragHandle.focus();
				var rect = panel.getBoundingClientRect();
				self.drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
				dragHandle.setPointerCapture(event.pointerId);
				panel.classList.add('wj-styles--dragging');
			};
			dragHandle.onpointermove = function(event) {
				if (!self.drag || self.drag.id !== event.pointerId) return;
				event.preventDefault();
				self.movePanel(self.drag.left + event.clientX - self.drag.x, self.drag.top + event.clientY - self.drag.y);
			};
			dragHandle.onpointerup = dragHandle.onpointercancel = function(event) {
				if (self.drag && self.drag.id === event.pointerId) self.endDrag();
			};
			dragHandle.onlostpointercapture = function() { self.endDrag(); };
			dragHandle.onkeydown = function(event) {
				if (!/^Arrow(Left|Right|Up|Down)$/.test(event.key)) return;
				event.preventDefault(); event.stopPropagation();
				var rect = panel.getBoundingClientRect(), step = event.shiftKey ? 1 : 10;
				self.movePanel(rect.left + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0),
					rect.top + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0));
			};
			el('strong', '', lang.label, top);
			var close = el('button', 'wj-styles__close', '', top);
			this.icon('x', close);
			close.type = 'button'; close.setAttribute('aria-label', lang.close);
			close.onclick = function() { self.close(true); };
			var target = el('div', 'wj-styles__target', '', header);
			this.target = el('div', 'wj-styles__target-path', '', target);
			this.target.setAttribute('role', 'group');
			this.target.setAttribute('aria-label', lang.target);
			this.chips = el('div', 'wj-styles__chips', '', header);
			this.chips.setAttribute('aria-label', lang.active);
			var searchBox = el('div', 'wj-styles__search-box', '', header);
			this.icon('search', searchBox);
			this.search = el('input', 'wj-styles__search', '', searchBox);
			this.search.type = 'search'; this.search.placeholder = lang.search;
			this.search.setAttribute('aria-label', lang.search);
			this.search.oninput = function() {
				self.query = this.value;
				self.searchCollapsedCategories = Object.create(null);
				self.list.scrollTop = 0; self.renderList();
			};
			this.clearSearch = el('button', 'wj-styles__search-clear', '', searchBox);
			this.clearSearch.type = 'button';
			this.clearSearch.setAttribute('aria-label', lang.clearSearch);
			this.icon('x', this.clearSearch);
			this.clearSearch.onclick = function() {
				self.search.value = '';
				self.search.oninput();
				self.search.focus();
			};
			var filters = el('div', 'wj-styles__filters', '', header);
			this.toggleAll = el('button', 'wj-styles__toggle-all', '', filters);
			this.toggleAll.type = 'button';
			this.toggleAllIcon = this.icon('chevrons-up', this.toggleAll);
			this.toggleAllLabel = el('span', '', '', this.toggleAll);
			this.toggleAll.onclick = function() {
				var expand = !!self.list.querySelector('.wj-styles__group-toggle[aria-expanded="false"]');
				Array.prototype.forEach.call(self.list.querySelectorAll('.wj-styles__group-toggle'), function(toggle) {
					if (toggle.getAttribute('aria-expanded') !== String(expand)) toggle.click();
				});
				self.list.scrollTop = 0;
			};
			var allLabel = el('label', '', '', filters);
			allLabel.setAttribute('data-wj-tooltip', lang.allHint);
			this.allInput = el('input', '', '', allLabel); this.allInput.type = 'checkbox';
			el('span', '', lang.all, allLabel);
			this.allInput.onchange = function() { self.all = this.checked; self.list.scrollTop = 0; self.renderList(); };
			this.list = el('div', 'wj-styles__list', '', panel);
			this.list.id = panel.id + '-list';
			this.toggleAll.setAttribute('aria-controls', this.list.id);
			this.search.setAttribute('aria-controls', this.list.id);
			this.status = el('div', 'wj-styles__status', lang.hint, panel);
			this.status.setAttribute('role', 'status');
			panel.onkeydown = function(event) {
				if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); self.close(true); }
				if (event.target.closest('.wj-styles__list') && /^(ArrowDown|ArrowUp|Home|End)$/.test(event.key)) {
					var buttons = Array.prototype.slice.call(self.list.querySelectorAll('button:not(:disabled)')).filter(function(button) {
						return !button.closest('[hidden]');
					});
					var index = buttons.indexOf(event.target), next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : index + (event.key === 'ArrowDown' ? 1 : -1);
					if (buttons.length) buttons[(next + buttons.length) % buttons.length].focus();
					event.preventDefault();
				}
			};
			panel.addEventListener('focusout', function() {
				setTimeout(function() {
					if (!panel.hidden && !panel.contains(doc.activeElement) && doc.activeElement !== self.button() && !self.busy) self.close(false);
				}, 0);
			});
			panel.addEventListener('mousedown', function(event) {
				// Controls retain the editor's bookmarked selection while allowing keyboard focus.
				event.stopPropagation();
			});
			// Keep the controls inside a host modal's focus boundary.
			(this.button().closest('.modal, [role="dialog"]') || doc.body).appendChild(panel);
			this.editor.focusManager.add(new CKEDITOR.dom.element(panel), true);
			this.outside = function(event) {
				if (!panel.contains(event.target) && !self.button().contains(event.target)) self.close(false);
			};
			doc.addEventListener('mousedown', this.outside);
			this.resize = function() { self.position(); };
			doc.defaultView.addEventListener('resize', this.resize);
			doc.defaultView.addEventListener('scroll', this.resize, true);
			try {
				if (doc.defaultView.frameElement) {
					this.parentWindow = doc.defaultView.parent;
					this.parentWindow.addEventListener('resize', this.resize);
				}
			} catch (error) { /* Cross-origin hosts only expose the iframe's own resize events. */ }
			this.stopDrag = function() { self.endDrag(); };
			doc.defaultView.addEventListener('blur', this.stopDrag);
		},
		open: function() {
			if (activePicker && activePicker !== this) activePicker.close(false);
			if (!this.button() || this.editor.readOnly) return;
			this.capture();
			if (!this.panel) this.create();
			this.manualPosition = null;
			this.syncPreviewFonts();
			this.panel.hidden = false;
			if (this.summaryTip) this.summaryTip.hidden = true;
			activePicker = this;
			this.button().setAttribute('aria-expanded', 'true');
			this.button().setAttribute('aria-controls', this.panel.id);
			this.status.textContent = this.lang.hint;
			this.render(); this.position(); this.search.focus();
			this.list.scrollTop = 0;
		},
		close: function(focus) {
			this.endDrag();
			this.manualPosition = null;
			this.disposeTooltips();
			if (!this.panel || this.panel.hidden) return;
			this.panel.hidden = true;
			if (activePicker === this) activePicker = null;
			if (this.button()) {
				this.button().setAttribute('aria-expanded', 'false');
				if (focus) this.button().focus();
			}
			// Returning focus after dismissal must not leave the focus tooltip open.
			if (this.summaryTip) this.summaryTip.hidden = true;
		},
		/** Keep a moved panel at its viewport position until this opening is dismissed. */
		movePanel: function(left, top) {
			if (!this.manualPosition) this.manualPosition = { height: this.panel.offsetHeight };
			this.manualPosition.left = left; this.manualPosition.top = top;
			this.position();
		},
		endDrag: function() {
			var drag = this.drag;
			this.drag = null;
			if (this.panel) this.panel.classList.remove('wj-styles--dragging');
			if (drag && this.dragHandle.hasPointerCapture(drag.id)) this.dragHandle.releasePointerCapture(drag.id);
		},
		layer: function() {
			var button = this.button(), win = button.ownerDocument.defaultView;
			var z = Math.max(this.editor.config.baseFloatZIndex || 10000, 101100);
			for (var node = button; node; node = node.parentElement) z = Math.max(z, parseInt(win.getComputedStyle(node).zIndex, 10) || 0);
			// Page Builder outlines sit immediately above its shared toolbar.
			return z + 100;
		},
		position: function() {
			if (!this.panel || this.panel.hidden || !this.button()) return;
			var win = this.panel.ownerDocument.defaultView, rect = this.button().getBoundingClientRect();
			var viewportLeft = 0, viewportRight = win.innerWidth;
			try {
				// The Page Builder iframe can be wider than the visible administration viewport.
				if (win.frameElement) {
					var frameLeft = win.frameElement.getBoundingClientRect().left;
					viewportLeft = Math.max(0, -frameLeft);
					viewportRight = Math.min(viewportRight, win.parent.innerWidth - frameLeft);
				}
			} catch (error) { /* Cross-origin hosts retain the iframe's own viewport bounds. */ }
			this.panel.style.zIndex = this.layer();
			this.panel.style.width = Math.min(480, viewportRight - viewportLeft - 16) + 'px';
			var moved = this.manualPosition;
			this.panel.style.left = Math.max(viewportLeft + 8, Math.min(moved ? moved.left : rect.left, viewportRight - this.panel.offsetWidth - 8)) + 'px';
			var below = win.innerHeight - rect.bottom - 12;
			var above = rect.top - 12;
			var flip = below < 320 && above > below;
			var height = moved ? Math.min(moved.height, win.innerHeight - 16) : Math.max(160, Math.min(640, flip ? above : below));
			this.panel.style.height = height + 'px';
			this.panel.style.maxHeight = height + 'px';
			this.panel.querySelector('.wj-styles__header').style.maxHeight = Math.max(70, height - 120) + 'px';
			this.panel.style.top = (moved ? Math.max(8, Math.min(moved.top, win.innerHeight - this.panel.offsetHeight - 8)) :
				flip ? Math.max(8, rect.top - this.panel.offsetHeight - 4) : rect.bottom + 4) + 'px';
			if (moved) { moved.left = parseFloat(this.panel.style.left); moved.top = parseFloat(this.panel.style.top); }
		},
		selectTarget: function(index) {
			this.scope = index === '' ? null : this.ancestorList[Number(index)];
			this.status.textContent = this.lang.hint;
			this.updateSummary(); this.render();
			this.target.querySelector('[aria-pressed="true"]').focus();
		},
		/** Reuse the host's Bootstrap, keeping iframe tooltips in the panel's own document. */
		initTooltips: function() {
			var doc = this.panel.ownerDocument, win = doc.defaultView;
			var Tooltip = win.bootstrap && win.bootstrap.Tooltip;
			try {
				if (!Tooltip && win.parent !== win) Tooltip = win.parent.bootstrap && win.parent.bootstrap.Tooltip;
			} catch (error) { /* Cross-origin hosts retain native title tooltips. */ }
			this.tooltips = [].map.call(this.panel.querySelectorAll('[data-wj-tooltip]'), function(option) {
				option.title = option.getAttribute('data-wj-tooltip');
				if (typeof Tooltip !== 'function') return null;
				return new Tooltip(option, {
					container: doc.body, html: false, placement: 'top', trigger: 'hover focus',
					customClass: 'wj-styles-tooltip', delay: { show: 300, hide: 150 }, animation: false
				});
			});
		},
		disposeTooltips: function() {
			(this.tooltips || []).forEach(function(tooltip) { if (tooltip) tooltip.dispose(); });
			this.tooltips = [];
			if (this.panel) [].forEach.call(this.panel.querySelectorAll('[data-wj-tooltip][aria-describedby]'), function(option) { option.removeAttribute('aria-describedby'); });
		},
		render: function() {
			if (!this.panel || this.panel.hidden) return;
			var self = this, lang = this.lang, el = this.el, focus = this.panel.ownerDocument.activeElement;
			var focusId = focus && focus.getAttribute('data-style-id');
			this.disposeTooltips();
			this.target.textContent = '';
			this.ancestorList = this.ancestors();
			var targets = this.ancestorList.map(function(element, index) {
				return { element: element, index: index, label: self.elementLabel(element) };
			}).reverse();
			targets.push({ element: null, index: '', label: this.contexts.length > 1 ? lang.selection + ' (' + this.contexts.length + ')' : this.contexts.map(function(element) { return self.elementLabel(element); }).join(', ') || lang.selection });
			targets.forEach(function(target, index) {
				var part = el('span', 'wj-styles__target-part', '', self.target);
				if (index) el('span', 'wj-styles__target-separator', '›', part).setAttribute('aria-hidden', 'true');
				var option = el('button', 'wj-styles__target-option', target.label, part);
				var type = self.structureType(target.element || (self.contexts.length === 1 && self.contexts[0]));
				if (type) option.setAttribute('data-type', type);
				option.type = 'button';
				option.setAttribute('data-target', target.index);
				option.setAttribute('aria-pressed', String(self.scope === target.element));
				option.setAttribute('data-wj-tooltip', (target.element ? [target.element] : self.contexts).map(function(element) {
					var classes = [].slice.call(element.classList);
					return tag(element) + (element.id ? '#' + element.id : '') + (classes.length ? '.' + classes.join('.') : '');
				}).join('\n'));
				option.onclick = function() { self.selectTarget(target.index); };
			});
			this.chips.textContent = '';
			var active = this.active();
			if (!active.length) el('span', 'wj-styles__empty', lang.noActive, this.chips);
			active.forEach(function(item) {
				var chip = el('button', 'wj-styles__chip', '', self.chips);
				el('span', '', item.label + (self.state(item) === 'mixed' ? ' ◒' : ''), chip);
				self.icon('x', chip);
				chip.type = 'button'; chip.setAttribute('aria-label', lang.remove + ': ' + item.label);
				chip.setAttribute('data-wj-tooltip', item.classes.join(' '));
				chip.onclick = function() { self.apply(item, false, true); self.search.focus(); };
			});
			var component = this.scope || (this.contexts.length === 1 && this.contexts[0]);
			if (component && this.items.some(function(item) { return item.base.length && self.matches(item, component); })) {
				var reset = el('button', 'wj-styles__reset', lang.reset, this.chips);
				reset.type = 'button'; reset.onclick = function() { self.resetComponent(); };
			}
			this.search.value = this.query;
			this.allInput.checked = this.all;
			this.initTooltips();
			this.renderList();
			if (focusId !== null && focusId !== undefined) {
				var replacement = this.list.querySelector('[data-style-id="' + focusId + '"]');
				if (replacement) replacement.focus();
			}
			this.position();
		},
		/** Measures a temporary candidate in the target's CSS context without changing its content. */
		sample: function(item) {
			var doc = this.editor.document.$, win = doc.defaultView;
			var target = this.targets(item)[0] || this.scope || this.contexts[0] || this.root();
			var name = item.inline ? 'span' : item.tags.indexOf('*') >= 0 || item.tags.indexOf(tag(target)) >= 0 ? tag(target) : item.tags[0];
			if (/^(body|html)$/.test(name)) name = 'p';
			var container = item.inline && !/^(img|input|br|hr)$/.test(tag(target)) ? target : target.parentElement || target;
			if (target === doc.body) container = target;
			var sample = doc.createElement(name), conflicts = this.conflicts(item, target);
			var base = name === tag(target) ? words(target.className).filter(function(value) { return conflicts.indexOf(value) < 0; }) : [];
			base = unique(base.concat(item.base, item.required));
			sample.className = base.join(' ');
			sample.setAttribute('data-cke-temp', '1');
			sample.style.cssText = 'position:fixed!important;visibility:hidden!important;pointer-events:none!important;transition:none!important;animation:none!important;';
			sample.textContent = 'Aa';
			var properties = ['color', 'backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat',
				'fontFamily', 'fontWeight', 'fontSize', 'fontStyle', 'fontVariant', 'letterSpacing', 'textTransform', 'textDecoration',
				'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderRightWidth', 'borderRightStyle', 'borderRightColor',
				'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor', 'borderLeftWidth', 'borderLeftStyle', 'borderLeftColor', 'borderRadius'];
			var spacing = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
			var before = {}, after = {}, backgrounds = [], result;
			container.insertBefore(sample, target.parentElement === container ? target : null);
			try {
				var css = win.getComputedStyle(sample);
				properties.concat(spacing).forEach(function(key) { before[key] = css[key]; });
				sample.className = unique(base.concat(item.classes)).join(' ');
				css = win.getComputedStyle(sample);
				properties.concat(spacing).forEach(function(key) { after[key] = css[key]; });
				var changedSpacing = spacing.filter(function(key) { return before[key] !== after[key]; });
				var spacingGroup = /odsaden|odsazen|spacing|margin|padding/.test(fold(item.group + ' ' + item.category));
				var visualChange = properties.some(function(key) { return before[key] !== after[key]; });
				var spacingProperty = (spacingGroup || changedSpacing.length && !visualChange) && (changedSpacing[0] || 'marginBottom');
				for (var node = container; node; node = node.parentElement) {
					var background = win.getComputedStyle(node).backgroundColor;
					if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') backgrounds.push('linear-gradient(' + background + ',' + background + ')');
				}
				result = { styles: {}, backdrop: backgrounds.join(','), spacing: spacingProperty,
					value: spacingProperty ? after[spacingProperty] : after.fontSize,
					size: before.fontSize !== after.fontSize || categoryIcon(item.category) === 'typography',
					box: after.backgroundColor !== 'rgba(0, 0, 0, 0)' && after.backgroundColor !== 'transparent' ||
						['Top', 'Right', 'Bottom', 'Left'].some(function(side) { return parseFloat(after['border' + side + 'Width']) > 0; }) };
				var range = doc.createRange();
				range.selectNodeContents(sample);
				result.width = range.getBoundingClientRect().width + 10 + parseFloat(after.borderLeftWidth) + parseFloat(after.borderRightWidth);
				result.height = parseFloat(after.fontSize) + 4 + parseFloat(after.borderTopWidth) + parseFloat(after.borderBottomWidth);
				properties.forEach(function(key) { result.styles[key] = after[key]; });
			} finally { sample.parentNode.removeChild(sample); }
			return result;
		},
		/** Renders appearance separately from the readable row label; large samples fit their frame. */
		renderSample: function(item, row) {
			var el = this.el, preview = this.sample(item);
			var sample = el('span', 'wj-styles__sample' + (preview.spacing ? ' wj-styles__sample--spacing' : ''), '', row);
			sample.setAttribute('aria-hidden', 'true');
			var stage = el('span', 'wj-styles__sample-stage', '', sample);
			var value = Math.round((parseFloat(preview.value) || 0) * 10) / 10;
			if (preview.spacing) {
				var horizontal = /Left|Right/.test(preview.spacing);
				var diagram = el('span', 'wj-styles__sample-spacing' + (horizontal ? ' wj-styles__sample-spacing--horizontal' : ''), '', stage);
				diagram.style.setProperty('--wj-styles-gap', Math.min(20, Math.round(Math.sqrt(Math.abs(value)) * 2.5)) + 'px');
				el('span', 'wj-styles__sample-block', '', diagram);
				el('span', 'wj-styles__sample-gap', '', diagram);
				el('span', 'wj-styles__sample-block', '', diagram);
				this.icon(horizontal ? 'arrows-horizontal' : 'arrows-vertical', stage);
				sample.title = preview.spacing.replace(/[A-Z]/g, function(letter) { return '-' + letter.toLowerCase(); }) + ': ' + preview.value;
			} else {
				stage.style.backgroundColor = '#fff';
				stage.style.backgroundImage = preview.backdrop;
				var content = el('span', 'wj-styles__sample-preview' + (preview.box ? ' wj-styles__sample-preview--box' : ''), 'Aa', stage);
				Object.keys(preview.styles).forEach(function(key) { content.style[key] = preview.styles[key]; });
				var scale = Math.min(1, 86 / Math.max(1, preview.width), (preview.size ? 40 : 44) / Math.max(1, preview.height));
				content.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
				sample.title = 'font-size: ' + preview.styles.fontSize + '; font-weight: ' + preview.styles.fontWeight;
			}
			if (preview.spacing || preview.size) el('span', 'wj-styles__sample-value', value + ' px', sample);
		},
		/** Makes content fonts available to previews in a different toolbar document. */
		syncPreviewFonts: function() {
			var source = this.editor.document.$, host = this.panel.ownerDocument, rules = [];
			if (source === host) return;
			function matchesMedia(media) {
				return !media || !media.mediaText || source.defaultView.matchMedia(media.mediaText).matches;
			}
			function collect(sheet, base) {
				var children;
				try { children = sheet.cssRules; } catch (error) { return; }
				if (sheet.disabled || !matchesMedia(sheet.media)) return;
				read(children, sheet.href || base);
			}
			function read(children, base) {
				Array.prototype.forEach.call(children || [], function(rule) {
					if (!matchesMedia(rule.media)) return;
					if (rule.type === 5) {
						var css = rule.style.cssText.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/g, function(match, doubleQuoted, singleQuoted, unquoted) {
							var url = doubleQuoted || singleQuoted || unquoted || '';
							try { url = new URL(url, base).href; } catch (error) { return match; }
							return 'url("' + url.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '")';
						});
						rules.push('@font-face {' + css + '}');
					} else if (rule.type === 3 && rule.styleSheet) collect(rule.styleSheet, base);
					else if (rule.cssRules) read(rule.cssRules, base);
				});
			}
			Array.prototype.forEach.call(source.styleSheets, function(sheet) { collect(sheet, source.baseURI); });
			var css = unique(rules).join('\n');
			if (!css && !this.previewFonts) return;
			if (!this.previewFonts) {
				this.previewFonts = host.createElement('style');
				this.previewFonts.setAttribute('data-wj-styles-fonts', this.editor.id);
				host.head.appendChild(this.previewFonts);
			}
			if (this.previewFonts.textContent !== css) this.previewFonts.textContent = css;
		},
		updateToggleAll: function() {
			var expand = !!this.list.querySelector('.wj-styles__group-toggle[aria-expanded="false"]');
			this.toggleAll.disabled = !this.list.querySelector('.wj-styles__group-toggle');
			this.toggleAllLabel.textContent = expand ? this.lang.expandAll : this.lang.collapseAll;
			this.toggleAllIcon.className = 'ti ti-chevrons-' + (expand ? 'down' : 'up');
		},
		renderList: function() {
			var self = this, lang = this.lang, el = this.el, scroll = this.list.scrollTop;
			this.list.textContent = '';
			this.clearSearch.hidden = !this.query;
			var query = fold(this.query), groups = Object.create(null);
			// Search has its own accordion state so clearing it restores the unfiltered view.
			var collapsed = query ? this.searchCollapsedCategories : this.collapsedCategories;
			this.items.forEach(function(item) {
				var applicable = self.targets(item).length > 0;
				if ((!self.all && !applicable) ||
					fold(item.label + ' ' + item.selector + ' ' + item.category + ' ' + item.group).indexOf(query) < 0) return;
				if (!groups[item.category]) groups[item.category] = [];
				groups[item.category].push(item);
			});
			var formatCount = this.renderFormats(query, collapsed);
			Object.keys(groups).forEach(function(category, index) {
				var section = el('section', 'wj-styles__group', '', self.list);
				var heading = el('h3', '', '', section);
				var toggle = el('button', 'wj-styles__group-toggle', '', heading);
				toggle.type = 'button';
				self.icon('chevron-down', toggle);
				self.icon(self.categoryIcons[category] || categoryIcon(category), toggle);
				el('span', 'wj-styles__group-name', category, toggle);
				el('span', 'wj-styles__count', String(groups[category].length), toggle);
				var content = el('div', 'wj-styles__group-content', '', section);
				content.id = self.panel.id + '-category-' + index;
				content.hidden = !!collapsed[category];
				toggle.setAttribute('aria-controls', content.id);
				toggle.setAttribute('aria-expanded', String(!content.hidden));
				toggle.onclick = function() {
					content.hidden = !content.hidden;
					collapsed[category] = content.hidden;
					toggle.setAttribute('aria-expanded', String(!content.hidden));
					self.updateToggleAll();
				};
				var subgroups = Object.create(null);
				groups[category].forEach(function(item) {
					if (!subgroups[item.group]) subgroups[item.group] = [];
					subgroups[item.group].push(item);
				});
				Object.keys(subgroups).forEach(function(group) {
					var choices = el('div', 'wj-styles__choices', '', content);
					if (group) {
						choices.setAttribute('role', 'group');
						choices.setAttribute('aria-label', group + ' · ' + lang.singleChoice);
						var groupLine = el('div', 'wj-styles__group-line', '', choices);
						el('span', '', group === category ? lang.singleChoice : group, groupLine);
						var applicableItem = subgroups[group].filter(function(item) { return self.targets(item).length > 0; })[0];
						if (applicableItem) {
							var clear = el('button', '', '', groupLine);
							self.icon('restore', clear);
							el('span', '', lang.unset, clear);
							clear.type = 'button'; clear.setAttribute('data-style-id', 'clear-' + applicableItem.id);
							clear.setAttribute('aria-label', lang.unset + ': ' + group);
							clear.onclick = function() { self.apply(applicableItem, true); };
						}
					}
					subgroups[group].forEach(function(item) {
						var applicable = self.targets(item).length > 0;
						var row = el('button', 'wj-styles__item' + (item.group ? ' wj-styles__item--exclusive' : ''), '', choices);
						row.type = 'button'; row.disabled = !applicable;
						row.setAttribute('data-style-id', item.id);
						row.setAttribute('aria-pressed', self.state(item));
						var mark = el('span', 'wj-styles__check', self.state(item) === 'mixed' ? '−' : item.group ? '' : '✓', row);
						mark.setAttribute('aria-hidden', 'true');
						var text = el('span', 'wj-styles__text', '', row);
						el('span', 'wj-styles__name', item.label, text);
						el('small', '', applicable ? item.selector : lang.requires + ': ' + (item.targets.join(', ') || item.tags.join(', ')) + (item.base.length ? '.' + item.base.join('.') : ''), text);
						self.renderSample(item, row);
						row.onclick = function() { self.apply(item, false); };
					});
				});
			});
			if (!Object.keys(groups).length && !formatCount) {
				var empty = el('div', 'wj-styles__no-results', '', this.list);
				empty.setAttribute('role', 'status');
				this.icon('search', empty);
				el('p', '', query ? lang.noSearchResults : lang.noResults, empty);
			}
			this.updateToggleAll();
			this.list.scrollTop = scroll;
		},
		destroy: function() {
			this.close(false);
			if (this.summaryTip) this.summaryTip.remove();
			if (this.previewFonts) this.previewFonts.remove();
			if (this.panel) {
				var doc = this.panel.ownerDocument;
				doc.removeEventListener('mousedown', this.outside);
				doc.defaultView.removeEventListener('resize', this.resize);
				doc.defaultView.removeEventListener('scroll', this.resize, true);
				if (this.parentWindow) this.parentWindow.removeEventListener('resize', this.resize);
				doc.defaultView.removeEventListener('blur', this.stopDrag);
				this.editor.focusManager.remove(new CKEDITOR.dom.element(this.panel));
				this.panel.remove();
			}
		}
	};

	CKEDITOR.plugins.add('wjstylescombo', {
		requires: 'button,undo,format',
		lang: 'en,sk,cs',
		onLoad: function() { CKEDITOR.document.appendStyleSheet(this.path + 'styles.css'); },
		init: function(editor) {
			var picker = new Picker(editor, this.path);
			// Register semantic formats before initial data filtering, even without the native Format toolbar item.
			picker.formats();
			editor.wjstylescombo = picker;
			editor.addCommand('wjstylescombo', { canUndo: false, editorFocus: false, modes: { wysiwyg: 1 }, exec: function() {
				if (picker.panel && !picker.panel.hidden) picker.close(true); else picker.open();
			} });
			editor.ui.addButton('WJStyles', { label: editor.lang.wjstylescombo.label, command: 'wjstylescombo', hasArrow: true, toolbar: 'styles,20' });
			editor.on('beforeCommandExec', function(event) {
				// Legacy floating tools schedule commands that move focus back into the document.
				if (picker.panel && !picker.panel.hidden && /FloatingTools$/.test(event.data.name)) return false;
			}, null, null, 1);
			editor.on('stylesSet', function(event) { picker.setStyles(event.data.styles || []); });
			editor.on('selectionChange', function() {
				if (picker.panel && !picker.panel.hidden && picker.panel.contains(picker.panel.ownerDocument.activeElement)) return;
				picker.capture();
			});
			editor.on('instanceReady', function() {
				editor.getStylesSet(function(styles) { picker.setStyles(styles || []); });
				var button = picker.button();
				if (!button) return;
				var tip = picker.summaryTip = button.ownerDocument.createElement('div');
				tip.className = 'wj-styles-summary'; tip.hidden = true; tip.setAttribute('aria-hidden', 'true');
				button.ownerDocument.body.appendChild(tip);
				button.addEventListener('focus', function() {
					if (picker.panel && !picker.panel.hidden) return;
					var rect = button.getBoundingClientRect();
					tip.textContent = button.title; tip.hidden = false; tip.style.zIndex = picker.layer() + 1;
					tip.style.left = Math.max(8, Math.min(rect.left, button.ownerDocument.defaultView.innerWidth - tip.offsetWidth - 8)) + 'px';
					tip.style.top = rect.bottom + 4 + 'px';
				});
				button.addEventListener('blur', function() { tip.hidden = true; });
			});
			editor.on('contentDom', function() {
				editor.editable().attachListener(editor.document, 'mousedown', function(event) {
					// Inline editors share their document with the toolbar and the picker.
					if (picker.root().contains(event.data.getTarget().$)) picker.close(false);
				});
			});
			editor.on('getSnapshot', function(event) {
				if (typeof event.data === 'string') event.data += '<!--wjstyles:' + picker.revision + '-->';
			}, null, null, 20);
			editor.on('loadSnapshot', function(event) {
				var match = /<!--wjstyles:(\d+)-->$/.exec(event.data);
				if (!match) return;
				event.data = event.data.slice(0, match.index);
				var revision = Number(match[1]);
				while (picker.revision !== revision) {
					var undo = picker.revision > revision;
					var changes = picker.external[undo ? --picker.revision : picker.revision++];
					(changes || []).forEach(function(change) {
						if (!change.element.isConnected) return;
						// Another inline editor may have changed the same ancestor since this action.
						var current = change.watched.filter(function(name) { return change.element.classList.contains(name); }).sort().join(' ');
						if (current !== (undo ? change.after : change.before).slice().sort().join(' ')) {
							editor.fire('wjstylescomboUndoConflict', { element: change.element });
							return;
						}
						(undo ? change.added : change.removed).forEach(function(name) { change.element.classList.remove(name); });
						(undo ? change.removed : change.added).forEach(function(name) { change.element.classList.add(name); });
					});
				}
				picker.close(false);
			}, null, null, 1);
			editor.on('beforeModeUnload', function() { picker.close(false); });
			editor.on('readOnly', function() { picker.close(false); });
			editor.on('destroy', function() { picker.destroy(); });
		}
	});
})();
