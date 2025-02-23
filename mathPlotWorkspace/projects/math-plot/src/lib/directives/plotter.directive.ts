import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PlotterConfig } from '../models/plotterConfig';

@Directive({
  selector: '[libPlotter]',
  standalone: true,
})
export class PlotterDirective implements OnInit {
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  config = input.required<PlotterConfig>();
  plottedPoints = effect(() => this.calculate(this.config().points));
  private plotPath = this.renderer.createElement('path', 'svg');

  calculate(input: { x: number; y: number }[]) {
    if (!input || !input.length) {
      return;
    }
    let points = [];
    let conf = this.config();
    const scale = 100;
    const offset = 101;
    if (conf.planeType === 'Polar') {
      for (let i = conf.start; i <= conf.end; i++) {
        points.push([
          offset +
            input[i - conf.start].x * scale * Math.cos((Math.PI * i) / 180),
          offset -
            input[i - conf.start].y * scale * Math.sin((Math.PI * i) / 180),
        ]);
      }
    } else {
      const width = 202;
      const height = 202;
      const max_x = Math.max(...input.map((v) => v.x));
      const min_x = Math.min(...input.map((v) => v.x));
      const max_y = Math.max(...input.map((v) => v.y));
      const min_y = Math.min(...input.map((v) => v.y));
      for (let i = 0; i <= (conf.end - conf.start) * 100; i++) {
        points.push([
          ((input[i].x - min_x) * scale * width) / ((max_x - min_x) * 100 + 10),
          height -
            ((input[i].y - min_y) * scale * height) /
              ((max_y - min_y) * 100 + 10),
        ]);
      }
    }
    this.plotPath.setAttribute(
      'd',
      'M' + points.map((p) => p[0] + ' ' + p[1]).join(', ')
    );
  }

  createCircle(cx: string, cy: string, r: string) {
    const circle = this.renderer.createElement('circle', 'svg');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    return circle;
  }

  createLine(x1: string, y1: string, x2: string, y2: string, rotation: string) {
    const line = this.renderer.createElement('line', 'svg');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    const center_x = (Number(x2) + Number(x1)) / 2;
    const center_y = (Number(y2) + Number(y1)) / 2;
    line.setAttribute(
      'transform',
      'rotate(' + rotation + ' ' + center_x + ' ' + center_y + ')'
    );
    return line;
  }

  ngOnInit() {
    const svg = this.renderer.createElement('svg', 'svg');
    svg.setAttribute('viewBox', '0 0 202 202');
    svg.setAttribute('stroke', 'rgba(0,0,0,.4)');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('height', '200');
    svg.setAttribute('width', '200');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    let circle = this.createCircle('101', '101', '100');
    this.renderer.appendChild(svg, circle);
    circle = this.createCircle('101', '101', '75');
    this.renderer.appendChild(svg, circle);
    circle = this.createCircle('101', '101', '50');
    this.renderer.appendChild(svg, circle);
    circle = this.createCircle('101', '101', '25');
    this.renderer.appendChild(svg, circle);
    let line = this.createLine('1', '101', '201', '101', '0');
    this.renderer.appendChild(svg, line);
    line = this.createLine('1', '101', '201', '101', '-30');
    this.renderer.appendChild(svg, line);
    line = this.createLine('1', '101', '201', '101', '-60');
    this.renderer.appendChild(svg, line);
    line = this.createLine('1', '101', '201', '101', '-90');
    this.renderer.appendChild(svg, line);
    line = this.createLine('1', '101', '201', '101', '-120');
    this.renderer.appendChild(svg, line);
    line = this.createLine('1', '101', '201', '101', '-150');
    this.renderer.appendChild(svg, line);
    this.plotPath.setAttribute('stroke', 'blue');
    this.renderer.appendChild(svg, this.renderer.createText('text'));
    this.renderer.appendChild(this.elementRef.nativeElement, svg);
    this.renderer.appendChild(svg, this.plotPath);
  }
}
