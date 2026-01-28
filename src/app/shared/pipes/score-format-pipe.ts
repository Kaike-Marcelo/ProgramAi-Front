import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreFormat'
})
export class ScoreFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    
    const num = Number(value);
    if (value == null || value == '' || isNaN(num)) return '0';

    const options = {
      useSuffix: true,
      decimalPlaces: 1,
      thousandSeparator: true
    };

    return this.formatScore(num, options);
  }

  private formatScore(num: number, options: any): string {
    const absNum = Math.abs(num);
    
    if (options.useSuffix && absNum >= 1000000000) {
      const formatted = (num / 1000000000).toFixed(options.decimalPlaces);
      return this.cleanDecimal(formatted) + 'B';
    }
    
    if (options.useSuffix && absNum >= 1000000) {
      const formatted = (num / 1000000).toFixed(options.decimalPlaces);
      return this.cleanDecimal(formatted) + 'M';
    }
    
    if (options.useSuffix && absNum >= 1000) {
      const formatted = (num / 1000).toFixed(options.decimalPlaces);
      return this.cleanDecimal(formatted) + 'K';
    }
    
    if (options.thousandSeparator && absNum >= 1000) {
      return num.toLocaleString('pt-BR');
    }
    
    if (!Number.isInteger(num)) {
      const fixed = num.toFixed(2);
      return this.cleanDecimal(fixed);
    }
    
    return num.toString();
  }

  private cleanDecimal(value: string): string {
    return value.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
  }
}
