import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, searchTerm: string): string {
    if (!text || !searchTerm) {
      return text;
    }

    const escapedTerm = searchTerm.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    );

    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    return text.replace(
      regex,
      `<mark class="bg-yellow-200 text-black px-1 rounded">$1</mark>`
    );
  }
}
