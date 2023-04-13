/*
* Tooltip Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.5.0
*/
CKEDITOR.dialog.add('tooltipDialog', function(editor) {

  return {
    title: editor.lang.webjettooltip.title,
    minWidth: 600,
    minHeight: 150,

    contents: [
      {
        //crée une tab avec des élèments
        id: 'tab-basic',
        label: editor.lang.webjettooltip.tab,
        elements: [
          {
            type: 'text',
            id: 'title',
            label: editor.lang.webjettooltip.txtTitle,
            validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.webjettooltip.txtErrorEmpty),
            setup: function(element) {
              this.setValue(element.getText());
            },
            commit: function(element) {
              element.setText(this.getValue());
            }

          }
            ,{
            type: 'html',
            html: '<label for="tooltip">'+editor.lang.webjettooltip.txtArea+'</label><br><input class="cke_dialog_ui_input_text" type="text" id="tooltip">',
            validate: function() {

              if ($("#tooltip").val().length < 1) {
                alert(editor.lang.webjettooltip.txtErrorEmpty);
                return false;
              };
            },
            //setup permet d'injecter une valeur par exemple au clique droit et edit
            setup: function(element) {
              this.setValue(element.getAttribute("title"));
            },
            commit: function(element) {

              element.setAttribute("title", "!REQUEST(wjtooltip:"+$( "#tooltip" ).val()+")!");
              element.setAttribute("data-cke-saved-title", "!REQUEST(wjtooltip:"+$( "#tooltip" ).val()+")!");


            },
            onShow: function(element) {

            }
            ,
            onHide: function() {

            }
          }
        ]
      }
    ],
    onShow: function() {
      //récupere la sélection et l'élèment
      var selection = editor.getSelection();
      var element = selection.getStartElement();

      var textSelected = selection.getSelectedText();

      //vérifie que l'élèment est bien un type em
      if (element)
        element = element.getAscendant(editor.config.tooltip_tag, true);

      if (!element || element.getName() != editor.config.tooltip_tag) {
        element = editor.document.createElement(editor.config.tooltip_tag);
        this.insertMode = true;
      } else
        this.insertMode = false;

      //injecte le contenu existant si c'est une édition
      this.element = element;
      if (!this.insertMode)
        this.setupContent(this.element);

      if (this.insertMode)
            this.setValueOf('tab-basic', 'title', textSelected);


        var tooltipTitle = $(element.$).attr("title");

        if(tooltipTitle!=undefined) {
             var tooltipKey = tooltipTitle.substring(tooltipTitle.indexOf(":") + 1, tooltipTitle.indexOf(")!"));
            $("#tooltip").val(tooltipKey);

            // $.get("/admin/skins/webjet8/ckeditor/plugins/webjettooltip/tooltip_get_title.jsp?tooltipId=" + tooltipId, function (data) {
            //     $("#tooltip").val(data);
            //     $("#tooltip").attr("data-tooltipId", tooltipId);
            // });
        }

        $( "#tooltip" ).autocomplete({
            source: "/admin/skins/webjet8/ckeditor/dist/plugins/webjettooltip/tooltip_autocomplete.jsp",
            minLength: 0,
            select:function (event, ui ) {
                $( "#tooltip" ).attr("data-tooltipId", ui.item.id);
            }

        });

      }
    ,
    onOk: function() {
      var dialog = this;
      var tooltip = this.element;
      tooltip.setAttribute('class', editor.config.tooltip_class);

      this.commitContent(tooltip);

      if (this.insertMode)
        editor.insertElement(tooltip);
      },
      onHide: function () {
          $("#tooltip").val("");
          $("#tooltip").attr("data-tooltipId", "");
      }

  };
});
