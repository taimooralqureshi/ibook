import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import {
  QuillModules,
  Range,
  SelectionChange,
} from 'ngx-quill';
import { takeWhile } from 'rxjs';
import { serverResponse } from 'src/shared/types';
import { AppService } from '../app.service';
import { getIbookContent, updateIbookContent } from '../Store/actions';
import { AppState } from '../Store/reducers';
import { selectIbookContent } from '../Store/Selectors';

@Component({
  selector: 'app-ibook-editor-view',
  templateUrl: './ibook-editor-view.component.html',
  styleUrls: ['./ibook-editor-view.component.css'],
})
export class IbookEditorViewComponent implements OnDestroy, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('preview') preview!: ElementRef;

  public content = '';
  public timeoutId: any;
  public selectedText: string = '';
  public selectedTextData: serverResponse | undefined = undefined;
  public quillConfiguration: QuillModules = {};
  public preventSingleClick: boolean = false;
  public editMode: boolean = true;

  private isComponentAlive: boolean;

  constructor(
    private apollo: Apollo,
    private appService: AppService,
    private store: Store<AppState>
  ) {
    this.isComponentAlive = true;

    this.store.dispatch(getIbookContent());
    this.store.select(selectIbookContent).subscribe((content) => {
      this.content = content;
    });

    this.appService.bookEditMode
      .pipe(takeWhile(() => this.isComponentAlive))
      .subscribe((mode: boolean) => {
        this.store.dispatch(updateIbookContent({ newContent: this.content }));
        this.editMode = mode;
      });
  }

  ngAfterViewInit(): void {
    this.preview?.nativeElement.addEventListener(
      'dblclick',
      this.clickOnPreview.bind(this)
    );
    this.preview?.nativeElement.addEventListener(
      'click',
      this.clickOnPreview.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }

  public onSelectionChanged(event: SelectionChange): void {
    const selectedRange: Range = event.editor.getSelection(true);
    if (this.preventSingleClick) {
      this.selectedText = event.editor
        .getText(selectedRange?.index, selectedRange?.length)
        .trim();
      this.selectedText && this.getSelectedWordData(this.selectedText);
    }
    this.preventSingleClick = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.preventSingleClick = false;
      if (!selectedRange.length) {
        this.drawer.close();
        return;
      }
    }, 200);
  }

  public getSelectedWordData(selectedWord: string): void {
    this.apollo
      .watchQuery({
        query: gql`
          query Words {
            words(word: $word) @rest(type: "words", path: "{args.word}") {
              word
              meanings
              phonetics
            }
          }
        `,
        variables: { word: selectedWord },
      })
      .valueChanges.subscribe((result: any) => {
        this.selectedTextData =
          result?.data?.words && (result.data.words[0] as serverResponse);
        this.drawer.open();
      });
  }

  public setEditMode(mode: boolean): void {
    this.editMode = mode;
  }

  public clickOnPreview(): void {
    const selection = window.getSelection();
    this.selectedText = '';

    if (selection && !selection.isCollapsed) {
      const spanText = this.preview?.nativeElement.textContent;
      const selectionText = selection.toString();
      if (spanText.includes(selectionText)) {
        this.selectedText = selectionText;
      }
    }

    if (this.preventSingleClick) {
      this.selectedText && this.getSelectedWordData(this.selectedText);
    }
    this.preventSingleClick = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.preventSingleClick = false;
      if (!this.selectedText.length) {
        this.drawer.close();
        return;
      }
    }, 200);
  }
}
