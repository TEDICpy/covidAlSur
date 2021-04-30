window.controller = (files) => {
  
    // **** CODIGO DEL SCROLLY *******


    var container1 = d3.select('#scrolly1'); //busco el container total
	var container2 = d3.select('#scrolly2'); //busco el container total
    var container3 = d3.select('#scrolly3'); //busco el container total


    var stepSel1 = container1.selectAll('.step'); // selecciono los "steps"
	var stepSel2 = container2.selectAll('.step'); // selecciono los "steps"
    var stepSel3 = container3.selectAll('.step'); // selecciono los "steps"


    function updateChart(index, what,containerNumber,entra) {  // funcion que llama cada vez que cruza un umbral
        var sel = d3.select('#scrolly'+containerNumber).select(`[data-index='${index}']`);
        what.classed('is-active', (d, i) => i === index);
        scrollyTelling(containerNumber,index,entra); // <<<<< AQUI LLAMA AL GRAFICO VERDADERO
    }

    function init(what,containerNumber) { // configuracion inicial
        Stickyfill.add(d3.select('.sticky').node()); // fallback para browsers sin sticky

        enterView({
            selector: what.nodes(),
            offset: 0.4,
            enter: el => {
                var index = +d3.select(el).attr('data-index');
                updateChart(index,what,containerNumber,1);
            },
            exit: el => {
                let index = +d3.select(el).attr('data-index');
                index = Math.max(0, index - 1);
                updateChart(index,what,containerNumber,0);
            }
        });
    }
  
  

    // **** END SCROLLY *******


       
        

var altoMaximo = 1.5; // cuantas veces el ancho permitimos que sea el alto maximo

d3.selectAll(".contenedorGrafico")
        .selectAll(".grafico")
        .each(function(d,i){
                d3.select(this).append("svg").datum(d3.select(this)._groups[0][0].parentNode.id.slice(-1))});

var svg = d3.selectAll("svg")
    ,
    margin = isMobile ? {top: 15, right: 15, bottom: 15, left: 15} : {top: 15, right: 15, bottom: 15, left: 15},
    widthReal =  +d3.select('#grafico1').style('width').slice(0, -2),
    heightReal = +d3.select('#grafico1').style('height').slice(0, -2);




    svg.each(function(d){ 
        height = heightReal - margin.top - margin.bottom;
        width = widthReal - margin.left - margin.right;
            d3.select(this).attr("viewBox", [0, 0, widthReal, d3.select(this)._groups[0][0].parentElement.clientHeight])
        .attr("height", d3.select(this)._groups[0][0].parentElement.clientHeight)
        .attr("width", d3.select(this)._groups[0][0].parentElement.clientWidth);
    })

    

///******** MANEJO DE DATOS ********

 var dataPaises = files[0],
    dataPenetracion = files[1],
    dataSeguridad = files[2];


 dataPaises.forEach(element => {
			element.Acceso = element.Acceso.replace(",",".");
		});
    
        dataPenetracion.forEach(element => {
			element.Acceso = +element.Acceso.replace(",",".");
            element.Penetracion = element.Penetracion.replace(",",".");
            element.Poblacion = +element.Poblacion;
		});
 

//***************ACA SE ARMAN LOS GRAFICOS

svg
        .append("g")
        
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	;

    svg.each(function(d,i){
		d3.select(this).select("g").attr("id","gInterno"+d)
        ;
	})



beeSwarmAcceso(dataPaises, "#gInterno1")
beeSwarmPenetracion(dataPenetracion, "#gInterno2")
sankeySeguridad(dataSeguridad, "#gInterno3")


//alluvialSeguridad(dataPaises, "#gInterno0")





function beeSwarmAcceso(datos, cualGrafico){ // beeswarm

        var main = d3.select(cualGrafico);
                height = main._groups[0][0].parentElement.height.baseVal.value-margin.top-margin.bottom;
                width = main._groups[0][0].parentElement.width.baseVal.value-margin.left-margin.right;

                var clasesAcceso = d3.scaleQuantize()
                .domain(d3.extent(datos, d=> d.Acceso))
                .range(["bajo", "medio", "alto"])
                ;


        var max_pop = d3.max(datos, d => d.Poblacion)
        
        
        var xScale = d3.scaleLinear().domain(d3.extent(datos, d=> d.Acceso));

            isMobile?xScale.range([height*0.1, height*0.9]):xScale.range([width*0.1, width*0.9]);

        var rScale = d3.scaleSqrt().domain([0, max_pop]).range([0, isMobile?width/30:height/30])
        
        
        var force = d3.forceSimulation(datos).force('forceX', d3.forceX(d => xScale(d.Acceso)).strength(2))
                .force('forceY', d3.forceY(height/2).strength(0.1));

        if(isMobile){
            force
                .force('forceY', d3.forceY(d => xScale(d.Acceso)).strength(2))
                .force('forceX', d3.forceX(width/1.8).strength(0.1))
        }
                
                force.force('collide', d3.forceCollide(d => rScale(d.Poblacion) + 3))
                .stop();
            
        var NUM_ITERATIONS = 120;
        
        for (let i = 0; i < NUM_ITERATIONS; ++i) {
            force.tick();
        };
        
        force.stop();
        
        var circlesGroup = main.selectAll("g")
            .data(datos)
            .join("g")
                .attr("transform", d=>"translate("+d.x+","+d.y+")");

            circlesGroup.append("circle")
            .attr("r", d => rScale(d.Poblacion))
            .attr("class", d=>clasesAcceso(d.Acceso));
            
        circlesGroup.append("text")
            .attr("class","paisLabel")
            .text(d=>d.Pais)
            .attr("dy",isMobile?5:2)
            .attr("font-size",16)
            .style("fill", "black");

       if(!isMobile){ circlesGroup.append("text")
            .attr("class","paisSubLabel")
            .text(d=>d3.format(".0%")(d.Acceso/100))
            .attr("dy",12)
            .attr("font-size",11)
            .style("fill", "black");

    }
            
        var axis = main.append("g").attr("class","axis")
            .style("transform", isMobile?`translateX(${width*0.1}px`:`translateY(${height*0.95}px`);

            var rangosAxis = [clasesAcceso.domain()[0],
                                clasesAcceso.thresholds()[0],
                                clasesAcceso.thresholds()[1],
                                clasesAcceso.domain()[1]];

            axis.selectAll("rect")
                .data(clasesAcceso.range())
                .join("rect")
                     .attr(isMobile?"y":"x", (d,i)=>xScale(rangosAxis[i]))
                    .attr(isMobile?"height":"width", (d,i)=> xScale(rangosAxis[i+1])-xScale(rangosAxis[i]))
                    .attr("class",d=>d)
                    .attr(isMobile?"width":"height",isMobile?3:18);

     
            

            axis.selectAll("text")
                .data(clasesAcceso.range())
                .join("text")
                    .attr(isMobile?"y":"x", (d,i)=>(xScale(rangosAxis[i])+xScale(rangosAxis[i+1]))/2)
                    .attr("dy",isMobile?0:14)
                    .attr("dx",isMobile?-3:0)
                    .attr("text-anchor",isMobile?"end":"middle")
                    .text(d=>d.toUpperCase());

    if(!isMobile){
    axis.append("text")
            .attr("text-anchor",isMobile?"end":"middle")
               .text("Acceso a internet")
               .attr("dy",-5)
            .attr("x",isMobile?0:width/2)
            .style("opacity",0.7)
            ;
        }
        
} // fin beeswarm






function beeSwarmPenetracion(datos, cualGrafico){ // beeswarmPen

        var main = d3.select(cualGrafico);
                height = main._groups[0][0].parentElement.height.baseVal.value-margin.top-margin.bottom;
                width = main._groups[0][0].parentElement.width.baseVal.value-margin.left-margin.right;

                var clasesAcceso = d3.scaleQuantize()
                .domain(d3.extent(datos, d=> d.Penetracion))
                .range(["bajo", "medio", "alto"])
                ;


        var max_pop = d3.max(datos, d => d.Poblacion)


        var xScale = d3.scaleLinear().domain(d3.extent(datos, d=> d.Penetracion));

        var xScale = d3.scaleLinear().domain(d3.extent(datos, d=> d.Penetracion));

            isMobile?xScale.range([height*0.1, height*0.9]):xScale.range([width*0.1, width*0.9]);

        var rScale = isMobile?width/20:height/20;


        var force = d3.forceSimulation(datos).force('forceX', d3.forceX(d => xScale(d.Penetracion)).strength(2))
                .force('forceY', d3.forceY(height/2).strength(0.1));

        if(isMobile){
            force
                .force('forceY', d3.forceY(d => xScale(d.Penetracion)).strength(2))
                .force('forceX', d3.forceX(width/1.8).strength(0.1))
        }
                
                force.force('collide', d3.forceCollide(rScale + 3))
                .stop();
            
        var NUM_ITERATIONS = 120;

        for (let i = 0; i < NUM_ITERATIONS; ++i) {
            force.tick();
        };

        force.stop();

        var circlesGroup = main.selectAll("g")
            .data(datos)
            .join("g")
                .attr("transform", d=>"translate("+d.x+","+d.y+")");

            circlesGroup.append("circle")
            .attr("r", rScale)
            .attr("class", d=>clasesAcceso(d.Penetracion));
            
        circlesGroup.append("text")
            .attr("class","paisLabel")
            .text(d=>d.app)
            .attr("dy",5)
            .attr("font-size",16)
            .style("fill", "black");

            /* if(!isMobile){ circlesGroup.append("text")
                .attr("class","paisSubLabel")
                .text(d=>d3.format(".0%")(d.Penetracion*1000000))
                .attr("dy",12)
                .attr("font-size",11)
                .style("fill", "black");

            } */
            
        var axis = main.append("g").attr("class","axis")
            .style("transform", isMobile?`translateX(${width*0.1}px`:`translateY(${height*0.95}px`);

            var rangosAxis = [clasesAcceso.domain()[0],
                                clasesAcceso.thresholds()[0],
                                clasesAcceso.thresholds()[1],
                                clasesAcceso.domain()[1]];

            axis.selectAll("rect")
                .data(clasesAcceso.range())
                .join("rect")
                    .attr(isMobile?"y":"x", (d,i)=>xScale(rangosAxis[i]))
                    .attr(isMobile?"height":"width", (d,i)=> xScale(rangosAxis[i+1])-xScale(rangosAxis[i]))
                    .attr("class",d=>d)
                    .attr(isMobile?"width":"height",isMobile?3:18);


            axis.selectAll("text")
                .data(clasesAcceso.range())
                .join("text")
                    .attr(isMobile?"y":"x", (d,i)=>(xScale(rangosAxis[i])+xScale(rangosAxis[i+1]))/2)
                    .attr("dy",isMobile?0:14)
                    .attr("text-anchor",isMobile?"end":"middle")
                    .text(d=>d.toUpperCase());

            if(!isMobile){
            axis.append("text")
                    .attr("text-anchor",isMobile?"end":"middle")
                    .text("Penetración")
                    .attr("dy",-5)
                    .attr("x",isMobile?0:width/2)
                    .style("opacity",0.7)
                    ;
                }


} // fin beeswarm PEN






function sankeySeguridad(csv, cualGrafico){ // sankey

    var svg = d3.select(cualGrafico);


    var csvArray = csv.map(d=>Object.values(d));
    var csvArrayNested = d3.nest()
                .key(function(d) { return d[0]; })
                .key(function(d) { return d[1]; })
                .key(function(d) { return d[2]; })
                .key(function(d) { return d[3]; })
                .key(function(d) { return d[4]; })
                .entries(csvArray);

                console.log(csvArrayNested)

        /// aca actualiza los textos

            d3.select("#scrolly1").selectAll(".step").selectAll("span").each(function(d,i)
                {
                     if (i==0) d3.select(this).html(csvArrayNested[0].values[0].values[0].values[0].values[1].values.map(d=>` ${d[5]} (${d[6]})`))
                     if (i==1) d3.select(this).html(csvArrayNested[0].values[1].values[1].values[1].values[0].values.map(d=>` ${d[5]} (${d[6]})`))

                }
            )
        ///

        var  margin = {
            top: isMobile?0:10,
            left: isMobile?-15:60,
            right:isMobile?15:60,
            bottom: isMobile?15:10
        };
        var altoTitulos =  60, nodeWidth = 10;

        var height = svg._groups[0][0].parentElement.height.baseVal.value-altoTitulos,
        width = svg._groups[0][0].parentElement.width.baseVal.value-margin.left-margin.right;
       
;

        var raw = new Map();
  

        
        var weeks = new Array(csv.columns.length)
                    .fill({})
                    .map((_, i) => { 
                        return {
                        index: i,
                        name: csv.columns[i] 
                        }; 
                    }).slice(0,5);


                    console.log(d3.nest()
                        .key(function(d) { return d[0]; })
                        .entries(csv));

                var opciones = ["si", "no", "ns/nc", "No se especifica.", "publicos", "En el país", "privados", "Fuera del País"];

                
                var color = d3.scaleOrdinal().domain(opciones).range(["#ff5d1280","#6b9b2a80","#06979980"]);

               var arrow = "\u2192";


                var groups = new Array(opciones.length)
                    .fill({})
                    .map((_, i) => {
                        return {
                        index: i,
                        name: opciones[i],
                        color: color(opciones[i])
                        };
                    });

         
    /*              function linearGradientStops(link){
                            return [
                                { offset: 0.0, stopColor: link.source.color},
                                { offset: 1.0, stopColor: link.target.color}  
                            ];
                            } */

                function columnLabelPosition(week, nodesFull){
                            let nodesAtDepth = nodesFull.filter(n => n.depth === week.index);
                            let x0 = d3.min(nodesAtDepth, n => n.x0);
                            let x1 = d3.min(nodesAtDepth, n => n.x1);
                            return (x0 + x1) / 2;
                            }
           
                            
                            for (let i = 0; i < csv.length; i++) {
                                let val = [];
                                for (let j = 0; j < weeks.length; j++) {
                                let x = Object.values(csv[i])[j];
                                val.push(x);
                                }
                                raw.set(`${csv[i].app}`, val);
                            }
                    
         
                const nodes = [];
                const links = [];
                
                function findGroup(index) {       
                    return groups.find(g => g.index === index);
                }
                
                function findLink(source, target) {
                    return links.find(l => l.source === source && l.target === target);
                }
                
                function findNode(week, group) {
                    return nodes.find(n => n.week === week && n.group === group);
                }
                
                raw.forEach((value, key) => {
                    for (let i = 1; i < value.length; i++) {
                    // Get the previous and current nodes.
                    let _nodes = [i - 1, i].map((x) => {
                        let group = value[x];
                        let node = findNode(weeks[x], group);
                        if (node) {
                        node.value++;
                        }
                        else {
                        node = { 
                            week: weeks[x], 
                            group: group,
                            color: color(group),
                            value: 1 
                        };
                        nodes.push(node);
                        }
                        return node;
                    });
                    // Get the link for these two nodes.

                    let link = findLink(_nodes[0], _nodes[1]);
                    if (link) {
                            link.value++;
                        }
                        else {
                            link = { 
                            source: _nodes[0], 
                            target: _nodes[1], 
                            value: 1//,
                            //gradient: "g"+key
                            };
                            links.push(link);
                        }
                    }
                });
                
                var data =  {
                    nodes: nodes,
                    links: links
                };
                

                var graph = d3.sankey()
                            .size([width - margin.left - margin.right,height - margin.top - altoTitulos - margin.bottom])
                            .nodePadding(10)
                            .nodeWidth(nodeWidth)
                            .iterations(15)(data);

                            
                    
                   // let defs = svg.append("defs");
                    
                    let gView = svg.append("g")
                        .classed("view", true)
                        .attr("transform", `translate(${margin.left}, ${margin.top+altoTitulos})`);
                    
                    svg.append("g")
                        .classed("column-labels", true)
                        .attr("transform", `translate(${margin.left}, 0)`)
                        .selectAll("text.column-label")
                        .data(weeks)
                        .join("g")
                            .classed("column-label", true)
                            .attr("transform",d => `translate(${columnLabelPosition(d, graph.nodes)}, ${ margin.top - 4})`)
                            .append("text")
                            .attr("text-anchor", "middle")
                            .text(d => d.name)
                            .call(wrap,150);
                    
                   /*  defs.selectAll("linearGradient")
                        .data(graph.links)
                        .join("linearGradient")
                        .attr("id", d => `${d.gradient.id}`)
                        .attr("gradientUnits", "userSpaceOnUse")
                        .attr("x1", d => d.source.x1)
                        .attr("x2", d => d.target.x0)
                        .selectAll("stop")
                        .data(d => linearGradientStops(d))
                        .join("stop")
                        .attr("offset", d => d.offset)
                        .attr("stop-color", d => d.stopColor); */
                    
                        gView.selectAll("path.link")
                        .data(graph.links)
                        .join("path")
                        .classed("link", true)
                        .attr("fill", "none")
                        .attr("stroke", "silver")//d => `${d.gradient}`)
                        .attr("stroke-width", d => d.width)
                        .attr("stroke-opacity", 0.7)
                        .attr("d", d3.sankeyLinkHorizontal())
                        .attr("r", d=>console.log(d))

                        .append("title")
                        .text(d => `${d.source.group} ${arrow} ${d.target.group}\n(${d.value} apps)`);
                        

                    gView.selectAll("rect.node")
                        .data(graph.nodes)
                        .join("rect")
                            .classed("node", true)
                            .attr("x", d => d.x0)
                            .attr("y", d => d.y0)
                            .attr("width", d => d.x1 - d.x0)
                            .attr("height", d => d.y1 - d.y0)
                            .attr("fill", d => d.color)
                            .append("title")
                            .text(d => `${d.group}\n(${d.value} apps)`);

                    gView.selectAll("labels.node")
                        .data(graph.nodes)
                        .join("text")
                            .attr("x", d => d.x0)
                            .attr("y", d => (d.y0 + d.y1)/2)
                                .text(d => `${d.group}`)
                                .attr("dy", 5)
                                .attr("text-anchor", d=>d.week.index<3?"start":"end")
                                .attr("dx", d=>d.week.index<3?(nodeWidth+5):-5);

                    
                    
                




} // sankey



        init(stepSel1,1)
	    init(stepSel2,2)
        init(stepSel3,3)


//***************ACA SE MODIFICAN EN CADA STEP
        
        
 

function scrollyTelling(containerNumber,step,entra){
	if(containerNumber == 1){  //GRAFICO PRIMER SCROLLY
		switch (step) {

			case 0: // seguridad
                    d3.selectAll(".link").transition().duration(400).attr("stroke-opacity",0.5);
			break;

            case 1: // seguridad
                    d3.selectAll(".link").transition().duration(400)
                    .attr("stroke-opacity",d=>{
                        if (d.source.layer == 1 && d.target.group == "no" && d.source.group == "no") return 1;
                        if (d.source.layer == 2 && d.target.group == "privados" && d.source.group == "no") return 1;
                        if (d.source.layer == 3 && d.target.group == "Fuera del País" && d.source.group == "privados") return 1;
                        return 0.5;
                    });
			break;

            case 2: // seguridad
                    d3.selectAll(".link").transition().duration(400)
                    .attr("stroke-opacity",d=>{
                        if (d.source.layer == 1 && d.target.group == "si" && d.source.group == "si") return 1;
                        if (d.source.layer == 2 && d.target.group == "publicos" && d.source.group == "si") return 1;
                        if (d.source.layer == 3 && d.target.group == "En el país" && d.source.group == "publicos") return 1;
                        return 0.5;
                    });
			break;

            case 3: // seguridad
                    d3.selectAll(".link").transition().duration(400)
                    .attr("stroke-opacity",d=>{
                        if (d.source.layer == 1 && d.target.group == "no" && d.source.group == "no") return 0.5;
                        if (d.source.layer == 2 && d.target.group == "privados" && d.source.group == "no") return 0.5;
                        if (d.source.layer == 3 && d.target.group == "Fuera del País" && d.source.group == "privados") return 0.5;
                        if (d.source.layer == 1 && d.target.group == "si" && d.source.group == "si") return 0.5;
                        if (d.source.layer == 2 && d.target.group == "publicos" && d.source.group == "si") return 0.5;
                        if (d.source.layer == 3 && d.target.group == "En el país" && d.source.group == "publicos") return 0.5;
                        if (d.source.layer != 0 ) return 1;
                        return 0.5;
                    });
			break;

         
   
      
	    }

	}else if(containerNumber == 2){

        switch (step) {
			case 0: // testeos y positivos 
              
			break;
      
	    }
              
    }else {

        switch (step) {
			case 0: // testeos y positivos 
              
			break;
      
	    }

    }
        

}



//********** funciones
 
        function measureWidth(){
        const context = document.createElement("canvas").getContext("2d");
        return text => context.measureText(text).width;
        }

        function wrap(text, width) {
                text.each(function() {
                    var text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1, // ems
                        y = text.attr("y"),
                        dy = 13,
                        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "px");
                    while (word = words.pop()) {
                        line.push(word);
                        tspan.text(line.join(" "));
                            if (tspan.node().getComputedTextLength() > width) {
                                line.pop();
                                tspan.text(line.join(" "));
                                line = [word];
                                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "px").text(word);
                            }
                    }
                    });
                }


}