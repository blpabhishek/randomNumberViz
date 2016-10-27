var height = 700;
var width = 1500;
var margin = 30;

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var showData = function(data) {
    var dataGroup = d3.select('.dataGroup');
    var svg = d3.select('svg');

    var dataRange = [0, 100];

    var XScale = d3.scaleLinear()
        .domain([1, data.length])
        .range([0, width - (2 * margin)]);

    var YScale = d3.scaleLinear()
        .domain(dataRange)
        .range([height - (2 * margin), 0]);

    var xAxis = d3.axisBottom(XScale);
    var yAxis = d3.axisLeft(YScale);

    svg.select('.xAxis').call(xAxis);
    svg.select('.yAxis').call(yAxis);

    var circle = dataGroup.selectAll('circle').data(data);

    circle
        .enter()
        .append('circle')
        .attr('cx', function(d, index) {return XScale(index + 1);})
        .attr('cy', function(d) {return YScale(d);})
        .append('title').text(function(d) {
            return d;
        });

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
}

var createChart = function() {
    var container = d3.select('.container');
    var svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);

    var XScale = d3.scaleLinear()
        .domain([1, 10])
        .range([0, width - (2 * margin)]);

    var YScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height - (2 * margin), 0]);

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
        }, 250);
        button.textContent = "Pause";
    };
    button.onclick();
};

window.onload = load;

