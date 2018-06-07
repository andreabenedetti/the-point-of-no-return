var temp = d3.select("#temp-graph"),
    margin = {top: 20, right: 20, bottom: 40, left: 50},
    widthTemp = d3.select("h1.titolo2").node().getBoundingClientRect().width - margin.left - margin.right,
    heightTemp = 700 - margin.top - margin.bottom,
    f = temp.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime2 = d3.timeParse("%Y");

var x1 = d3.scaleTime()
    .rangeRound([0, widthTemp]);

var y1 = d3.scaleLinear()
    .rangeRound([heightTemp, 0]);

var xAxis2 = d3.axisTop(x1)
        .tickSize(heightTemp);

var yAxis2 = d3.axisRight(y1)
    .tickSize(widthTemp);

var line2 = d3.line()
    .x(function(e) { return x1(e.date); })
    .y(function(e) { return y1(e.close); });

var f = d3.select("#temp-graph")
    .attr("width", widthTemp + margin.left + margin.right)
    .attr("height", 700)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("../libs/data/temp2.tsv", function(e) {
  e.date = parseTime2(e.date);
  e.close = +e.close;
  return e;
}, function(error, data) {
  if (error) throw error;

    var dtemp = data;
    
  x1.domain(d3.extent(dtemp, function(e) { return e.date; }));
  y1.domain(d3.extent(dtemp, function(e) { return e.close; }));

  f.append("g")
      .attr("transform", "translate(0," + heightTemp + ")")
      .call(customXAxisTemp);

  f.append("g")
      .call(customYAxisTemp);
    
f.append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "square")
      .attr("stroke-width", 1.5)
      .attr("d", line2);
});
    
    function customXAxisTemp(g) {
  g.call(xAxis2);
        g.select(".domain").attr("stroke","rgba(255,255,255,0.5)").attr("stroke-width",1);
    g.selectAll(".tick line").attr("stroke", "rgba(255,255,255,0.5)").attr("stroke-width",0.5);
        g.selectAll(".tick text").attr("y", 20).attr("fill","white").attr("font-family","Poppins");
}

function customYAxisTemp(g) {
  g.call(yAxis2);
    g.select(".domain").attr("stroke","rgba(255,255,255,0.5)").attr("stroke-width",1);
  g.selectAll(".tick line").attr("stroke", "rgba(255,255,255,0.5)").attr("stroke-dasharray", "2,2").attr("stroke-width",0.5);
  g.selectAll(".tick text").attr("x", -30).attr("fill","white").attr("font-family","Poppins").style("text-anchor","end");
}