window.textosLib = window.textosLib || {};
window.textosLib.pt = {
  lang: 'pt',
  d3: {
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["$", ""],
    "dateTime": "%a %b %e %X %Y",
    "date": "%d/%m/%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    "shortDays": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    "shortMonths": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  },

  // FALTA TRADUCIR ESTOS

  rango1 : ["baixo", "medio", "alto"], // translate this in the css classes too!
  rango2 : ["poucos", "alguns", "muitos"], // translate this in the css classes too!
  rango3 : ["Sim", "Não", "Clique na caixa", "Asumido"],

  opciones : ["Sim", "Não", "ns/nc", "Não especificado", "públicos", "No país", "privados", "Fora do país"],

  reco : "Coleção de dados",
  acceso: "Acesso à Internet",
  penet: "Penetração",

  // FALTA TRADUCIR ESTOS ^^^^^^


  "grafico1.title": "Acesso à internet e população",
  "grafico1.description": "Se comparamos os países por população (diâmetro do círculo) e por acesso à internet (cor e posição) vemos que uma parte considerável dos habitantes da América Latina se encontra na faixa média/alta de acesso. No entanto, alguns países se encontram relegados ao acesso baixo",

  "grafico2.title": "Downloads e acesso à internet",
  "grafico2.description": "Nos embasando na quantidade de downloads de cada iniciativa, relativas à população de cada país, podemos também comparar o alcance que têm as iniciativas na população entre países. Aqui se vê uma divisão ainda maior entre iniciativas com alta incidência e iniciativas com muito menos penetração.",

  "grafico3.title": "Quanta segurança oferecem as iniciativas para os dados que são coletados?",
  "grafico3.description": "Se agrupamos as iniciativas pelos diferentes eixes que consideramos em relação à segurança, formam-se también, três grupos principais:",
  "grafico3.step0": 'Se agrupamos as iniciativas de acordo com suas características de segurança podemos ver três grandes grupos: ',
  "grafico3.step1": 'Os que <b>não informam</b> sobre as medidas de segurança, o <b>código é privado</b>, a informação é armazenada em <b>servidores privados</b> y <b>fora do país</b>, como: <span id="apps1"></span>',
  "grafico3.step2": 'Os que <b>sim informan</b> sobre as medidas de segurança, o <b>código es abierto</b>, a informação é armazenada em <b>servidores públicos</b> y <b>no país</b>, como: <span id="apps2"></span>',
  "grafico3.step3": 'Os que se encuentran no meio, com uma combinação de variantes, como: <span id="apps3"></span>',

  "grafico4.title": "Quais dados de usuário são coletados?",
  "grafico4.description": "Agrupando os dados que coletam en 3 grandes grupos, podemos analizar como se posicionam as diferentes iniciativas a respeito à coletas desses dados:",
  "grafico4.step0": "Em relação a <b>dados pessoais</b> (idade, número de identidade, gênero), os aplicativos estão posicionados no seguinte espectro em relação à quantidade de dados que coletam",
  "grafico4.step1": "Em relação a <b>dados de localização</b> (endereço, localização), os aplicativos estão posicionados no seguinte espectro em relação à quantidade de dados que coletam",
  "grafico4.step2": "Em relação a <b>dados sensíveis</b> (fotografia, dados de saúde), os aplicativos estão posicionados no seguinte espectro em relação à quantidade de dados que coletam",

  "grafico5.title": "A importância do consentimento nos dados coletados pelas iniciativas",
  "grafico5.description": "O que seria melhor ou não a partir do ponto de vista da proteção dos dados",
  "grafico5.step0": 'A coleta/processamento de dados é precedida de um ato claro afirmativo que estabeleça uma indicação livre, específica, informada e sem ambiguidades de concordância do titular dos dados quanto à coleta e/ou processamento de seus dados pessoais?',
  "grafico5.step1": 'Como o consentimento é obtido?',
  "grafico5.step2": 'A iniciativa permite que os usuários tenham controle efetivo sobre os usos?',
  "grafico5.step3": 'A parte interessada pode retirar seu consentimento à iniciativa a qualquer momento?',

  "footer.by": "Visualizações por:",
  "footer.logo": "Logo de Tedic"

}
