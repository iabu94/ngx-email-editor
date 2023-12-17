import { Component, signal } from '@angular/core';
import { DndDraggableDirective, DndDropEvent } from 'ngx-drag-drop';

interface DraggableItem {
  content: string;
}

interface Slice {
  id: number;
  element?: string;
}

interface Container {
  id: number;
  slices: Slice[];
}

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  standalone: true,
  imports: [DndDraggableDirective],
})
export class SimpleComponent {
  draggables: DraggableItem[] = [
    {
      content: 'input',
    },
    {
      content: 'textarea',
    },
    {
      content: 'dropdown',
    },
    {
      content: 'container',
    },
  ];

  containers = signal<Container[]>([]);

  public lastDropEvent: DndDropEvent | null = null;

  onDrop(event: DndDropEvent, containerId: number, sliceId: number) {
    this.containers.update((containers) => {
      const container = containers.find((c) => c.id === containerId);
      if (container) {
        container.slices[sliceId].element = event.data;
      }
      return [...containers];
    });

    this.lastDropEvent = event;
  }

  getSliceWidthClass(length: number): { [klass: string]: string } {
    const width = parseFloat((100 / length).toFixed(2));
    return {
      width: `${width}%`,
    };
  }

  onDropContainer(event: DndDropEvent) {
    const slices = 3;
    if (event.data === 'container') {
      const container: Container = {
        id: this.containers().length + 1,
        slices: [],
      };
      for (let i = 0; i < slices; i++) {
        container.slices.push({
          id: i,
        });
      }
      this.containers.update((containers) => [...containers, container]);
    }
  }
}
