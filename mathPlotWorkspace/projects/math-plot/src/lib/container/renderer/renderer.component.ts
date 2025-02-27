import {Component, computed, input, InputSignal, OnInit, signal} from '@angular/core';
import { mathTree, MathTreeNode, NumberNode } from '../../util/math-tree';
import { PlotRendererComponent } from '../../ui/plot-renderer/plot-renderer.component';
import { PlotterFormComponent } from '../../ui/plotter-form/plotter-form.component';
import { PlotterConfig } from '../../models/plotterConfig';

@Component({
  selector: 'math-plot',
  standalone: true,
  imports: [PlotRendererComponent, PlotterFormComponent],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.css',
})
export class RendererComponent implements OnInit {
  formula = '';
  tree: MathTreeNode = new NumberNode('0');
  config: InputSignal<PlotterConfig> = input.required<PlotterConfig>();
  form = input<boolean>()
  c = computed(() => this.formChanges(this.config() || new PlotterConfig()))
  conf = signal(new PlotterConfig())

  formChanges(event: PlotterConfig) {
    this.formula = event.formula;
    let points = [];
    this.tree = mathTree(event.formula);
    if (this.tree) {
      if (event.planeType === 'Cartesian') {
        for (let i = 0; i <= (event.end - event.start) * 100; i++) {
          let y = this.tree.calculate(i / 100 + event.start, false);
          if (isFinite(y)) {
            points.push({x: i / 100 + event.start, y});
          } else {
            return;
          }
        }
      } else {
        for (let i = event.start; i <= event.end; i++) {
          let radius = this.tree.calculate(i, true);
          if (isFinite(radius)) {
            points.push({
              x: radius,
              y: radius,
            });
          } else {
            return;
          }
        }
      }
      this.conf.set({...event, points});
    }
  }

  ngOnInit() {
    this.formChanges(this.config())
  }
}
