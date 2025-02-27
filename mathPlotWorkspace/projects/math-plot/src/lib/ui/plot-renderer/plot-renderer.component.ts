import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PlotterConfig } from '../../models/plotterConfig';

@Component({
  selector: 'plot-renderer',
  standalone: true,
  imports: [],
  templateUrl: './plot-renderer.component.html',
  styleUrl: './plot-renderer.component.css',
})
export class PlotRendererComponent implements AfterViewInit {
  renderer = inject(Renderer2);
  config = input.required<PlotterConfig>();
  @ViewChild('plotter') elementRef!: ElementRef;
  plottedPoints = effect(() => this.calculate(this.config().points));
  change = effect(() => this.changeGraph(this.config().planeType));
  private plotPath = this.renderer.createElement('path', 'svg');
  private svg = this.renderer.createElement('svg', 'svg');
  private circles: SVGCircleElement[] = [];
  private lines: SVGLineElement[] = [];

  calculate(input: { x: number; y: number }[]) {
    if (!input || !input.length) {
      return;
    }
    let points = [];
    let conf = this.config();
    const scale = 100;
    if (conf.planeType === 'Polar') {
      const offset = 101;
      for (
        let i = conf.start;
        i <= Math.min(conf.end, input.length - conf.start);
        i++
      ) {
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
      const margin = 10;
      if (this.lines.length > 3) {
        let x =
          (-min_x * scale * (width - 2 * margin)) / ((max_x - min_x) * 100) +
          margin;
        x = Math.max(0, Math.min(width - margin, x));
        let y =
          height -
          margin -
          (-min_y * scale * (height - 2 * margin)) / ((max_y - min_y) * 100);
        y = Math.max(0, Math.min(height - margin, y));
        this.lines[0].setAttribute('y1', String(y));
        this.lines[0].setAttribute('y2', String(y));
        this.lines[3].setAttribute('x1', String(x));
        this.lines[3].setAttribute('x2', String(x));
      }
      for (
        let i = 0;
        i <= Math.min((conf.end - conf.start) * 100, input.length - 1);
        i++
      ) {
        points.push([
          ((input[i].x - min_x) * scale * (width - 2 * margin)) /
            ((max_x - min_x) * 100) +
            margin,
          height -
            margin -
            ((input[i].y - min_y) * scale * (height - 2 * margin)) /
              ((max_y - min_y) * 100),
        ]);
      }
    }
    this.plotPath.setAttribute(
      'd',
      'M' + points.map((p) => p[0] + ' ' + p[1]).join(', ')
    );
  }

  createCircle(cx: string, cy: string, r: string): SVGCircleElement {
    const circle = this.renderer.createElement('circle', 'svg');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    this.renderer.appendChild(this.svg, circle);
    return circle;
  }

  createLine(
    x1: string,
    y1: string,
    x2: string,
    y2: string,
    rotation: string
  ): SVGLineElement {
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
    this.renderer.appendChild(this.svg, line);
    return line;
  }

  ngAfterViewInit() {
    this.svg.setAttribute('viewBox', '0 0 202 202');
    this.svg.setAttribute('stroke', 'rgba(0,0,0,.4)');
    this.svg.setAttribute('fill', 'none');
    this.svg.setAttribute('height', '200');
    this.svg.setAttribute('width', '200');
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.appendChild(this.elementRef.nativeElement, this.svg);
    this.startup();
  }

  startup() {
    this.circles.push(this.createCircle('101', '101', '100'));
    this.circles.push(this.createCircle('101', '101', '75'));
    this.circles.push(this.createCircle('101', '101', '50'));
    this.circles.push(this.createCircle('101', '101', '25'));
    this.lines.push(this.createLine('1', '101', '201', '101', '0'));
    this.lines.push(this.createLine('1', '101', '201', '101', '-30'));
    this.lines.push(this.createLine('1', '101', '201', '101', '-60'));
    this.lines.push(this.createLine('101', '1', '101', '201', '0'));
    this.lines.push(this.createLine('101', '1', '101', '201', '-30'));
    this.lines.push(this.createLine('101', '1', '101', '201', '-60'));
    this.plotPath.setAttribute('stroke', 'blue');
    this.renderer.appendChild(this.svg, this.plotPath);
  }

  changeToCartesian() {
    for (let circle of this.circles) {
      circle.setAttribute('opacity', '0');
    }
    for (let line of this.lines) {
      line.setAttribute('opacity', '0');
    }
    this.lines[0].setAttribute('opacity', '1');
    this.lines[3].setAttribute('opacity', '1');
  }

  changeToPolar() {
    for (let circle of this.circles) {
      circle.setAttribute('opacity', '1');
    }
    for (let line of this.lines) {
      line.setAttribute('opacity', '1');
    }
    this.lines[0].setAttribute('y1', '101');
    this.lines[0].setAttribute('y2', '101');
    this.lines[3].setAttribute('x1', '101');
    this.lines[3].setAttribute('x2', '101');
  }

  changeGraph(planeType: string) {
    if (planeType) {
      if (planeType === 'Polar') {
        this.changeToPolar();
      } else {
        this.changeToCartesian();
      }
    }
  }
}
