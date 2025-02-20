import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlotterDirective } from 'math-plot';
import { FormulaRendererComponent } from '../../../math-plot/src/lib/ui/formula-renderer/formula-renderer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlotterDirective, FormulaRendererComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'math-plot-demo';
}
