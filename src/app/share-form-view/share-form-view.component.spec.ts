import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFormViewComponent } from './share-form-view.component';

describe('ShareFormViewComponent', () => {
  let component: ShareFormViewComponent;
  let fixture: ComponentFixture<ShareFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
