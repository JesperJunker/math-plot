import { Directive, ElementRef, Renderer2, OnInit, inject, input  } from '@angular/core';
import { PlotterConfig } from '../models/plotterConfig';

@Directive({
  selector: '[libPlotter]',
  standalone: true
})
export class PlotterDirective implements OnInit {
  elementRef = inject(ElementRef)
  renderer = inject(Renderer2)
  config = input<PlotterConfig>(new PlotterConfig())
  coordinateSystem = null
  curve = null



  calculate() {
    let points = []
    let conf = this.config()
    for(let i = conf.start; i <= conf.end; i++) {
      points.push(
        [
          Math.cos(conf.n/conf.d*2*Math.PI*i/360)*100*Math.cos(2*Math.PI*i/360)+101, 
          Math.cos(conf.n/conf.d*2*Math.PI*i/360)*100*Math.sin(2*Math.PI*i/360)+101
        ]
      )
    }
    return points
  }

  createCircle(cx: string, cy: string, r: string) {
    const circle = this.renderer.createElement('circle', 'svg')
    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r)
    return circle
  }

  createLine(x1: string, y1: string, x2: string, y2: string, rotation: string) {
    const line = this.renderer.createElement('line', 'svg')
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
    let points = this.calculate()
    console.log('initiating plotter directive')
    const svg = this.renderer.createElement('svg', 'svg')
    svg.setAttribute('viewBox', '0 0 202 202')
    svg.setAttribute('stroke', 'black')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('height', '200')
    svg.setAttribute('width', '200')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
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
    let plotPath = this.renderer.createElement('path', 'svg')
    plotPath.setAttribute('stroke', 'blue')
    plotPath.setAttribute('d', 'M' + points.map(x => x.join(' ')).join(', '))
    this.renderer.appendChild(svg, this.renderer.createText('text'))
    this.renderer.appendChild(this.elementRef.nativeElement, svg)
    this.renderer.appendChild(svg, plotPath)
  }
}
