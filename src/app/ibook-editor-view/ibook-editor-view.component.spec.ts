import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbookEditorViewComponent } from './ibook-editor-view.component';

describe('IbookEditorViewComponent', () => {
  let component: IbookEditorViewComponent;
  let fixture: ComponentFixture<IbookEditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IbookEditorViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IbookEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
