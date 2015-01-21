// Data: Average age of employees in an organization
var employees = [
  {dept: 'A', age : 22},
  {dept: 'B', age : 26},
  {dept: 'C', age : 35},
  {dept: 'D', age : 30},
  {dept: 'E', age : 27}
];

function createChart() {
  var maxHeight = 100;
  var maxWidth = 400;
  var barPadding = 0.01;
  var margins = {
    left: 20,
    top: 20
  };

  // Define your conversion functions
  var convert = {
    x: d3.scale.ordinal(),
    y: d3.scale.linear()
  };

  // Define the output range of your conversion functions
  convert.y.range([maxHeight, 0]);
  convert.x.rangeRoundBands([0, maxWidth], barPadding);

  // Define your axis
  var axis = {
    x: d3.svg.axis().orient('bottom'),
    y: d3.svg.axis().orient('left')
  };
  // Define the conversion function for the axis points
  axis.x.scale(convert.x);
  axis.y.scale(convert.y);

  // Once you get your data, compute the domains
  convert.x.domain(employees.map(function (d) {
      return d.dept;
    })
  );
  convert.y.domain([0, maxHeight]);

  var chart = d3.select('.chart')
    .attr({width: maxWidth})
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
        return 'translate(' + convert.x(d.dept) + ', 0)';
      },
      class: 'bar'
    });

  bars.append('rect')
    .attr({
      y: function (d, i) {
        return convert.y(d.age);
      },
      width: convert.x.rangeBand(),
      height: function (d, i) {
        return maxHeight - convert.y(d.age);
      }
    })
    .classed({'bar ': true});

  chart.append('g') // Container for the axis
    .attr({
      class: 'x axis',
      transform: 'translate(0,' + maxHeight + ')'
    })
    .call(axis.x); // Insert an axis inside this node

  chart.append('g') // Container for the axis
    .attr({
      class: 'y axis',
      height: maxHeight
    })
    .call(axis.y); // Insert an axis inside this node

  return chart;
}

function instantChange(chart) {
  chart.selectAll('.bar rect')
    .on({
      mouseover: function (d, i) {
        d3.select(this)
          .attr({class: 'current'});
      },
      mouseout: function (d, i) {
        d3.select(this)
          .attr({class: ''});
      }
    });
}

function instantChangeOptimize(chart) {

  chart.on({
    mouseover: function (d, i) {
      var target = d3.event.target;
      var classList = target.classList;

      if (classList.contains('bar')) {
        classList.add("current");
      }

    },

    mouseout: function (d, i) {
      var target = d3.event.target;
      var classList = target.classList;
      if (classList.contains('bar')) {
        classList.remove("current");
      }

    },
  });
}

// var chart = createChart();

// instantChange(chart);
// instantChangeOptimized(chart);


// .attr("class", "enter")
//       .attr("dy", ".35em")
//       .attr("y", -60)
//       .attr("x", function(d, i) { return i * 32; })
//       .style("fill-opacity", 1e-6)
//       .text(function(d) { return d; })
//     .transition()
//       .duration(750)
//       .attr("y", 0)
//       .style("fill-opacity", 1);

function animateBarsUp() {
  var maxHeight = 500;
  var maxWidth = 500;
  var barPadding = 0.01;
  var maxAge = 65;
  var margins = {
    left: 50,
    top: 20
  };

  // Define your conversion functions
  var convert = {
    x: d3.scale.ordinal(),
    y: d3.scale.linear()
  };

  // Define the output range of your conversion functions
  convert.y.range([maxHeight, 0]);
  convert.x.rangeRoundBands([0, maxWidth - margins.left], barPadding);

  // Define your axis
  var axis = {
    x: d3.svg.axis().orient('bottom'),
    y: d3.svg.axis().orient('left')
  };
  // Define the conversion function for the axis points
  axis.x.scale(convert.x);
  axis.y.scale(convert.y);

  // Once you get your data, compute the domains
  convert.x.domain(employees.map(function (d) {
      return d.dept;
    })
  );
  convert.y.domain([0, maxAge]);

  var chart = d3.select('.chart')
    .attr({width: maxWidth})
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
        return 'translate(' + convert.x(d.dept) + ', 0)';
      },
      class: 'bar'
    });

  bars.append('rect')
    .classed({'bar ': true})
    .attr({
      y: maxHeight,
      height: 0,
      width: convert.x.rangeBand(),
    })
    .transition()
    .delay(300)
    .attr({
      y: function (d, i) {
        return convert.y(d.age);
      },
      height: function (d, i) {
        return maxHeight - convert.y(d.age);
      }
    });

  chart.append('g') // Container for the axis
    .attr({
      class: 'x axis',
      transform: 'translate(0,' + maxHeight + ')'
    })
    .call(axis.x); // Insert an axis inside this node

  chart.append('g') // Container for the axis
    .attr({
      class: 'y axis',
      height: maxHeight
    })
    .call(axis.y); // Insert an axis inside this node

  return chart;
}

animateBarsUp();
