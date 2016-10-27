var height = 700;
var width = 1500;
var margin = 30;
var dataRange = [0, 100];
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var XScale = d3.scaleLinear()
    .domain([1, 10])
    .range([0, innerWidth]);

var YScale = d3.scaleLinear()
    .domain(dataRange)
    .range([innerHeight, 0]);

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var showData = function(data) {
    var dataGroup = d3.select('.dataGroup');
    var svg = d3.select('svg');

    XScale = d3.scaleLinear()
        .domain([1, data.length])
        .range([0, innerWidth]);

    var xAxis = d3.axisBottom(XScale).ticks(10);
    svg.select('.xAxis').call(xAxis);

    var circle = dataGroup.selectAll('circle').data(data);

    circle
        .enter()
        .append('circle')
        .attr('cx', function(d, index) {return XScale(index + 1);})
        .attr('cy', function(d) {return YScale(d);})

    circle
        .attr('cx', function(d, index) {return XScale(index + 1);})
        .attr('cy', function(d) {return YScale(d);})    

    circle.exit().remove();

    var line = d3.line()
        .x(function(d, index) {return XScale(index + 1);})
        .y(function(d) {return YScale(d);});

    dataGroup.select('path').remove();

    dataGroup.append('path')
        .attr('d', line(data))
        .classed('line', true);


    //Bar Chart 
    var chart = d3.select(".chart")
        .attr("width", innerWidth)
        .attr("height", innerHeight);  

    var barWidth = innerWidth / (data.length*4);

    var bars = chart.selectAll('rect').data(data);

    bars.enter().append("rect")
      .attr("x", function(d,i) { return XScale(i+1); })
      .attr("y", function(d) { return YScale(d); })
      .attr("height", function(d) { return innerHeight - YScale(d); })
      .attr("width", barWidth);

    bars
      .attr("y", function(d) { return YScale(d); })
      .attr("height", function(d) { return innerHeight - YScale(d); })

    bars.exit().remove();

}

var createChart = function() {
    var container = d3.select('.container');
    var svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);

    var xAxis = d3.axisBottom(XScale);
    var yAxis = d3.axisLeft(YScale);

    svg.append('g')
        .call(xAxis)
        .classed('xAxis', true)
        .attr('transform', translate(margin, height - margin));

    svg.append('g')
        .call(yAxis)
        .classed('yAxis', true)
        .attr('transform', translate(margin, margin));

    svg.append('g')
        .classed('dataGroup', true)
        .attr('transform', translate(margin, margin));

    svg.append('g')
        .classed('chart', true)
        .attr('transform', translate(margin, margin));
}

var load = function() {
    var lineInterval;
    createChart();
    var data = genrateNumbers();
    var button = document.getElementById('play-pause');
    button.onclick = function(){
        if (button.textContent =="Pause") {
            clearInterval(lineInterval);
            button.textContent = "Play";
            return;
        }
        lineInterval = setInterval(function() {
        showData(data);
        data = updateData(data);
        }, 500);
        button.textContent = "Pause";
    };
    button.onclick();
};

window.onload = load;

