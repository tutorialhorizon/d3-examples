function scaleEperiment() {

  var convert = {
    x: d3.scale.linear(),
    y: d3.scale.linear()
  };

  convert.x.range([0, 100]);
  convert.y.range([0, 200]);

  convert.x.domain([0, 10]);
  convert.y.domain([0, 100]);

  console.log(convert.x(3));
  console.log(convert.y(3));

}

function drawARectangle () {

  var chart = d3.select('.chart');
  var bar = chart.append('g');
  bar.append('rect')
    .attr('width', 20)
    .attr('height', 50);

}

function d3InvertedBars() {
  var scale = {
    y: d3.scale.linear()
  };

  scale.y.range([0, 100]);
  scale.y.domain([0, 100]);

  var chart = d3.select('.chart');
  var ages = [10, 20, 30, 40];
  var barWidth = 20;

  var bars = chart
    .selectAll('g')
    .data(ages)
    .enter()
    .append('g');

  bars.append('rect')
    .attr('x', function (d, i) {
      return i * barWidth;
    })
    .attr('width', 20)
    .attr('height', scale.y);
}

function d3CorrectBars() {
  var scale = {
    y: d3.scale.linear()
  };
  var maxHeight = 100;

  scale.y.range([maxHeight, 0]);
  scale.y.domain([0, 100]);

  var chart = d3.select('.chart');
  var ages = [10, 20, 30, 40, 90];
  var barWidth = 20;

  var bars = chart
    .selectAll('g')
    .data(ages)
    .enter()
    .append('g');

  bars.append('rect')
    .attr('x', function (d, i) {
      return i * barWidth;
    })
    .attr('y', scale.y)
    .attr('width', barWidth)
    .attr('height', function (d, i) {
      return maxHeight - scale.y(d);
    });
}

function d3CorrectSpacedBars() {
  var scale = {
    y: d3.scale.linear()
  };
  var maxHeight = 100;

  scale.y.range([maxHeight, 0]);
  scale.y.domain([0, 100]);

  var chart = d3.select('.chart');
  var ages = [10, 20, 30, 40, 90];
  var barWidth = 20;

  var bars = chart
    .selectAll('g')
    .data(ages)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return 'translate(' + (i * barWidth)+ ', 0)';
    });

  bars.append('rect')
    .attr('y', scale.y)
    .attr('width', barWidth - 1)
    .attr('height', function (d, i) {
      return maxHeight - scale.y(d);
    });
}


function nestedData() {
  var scale = {
    y: d3.scale.linear()
  };
  var maxHeight = 100;

  scale.y.range([maxHeight, 0]);
  scale.y.domain([0, 100]);

  var chart = d3.select('.chart');

  // Average age of employees in an organization
  var employees = [
    {dept: 'A', age : 22},
    {dept: 'B', age : 26},
    {dept: 'C', age : 35},
    {dept: 'D', age : 30},
    {dept: 'D', age : 27}
  ];
  var barWidth = 40;

  var bars = chart
    .selectAll('g')
    .data(employees)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return 'translate(' + (i * barWidth)+ ', 0)';
    });

  bars.append('rect')
    .attr('y', function (d, i) {
      return scale.y(d.age);
    })
    .attr('width', barWidth - 1)
    .attr('height', function (d, i) {
      return maxHeight - scale.y(d.age);
    });
}

function chartWithAxis() {
  var maxHeight = 100;
  var maxWidth = 400;
  var barPadding = 0.01;

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
    x: d3.svg.axis()
      .orient('bottom') // The positioning of the markers
  };
  // Define the conversion function for the axis points
  axis.x.scale(convert.x);

  // Data: Average age of employees in an organization
  var employees = [
    {dept: 'A', age : 22},
    {dept: 'B', age : 26},
    {dept: 'C', age : 35},
    {dept: 'D', age : 30},
    {dept: 'E', age : 27}
  ];

  // Once you get your data, compute the domains
  convert.x.domain(employees.map(function (d) {
      return d.dept;
    })
  );
  convert.y.domain([0, maxHeight]);

  var chart = d3.select('.chart')
    .attr('width', maxWidth);

  var bars = chart
    .selectAll('g')
    .data(employees)
    .enter()
    .append('g') // Container for the each bar
    .attr('transform', function (d, i) {
      return 'translate(' + convert.x(d.dept) + ', 0)';
    });

  bars.append('rect')
    .attr('y', function (d, i) {
      return convert.y(d.age);
    })
    .attr('width', convert.x.rangeBand())
    .attr('height', function (d, i) {
      return maxHeight - convert.y(d.age);
    });

  chart.append("g") // Container for the axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + maxHeight + ")")
    .call(axis.x); // Insert an axis inside this node
}


function fullBarChart() {
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

  // Data: Average age of employees in an organization
  var employees = [
    {dept: 'A', age : 22},
    {dept: 'B', age : 26},
    {dept: 'C', age : 35},
    {dept: 'D', age : 30},
    {dept: 'E', age : 27}
  ];

  // Once you get your data, compute the domains
  convert.x.domain(employees.map(function (d) {
      return d.dept;
    })
  );
  convert.y.domain([0, maxHeight]);

  var chart = d3.select('.chart')
    .attr('width', maxWidth)
    .append('g')
    .attr('transform', function (d, i) {
      return 'translate(' + margins.left + ',' + margins.top + ')';
    });

  var bars = chart
    .selectAll('g')
    .data(employees)
    .enter()
    .append('g') // Container for the each bar
    .attr('transform', function (d, i) {
      return 'translate(' + convert.x(d.dept) + ', 0)';
    });

  bars.append('rect')
    .attr('y', function (d, i) {
      return convert.y(d.age);
    })
    .attr('width', convert.x.rangeBand())
    .attr('height', function (d, i) {
      return maxHeight - convert.y(d.age);
    });

  chart.append('g') // Container for the axis
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + maxHeight + ')')
    .call(axis.x); // Insert an axis inside this node

  chart.append('g') // Container for the axis
    .attr('class', 'y axis')
    .attr('height', maxHeight)
    .call(axis.y); // Insert an axis inside this node
}

function fullBarChartRefactored() {
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

  // Data: Average age of employees in an organization
  var employees = [
    {dept: 'A', age : 22},
    {dept: 'B', age : 26},
    {dept: 'C', age : 35},
    {dept: 'D', age : 30},
    {dept: 'E', age : 27}
  ];

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
        }
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
}

// d3CorrectBars();
// d3InvertedBars();
// d3CorrectSpacedBars();

// nestedData();

// chartWithAxis();
// fullBarChart();

fullBarChartRefactored();
