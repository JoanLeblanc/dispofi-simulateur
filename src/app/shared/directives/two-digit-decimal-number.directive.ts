import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimaNumber]'
})
export class TwoDigitDecimaNumberDirective {
  // On accepte les nombres et les décimals (maximun 2)
  private regex: RegExp = new RegExp(/^\d*\.*\,?\d{0,2}$/g);
  // On permet l'utilisation de certaines touches dans l'input
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // On vérifie si la touche est une qui se trouve dans specialKeys
    if (this.specialKeys.indexOf(event.key) !== -1) {
        // Si oui on laisse l'utilisateur faire son action
        return;
    }

    // On récupère la valeur de l'input avant la nouvelle entrée de l'utilisateur
    let current: string = this.el.nativeElement.value;

    // On construit la valeur qui est voulue par l'utilisateur
    // A savoir la valeur ancienne + la nouvelle entrée
    const nextValue: string = current + event.key

    // On verifie que la nouvelle valeur `nextValue` correspond toujours à la regex
    console.log('next ', nextValue)
    if (nextValue && !String(nextValue).match(this.regex)) {
        // Si non on empêche l'utilsateur sa nouvelle entrée
        event.preventDefault();
    }
  }
}