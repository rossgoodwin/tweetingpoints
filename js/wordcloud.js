(function() {

$.getJSON("http://54.148.103.250/", function(candidateTweets){

  $("#loadinggif").fadeOut("slow");

  function fill1(x) {
    var blues = ["#3498DB", "#59ABE3", "#4183D7", "#4B77BE", "#19B5FE", "#3A539B", "#89C4F4", "#446CB3"];
    var y = x % blues.length;
    return blues[y];
  }

  function fill2(x) {
    var reds = ["#D24D57", "#F22613", "#D91E18", "#96281B", "#EF4836", "#E74C3C", "#C0392B", "#D64541"];
    var y = x % reds.length;
    return reds[y];    
  }

  for (var n=0;n<candidateTweets.length;n++) {
    var layout = d3.layout.cloud()
        .size([600, 600])
        .words(candidateTweets[n]["words"].map(function(d) {
          return {text: d[0], size: d[1] * 10};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Cousine")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);
    layout.start();
  }

  function draw(words) {
    var overallContainer = d3.select("#vis")
                            .append("div")
                            .attr("class", "col-lg-6 col-md-12 col-sm-12 col-xs-12 transparent")
                            .style("opacity", 0.0);

    var svgContainer = overallContainer.append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .attr("class", "svg-cont");

    var wordCloud = svgContainer.append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Cousine")
        .style("fill", function(d, i) {
            if (candidateTweets[n]['party'] === 'D') {
              return fill1(i);
            } else {
              return fill2(i);
            }
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

    var labelText = overallContainer
                    .append("a")
                    .attr("href", "https://twitter.com/"+candidateTweets[n]['name'])
                    .attr("class", "twitter-link")
                    .text('@'+candidateTweets[n]['name']);

    overallContainer.transition()
        .style("opacity", 1.0)
        .delay(3000)
        .duration(3000);
  }

});

})();