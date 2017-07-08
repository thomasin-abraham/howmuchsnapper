import moment from 'moment'

export default function createGraph (data) {
  const dim = setDimensions() // Set dimensions of graph
  const times = setTime(data) // Parse time of data, return inital left bound of zoom and max time
  const scales = setScales(data, dim) // Set the X and Y scales to use
  let path = createValueLine(data, scales)
  let { g, svg } = createContainers(dim)
  const gXAx = drawAxes(dim, svg, scales)
  const zoom = createZoom(dim, scales, gXAx, g, path)
  svg.call(zoom)
  drawPath(data, g, path, dim.margin)
  initialZoom(svg, dim, times, scales, zoom)
}

function initialZoom (svg, {width, margin}, { xScaleMax, initialZoomX }, { xScale }, zoom) {
  svg.transition() // Zoom to a 2 week selection
    .duration(1500)
    .call(zoom.transform, d3.zoomIdentity
      .scale((width-margin.left) / (xScale(xScaleMax) - xScale(initialZoomX)))
      .translate((-xScale(initialZoomX)), 0))
}

function redrawChart (e, xScale, gXAx, g, path) {
  let t = e.transform
  let xt = t.rescaleX(xScale)
  let xAxis = d3.axisBottom(xt)
  gXAx.call(xAxis)
  g.select("#snapperPath").attr('d', path.x(function (d) { return xt(d.DateTime) }))
}

function setDimensions () {
  const margin = {top: 8, right: 8, bottom: 56, left: 56}
  const width = document.getElementById('svgContainer').clientWidth - margin.left - margin.right
  const height = document.getElementById('svgContainer').clientHeight - margin.bottom - margin.top
  return { width, height, margin }
}

function setTime (data) {
  const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S')
  const minOr2Weeks = moment.max(moment(data[0].DateTime), moment(data[data.length - 1].DateTime).subtract(2, 'week')).format('YYYY-MM-DD HH:mm:ss') // Either two weeks from latest date or the minimum date if two weeks ago is beyond the data
  data.forEach((row) => { // Parse all times into d3 land
    row.DateTime = parseTime(moment.utc(row.DateTime).format('YYYY-MM-DD HH:mm:ss'))
  })
  const maxDate = d3.max(data, (d) => d.DateTime )
  return {
    initialZoomX: parseTime(minOr2Weeks),
    xScaleMax: maxDate
  }
}

function drawAxes({ height, width, margin }, svg, { xScale, yScale }) {
  drawYAxis(svg, margin, yScale)
  drawGridLines(svg, width, margin, yScale)
  return drawXAxis(svg, height, margin, xScale)
}

function drawXAxis (svg, height, margin, xScale) {
  return svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
    .attr('class', 'axisLabel bottomAxis')
    .call(d3.axisBottom(xScale))
}

function drawYAxis (svg, margin, yScale) {
  svg.append("g")
    .attr('class', 'axisLabel leftAxis')
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    .call(d3.axisLeft(yScale)
      .tickFormat((t) => `$${t}.00`))
}

function drawGridLines(svg, width, margin, yScale) {
  svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    .attr("class", "grid")
    .attr("width", width)
    .call(d3.axisLeft(yScale)
      .tickSize(-width + margin.left)
      .tickFormat("")
     )
}

function createContainers ({ width, height, margin}) {
  let svg = d3.select('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)

  let g = svg.append('g')
    .attr("width", (width - margin.left))
    .attr("height", (height))
    .attr('transform', 'translate(' + margin.left + ',' + 0  + ')')

  return { g, svg }
}

function setScales (data, dim) {
  return {
    xScale: setScaleX(data, dim),
    yScale: setScaleY(data, dim)
  }
}

function setScaleX (data, dim) {
  return d3.scaleTime() // Define x scale
      .range([0, (dim.width - dim.margin.left)])
      .domain(d3.extent(data, (d) => d.DateTime))
}

function setScaleY (data, dim) {
  return d3.scaleLinear() // Define y scale
    .range([(dim.height - dim.margin.bottom - dim.margin.top), 0])
    .domain(d3.extent(data, (d) => d.Balance))
}

function createValueLine (data, { xScale, yScale }) {
  return d3.line() // Define graph curve for the data
    .curve(d3.curveStepAfter)
    .x((d) => xScale(d.DateTime))
    .y((d) => yScale(d.Balance))
}

function drawPath (data, g, path) {
  g.append('path') // Draw line for that curve
    .data([data])
    .attr('id', 'snapperPath')
    .attr('d', path)
}

function createZoom ({ width, height, margin }, { xScale }, gXAx, g, path) {
  return d3.zoom()
    .scaleExtent([1, 1000])
    .translateExtent([[0, 0], [(width-margin.left), height]])
    .extent([[0, 0], [(width-margin.left), height]])
    .on('zoom', () => {redrawChart(d3.event, xScale, gXAx, g, path)})
}
