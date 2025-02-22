import {Component, effect, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlotterConfig} from '../../models/plotterConfig';
import {JsonPipe} from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-plotter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, JsonPipe
  ],
  templateUrl: './plotter-form.component.html',
  styleUrl: './plotter-form.component.css'
})
export class PlotterFormComponent {
  formState = output<PlotterConfig>()
  readonly fb = new FormBuilder()
  formulaGroup = this.fb.group({
    start: [0],
    end: [360],
    formula: ['sin(3*x)', Validators.required],
    type: ['Polar', Validators.required]
  })

  changes= toSignal(this.formulaGroup.valueChanges)
  eff = effect(() => {
    console.log(this.changes());
    this.formState.emit({
    formula: this.formulaGroup.value.formula!,
    start: +(this.formulaGroup.value.start ?? 0),
    end: +(this.formulaGroup.value.end ?? 0),
    planeType: this.formulaGroup.value.type!,
    points: []
  })})
}
