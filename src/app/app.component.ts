import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkWithSignalsComponent } from './work-with-signals/work-with-signals.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkWithSignalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ang_d_p_d';
}
