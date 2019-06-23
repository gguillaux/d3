let dados = []
let bar_number = randBetween(10, 20);   // number of bars to plot
let mult_factor = 40;                   // multiplying factor for random numbers

// width and height are linked to the css file
let svg_width = 1000;
let svg_height = 500;


let bar_padding = 5;                    // space between bars
let bar_height_factor = 8;
let aux_x = Math.floor(svg_width / bar_number)  // ration to place each bar proportionally
let bar_width =  aux_x - bar_padding;


// aux function to generate random numbers between range
function randBetween(min, max){
    let r = Math.floor(Math.random() * (max - min) + min);
    console.log(r);
    return r;
}

// generate array of random numbers
for (let i = 0; i < bar_number; i++){
    let aux = Math.floor(Math.random() * mult_factor);
    dados.push(aux);
}

// log to check values of generated array
console.log(dados);

// select chart html element by id and insert svg
let svg = d3.select('#chart_test')
                .append('svg')
                .attr('width', svg_width)
                .attr('height', svg_height);                


// bind data and insert bars
let bars = svg.selectAll('rect')
    .data(dados)
    .enter()
    .append('rect')
    .attr('x', function(d, i){return i * aux_x;})
    .attr('y', function ( d ) {return svg_height - (d * bar_height_factor)})
    .attr('width', bar_width)
    .attr('height', function ( d ) {return d * bar_height_factor});

// apply green color to the svg
bars.attr('fill', '#7ED26D')

// add text labels to the bar chart
let text_label = svg.selectAll('text')
                    .data(dados)
                    .enter()
                    .append('text')
                    .text(function(d){return d})
                    .attr('x', function(d, i){return i * aux_x + (bar_width / 2);})
                    .attr('y', function ( d ) {return svg_height - (d * bar_height_factor) - 5}) // to place on top of the bar
                    //.attr('y', function ( d ) {return svg_height - (d * bar_height_factor) + 15})  // to inside of the bar
                    //.attr('fill', '#fff')                                                          // case inside, font might be white
                    .attr('font-size', 14)
                    .attr('text-anchor', 'middle');


// add title                    
let title = svg.append('text')
                .attr('x', svg_width / 2)
                .attr('y', 30)
                .attr('text-anchor', 'middle')
                .text('Bar graph with random ' + bar_number + ' values')
                .attr('font-size', 25);
