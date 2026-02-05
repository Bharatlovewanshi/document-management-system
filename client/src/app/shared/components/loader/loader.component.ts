import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="flex items-center gap-2 text-gray-600">
      <span class="animate-spin">⏳</span>
      <span>{{ text }}</span>
    </div>
  `
})
export class LoaderComponent {
  @Input() text = 'Loading...';
}

