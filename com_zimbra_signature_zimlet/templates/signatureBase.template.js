AjxTemplate.register("com_zimbra_signature_zimlet.templates.signatureBase#Main", 
function(name, params, data, buffer) {
	var _hasBuffer = Boolean(buffer);
	data = (typeof data == "string" ? { id: data } : data) || {};
	buffer = buffer || [];
	var _i = buffer.length;

	buffer[_i++] = "<div><b><font color=\"#06447c\" face=\"Verdana\" size=\"2\">";
	buffer[_i++] = data.name;
	buffer[_i++] = "</font></b><p style=\"margin:3px\"><span style=\"color:rgb(128,128,128);font-size:10pt\"><strong><span style=\"font-family:Verdana,sans-serif\">";
	buffer[_i++] = data.occupation;
	buffer[_i++] = "</span></strong></span></p><p style=\"margin:3px;color:rgb(128,128,128);font-size:10pt\">";
	buffer[_i++] = data.other;
	buffer[_i++] = "</p><div><img src=\"";
	buffer[_i++] =  data.image ;
	buffer[_i++] = "\" alt=\"\"></div></div>";

	return _hasBuffer ? buffer.length : buffer.join("");
},
{
	"id": "Main"
}, true);
AjxPackage.define("com_zimbra_signature_zimlet.templates.signatureBase");
AjxTemplate.register("com_zimbra_signature_zimlet.templates.signatureBase", AjxTemplate.getTemplate("com_zimbra_signature_zimlet.templates.signatureBase#Main"), AjxTemplate.getParams("com_zimbra_signature_zimlet.templates.signatureBase#Main"));

