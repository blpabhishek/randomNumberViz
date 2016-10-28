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

var line = d3.line()
        .x(function(d, index) {return XScale(index + 1);})
        .y(function(d) {return YScale(d);});

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var createChart = function() {
    var container = d3.select('.container');
    var svg = container.append('svg')
        .attr('width', innerWidth)
        .attr('height', height);

    var xAxis = d3.axisBottom(XScale).tickSizeInner(-innerHeight);
    var yAxis = d3.axisLeft(YScale).tickSizeInner(-innerWidth);

    svg.append('g')
        .call(xAxis)
        .classed('xAxis', true)
        .attr('transform', translate(margin, height - margin));

    svg.append('g')
        .call(yAxis)
        .classed('yAxis', true)
        .attr('transform', translate(margin, margin));

    svg.append('g')
        .classed('line', true)
        .attr('transform', translate(margin, margin))
        .append('path',line)

    svg.append('g')
        .classed('chart', true)
        .attr('transform', translate(margin, margin));

}

var showData = function(data) {

    var dataLine = d3.select('.line');
    var svg = d3.select('svg');

    XScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, innerWidth]);

    var xAxis = d3.axisBottom(XScale).tickSizeInner(-innerHeight).ticks(20);
    svg.select('.xAxis').call(xAxis);

    dataLine.select('path')
        .attr('d', line(data))
        .attr('transform',null)
        .transition()
        .duration(475)
        .ease(d3.easeLinear)
        .attr('transform','translate('+ XScale(-1) +')');

    //Bar Chart 
    var chart = d3.select(".chart")
        .attr("width", innerWidth)
        .attr("height", innerHeight);  

    var barWidth = innerWidth / (data.length * 4);

    var alignBarSpace = barWidth/2;

    var bars = chart.selectAll('rect').data(data);

    bars.enter().append("rect")
      .attr("x", function(d,index) { return XScale(index+1)-alignBarSpace;})
      .attr("y", function(d) { return YScale(d); })
      .attr("height", function(d) { return innerHeight - YScale(d); })
      .attr("width", barWidth);

    bars
      .attr("y", function(d) { return YScale(d); })
      .attr("height", function(d) { return innerHeight - YScale(d); })
      .attr('transform',null)
      .transition()
      .duration(475)
      .ease(d3.easeLinear)
      .attr('transform','translate('+ XScale(-1) +')');

    bars.exit().remove();
}

var setIntervalButton = function(time){
    var lineInterval;
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
        }, time);
        button.textContent = "Pause";
    };
    button.click();
}

var setToogleButton = function(){
    var button = document.getElementById('toogle');
    button.onclick = function(){
        if (button.textContent =="Bar") {
            d3.select('.chart').attr('visibility', 'visible');
            d3.select('.line').attr('visibility', 'hidden');
            button.textContent = "Line";
            return;
        }
        d3.select('.line').attr('visibility', 'visible');
        d3.select('.chart').attr('visibility', 'hidden');
        button.textContent = "Bar";
    };
    button.click();
}

var load = function() {
    createChart();
    setIntervalButton(500);
    setToogleButton();
};

window.onload = load;