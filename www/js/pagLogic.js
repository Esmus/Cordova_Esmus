/*
 * $Id: functions.js Oct 9, 2015 9:47:15 AM tta1516$
 * 
 * Copyright (C) 2015 Maider Huarte Arrayago
 * 
 * This file is part of TTA1516_LS-EX_08v5_www.zip.
 * 
 * TTA1516_LS-EX_08v5_www.zip is based on templates by Eclipse.org - Thym and it is intended
 * for learning purposes only.
 * 
 * TTA1516_LS-EX_08v5_www.zip is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * TTA1516_LS-EX_08v5_www.zip is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details
 * <http://www.gnu.org/licenses/>.
 */


function pagPrin()
{
	//alert("pagPrin:"+contenido);
	//alert("Cargando logo..");
	$("#image-0").attr("src","img/my_logo.png");
	fitImg();
	//alert("Cargando frase inic inicial..");
	$("#fraseInit").text("Hola, has venido a "+login.Pais+" a estudiar, ¿quieres que te ayude a comunicarte en ...?");
	$("#nomUser-0").text(login.Nombre+" "+login.Apellido);
	var panel=$("#temasPanel");
	var contentPanel='';
	contentPanel=contentPanel+'<br><li><a href="#page-3" class="ui-btn ui-btn-inline ui-shadow  ui-btn-a ui-icon-arrow-r ui-btn-icon-right" data-transition="slide" onclick="ultimasConsultasF()">Ultimas consultas</a></li>';
	contentPanel=contentPanel+'<br><li><a href="#extLink" class="ui-btn ui-btn-inline ui-shadow  ui-btn-a ui-icon-arrow-r ui-btn-icon-right" data-transition="slide" onclick="externalLinks(0)">WorldReference<img class="imgLogo" alt="" src="img/iconoWR.jpg" width="30px" height="30px"/></a></li>';
	contentPanel=contentPanel+'<br><li><a href="#ajustesPage" class="ui-btn ui-btn-inline ui-shadow  ui-btn-a ui-icon-arrow-r ui-btn-icon-right" data-transition="slide" >Ajustes</a></li>';

	panel.append(contentPanel);
	//alert("cargando contenido pagina...")
	var temasPag=$("#temasPag");
	var contentPag='';
	//alert("antes del for");
	for(i=0;i<contenido.length;i++)
	{
		//alert("dentro del for:"+i);
	contentPag=contentPag+'<li><a href="#page2" class="ui-btn ui-btn-inline ui-shadow" data-transition="slide" onclick="cargaRegistros('+i+')">'+contenido[i].prep+" "+contenido[i].nombre.toLowerCase()+'<img class="imgLogo" alt="" src="img/logotemas-'+i+'.jpg" width="70px" height="70px"/></a></li>';
	}
	//alert("pagina cargada");
	temasPag.append(contentPag);
	//alert("fuera del for:"+i);
	$("#datosP").show();
	$("#page-1").load();

}
function cargaRegistros(tema)
{

	$("#nomUser-1").text(login.Nombre+" "+login.Apellido);
	var selectorCDiv1=$("#contentPag1");
	selectorCDiv1.empty();
	var contentDiv='<h3>'+"Hola, has venido a "+login.Pais+" a estudiar, ¿quieres que te ayude a comunicarte "+contenido[tema].prep+" "+contenido[tema].nombre.toLowerCase()+"?"+'</h2>';
	for(i=0;i<contenido[tema].subtemas.length;i++)
	{
		contentDiv=contentDiv+'<a href="#page-3" class="ui-btn" onclick="cargaFrases('+tema+","+i+')">'+contenido[tema].subtemas[i].prep+" "+contenido[tema].subtemas[i].nombre.toLowerCase()+'</a>';
	}	
	selectorCDiv1.append(contentDiv);
	selectorCDiv1.show();
}


