import { Component } from '@angular/core';
import { mathTree, MathTreeNode, NumberNode } from '../../util/math-tree';
import { PlotRendererComponent } from '../../ui/plot-renderer/plot-renderer.component';
import { PlotterFormComponent } from '../../ui/plotter-form/plotter-form.component';
import { PlotterConfig } from '../../models/plotterConfig';

@Component({
  selector: 'lib-renderer',
  standalone: true,
  imports: [PlotRendererComponent, PlotterFormComponent],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.css',
})
export class RendererComponent {
  formula = '';
  tree: MathTreeNode = new NumberNode('0');
  config: PlotterConfig = new PlotterConfig();

  formChanges(event: PlotterConfig) {
    this.formula = event.formula;
    let points = [];
    this.tree = mathTree(event.formula);

    if (event.planeType === 'Cartesian') {
      for (let i = 0; i <= (event.end - event.start) * 100; i++) {
        let y = this.tree.calculate(i / 100 + event.start, false);
        if (isFinite(y)) {
          points.push({ x: i / 100 + event.start, y });
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
    this.config = { ...event, points };
  }

  protected readonly console = console;
}
