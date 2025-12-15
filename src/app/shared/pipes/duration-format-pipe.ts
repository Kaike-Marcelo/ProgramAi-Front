import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true
})
export class DurationFormatPipe implements PipeTransform {

  transform(startAt: string, endAt: string): string {
    if (!endAt || endAt === '' || !startAt || startAt === '') return '';

    try {
      const start = new Date(startAt);
      const end = new Date(endAt);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

      const diffMs = end.getTime() - start.getTime();

      if (diffMs <= 0) return '';

      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMinutes < 1) return `${diffSeconds} seg`;

      if (diffHours < 1) return `${diffMinutes}min`;

      const minutes = diffMinutes % 60;

      if (diffDays < 1) {
        const hours = diffHours;
        if (minutes === 0) {
          return `${hours}h`;
        }
        return `${hours}h:${minutes.toString().padStart(2, '0')}min`;
      }

      const hours = diffHours % 24;

      if (hours === 0 && minutes === 0) {
        return `${diffDays}d`;
      } else if (minutes === 0) {
        return `${diffDays}d:${hours}h`;
      } else {
        return `${diffDays}d:${hours}h:${minutes.toString().padStart(2, '0')}m`;
      }
    } catch {
      return '';
    }
  }
}
