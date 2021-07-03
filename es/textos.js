window.textosLib = window.textosLib || {};
window.textosLib.es = {
  lang: 'es',
  d3: {
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["$", ""],
    "dateTime": "%a %b %e %X %Y",
    "date": "%d/%m/%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  },
  rango1 : ["bajo", "medio", "alto"], // translate this in the css classes too!
  rango2 : ["pocos", "algunos", "muchos"], // translate this in the css classes too!
  rango3 : ["Si", "No", "Click en box", "Asumido"],

  opciones : ["si", "no", "ns/nc", "No se especifica", "publicos", "En el país", "privados", "Fuera del País"],

  reco : "Recolección de datos",
  acceso: "Acceso a internet",
  penet: "Penetración",

  "grafico1.title": "Acceso a Internet y población",
  "grafico1.description": "Si comparamos los países por población (diámetro del círculo) y por acceso a Internet (color y posición) vemos que una parte considerable de los habitantes de Latinoamérica se encuentra en el rango medio/alto de acceso. Sin embargo, algunos países se encuentran relegados con acceso bajo.",

  "grafico2.title": "Descargas y acceso a Internet",
  "grafico2.description": "Basándonos en la cantidad de descargas de cada iniciativa, relativas a la población de cada país, podemos también comparar la llegada que tienen las iniciativas a la población entre países. Aquí se ve una división aún más grande entre iniciativas con alta incidencia e iniciativas con mucha menor penetración.",

  "grafico3.title": "¿Cuánta seguridad ofrecen las iniciativas para los datos que recogen?",
  "grafico3.description": "Si agrupamos las iniciativas por los diferentes ejes que consideramos en cuanto a seguridad, se generan también, 3 grupos principales:",
  "grafico3.step0": 'Si agrupamos las iniciativas por sus características de seguridad podemos ver 3 grandes grupos: ',
  "grafico3.step1": 'Las que <b>no informan</b> sobre las medidas de seguridad, el <b>código es privativo</b>, la información se guarda en <b>servidores privados</b> y <b>fuera del país</b>, como: <span id="apps1"></span>',
  "grafico3.step2": 'Las que <b>sí informan</b> sobre las medidas de seguridad, el <b>código es abierto</b>, la información se guarda en <b>servidores públicos</b> y <b>en el país</b>, como: <span id="apps2"></span>',
  "grafico3.step3": 'Las que se encuentran en el medio, con una combinación de las variantes, como: <span id="apps3"></span>',

  "grafico4.title": "¿Qué datos de usario recolectan?",
  "grafico4.description": "Agrupando los datos que recolectan en 3 grandes grupos, podemos analizar como se posicionan las diferentes iniciativas respecto a la recolección de los mismos:",
  "grafico4.step0": "En cuanto a <b>datos personales</b> (edad, documento, género), las aplicaciones se ubican en el siguiente espectro en cuanto a la cantidad de datos que recolectan",
  "grafico4.step1": "En cuanto a <b>datos de ubicación</b> (dirección, ubicación), las aplicaciones se ubican en el siguiente espectro en cuanto a la cantidad de datos que recolectan",
  "grafico4.step2": "En cuanto a <b>datos sensibles</b> (fotografía, datos de salud), las aplicaciones se ubican en el siguiente espectro en cuanto a la cantidad de datos que recolectan",


  "grafico5.title": "La importancia del consentimiento en los datos recogidos por las iniciativas",
  "grafico5.description": "Qué sería mejor o no del punto de vista de la protección de los datos",
  "grafico5.step0": '¿La recopilación/procesamiento de datos va precedida de un claro acto afirmativo que establece una indicación libremente dada, específica, informada y sin ambigüedades de acuerdo del sujeto de los datos con respecto a la recopilación y/o procesamiento de datos personales relacionados con ella o él?',
  "grafico5.step1": '¿Cómo se obtiene el consentimiento?',
  "grafico5.step2": '¿La iniciativa permite que las y los usuarias tengan control efectivo sobre los usos?',
  "grafico5.step3": '¿El/la interesada puede retirar su consentimiento a la iniciativa en cualquier momento?'

}
