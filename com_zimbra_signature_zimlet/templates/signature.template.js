AjxTemplate.register("com_zimbra_signature_zimlet.templates.signature#Main", 
function(name, params, data, buffer) {
	var _hasBuffer = Boolean(buffer);
	data = (typeof data == "string" ? { id: data } : data) || {};
	buffer = buffer || [];
	var _i = buffer.length;

	buffer[_i++] = "<table cellpadding=\"2\" cellspacing=\"0\" border=\"0\" width=\"100%\"><tr><td><b>Nome:</b></td><td><input type=\"text\" name=\"signature_name_prop\" /></td></tr><tr><td><b>Cargo:</b></td><td><input type=\"text\" name=\"signature_occupation_prop\" /></td></tr><tr><td><b>Outros:</b></td><td><textarea name=\"signature_other_prop\"></textarea></td></tr></table><br><p>Pre-Visualização</p><div id=\"signature-preview\"></div>";

	return _hasBuffer ? buffer.length : buffer.join("");
},
{
	"id": "Main"
}, true);
AjxPackage.define("com_zimbra_signature_zimlet.templates.signature");
AjxTemplate.register("com_zimbra_signature_zimlet.templates.signature", AjxTemplate.getTemplate("com_zimbra_signature_zimlet.templates.signature#Main"), AjxTemplate.getParams("com_zimbra_signature_zimlet.templates.signature#Main"));

