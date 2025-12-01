import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Module } from '../../../../../../core/models/module.model';
import { CARD_STYLES } from '../../../../../../shared/styles/card-styles';

@Component({
  selector: 'app-modules-card',
  imports: [],
  templateUrl: './modules-card.html',
})
export class ModulesCard {
  @Output() clickCard = new EventEmitter<Module | null>();

  @Input() data: Module | null = null;
  @Input() title: string = 'Adicionar Novo Módulo';

  private _stylesCard = CARD_STYLES['default'];
  @Input() set stylesCard(value: any) {
    this._stylesCard = value || CARD_STYLES['default'];
    this.styleCard = {
      background: this._stylesCard.background,
      border: this._stylesCard.border,
      text: this._stylesCard.text,
      icon: this._stylesCard.icon,
      isNewModule: this._stylesCard.isNewModule ?? false,
      size: this._stylesCard.size,
    }
  }
  styleCard = this._stylesCard;


  onClickCard(): void {
    this.clickCard.emit(this.data);
  }

  getLowercaseName(): string {
    return (this.data?.name || "").toLowerCase();
  }

  get stylesCard() {
    return this._stylesCard;
  }
}
