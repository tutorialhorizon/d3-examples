var companyStats = {
  'Tesla': [
    {dept: 'A', age : 22},
    {dept: 'B', age : 26},
    {dept: 'C', age : 35},
    {dept: 'D', age : 30},
    {dept: 'E', age : 27}
  ],
  'Ford': [
    {dept: 'A', age : 22},
    {dept: 'B', age : 46},
    {dept: 'C', age : 35},
    {dept: 'D', age : 23},
    {dept: 'E', age : 44},
    {dept: 'F', age : 34}
  ],
  'GM': [
    {dept: 'A', age : 26},
    {dept: 'B', age : 22},
    {dept: 'C', age : 37},
    {dept: 'D', age : 33},
    {dept: 'E', age : 23},
    {dept: 'F', age : 23},
    {dept: 'G', age : 33},
    {dept: 'H', age : 43}
  ]
};

var minBarHeight = 30;

function updateChart(employees) {
  var maxHeight = minBarHeight * employees.length;
  var maxWidth = 500;
  var barPadding = 0.05;
  var maxAge = 65;
  var margins = {
    left: 50,
    top: 20
  };

  // Define your conversion functions
  var convert = {
    x: d3.scale.linear(),
    y: d3.scale.ordinal()
  };

  // Define the output range of your conversion functions
  convert.x.range([0, maxWidth]);
  convert.y.rangeRoundBands([0, maxHeight - margins.top], barPadding);

  // Define your axis
  var axis = {
    x: d3.svg.axis().orient('top'),
    y: d3.svg.axis().orient('left')
  };
  // Define the conversion function for the axis points
  axis.y.scale(convert.y);
  axis.x.scale(convert.x);

  // Once you get your data, compute the domains
  convert.x.domain([0, d3.max(employees, function (d) { return d.age; })]);
  convert.y.domain(employees.map(function (d) {
      return d.dept;
    })
  );

  d3.selectAll("svg > *").remove();

  var chart = d3.select('.chart').attr({width: maxWidth})
    .attr({height: maxHeight})
    .append('g')
    .attr({
        transform: function (d, i) {
          return 'translate(' + margins.left + ',' + margins.top + ')';
        }
      });

  var bars = chart
    .selectAll('g')
    .data(employees)
    .enter()
    .append('g') // Container for the each bar
    .attr({
      transform: function (d, i) {
        return 'translate(0,' + convert.y(d.dept) + ')';
      },
      class: 'bar'
    });

  var barHeight = convert.y.rangeBand();

  bars.append('rect')
    .classed({'bar ': true})
    .attr({
      width: 0,
      height: barHeight,
    })
    .transition()
    .attr({
      width: function (d, i) {
        return convert.x(d.age);
      }
    });

  chart.append('g') // Container for the axis
    .attr({
      class: 'y axis',
      x: 'translate(0, 0)'
    })
    .call(axis.y); // Insert an axis inside this node

  chart.append('g') // Container for the axis
    .attr({
      class: 'x axis',
      width: maxWidth
    })
    .call(axis.x); // Insert an axis inside this node

  return chart;
}


updateChart(companyStats['Tesla']);
// animateBarsUp();

document.querySelector('#companies')
  .addEventListener('change', function (e) {
    console.log(e);
    updateChart(companyStats[this.value]);
  });
