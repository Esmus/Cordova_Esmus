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


function save() {
	
	//alert("Hemos entrado en la funcion save()");
	
	var array=[];
	var check=0;
	
	var selec=$("input[name|='elemento']");
	
	
	selec.each(function(index){
		array[index]=$(this).val();
		if(array[index].length<=0){check++;};
	});
	
	
	login.Nombre=array[0];
	login.Apellido=array[1];
	login.Pais=array[2];
	
	login.arrayD[0]=array[0];
	login.arrayD[1]=array[1];
	login.arrayD[2]=array[2];
	//login.Imagen=array[6];
	//alert("Loged as:"+login.Nombre+" "+login.Apellido);
	
	if(check==0)
	{
		login.Rellenado=true;
		$("#formulario-0").hide();
		$("#continuar-0").show();
		$("#botonC").show();
		localStorage.setItem("name",login.Nombre);
		localStorage.setItem("surname",login.Apellido);
		localStorage.setItem("country",login.Pais);
		localStorage.setItem("rellenado",login.Rellenado);
		fileUtilities.downloadFile(appConstants.docsURL()+appConstants.nameDoc,appConstants.persistentStorageFolder(),appConstants.nameDoc,1);

		}else{alert("FALTAN DATOS");}
}
function compInicial()
{
	//alert("funcion comp Inicial");
	if(localStorage.getItem("rellenado")!=undefined)
	{
		//alert("Login recordado!!");
		login.Nombre=localStorage.getItem("name");
		login.Apellido=localStorage.getItem("surname");
		login.Pais=localStorage.getItem("country");
		login.Rellenado=localStorage.getItem("rellenado");
		$("#loginAs").text("Logeado como:"+login.Nombre+" "+login.Apellido);
		$("#continuar-0").show();
		$("#botonC").show();
		//fileUtilities.writeFile(appConstants.persistentStorageFolder(),appConstants.nameDoc,JSON.stringify(contenido));

		fileUtilities.readFile(appConstants.persistentStorageFolder(),appConstants.nameDoc,true);
		//alert("leido:"+fileUtilities.contentRead);
		//pagPrin();
	}
	else{
		//alert("Sin login");
		$("#botonC").hide();
		$("#formulario-0").show();
		
		}
	if(navigator.connection.type!=Connection.WIFI)
	{
		alert("INFORMACIÓN: Usted no se encuentra conectado a ninguna red WiFi, esta aplicación se conecta a internet para descargar algunos recursos.Puede conectarse a una red WiFi ahora si lo desea.");
	}
}

function ultimasConsultasF()
{
	//alert("funcion Ultimas consultas");
	var selectorCDiv2=$("#content-P3");
	$("#prev-P3").hide();
	selectorCDiv2.empty();
	$("#nomUser-2").text(login.Nombre+" "+login.Apellido);
	var contentDiv='<h2>'+"Ultimas consultas"+'</h2>';
	if(ultimasConsultas.length!=0){
		//alert("Entramos en el IF");
		for(i=0;i<ultimasConsultas.length;i++){
			//alert("Entramos en el FOR i="+i);
			//alert(ultimasConsultas[i].temaC+","+ultimasConsultas[i].subtemaC+","+ultimasConsultas[i].fraseC);
			//alert(contenido[ultimasConsultas[i].temaC].subtemas[ultimasConsultas[i].subtemaC].frases[ultimasConsultas[i].fraseC].fr);
			contentDiv=contentDiv+'<a href="#page-4" class="ui-btn ui-btn ui-corner-all ui-shadow ui-icon-arrow-r ui-btn-icon-right" onclick="cargaPagFrase('+ultimasConsultas[i].temaC+","+ultimasConsultas[i].subtemaC+","+ultimasConsultas[i].fraseC+')">'+contenido[ultimasConsultas[i].temaC].subtemas[ultimasConsultas[i].subtemaC].frases[ultimasConsultas[i].fraseC].fr+'</a>';
		}
	}else{contentDiv=contentDiv+"No existen consultas recientes";}
		
	
	selectorCDiv2.append(contentDiv);
}

function ajustes()
{
	//alert("Hemos entrado en la funcion save()");
	
	var array=[];
	var check=0;
	
	var selec=$("input[name|='elementoA']");
	
	
	selec.each(function(index){
		array[index]=$(this).val();
		if(array[index].length<=0){check++;};
	});
	
	
	login.Nombre=array[0];
	login.Apellido=array[1];
	login.Pais=array[2];
	
	login.arrayD[0]=array[0];
	login.arrayD[1]=array[1];
	login.arrayD[2]=array[2];
	//login.Imagen=array[6];
	//alert("Loged as:"+login.Nombre+" "+login.Apellido);
	
	if(check==0)
	{
		localStorage.setItem("name",login.Nombre);
		localStorage.setItem("surname",login.Apellido);
		localStorage.setItem("country",login.Pais);
		localStorage.setItem("rellenado",login.Rellenado);
		$("#nomUser-0").text(login.Nombre+" "+login.Apellido);
		$("#fraseInit").text("Hola, has venido a "+login.Pais+" a estudiar, ¿quieres que te ayude a comunicarte en ...?");
		$("#temasPag").empty();
		$("#temasPanel").empty();
		fileUtilities.downloadFile(appConstants.docsURL()+appConstants.nameDoc,appConstants.persistentStorageFolder(),appConstants.nameDoc,1);
		ultimasConsultas=[];
	}else{alert("FALTAN DATOS");}
	
}


function externalLinks(l)
{
	
	if(l==0)
	{$("#srcExtLink").attr("src",appConstants.externalLink[l]);
	//alert(appConstants.externalLink[l]);
	$("#titleExt").text("WordReference")}
	else{
		if(l==1){$("#srcExtLink").attr("src",appConstants.externalLink[l]);
		$("#titleExt").text("WordReference")
	}else{$("#srcExtLink").text("NOT FOUND");}}
	
}

function startAudioRecord() {
	$("#buttonStartR").hide();
	audio.doStartRecord();
}

function stopAudioRecord(tema,registro,frase) {
	//$("#buttonStartR").blur();
	var fileFolder=appConstants.localPermanentStorageFolder+appConstants.records;
	var fileName=(tema+""+registro+""+frase+".3gp");
	audio.doStopRecordAsync(
		fileFolder,
		fileName,
		function () {
			contenido[tema].subtemas[registro].frases[frase].pathG=audio.fileFolder+audio.fileName;
			fileUtilities.writeFile(appConstants.persistentStorageFolder(),appConstants.nameDoc,JSON.stringify(contenido));
			//$("#buttonStartR").blur();    		
			$("#audioSrc1").attr("src",contenido[tema].subtemas[registro].frases[frase].pathG);
			$("#audio1").trigger("load");
			$("#audio1").show();
			$("#buttonStartR").show();
			$("#txtG").show();
			//alert("Audio in: "+contenido[tema].subtemas[registro].frases[frase].pathG);
		}
	);
}
function fitImg() {
	var screenWidth=$(window).width();
	var screenHeight=$(window).height();
	$("image-0").css({"max-width":screenWidth, "max-height":screenHeight,"width":screenWidth-70});
	
}