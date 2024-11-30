FontAwesome for CMSimple_XH's CKEditor
======================================

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Add font-awesome to your write-ups without editing the source code!

Copyright (c) 2014-2015 Michael Janea <https://www.michaeljanea.com/>  
Copyright (c) 2017 Christoph M. Becker <http://3-magi.net/>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but *without any warranty*; without even the implied warranty of
*merchantability* or *fitness for a particular purpose*.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program (see LICENSE).

Installation
------------

* Download the following dependencies and unpack them to plugins/ckeditor/plugins_external/:

  * http://ckeditor.com/addon/widget
  * http://ckeditor.com/addon/lineutils
  * http://ckeditor.com/addon/widgetselection

* Download this repo into plugins/ckeditor/plugins_external/fontawesome

* Check that you have the following directories inside of plugins/ckeditor/plugins_external/:

  * fontawesome/
  * lineutils/
  * widget/
  * widgetselection/

* Edit plugins/ckeditor/init.php and find the following lines:
````
    $hjs .='
        <script language="javascript" type="text/javascript" src="' . $pth['folder']['plugins'] . 'ckeditor/' . 'ckeditor/ckeditor.js"></script>
        ';
````

* Insert the following line directly after that:
````
    $hjs .= '<script type="text/javascript">CKEDITOR.dtd.$removeEmpty[\'span\'] = false;</script>';
````

Usage
-----

After successful installation you will find a new button ("Insert Font Awesome")
in the editor toolbar. The button works analogous to the "Image" button, for
example.
