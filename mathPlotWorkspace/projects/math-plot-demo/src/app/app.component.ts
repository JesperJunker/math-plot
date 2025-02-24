import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RendererComponent } from 'math-plot';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RendererComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'math-plot-demo';
}
