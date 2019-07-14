// width and height must be linked to the css file
let svg_width = 1000;
let svg_height = 500;

// global variables
let mult_factor = 100;
let bar_number =  randBetween(10, 25);   // number of bars to plot or size of random array
let bar_padding = 0.05;                  // space between bars
let area_usage = 0.9;

// generate random array
let dados = generateRandomData(mult_factor);

// log to check values of generated array
console.log(dados);

// scales
let x_scale = d3.scaleBand()
                .domain( d3.range( bar_number ) )
                .rangeRound( [ 0, svg_width] )
                .paddingInner( bar_padding );
            
let y_scale = d3.scaleLinear()
                .domain( [ 0, d3.max( dados )  ] ) 
                .range( [ 0, svg_height * area_usage] ); // 10% of the area as free


// ================================================
// aux function to generate random numbers between range
function randBetween(min, max){
    let r = Math.floor(Math.random() * (max - min) + min);
    console.log(r);
    return r;
}

function randomHex() {
    return "#" + Math.random().toString(16).slice(2, 8);
}

// generate random data for the bar graph
function generateRandomData(factor) {
    let dados = []

    // generate array of random numbers
    for (let i = 0; i < bar_number; i++){
        let aux = Math.floor(Math.random() * factor);
        dados.push(aux);
    }
    return dados;
}

function insertBars(svg) {
    // bind data and insert bars
    let bars = svg.selectAll('rect')
                    .data(dados)
                    .enter()
                    .append('rect')                    
                    .attr('fill', '#7ED26D')     // apply green color to the svg
                    .attr('x', function( d, i ){ return x_scale( i ); } )
                    .attr('y', function ( d ) {return svg_height - y_scale( d ) } )
                    .attr('width', x_scale.bandwidth() )
                    .attr('height', function ( d ) {return y_scale( d ) } );
    return bars
}                

function insertBarsLabels (svg) {
    // add text labels to the bar chart
    let text_labels = svg.selectAll('text')
                        .data(dados)
                        .enter()
                        .append('text')
                        .text(function(d){return d})
                        .attr('x', function( d, i ){return x_scale(i) + (x_scale.bandwidth() / 2);})
                        .attr('y', function ( d ) {return svg_height - y_scale( d ) - 5}) // to place on top of the bar
                        //.attr('fill', '#fff')                                                          // case inside, font might be white
                        .attr('font-size', 14)
                        .attr('text-anchor', 'middle');
    return text_labels
}

function generateGraphAtOpening (svg) {
    insertBars(svg);
    insertBarsLabels(svg);
}

// ================================================

// select chart html element by id and insert svg
let svg = d3.select('.barchart_t')
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height);                


generateGraphAtOpening(svg);

// events

d3.select('button')
    .on('click', function() {
        console.log("clicou!");

        let dados_novos = generateRandomData(d3.max(dados));
        console.log(dados);

        // update rectangles
        svg.selectAll('rect')
            .data(dados_novos)
            .transition()
            .duration(800)
            .attr('fill', randomHex())
            .attr('y', function ( d ) {return svg_height - y_scale( d ) } )
            .attr('height', function ( d ) {return y_scale( d ) } );


        // update labels
        svg.selectAll('text')
            .data(dados_novos)
            .transition()
            .duration(800)
            .text( function( d ){ return d } )
            .attr('x', function( d, i ){return x_scale( i ) + (x_scale.bandwidth() / 2);})
            .attr('y', function ( d ) {return svg_height - y_scale( d ) - 5})
            .attr('font-size', 14)
            .attr('text-anchor', 'middle');

    }
);

