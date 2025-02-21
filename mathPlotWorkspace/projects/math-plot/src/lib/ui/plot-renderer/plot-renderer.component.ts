import {Component, computed, input} from '@angular/core';
import {PlotterConfig} from '../../models/plotterConfig';

@Component({
  selector: 'lib-plot-renderer',
  standalone: true,
  imports: [],
  templateUrl: './plot-renderer.component.html',
  styleUrl: './plot-renderer.component.css'
})
export class PlotRendererComponent {
  //config = input.required<PlotterConfig>()
  //points = input.required<{x:number,y:number}[]>()
  plottedPoints: string = ''
  //p = computed(() => 'M' + this.points().map(p => p.x + ' ' + p.y).join(', '))
}
