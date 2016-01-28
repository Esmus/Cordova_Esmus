/*
 * $Id: objects.js Oct 9, 2015 9:45:18 AM tta1516$
 * 
 * Copyright (C) 2015 Maider Huarte Arrayago
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
var contexto={
		temaI:null,
		registroI:null,
		fraseI:null
};
var appConstants = {
	externalLink:["http://www.wordreference.com/es/"],
	localPermanentStorageFolder: "/sdcard/ESMUS/audio/",
	original:"original/",
	records:"records/",
	localPermanentStorageFolderDocs:"file://sdcard/ESMUS",
	nameDoc:"dataFile.json",
	uploadFileURL: "http://158.227.64.65:8080/ejemplo9s/rest/School/uploadFile",
	successDown:null,//EHU PUBLIC
	serverURL:"http://158.227.55.59:8080/GramikasiServer/",
	audioURL:function () {
		return this.serverURL+"audio/";},
	docsURL:function () {
		return this.serverURL+"docs/";
	},
	persistentStorageFolder: function () {
		
	return cordova.file.externalDataDirectory;}
};

var login = {

	Nombre: null,
	Apellido: null,
	Pais: null,
    Rellenado: false,
    arrayD:[null,null,null,null,null,null]

};

var pathGrabacionUrs=null;

var ultimasConsultas=[];

var packJSON=[];
var contenido=[];
/*
var contenido=[{nombre:"Universidad",
				prep:"en la",
				subtemas:[{nombre:"Profesores",
						   prep:"Con los",
								frases:[{fr:"Me preguntaba si podría explicar....de nuevo",tr:"I was wondering if you could explain...again",path:null,pathG:null},
								        {fr:"Nosotros querríamos saber dónde va a ser la siguiente clase",tr:"We wanted to know where the next lesson is going to be",path:null,pathG:null},
								        {fr:"Yo estaría interesado/a en tomar parte en...",tr:"I would be interested to take part in...",path:null,pathG:null},
								        {fr:"¿Podríamos reunirnos el (día de la semana) para hablar de...?",tr:"Could we have a meeting on (day of the week) to talk about...?",path:null,pathG:null}]},

							{nombre:"Compañeros",
							 prep:"Con los",
									frases:[{fr:"¿Qué hay/tal?",tr:"What´s up?",path:null,pathG:null},
									        {fr:"¿Qué pasa?",tr:"What´s the crack?",path:null,pathG:null},
									        {fr:"¡Él/ella es genial!",tr:"He´s /she´s scream!",path:null,pathG:null},
									        {fr:"¡Gracias, colega!",tr:"Cheers, mate!",path:null,pathG:null},
									        {fr:"¡Madre mía!",tr:"My goodness!",path:null,pathG:null},
									        {fr:"¡Venga ya!",tr:"Do me a favour!",path:null,pathG:null},
									        {fr:"Me voy",tr:"I´m off",path:null,pathG:null},
									        {fr:"Yo tambíén",tr:"Same here",path:null,pathG:null},
									        {fr:"¡Qué pena!",tr:"What a pitty!",path:null,pathG:null},
									        {fr:"Me interesa/gusta Charles, Cloe... (el nombre de la persona).",tr:"I am into Charles, Cloe...",path:null,pathG:null},
									        {fr:"Me vuelve loco/a Charles, Cloe... (el nombre de la persona).",tr:"I am crazy about Charles, Cloe...",path:null,pathG:null},
									        {fr:"¡No te metas en mi vida!?",tr:"Mind your own business!",path:null,pathG:null},
									        {fr:"¡Déjame en paz!",tr:"Give me a break!",path:null,pathG:null}]},
				        {nombre:"Secretaria",
							   prep:"En",
									frases:[{fr:"¿Me podría decir algo más sobre...?",tr:"Could you tell me something more about...?",path:null,pathG:null},
									        {fr:"¿Me podría dar más detalles a cerca de...?",tr:"Could you give me more details about...?",path:null,pathG:null},
									        {fr:"¿Le importaría decirme...?",tr:"Would you mind telling me...?",path:null,pathG:null},
									        {fr:"Yo he tenido algunos problemas con mi beca, ¿podría ayudarme, por favor?",tr:"I have had some problems with my eductional grant, could you help me, please?",path:null,pathG:null},
									        {fr:"¿Podría decirme cuáles son los impresos de la beca?",tr:"Could you tell me what are grant´s application forms?",path:null,pathG:null},
									        {fr:"¿Podría decirme cuál es el programa de becas?",tr:"Could you tell me what is the scholarship programme?",path:null,pathG:null}]}]},
		         //Segundo tema
				{nombre:"Compras",
				  prep:"de",
						subtemas:[{nombre:"Peluqueria",
							   prep:"En la ",
								frases:[{fr:"Alisar",tr:"Straighten",path:null,pathG:null},
								        {fr:"Ondular",tr:"Wave",path:null,pathG:null},
								        {fr:"Rizar",tr:"Curl",path:null,pathG:null},
								        {fr:"Flequillo",tr:"Fringe",path:null,pathG:null},
								        {fr:"Mid-length",tr:"Mid-length",path:null,pathG:null},
								        {fr:"Cortar las puntas",tr:"Trim ends",path:null,pathG:null}]},

							{nombre:"Tiendas de ropa",
							 prep:"En las",
									frases:[{fr:"¿Me lo puedo probar?",tr:"Can I try it on?",path:null,pathG:null},
									        {fr:"¿Puedo pagar con tarjeta?",tr:"Can I pay by credit card?",path:null,pathG:null},
									        {fr:"¿Tenéis alguno más pequeño/grande?",tr:"Have you got something smaller/bigger?",path:null,pathG:null},
									        {fr:"¿Tenéis esto en otro color?",tr:"Do you have another color for this?",path:null,pathG:null},
									        {fr:"Quiero devolver esto",tr:"I wanna to take this back",path:null,pathG:null},
									        {fr:"¿Puedo tener mi dinero de vuelta?",tr:"Could I have a refund?",path:null,pathG:null},
									        {fr:"Me gustaría cambiar esto por otra talla",tr:"I'd like to change this for a different size",path:null,pathG:null},
									        {fr:" Estoy solo echando un vistazo, gracias!",tr:"I´m just taking a look, thak you",path:null,pathG:null},
									        {fr:" ¿Me podría decir dónde están los probadores, por favor?",tr:"Could you please tell me were the changing rooms are?",path:null,pathG:null}]},
							{nombre:"Supermercado",
							 prep:"En el",
									frases:[{fr:"¿A qué horas abrís?",tr:"What times are you open?",path:null,pathG:null},
									        {fr:"Estoy buscando...",tr:"I am looking for...",path:null,pathG:null},
									        {fr:"¿Dónde puedo encontrar...?",tr:"Where can I find...?",path:null,pathG:null},
									        {fr:"Me llevo esto",tr:"I´ll take this",path:null,pathG:null}]}]},
		        //tercer tema seguir aqui copiando
		        {nombre:"Fiesta",
				  prep:"de",
				  subtemas:[{nombre:"Bebidas",
					   prep:"Pidiendo",
						frases:[{fr:"Tres chupitos de tequila, ¡por favor!",tr:"Three shots of tequila, please!",path:null,pathG:null},
						        {fr:"¡Quédate el cambio!",tr:"Keep the change!",path:null,pathG:null},
						        {fr:"¡Ponme otro de estos!",tr:"Same again",path:null,pathG:null},
						        {fr:"¡Última ronda!",tr:"Last orders!",path:null,pathG:null},
						        {fr:"¡Tomaré esto!",tr:"I´ll get these!",path:null,pathG:null}]},

					{nombre:"Ligar",
					 prep:"Para",
							frases:[{fr:"Invito yo",tr:"It´s on me",path:null,pathG:null},
							        {fr:"¿Quieres beber algo?",tr:"Can I get a drink?",path:null,pathG:null},
							        {fr:"¿Estás solo/a?",tr:"Are you on your own?",path:null,pathG:null},
							        {fr:"¡Dime si quieres quedar algún día!",tr:"If you´d like to meet up sometime, let me know!",path:null,pathG:null},
							        {fr:"¿Me das tu número?",tr:"Would you give me your phone number?",path:null,pathG:null},
							        {fr:"Perdona, pero me debes un cubata, porque el mío se me ha caído cuando te he visto",tr:"Sorry but you owe me a drink  because when I saw you, I dropped mine",path:null,pathG:null},
							        {fr:"Me apuesto 20$ a que me dices que no.",tr:"I´l bet you 20$ that you are going to say “no” to me",path:null,pathG:null},
							        {fr:"Vamos a dar una vuelta",tr:"Let´s take a ride",path:null,pathG:null}]},
					{nombre:"Casa",
					 prep:"Volver",
							frases:[{fr:"Yo me voy ya",tr:"I´m outta here",path:null,pathG:null},
							        {fr:"¿Nos vamos?",tr:"Shall we hit the road?",path:null,pathG:null},
							        {fr:"Perdone, Quiero ir a la calle Bridge, ¿voy bien?",tr:"Excuse me, I want to go to Bridge Street, is this the right way?",path:null,pathG:null},
							        {fr:"Buenas noches, ¿podría venir un taxi a la calle Bridge?",tr:"Good evening, may I have a taxi at Bridge Street?",path:null,pathG:null},
							        {fr:"¿Podría llevarme a la calle Bridge?",tr:"Could you take me to Bridge Street?",path:null,pathG:null},
							        {fr:"¡Ve más deprisa, por favor",tr:"Please, step on it!",path:null,pathG:null},
							        {fr:"¿Cuánto es?",tr:"How much is the fare?",path:null,pathG:null}]}]},
				//cuarto tema
		        {nombre:"Buscar piso",
				  prep:"Para",
						subtemas:[{nombre:"Necesidades",
							   	prep:"Explicar",
								frases:[{fr:"Necesito una casa cerca de la universidad",tr:"I need a house close to the University",path:null,pathG:null},
								        {fr:"No me importa si...",tr:"I don´t mind if I have to...",path:null,pathG:null},
								        {fr:"Necesito como mínimo...",tr:"I need at least...",path:null,pathG:null},
								        {fr:"No quiero...",tr:"I don´t want to...",path:null,pathG:null}]},

							{nombre:"Dudas",
							 prep:"Preguntar",
									frases:[{fr:"¿Cuál es la dirección?",tr:"What is the adress?",path:null,pathG:null},
									        {fr:"¿Qué incluye el precio del alquiler?",tr:"What does the price of the rent include?",path:null,pathG:null},
									        {fr:" ¿Están dados de alta los suministros de agua, luz y/o gas?",tr:"Are there the supplies of water, ligth and gas given of discharge?",path:null,pathG:null},
									        {fr:"¿Tengo que hacerme yo cargo de las averías?",tr:"Do I have to take charge of the breakdowns?",path:null,pathG:null},
									        {fr:"¿Está amueblada la casa?",tr:"Is the house furnished?",path:null,pathG:null},
									        {fr:"¿Puedo tener mascotas?",tr:"Is it possible for me to have pets?",path:null,pathG:null}]}]}
        ];
*/
var audio = {
		media:null,
		fileFolder:null,
		fileName:null,
		create: function(fileFolder,fileName) {
			this.fileFolder=fileFolder;
			this.fileName=fileName;
			if(this.media)
				this.media.release();
			this.media = new Media(this.fileFolder+this.fileName);
		},
		doStartRecord: function() {//Método para empezar grabación
			this.create("","tmprecording.3gp");//Crear nuevo objeto para el atributo media, del fichero "tmprecording.3gp" de la carpeta por defecto
			if(this.media) {
		        this.media.startRecord();//Comenzar a grabar con el objeto del atributo media
		    }
			else {
				alert("No media file to record");
			}		
		} 
		,
		doStopRecordAsync: function(fileFolder,fileName,onSuccess) {//Método asíncrono para terminar grabación
			if(this.media) {
				this.media.stopRecord();//Dejar de grabar con el objeto del atributo media
				
				fileUtilities.moveAsync(
						"/sdcard/tmprecording.3gp",fileFolder,fileName,//Mover el fichero de grabación creado "/sdcard/tmprecording.3gp", a la carpeta fileFolder, con nombre fileName
		        	function() {//función successCallback: si el fichero se ha movido
			    		audio.media.release();//Liberar el objeto del atributo media
						audio.fileFolder=fileFolder;//Guardar en el atributo fileFolder del objeto audio, la carpeta destino
						audio.fileName=fileName;//Guardar en el atributo fileName del objeto audio, el nuevo nombre del fichero

						if(onSuccess!=false)
							onSuccess();
		        	}
		        );
		    }
			else {
				alert("No media file to stop");
			}		
		}	
};