function cargaFrases(tema,registro)
{
	
	var selectorCDiv2=$("#content-P3");
	$("#prev-P3").show();
	selectorCDiv2.empty();
	$("#nomUser-2").text(login.Nombre+" "+login.Apellido);
	var contentDiv='<h2>'+contenido[tema].subtemas[registro].prep+" "+contenido[tema].subtemas[registro].nombre.toLowerCase()+'</h2>';
		for(i=0;i<contenido[tema].subtemas[registro].frases.length;i++){
			contentDiv=contentDiv+'<a href="#page-4" class="ui-btn ui-btn ui-corner-all ui-shadow ui-icon-arrow-r ui-btn-icon-right" onclick="cargaPagFrase('+tema+","+registro+","+i+')">'+contenido[tema].subtemas[registro].frases[i].fr+'</a>'
		}
		
	selectorCDiv2.append(contentDiv);
	
}

function cargaPagFrase(tema,registro,frase)
{
	contexto.temaI=tema;
	contexto.registroI=registro;
	contexto.fraseI=frase;
	//alert(contexto.temaI+""+contexto.registroI+""+contexto.fraseI);
	if(ultimasConsultas.length<=10)
		{
		ultimasConsultas.push({temaC:tema,subtemaC:registro,fraseC:frase});
		
		//alert(ultimasConsultas.length);
		//alert(ultimasConsultas[ultimasConsultas.length-1].temaC+" "+ultimasConsultas[ultimasConsultas.length-1].subtemaC+" "+ultimasConsultas[ultimasConsultas.length-1].fraseC);
		}
	else{
		//alert(ultimasConsultas.length);
		ultimasConsultas.shift();
		//alert(ultimasConsultas.length);
		ultimasConsultas.push({temaC:tema,subtemaC:registro,fraseC:frase});
		//alert(ultimasConsultas.length);
		}
	$("#nomUser-3").text(login.Nombre+" "+login.Apellido);
	var selectorCDiv3=$("#content-P4");
	selectorCDiv3.empty();
	var contentDiv='<h2>'+"Practicar"+'</h2>';
	contentDiv=contentDiv+'<p>Frase:'+contenido[tema].subtemas[registro].frases[frase].fr+'</p><p>Traduccion:'+contenido[tema].subtemas[registro].frases[frase].tr+'</p>';	
	contentDiv=contentDiv+'<div><h3>Original:</h3><audio id="audio0" controls="controls"  preload="none" style="display:none"><source  id="audioSrc0" src=""/></audio></div>';
	contentDiv=contentDiv+'<h3 id="txtG">Grabacion:</h3>';
	if(contenido[tema].subtemas[registro].frases[frase].pathG==null)
		{
		//alert("pathG=null");
		contentDiv=contentDiv+'<audio id="audio1" controls="controls" style="display:none">'+
		'<source id="audioSrc1" src=""/>'+
		'</audio>';
		}
	else
		{
		//alert("pathG!=null");
		contentDiv=contentDiv+'<audio id="audio1" controls="controls" >'+
		'<source id="audioSrc1" src="'+contenido[tema].subtemas[registro].frases[frase].pathG+'"/>'+
		'</audio>';
		$("#audio1").trigger("load");
		$("#txtG").show();
		}
	
	contentDiv=contentDiv+'<a href="#" id="buttonStartR" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="startAudioRecord()">START RECORDING</a>'+
	'<a href="#" id="buttonStopR" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="stopAudioRecord('+tema+","+registro+","+frase+')">STOP RECORDING</a>'+
	'</div>';
	
	
	//codigo de grabacion y reproduccion
	selectorCDiv3.append(contentDiv);
	if(contenido[tema].subtemas[registro].frases[frase].path==null)
	{
	//alert("destino:"+appConstants.localPermanentStorageFolder+appConstants.original+tema+""+registro+""+frase+".aac");	
	fileUtilities.downloadFile(appConstants.audioURL()+""+tema+""+registro+""+frase+".aac",appConstants.localPermanentStorageFolder+appConstants.original,tema+""+registro+""+frase+".aac",0);
	}
	else
	{
	$("#audioSrc0").attr("src",contenido[contexto.temaI].subtemas[contexto.registroI].frases[contexto.fraseI].path);
	$("#audio0").trigger("load");
	$("#audio0").show();
	}
	$("#txtG").show();
//	alert("se va a entrar en escritura");

	
}

