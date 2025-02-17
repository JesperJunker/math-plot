import { Directive, ElementRef, Renderer2, OnInit  } from '@angular/core';

@Directive({
  selector: '[libPlotter]',
  standalone: true
})
export class PlotterDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  createCircle(cx: string, cy: string, r: string) {
    const circle = this.renderer.createElement('circle')
    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r)
    return circle
  }

  createLine(x1: string, y1: string, x2: string, y2: string, rotation: string) {
    const line = this.renderer.createElement('line')
    line.setAttribute('x1', x1)
    line.setAttribute('y1', y1)
    line.setAttribute('x2', x2)
    line.setAttribute('y2', y2)
    const center_x = (Number(x2)+Number(x1))/2
    const center_y = (Number(y2)+Number(y1))/2
    line.setAttribute('transform', 'rotate(' + rotation + ' ' + center_x + ' ' + center_y + ')')
    return line
  }

  ngOnInit() {
    console.log('initiating plotter directive')
    const svg = this.renderer.createElement('svg', 'svg')
    svg.setAttribute('viewBox', '0 0 202 202')
    svg.setAttribute('stroke', 'black')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('height', '200')
    svg.setAttribute('width', '200')
    let circle = this.createCircle('101', '101', '100')
    this.renderer.appendChild(svg, circle)
    circle = this.createCircle('101', '101', '75')
    this.renderer.appendChild(svg, circle)
    circle = this.createCircle('101', '101', '50')
    this.renderer.appendChild(svg, circle)
    circle = this.createCircle('101', '101', '25')
    this.renderer.appendChild(svg, circle)
    let line = this.createLine('1', '101', '201', '101', '0')
    this.renderer.appendChild(svg, line)
    line = this.createLine('1', '101', '201', '101', '-30')
    this.renderer.appendChild(svg, line)
    line = this.createLine('1', '101', '201', '101', '-60')
    this.renderer.appendChild(svg, line)
    line = this.createLine('1', '101', '201', '101', '-90')
    this.renderer.appendChild(svg, line)
    line = this.createLine('1', '101', '201', '101', '-120')
    this.renderer.appendChild(svg, line)
    line = this.createLine('1', '101', '201', '101', '-150')
    this.renderer.appendChild(svg, line)
    let plotPath = this.renderer.createElement('path')
    plotPath.setAttribute('stroke', 'blue')
    plotPath.setAttribute('d', 'M101 1, 109.41859828293693 4.774981310094162, 116.03837331804353 15.71314680475568, 119.30127018922192 32.69872981077806, 118.10100716628344 54.01536896070457, 111.9381654946615 77.54302839901956, 101 101, 86.15474944503154 122.20121498966547, 68.86061951567305 139.3022221559489, 51 151, 34.65860518310615 156.66703992264195, 21.87598847637763 156.40322932223233, 14.397459621556138 151, 13.457390193440688 141.8217893676735, 19.62023186506265 130.61981327260239, 32.69872981077805 119.30127018922194, 51.759612349389556 109.68240888334653, 75.21658395037005 103.25575661131498, 100.99999999999999 101, 126.78341604962999 103.255756611315, 150.24038765061042 109.68240888334651, 169.3012701892219 119.30127018922194, 182.37976813493736 130.61981327260236, 188.5426098065593 141.8217893676735, 187.60254037844388 150.99999999999997, 180.1240115236224 156.40322932223233, 167.34139481689385 156.66703992264198, 151.00000000000006 151.00000000000006, 133.13938048432695 139.30222215594887, 115.84525055496846 122.20121498966546, 101.00000000000001 101.00000000000003, 90.06183450533852 77.5430283990196, 83.89899283371658 54.015368960704656, 82.69872981077805 32.69872981077803, 85.96162668195647 15.713146804755667, 92.58140171706303 4.774981310094162, 100.99999999999999 1, 109.4185982829369 4.774981310094205, 116.03837331804354 15.713146804755723, 119.3012701892219 32.698729810778104, 118.10100716628342 54.01536896070459, 111.9381654946615 77.54302839901953, 101.00000000000003 100.99999999999996, 86.1547494450316 122.20121498966542, 68.8606195156731 139.30222215594884, 50.999999999999986 151.00000000000003, 34.65860518310616 156.66703992264195, 21.875988476377643 156.40322932223236, 14.397459621556152 151.00000000000006, 13.457390193440702 141.82178936767355, 19.620231865062607 130.61981327260247, 32.69872981077796 119.30127018922195, 51.75961234938946 109.68240888334654, 75.21658395036985 103.25575661131501, 100.99999999999977 101, 126.78341604963003 103.25575661131498, 150.24038765061047 109.68240888334651, 169.30127018922195 119.30127018922197, 182.37976813493736 130.61981327260233, 188.54260980655928 141.8217893676735, 187.60254037844385 151, 180.1240115236224 156.40322932223233, 167.3413948168939 156.66703992264198, 151.00000000000017 151.00000000000017, 133.1393804843271 139.302222155949, 115.84525055496849 122.20121498966549, 100.99999999999994 100.9999999999999, 90.06183450533852 77.54302839901965, 83.89899283371656 54.015368960704535, 82.6987298107781 32.69872981077819, 85.96162668195639 15.713146804755695, 92.58140171706307 4.774981310094219, 100.99999999999997 1z')
    this.renderer.appendChild(svg, plotPath)
    this.renderer.appendChild(this.elementRef.nativeElement, svg)
  }
}
