// To select all svg elements on this page
const svg = d3.select('svg');
// set an inline style
//svg.style('background-color', 'red')
// Lets start making a face
const height = parseFloat(svg.attr('height'));
const width = parseFloat(svg.attr('width'));


// creating a group element to inline the arc to the center of the face
const g = svg.append('g')
          .attr('transform', `translate(${width/2}, ${height/2})`);
const circle = g.append('circle');
circle.attr('r', height/2)
      .attr('fill', 'yellow')
      .attr('stroke', 'black');

const eyeSpacing = 100;
const eyeOffSet = -70;
const eyeRadius = 25;
const eyeBrowWidth = 70;
const eyeBrowHeight = 10;


const leftEye = g
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', - eyeSpacing)
    .attr('cy', eyeOffSet)
    .attr('fill', 'black');

const rightEye = g
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing)
    .attr('cy', eyeOffSet)
    .attr('fill', 'black');

// creating eyebrows
const leftEyebrow = g
  .append('rect')
    .attr('x', -eyeSpacing - eyeBrowWidth/2)
    .attr('y', -120)
    .attr('width', eyeBrowWidth)
    .attr('height', eyeBrowHeight);


// creating animation effect on right brow for it to move up
// Here we use transition
const rightEyebrow = g
  .append('rect')
    .attr('x', eyeSpacing - eyeBrowWidth/2)
    .attr('y', -120)
    .attr('width', eyeBrowWidth)
    .attr('height', eyeBrowHeight)
  .transition().duration(950)
    .attr('y', -120 - 40);

// creating mouth
const mouth = g
  .append('path')
    .attr('d', d3.arc()({
      innerRadius: 140,
      outerRadius: 170,
      startAngle: Math.PI / 2,
      endAngle: Math.PI * 3/2
    }));
