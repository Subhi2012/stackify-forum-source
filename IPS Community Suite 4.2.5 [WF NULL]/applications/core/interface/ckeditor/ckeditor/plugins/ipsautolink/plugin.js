﻿CKEDITOR.plugins.add("ipsautolink",{init:function(b){b.widgets.add("ipsembedded",{inline:!1,upcast:function(a){if("div"==a.name&&a.hasClass("ipsEmbeddedVideo")||"iframe"==a.name&&!_.isUndefined(a.attributes["data-embedcontent"]))return!0}});new CKEDITOR.plugins.ipsautolink(b)}});
CKEDITOR.plugins.ipsautolink=function(b){this.urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:localhost)|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i;this.handleKey=
function(a){13==a.data.keyCode?CKEDITOR.tools.setTimeout(function(){this._handleKey(a)},0,this):32==a.data.keyCode&&this._handleKey(a)};this._handleKey=function(a){var e=b.getSelection();if(null!==e)for(var e=e.getRanges(!0),d=0;d<e.length;d++)if(e[d].collapsed){var f=32==a.data.keyCode?e[d].getCommonAncestor(!0,!0):e[d].getCommonAncestor(!0,!0).getPrevious();f&&f instanceof CKEDITOR.dom.element&&this.replaceInElement(f)}};b.on("key",this.handleKey,this);this.handlePaste=function(a){if(a.data.dataTransfer.getTransferType(b)!=
CKEDITOR.DATA_TRANSFER_INTERNAL){var e=a.data.dataValue;if(-1<e.indexOf("\x3c")){if(e=e.match(/<a href="(.+?)">(\1)<\/a>/))a.data.dataValue="\x3ca href\x3d'"+e[1]+"' ipsNoEmbed\x3d'false'\x3e"+decodeURI(e[1])+"\x3c/a\x3e"}else{for(var d=b.getSelection().getRanges(!0),f=0;f<d.length;f++)if(d[f].startOffset){var c=d[f].getPreviousEditableNode();if(c&&(c=c.getText(),"[url\x3d"==c.substr(-5)||"[img]"==c.substr(-5)||"[img\x3d"==c.substr(-5)||"[code]"==c.substr(-6)))return}if(e=this.replaceTextWithLink(e))a.data.dataValue=
e.getOuterHtml()}}};b.on("paste",this.handlePaste,this,{},11);this.handleAfterPaste=function(a){a=b.editable().find('a[ipsNoEmbed\x3d"false"]');for(var e=0;e<a.count();e++)this.replaceLinkWithEmbed(a.getItem(e))};b.on("afterPaste",this.handleAfterPaste,this);b.on("contentDom",function(){var a=this,e=b.editable();$("."+b.id).closest("form").on("submit",function(){for(var d=e.getChildren(),f=0;f<d.count();f++)d.getItem(f)&&d.getItem(f)instanceof CKEDITOR.dom.element&&a.replaceInElement(d.getItem(f));
b.updateElement()})},this);this.replaceInElement=function(a){if("a"!=a.getName()&&"pre"!=a.getName()&&!a.getAttribute("ipsnoautolink")){a=a.getChildren();for(var b=0;b<a.count();b++){var d=a.getItem(b);if(d instanceof CKEDITOR.dom.text){var f=[],c="",q=!1,g=d.getText().split(" ");for(word in g){if("[url\x3d"==g[word]||"[img]"==g[word]||"[code]"==g[word])return;var m=this.replaceWord(g[word].trim());m?("a"==m.getName()&&this.replaceLinkWithEmbed(m),c.length&&(f.push(new CKEDITOR.dom.text(c)),c=""),
f.push(m),q=!0):c+=g[word];word<g.length-1&&(c+=" ")}c.length&&f.push(new CKEDITOR.dom.text(c));if(1<f.length||q){for(c=0;c<f.length;c++)f[c].insertBefore(d);d.remove()}}else d&&d instanceof CKEDITOR.dom.element&&this.replaceInElement(d)}}};this.replaceWord=function(a){var b=this.replaceTextWithLink(a);return b?b:(a=this.replaceTextWithEmoticon(a))?a:null};this.replaceTextWithLink=function(a){if(XRegExp.exec(a,this.urlRegex)){var b=new CKEDITOR.dom.element("a");b.setAttribute("ipsNoEmbed","false");
b.setAttribute("href",$("\x3ctextarea /\x3e").html(a).text());b.appendHtml(decodeURI(a));return b}return null};this.replaceTextWithEmoticon=function(a){for(key in b.config.ipsEmoticons){var e=new RegExp("^"+key.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")+"$","i");if(a.match(e)){if(75>$("\x3cdiv\x3e"+b.getData()+"\x3c/div\x3e").find("img[data-emoticon]").length)return a=new CKEDITOR.dom.element("img"),a.setAttribute("src",b.config.ipsEmoticons[key].image),b.config.ipsEmoticons[key].image_2x&&a.setAttribute("srcset",
b.config.ipsEmoticons[key].image_2x),b.config.ipsEmoticons[key].width&&b.config.ipsEmoticons[key].height&&(a.setAttribute("width",b.config.ipsEmoticons[key].width),a.setAttribute("height",b.config.ipsEmoticons[key].height)),a.setAttribute("data-emoticon","true"),a.setAttribute("alt",key),a.setAttribute("title",key),a;var d=$("."+b.id).closest("[data-ipsEditor]").find('[data-role\x3d"emoticonMessage"]');d.slideDown();setTimeout(function(){b.once("key",function(){d.slideUp()});b.once("setData",function(){d.slideUp()})},
2500)}}return null};this.replaceLinkWithEmbed=function(a){if(b.config.ipsAutoEmbed&&"true"!=a.getAttribute("ipsNoEmbed")){var e=this,d=new Image;d.onerror=function(){e._replaceLinkWithEmbed(a,!1)};d.onload=function(){e._replaceLinkWithEmbed(a,!0,d.width,d.height)};d.src=a.getAttribute("href")}};this._replaceLinkWithEmbed=function(a,e,d,f){d=d||0;f=f||0;ips.getAjax()(b.config.controller+"\x26do\x3dvalidateLink",{data:{url:a.getAttribute("href").replace(/&amp;/g,"\x26"),image:e,width:d,height:f},type:"post"}).done(function(c){if(c.embed){var d,
e,f,k=CKEDITOR.dom.element.createFromHtml(c.preview);if("img"==k.getName())k.replace(a);else{c=a.getParents();for(i in c.reverse())if("p"==c[i].getName()){a.breakParent(c[i]);(c=a.getPrevious())&&0==c.getChildCount()?c.remove():e=c;if((c=a.getNext())&&(c.getChildCount(0)||c.getChildCount(1)&&c.getChild(0).is("br"))){var l=c.getNext();l&&(c.getChildCount(0)||c.getChildCount(1)&&c.getChild(0).is("br"))&&(c.remove(),c=l)}f=c;l=b.createRange();l.moveToElementEditEnd(c);b.getSelection().selectRanges([l]);
break}k.replace(a);d=b.widgets.initOn(k,"ipsembedded");$(document).trigger("contentChange",[$("."+b.id).closest("[data-ipsEditor]")])}var h=$("."+b.id).closest("[data-ipsEditor]").find('[data-role\x3d"embedMessage"]');h.slideDown();var n=function(){h.slideUp();h.find('[data-action\x3d"keepEmbeddedMedia"]').off("click.ipsEmbed");h.find('[data-action\x3d"removeEmbeddedMedia"]').off("click.ipsEmbed")};setTimeout(function(){b.once("key",function(){n()});b.once("setData",function(){n()})},2500);h.find('[data-action\x3d"keepEmbeddedMedia"]').on("click.ipsEmbed",
function(){b.focus();n()});h.find('[data-action\x3d"removeEmbeddedMedia"]').on("click.ipsEmbed",function(){d&&d.destroy();a.replace(k);a.setAttribute("ipsNoEmbed","true");if(f&&e)a.move(f,!0),f.moveChildren(e);else if(f){var c=new CKEDITOR.dom.element("p");c.insertBefore(a);a.move(c)}b.focus();n()})}else if(a.setAttribute("ipsNoEmbed","true"),c.errorMessage){var p=$("."+b.id).closest("[data-ipsEditor]").find('[data-role\x3d"embedFailMessage"]');p.find("p").html(c.errorMessage);p.slideDown();setTimeout(function(){b.once("key",
function(){p.slideUp()});b.once("setData",function(){p.slideUp()})},2500)}}).fail(function(c){a.setAttribute("ipsNoEmbed","true");var d=$("."+b.id).closest("[data-ipsEditor]").find('[data-role\x3d"embedFailMessage"]');d.find("p").html(ips.getString("embed_error_message_admin",{error:c.statusText+": "+c.responseText}));d.slideDown();setTimeout(function(){b.once("key",function(){d.slideUp()});b.once("setData",function(){d.slideUp()})},2500)})}};