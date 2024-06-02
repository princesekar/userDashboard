import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
} from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements AfterViewInit {
  @Input()
  title: string | undefined;

  @Input()
  content: string | undefined;

  @Input()
  buttonText: string | undefined;

  @Input()
  routePath: string | undefined;

  @ContentChild('cardTemplate')
  cardTemplate: TemplateRef<any> | null = null;

  @ContentChild('cardHeader')
  cardHeader: TemplateRef<any> | null = null;

  @ContentChild('cardFooter')
  cardFooter: TemplateRef<any> | null = null;

  @Output()
  cardClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngAfterViewInit() {}

  onClick() {
    this.cardClick.emit(this.routePath);
  }
}
