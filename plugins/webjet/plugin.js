(function()
{
	var wjImageIframe = null;

	CKEDITOR.plugins.add('webjet',
	{
		requires : [ 'iframedialog' ],

		init : function(editor)
		{
			var me = this;

			CKEDITOR.dialog.addIframe(
				'wjimageDialog',
				'Insert Image',
				me.path	+ 'wj_image.jsp',
				580,
				445, function()
				{
					// Iframe loaded callback.
					wjImageIframe = document.getElementById(this._.frameId);
					ckeditorFixIframeDialog(this.getElement().$);
				},
				{
					onOk : function()
					{
						// Notify your iframe scripts here...
						window.alert("OkClick, wjImageIframe=" + wjImageIframe);
						wjImageIframe.OkClick();
					}
				}
			);

			editor.addCommand('wjimage', new CKEDITOR.dialogCommand('wjimageDialog'));

			editor.ui.addButton('wjimage',
			{
				label : 'Insert Image or Movie',
				command : 'wjimage',
				icon : this.path + 'images/icon_wjimage.png'
			});

		}
	});

})();