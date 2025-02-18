import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlotterDirective } from 'math-plot';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlotterDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'math-plot-demo';
}
