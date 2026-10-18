# WebJET style picker

`WJStyles` is an optional toolbar item provided by `wjstylescombo`. It uses a 480 px searchable panel and keeps CSS appearance separate from the semantic paragraph formats at the beginning of the list. The native `Format` toolbar combo remains available. `stylescombo` and its `Styles` toolbar item remain available and unchanged.

The plugin reads the normal `stylesSet` / `stylesSet` event. CSS definitions may additionally carry `wj` metadata:

```javascript
{
    name: 'Warning',
    element: 'div',
    attributes: { 'class': 'alert warning' },
    wj: {
        tag: 'div',
        category: 'Alerts',
        categoryIcon: 'ti-alert-circle',
        group: 'Tone',
        base: 'alert',
        requires: 'alert',
        members: 'info success error'
    }
}
```

- `category` organizes the menu and participates in search. It does not imply exclusion.
- `categoryIcon` optionally sets a Tabler icon using its full `ti-*` class, for example `ti-border-none`. WebJET reads it from `/* editor category-icon: ti-border-none */` inside a CSS rule. The first explicit icon for each category in CSS catalog order wins; later declarations for that category are ignored. This choice is made before filtering, so searching or changing the target does not change the icon. If the category has no valid icon declaration, it retains automatic selection from its name. Only a single `ti-*` class is accepted.
- `group` identifies mutually exclusive choices **on the same target**. Use readable group names. Group names must be unique across unrelated properties.
- `targets` is an optional whitespace/comma separated list of HTML tags. It narrows `tag`; with `tag: '*'`, one definition can target several heading levels.
- `base` lists structural classes that are preserved on toggle and reset. They are also required on the target unless `requires` is supplied.
- `requires` lists classes required on the target, independently of the preserved base classes.
- `members` lists additional literal class names to clear in this group (e.g. a variant supplied only by a block). Wildcard patterns are not expanded.
- Class bundles without a group remain independent presets. Changing a constituent property can make a preset partially match; only fully matching presets appear active.

Styles are applied to the selected element(s), without converting their HTML tag. Inline span styles are available when text is selected or the caret is inside an existing span. A text selection can be split/wrapped in spans; a caret changes the enclosing span. A plain caret outside a span does not offer inline styles or set a style for subsequent typing; “All styles” shows these unavailable choices disabled. Unknown classes and unrelated attributes survive. A mixed choice applies to all eligible targets; clicking an active choice removes it. The chips always remove a choice, including a mixed one. “Remove” next to a group name clears that group. “Reset component appearance” removes known variants and preserves all declared base classes.

The separate “Paragraph format” section uses `config.format_tags` and the native `format_<tag>` definitions (WebJET configures paragraph and headings 1–6). It converts selected blocks through CKEditor’s native style engine, preserves unrelated classes and markup, and makes one undoable change while the panel remains open. The current format is selected; selections spanning different formats show mixed states. Clicking an active format does not remove it. Formats respect active content filters and are unavailable for a span target, unrelated ancestors, selected objects and blockless editors. An explicitly selected paragraph or heading containing the caret can change format; the converted parent remains the active target. Native paragraph formatting works on blocks inside an editable container. When a Page Builder template makes a heading or paragraph itself the inline editor root, its element type is fixed by the template; the section is hidden. The section is shown only when at least one matching format can be applied, including with “All styles” enabled.

With a caret inside a span, the current target is “Text”: the list, active chips and toolbar summary describe that span only. Its paragraph or heading remains available in the target path, even when no tag-specific CSS style exists for that block. Selecting the parent exposes its own styles and paragraph formats; switching back restores the span target. Text selections retain partial wrapping behavior.

The target path makes ancestor changes explicit. Clickable labels run from the outermost available ancestor to the current selection, separated by chevrons. Labels omit HTML tags; the active target has a light background, bold text and `aria-pressed`; hover titles identify every target as `tag#id.class1.class2`, including all its current CSS classes and its ID when present. For a selection spanning multiple elements, each element appears on its own line. The title updates after style changes. When Bootstrap is available in the panel window or its same-origin parent administration, these descriptions use Bootstrap tooltips on hover and keyboard focus, with the administration delay of 300 ms. Tooltip nodes stay in the panel document and use a scoped administration appearance in Page Builder, whose client CSS does not include Bootstrap. Instances are disposed before navigation is rebuilt and when the panel closes; standalone hosts without Bootstrap retain native titles. Selecting an ancestor shows its active styles as chips, so no separate ancestor navigation row is needed. By default the picker stays inside the editable root. Page Builder supplies:

