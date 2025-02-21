import {Component, computed, input} from '@angular/core';
import {mathTree} from '../../util/math-tree';
import {FormulaRendererComponent} from '../../ui/formula-renderer/formula-renderer.component';
import {PlotRendererComponent} from '../../ui/plot-renderer/plot-renderer.component';
import {PlotterFormComponent} from '../../ui/plotter-form/plotter-form.component';

@Component({
  selector: 'lib-renderer',
  standalone: true,
  imports: [
    FormulaRendererComponent,
    PlotRendererComponent,
    PlotterFormComponent
  ],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.css'
})
export class RendererComponent {
  formula = input.required<string>()
  tree = computed(() => mathTree(this.formula()))
}