var fileUtilities = {
		contentRead: null,
		moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){ //Método asíncrono para mover ficheros
			var url="file://"+sourceFullPath;
			var destFile=destFolder+destName;
			var ft=new FileTransfer();//Crear objeto FileTransfer
		    ft.download(//Copiar (descargar) el fichero indicado por URL en destFile
				url,
				destFile,
		    	function() {//función successCallback: si el fichero se descargó bien
					window.resolveLocalFileSystemURL(url,//Acceder al fichero original por su URL
		    				function(fileEntry) {//función successCallback: si se ha podido acceder al fichero original
								fileEntry.remove(onSuccess);//Borrar el fichero y seguir con onSuccess
		    				},
		    				function(error) {
		    					alert("Source file NOT accesible; not removed");
		    				}
		    		);			
				},
				function(error) {
					alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
				}
			);
		},
		downloadFile: function (sourceFullPath,destFolder,destName,type){ //Método asíncrono para mover ficheros
			var url=sourceFullPath;
			//alert("URL:"+url);
			var destFile=destFolder+destName;
			var ft=new FileTransfer();//Crear objeto FileTransfer
		    ft.download(//Copiar (descargar) el fichero indicado por URL en destFile
				url,
				destFile,
		    	function() {//función successCallback: si el fichero se descargó bien
					if(type==0)
					{
					contenido[contexto.temaI].subtemas[contexto.registroI].frases[contexto.fraseI].path=appConstants.localPermanentStorageFolder+appConstants.original+""+contexto.temaI+""+contexto.registroI+""+contexto.fraseI+".aac";
					fileUtilities.writeFile(appConstants.persistentStorageFolder(),appConstants.nameDoc,contenido);
					$("#audioSrc0").attr("src",contenido[contexto.temaI].subtemas[contexto.registroI].frases[contexto.fraseI].path);
					$("#audio0").trigger("load");
					$("#audio0").show();
					}else{
						fileUtilities.readFile(appConstants.persistentStorageFolder(),appConstants.nameDoc,true);

					}
					//alert("Fichero correctamente descargado y guardado en:"+destFile);
				},
				function(error) {
					alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
					appConstants.successDown=false;
					//alert("dentro de la funcion:"+appConstants.successDown);
				}
			);
		},
		uploadFileAsync: function(sourceFullPath,fileType,uploadFileServiceURL,onSuccess) {
			var fileURL="file://"+sourceFullPath;
			var fileName=sourceFullPath.substring(sourceFullPath.lastIndexOf("/")+1);
			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.mimeType = "multipart/form-data";
			options.fileName = fileName;
			var params = {filetype:fileType};
			options.params=params;
			
			var ft=new FileTransfer();//Crear objeto FileTransfer
			ft.upload(fileURL,encodeURI(uploadFileServiceURL),//Subir el fichero indicado por fileURL al servicio de subida de ficheros
				function() {//función successCallback: si el fichero se subió bien
					//alert("File uploaded");
					if(onSuccess!=false)
						onSuccess();
				}, 
				function(error) {//función errorCallback: si el fichero NO se subió bien
					alert("File upload error: "+error.code);//Indicar el error al usuario
				}, 
				options//Opciones de subida
			);
		},
		
	readFile: function(fileFolder,fileName,onSuccess) {
		//alert("readObjectFromFileAsync1");
		window.resolveLocalFileSystemURL(//Comprobar que el fichero existe
				fileFolder+fileName,
				function(fileEntry) {//función successCallback: si el fichero existe
					fileEntry.file(//Obtener el objeto File asociado
						function(file) {//función successCallback: si el objeto file se creó
							var reader=new FileReader();//Crear un FileReader
							//alert("1-reader creado");
							reader.onloadend=function(){//Preparar la función a ejecutar cuando se termine la lectura
								
								contenido=JSON.parse(reader.result);//Guardar en el atributo contentRead el contenido leído
								//alert("3-Contenido guardado en content read:"+reader.result);
								if(onSuccess!=false)
									pagPrin();								
							}
							reader.readAsText(file);//Leer texto de file
							//alert("2-leyendo como texto");
						},
						function(error) {
							alert("File error: code "+error.code);
						}						
					);
				},
				function(error) {
					alert("FileSystem error: code "+error.code);
				}				
		);
//		alert("readObjectFromFileAsync3");		
	},

	writeFile: function(fileFolder,fileName,content) {
		//alert("Entramos en escritura");
		//alert(fileFolder);
		window.resolveLocalFileSystemURL(//Comprobar que el directorio existe
			fileFolder,
			function(dirEntry) {//función successCallback: si el directorio existe
				dirEntry.getFile(//Obtener o crear fichero
					fileName, 
					{create:true},//opciones para indicar que el fichero se cree, en caso de no existir
					function(fileEntry) {//función successCallback: si el fichero existe
						fileEntry.createWriter(//Crear un objeto FileWriter asociado
							function(fileWriter) {//función successCallback: si el fileWriter se creó (truncar a 0 y escribir)		
								fileWriter.onwriteend=function() {//Preparar la función a ejecutar cuando se termine el truncado
									fileWriter.onwriteend=function() {//Preparar la función a ejecutar cuando se termine la escritura
										//alert("Content written to file: "+fileFolder+fileName);
									};
									fileWriter.write(content);//Escribir el contenido								
								}
								fileWriter.truncate(0);//Truncar el fichero a longitud 0
							},
							function(error) {
								alert("Writing error: code "+error.code);
							}
						);
					},
					function(error) {
						alert("File error: code "+error.code);
					}					
				);
			},
			function(error) {
				alert("FileSystem error: code "+error.code);
			}				
		);
//		alert("writeContentToFileAsync2");
	}
	
};
	
	 