```javascript
editor.config.wjstylescombo_scope = function(editor) {
    return document.getElementById('wjInline-docdata');
};
```

This callback is a trusted integration boundary, not CSS metadata. It must return the content container containing the editable root. Changes to the inline root or its ancestors are recorded as class deltas alongside the editor's undo snapshots. Snapshot metadata is never returned by `getData()`. If another inline editor subsequently changes the same group, undo preserves that later change and fires `wjstylescomboUndoConflict` instead of introducing conflicting classes. Undo history otherwise belongs to each CKEditor instance, as with normal inline editing.

Structure labels and colored squares use `config.wjstylescombo_structure`, an object with `section`, `container`, `row` and `column` CSS selectors. Matching precedence is column, row, container, section, as in the Page Builder toolbar. Recognized structural ancestors remain available even without a tag-specific style. Other elements keep their localized short names without a square. Without this configuration, ordinary element labels and ancestor filtering remain available.

WebJET supplies `pageBuilderGridSectionSelector`, `pageBuilderGridContainerSelector`, `pageBuilderGridRowSelector` and `pageBuilderGridColumnSelector` from Constants through CKEditor’s `config.jsp` in every editor mode. Ninja Page Builder uses the same values as its defaults. Configure these variables for custom grids; the picker does not read Page Builder instances, `pbCustomSettings` or legacy `pageBuilderGrid` overrides. Those Page Builder customizations must stay consistent with the shared selector configuration. Missing or incorrect CMS values are a setup error; the plugin does not infer replacement selectors.

The panel follows the Page Builder style dialog and uses WebJET's Tabler icon font. Accordion headers start with the disclosure arrow and an illustrative icon chosen from common Slovak, Czech and English category terminology; other category names use the adjustments icon. Category accordions start expanded and remember collapsed categories for the editor instance. A compact row below search provides an expand/collapse-all action for the displayed categories and the “All styles” checkbox. The action expands all if any category is collapsed; otherwise it collapses all. Search reveals matching choices and keeps separate accordion state until the query changes, so clearing search restores the unfiltered view. Arrow/Home/End navigation skips collapsed content. Exclusive groups use circular indicators, while independent presets use square indicators. Rows retain toggle-button semantics because active choices can be removed and a selection spanning multiple elements can be mixed.

The panel supports native Tab navigation, arrow/Home/End navigation between choices and Escape to return to the toolbar. Search ignores accents and case. Label HTML is converted to text; previews never render title HTML in the administration UI. Search focus highlights its own border without an outer outline.

The grip in the title bar moves the panel within its document's viewport. It supports pointer dragging and arrow keys (10 px, or 1 px with Shift). The position survives applying styles, searching and scrolling during the current opening, and stays inside the viewport on resize. Closing the panel discards this position; reopening anchors it to the Styles toolbar button again and scrolls the list to the top. Applying styles during the same opening preserves the list scroll position.

Previews measure a temporary candidate in the selected element's CSS context, preserving unrelated classes and applying the candidate's base and required classes. They copy computed text color, background color/image, font family/size/weight/style, letter spacing, text transformation/decoration, borders and corner radius. Readable content stylesheets also supply their font-face declarations when the toolbar lives in another document. Transparent backgrounds retain the surrounding content colors. Large text is scaled only to fit the preview frame; typography rows show the measured font size in pixels. Spacing choices use a directional gap diagram and the measured margin or padding in pixels. These previews require no additional CSS metadata and are recalculated when the list renders. They are compact examples of appearance, not full component layouts.

The plugin respects custom ACF rules and read-only/source mode. Each instance owns its selection, panel and handlers; only one panel is open per document. Toolbar buttons can be placed in a shared space.

Build from the WebJET `admin/skins/webjet8/ckeditor` directory with `./build.sh`. The distribution includes both plugins. Integration and regression tests are in WebJET's `tests/webpages/editor-styles.js` and `CssParserTest`.
