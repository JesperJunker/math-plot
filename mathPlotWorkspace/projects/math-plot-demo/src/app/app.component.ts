import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RendererComponent } from 'math-plot';
import { ReactiveFormsModule } from '@angular/forms';
import { FormulaRendererComponent } from 'formula-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RendererComponent,
    ReactiveFormsModule,
    FormulaRendererComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  formula = '(sin(x)^3+2)/5';
  testi() {
    this.formula = 'sin(x)';
  }
  title = 'math-plot-demo';
}
