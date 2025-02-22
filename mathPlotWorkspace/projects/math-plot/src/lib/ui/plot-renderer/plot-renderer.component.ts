import {Component, input} from '@angular/core';
import {PlotterConfig} from '../../models/plotterConfig';
import {PlotterDirective} from '../../directives/plotter.directive';

@Component({
  selector: 'lib-plot-renderer',
  standalone: true,
  imports: [
    PlotterDirective
  ],
  templateUrl: './plot-renderer.component.html',
  styleUrl: './plot-renderer.component.css'
})
export class PlotRendererComponent {
  config = input.required<PlotterConfig>()
}
