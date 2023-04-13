/*
	This file is a part of simplebuttion project.
	Copyright (C) Thanh D. Dang <thanhdd.it@gmail.com>
	simplebuttion is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	simplebuttion is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.
	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

CKEDITOR.dialog.add( 'wjbuttonDialog', function( editor ) {

	var colorDialog = editor.plugins.colordialog;

	return {
		title: editor.lang.webjetcomponents.wjbutton.title,
		minWidth: 450,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				elements: [
					{
						type: 'text',
						id: 'button-text',
						label: editor.lang.webjetcomponents.wjbutton.text,
						validate: CKEDITOR.dialog.validate.notEmpty( "Text field cannot be empty." ),
						setup: function( element ) {
							this.setValue( element.getHtml() );
						},
						commit: function( element ) {
							element.setHtml( this.getValue() );
						}
					},
					{
						type: 'hbox',
						padding: 0,
						widths: [ '95%', '5%' ],
						children: [
						{
							type: 'text',
							id: 'url',
							label: editor.lang.webjetcomponents.wjbutton.url,
							setup: function( element ) {
								this.setValue( element.getAttribute( "href" ) );
							},
							commit: function( element ) {
								var href = this.getValue();
								element.setAttribute( "href", href );
								element.removeAttribute('data-cke-saved-href');

								if (href.indexOf("http")==0 || href.indexOf("www.")==0){
									element.setAttribute('rel',"nofollow noopener noreferrer");
								}else {
									if ("nofollow noopener noreferrer"==element.getAttribute('rel')) element.removeAttribute('rel');
								}
							}
						},
						{
							type: 'html',
							html: '&nbsp;<br/><i style="margin-top:6px; margin-left: 8px;" onclick="openLinkDialogWindow(\'ckEditorDialog\', \'tab-basic:url\');" class="wj-action-icon"><img src="/admin/skins/webjet8/ckeditor/dist/plugins/webjetcomponents/icons/link.png" style="margin-top:5px;"/></i>'
						}]
					},
					{
						type: 'select',
						id: 'target',
						label: editor.lang.webjetcomponents.wjbutton.target,
						style: 'width:100%',
						// accessKey: 'E',
						'default': '',
						setup: function( element ) {
							var v = element.getAttribute('target');
							if(v == undefined || v == null || v == ""){
								var href = element.getAttribute('href');
								if (href.indexOf("http")==0 || href.indexOf("www.")==0 || href.indexOf("/files/")==0){
									v = "_blank";
								}
							}

							this.setValue( v );
						},
						commit: function( element ) {
							var v = this.getValue();

							if(v == ''){
								var dialog = this.getDialog();
								var href = dialog.getContentElement('tab-basic', 'url').getValue();
								if (href.indexOf("http")==0 || href.indexOf("www.")==0 || href.indexOf("/files/")==0){
									element.setAttribute('target', "_blank");
								} else {
									element.removeAttribute('target');
								}
							}
							else {
								element.setAttribute('target',v);
							}
						},
						items: [
							[ '' ],
							[ '_self' ],
							[ '_blank' ]
						]
					},
					{
						type: 'hbox',
						padding: 0,
						widths: [ '48%', '4%', '48%' ],
						children: [
							{
								type: 'text',
								id: 'font-size',
								label: editor.lang.webjetcomponents.wjbutton.fontSize,
								setup: function( element ) {
									var suffix= '';
									if(element.getStyle('font-size').split('px')[0]!="") suffix='px';
									this.setValue( element.getStyle('font-size').split('px')[0] + suffix);
								},
								commit: function( element )
								{
									if (this.getValue() != "")
									{
										var suffix= '';
										if(this.getValue().indexOf('px')<0) suffix = 'px';
										element.setStyle( 'font-size', this.getValue().replace(/\ /g,'') + suffix);
									}
									else
									{
										element.removeStyle( 'font-size' );
									}
								}
							},
							{
								type: 'html',
								html: '&nbsp;'
							},
							{
								type: 'text',
								id: 'border-radius',
								label: editor.lang.webjetcomponents.wjbutton.borderRadius,
								setup: function( element ) {
										var suffix= '';
										if(element.getStyle('border-radius').split('px')[0]!="") suffix='px';
									this.setValue( element.getStyle('border-radius').split('px')[0] + suffix);
								},
								commit: function( element )
								{
									if (this.getValue() != "")
									{
										var suffix= '';
										if(this.getValue().indexOf('px')<0) suffix = 'px';
										element.setStyle( 'border-radius', this.getValue().replace(/\ /g,'') + suffix);
									}
									else
									{
										element.removeStyle( 'border-radius' );
									}
								}
							}]
					},
					{
						type: 'hbox',
						padding: 0,
						widths: [ '48%', '4%', '48%' ],
						children: [
						{
							type: 'hbox',
							padding: 0,
							widths: [ '70%', '30%' ],
							children: [ {
								type: 'text',
								id: 'bgColor',
								label: editor.lang.webjetcomponents.wjbutton.bgColor,
								'default': '',
								setup: function( element ) {
									this.setValue( element.getStyle('background-color') );
								},
								commit: function( element ) {
									var value = this.getValue();

									if ( value )
										element.setStyle( 'background-color', this.getValue() );
									else
										element.removeStyle( 'background-color' );
								}
							},
							{
								type: 'button',
								id: 'bgColorChoose',
								'class': 'colorChooser',
								label: editor.lang.webjetcomponents.wjbutton.choose,
								onLoad: function() {
									this.getElement().getParent().setStyle( 'vertical-align', 'bottom' );
								},
								onClick: function() {
									editor.getColorFromDialog( function( color ) {
										if ( color )
											this.getDialog().getContentElement( 'tab-basic', 'bgColor' ).setValue( color );
										this.focus();
									}, this );
								}
							} ]
						},
						{
							type: 'html',
							html: '&nbsp;'
						},
						{
							type: 'hbox',
							padding: 0,
							widths: [ '70%', '30%' ],
							children: [ {
								type: 'text',
								id: 'fgColor',
								label: editor.lang.webjetcomponents.wjbutton.textColor,
								'default': '',
								setup: function( element ) {
									this.setValue( element.getStyle('color') );
								},
								commit: function( element ) {
									var value = this.getValue();

									if ( value )
										element.setStyle( 'color', this.getValue() );
									else
										element.removeStyle( 'color' );
								}
							},
							{
								type: 'button',
								id: 'fgColorChoose',
								'class': 'colorChooser',
								label: editor.lang.webjetcomponents.wjbutton.choose,
								onLoad: function() {
									this.getElement().getParent().setStyle( 'vertical-align', 'bottom' );
								},
								onClick: function() {
									editor.getColorFromDialog( function( color ) {
										if ( color )
											this.getDialog().getContentElement( 'tab-basic', 'fgColor' ).setValue( color );
										this.focus();
									}, this );
								}
							}]
						}]
					}
				]
			}
		],

		onShow: function() {

			var selection = editor.getSelection();
			var element = selection.getStartElement();

			if (typeof ckEditorInstance.lastWjButton != "undefined" && ckEditorInstance.lastWjButton != null)
			{
				element = new CKEDITOR.dom.element(ckEditorInstance.lastWjButton);
                ckEditorInstance.lastWjButton = null;
			}

			if ( !element ) {
				element = editor.document.createElement( 'a' );
				element.setAttribute('class', 'wj-button');
				var style_button = 'display:inline-block;background-color:#27AE61;border:1px solid #27AE61;color:#fff !important;padding:5px 10px;border-radius:5px;font-size:14px;text-decoration: none !important; cursor: pointer;';
				element.setAttribute( "style", style_button );
				element.setText( 'Text' );
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			this.element = element;

			this.setupContent( this.element );
		},

		onOk: function() {
			var dialog = this;
			var simple_btn = this.element;
			this.commitContent( simple_btn );

			if ( this.insertMode )
				editor.insertElement( simple_btn );
		}
	};
});