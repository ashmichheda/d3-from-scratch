// Defining margin
var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;


    var x = d3.scaleBand().range([0, width]).padding(0.5);
    var y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("data.csv", function(error, data) {
        if (error) {
            console.log("Error: Loading the data!")
        }


    data.forEach(function(d) {
      d.total = +d.total;
      d.year = d.year;       // try removing the + and see what the console prints
    });

    // sort the gdp values
    data.sort(function(a,b) {
      return b.year - a.year;
    });

    x.domain(data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x))
     .append("text")
     .attr("y", height - 200)
     .attr("x", width - 200)
     .attr("font-size", "17px")
     .attr("text-anchor", "end")
     .attr("fill", "black")
     .attr("font-family", "calibri")
     .text("Year");


    g.append("g")
     .call(d3.axisLeft(y).tickFormat(function(d){
         return d;
     }).ticks(10))
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("x", -150)
     .attr("dy", "-5.1em")
     .attr("font-size", "17px")
     .attr("text-anchor", "middle")
     .attr("fill", "black")
     .attr("font-family", "calibri")
     .text("Total points Won");

     g.selectAll(".bar")
         .data(data)
         .enter()
         .append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver)
         .on("mouseout", onMouseOut)
         .attr("x", function(d) { return x(d.year); })
         .attr("y", function(d) { return y(d.total); })
         .attr("width", x.bandwidth())
         .attr("height", function(d) { return height - y(d.total); });


      svg.append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("text-align", "center")
      .attr("font-family", "calibri")
      .text("Performance Analysis of Rafael Nadal (10 Years)")



    });

// adding animation and interaction

// mouseover event handler function
function onMouseOver(d, i){
  d3.select(this).attr('class', 'highlight');
    d3.select(this)
      .transition()
      .duration(400)
      .attr('opacity', 0.6)
      .attr('width', x.bandwidth() + 10)
      .attr("y", function(d) { return y(d.total) - 10; })
      .attr("height", function(d) { return height - y(d.total) + 10; });

    g.append("text")
     .attr('class', 'val') // add class to text label
     .attr('fill', 'purple')
     .attr('font-weight', 'bold')
     .attr('x', function() {
         return x(d.year);
     })
     .attr('y', function() {
         return y(d.total) - 15;
     })
     .text(function() {
         return [d.total + ' points in '+ d.year];  // Value of the text
     });
     g.append('line')
        .attr('id', 'limit')
        .attr('x1', 0)
        .attr('y1', y(d.total) - 10)
        .attr('x2', width)
        .attr('y2', y(d.total) - 10)
        .attr('stroke', 'red')
}

function onMouseOut(d, i){
  d3.select(this).attr('class', 'bar');
        d3.select(this)
          .transition()
          .duration(600)
          .attr('opacity', 2)
          .attr('width', x.bandwidth())
          .attr("y", function(d) { return y(d.total); })
          .attr("height", function(d) { return height - y(d.total); });

        d3.selectAll('.val')
          .remove()
  g.selectAll('#limit').remove()
}

b1.onclick = function () {

    this.remove();
    var totalAces = 0;
    d3.csv("data.csv", function(error, data) {
        if (error) {
            console.log("Error: Loading the data!")
        }
    data.forEach(function(d) {
      d.total = +d.total;
      d.year = d.year;
    });
    for(var i = 0; i<data.length; i++){
      totalAces += data[i].total;
    }
    var value = document.getElementById("info").innerHTML = totalAces+" points won by Nadal from 2004 to 2014";

  });
};
