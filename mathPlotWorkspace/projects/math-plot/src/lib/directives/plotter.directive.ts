import { Directive, ElementRef, Renderer2, OnInit, Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Directive({
  selector: '[libPlotter]',
  standalone: true
})
export class PlotterDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  createCircle(cx: string, cy: string, r: string) {
    const circle = this.renderer.createElement('circle')
    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r)
    return circle
  }

  ngOnInit() {
    console.log('initiating plotter directive')
    const svg = this.renderer.createElement('svg', 'svg')
    svg.setAttribute('viewBox', '0 0 202 202')
    svg.setAttribute('stroke', 'black')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('height', '200')
    svg.setAttribute('width', '200')
    let circle = this.createCircle('100', '100', '100')
    this.renderer.appendChild(svg, circle)
    circle = this.createCircle('100', '100', '75')
    this.renderer.appendChild(svg, circle)
    circle = this.createCircle('100', '100', '50')
    this.renderer.appendChild(svg, circle)
    circle = this.createCircle('100', '100', '25')
    this.renderer.appendChild(svg, circle)
    //this.renderer.appendChild(this.elementRef.nativeElement, svg)
    this.document.getElementById('asdf')?.appendChild(svg);
  }
}
