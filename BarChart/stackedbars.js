// var companyStats = {
//   'Tesla': [
//     {dept: 'A', age : 22},
//     {dept: 'B', age : 26},
//     {dept: 'C', age : 35},
//     {dept: 'D', age : 30},
//     {dept: 'E', age : 27}
//   ],
//   'Ford': [
//     {dept: 'A', age : 22},
//     {dept: 'B', age : 46},
//     {dept: 'C', age : 35},
//     {dept: 'D', age : 23},
//     {dept: 'E', age : 44}
//   ],
//   'GM': [
//     {dept: 'A', age : 26},
//     {dept: 'B', age : 22},
//     {dept: 'C', age : 37},
//     {dept: 'D', age : 33},
//     {dept: 'E', age : 23}
//   ]
// };

var Tesla = [
  {dept: 'A', employees : 22},
  {dept: 'B', employees : 26},
  {dept: 'C', employees : 35},
  {dept: 'D', employees : 30},
  {dept: 'E', employees : 27}
];

var Ford = [
  {dept: 'A', employees : 22},
  {dept: 'B', employees : 46},
  {dept: 'C', employees : 35},
  {dept: 'D', employees : 23},
  {dept: 'E', employees : 44}
];

var GM = [
  {dept: 'A', employees : 26},
  {dept: 'B', employees : 22},
  {dept: 'C', employees : 37},
  {dept: 'D', employees : 33},
  {dept: 'E', employees : 23}
];

var companies = [Tesla, Ford, GM];

var minBarHeight = 30;

function drawStack() {
  var maxHeight = minBarHeight * Tesla.length;
  var maxWidth = 500;
  var barPadding = 0.05;
  var margins = {
    left: 50,
    top: 20
  };
  var stack = d3.layout.stack();
  stack.y(function (d) {
    return d.employees;
  });

  stack(companies);

  console.log(companies);

  var scale = {
    x: d3.scale.linear()
  };

  var max = d3.max(companies[companies.length - 1], function (d) {
    return d.y0 + d.y;
  });

  x.domain([0, max]);

  // x.domain([0,
  //   d3.max(companies, function (d) {

  //   }
  // )]);

  var chart = d3.select('.chart')
    .append('g')
    .attr({
      width: maxWidth,
      height: maxHeight,
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

  // scale.x.domain([0, ceiling])



}

 drawStack();
