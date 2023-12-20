import {
  CdkDragDrop,
  CdkDragExit,
  DragDropModule,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-cdk-dnd',
  standalone: true,
  imports: [DragDropModule, NgFor, NgIf],
  templateUrl: './ng-cdk-dnd.component.html',
  styleUrl: './ng-cdk-dnd.component.scss',
})
export class NgCdkDndComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  transferringItem: string | undefined | string[] = undefined;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id !== event.container.id) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.transferringItem = undefined;
  }

  entered(event: any) {
    this.transferringItem = undefined;
  }

  exited(e: CdkDragExit<string[]>) {
    this.transferringItem = e.item.data;
  }

  onDragStart() {
    document
      .querySelector('[contenteditable="true"]')
      ?.setAttribute('contenteditable', 'false');
  }

  onDragEnd() {
    document
      .querySelector('[contenteditable="false"]')
      ?.setAttribute('contenteditable', 'true');
  }
}
