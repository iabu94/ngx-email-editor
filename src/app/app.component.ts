import { Component } from '@angular/core';
import { NgCdkDndComponent } from './ng-cdk-dnd/ng-cdk-dnd.component';
import { SimpleComponent } from './simple/simple.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SimpleComponent, NgCdkDndComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngx-email-editor';
}
