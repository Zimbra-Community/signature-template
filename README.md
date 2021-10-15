# Configurable Signature Template
 
We found that a SysAdmin can deploy email signatures via zmprov, but when the user wants to edit the signature (with the company logo) it often breaks.
 
This Zimlet allows the SysAdmin to provision a template for the signature for the users in a company. In a template a number of fields are defined, for example name, function and comments. When the user clicks the Zimlet that fields can be filled and the new signature is generated (with preview). The image and lay-out then always work.

- Modify the template in templates folder for your company
- Zip the contents of com_zimbra_signature_zimlet folder (do not include the folder)
- Deploy on your server

![screenshot1](https://raw.githubusercontent.com/Zimbra-Community/signature-template/master/images/screen1.png)
![screenshot2](https://raw.githubusercontent.com/Zimbra-Community/signature-template/master/images/screen2.png)

========================================================================

### License

Copyright (C) 2017-2021  Barry de Graaff [Zeta Alliance](http://www.zetalliance.org/)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
