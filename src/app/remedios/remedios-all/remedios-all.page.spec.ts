import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemediosAllPage } from './remedios-all.page';

describe('RemediosAllPage', () => {
  let component: RemediosAllPage;
  let fixture: ComponentFixture<RemediosAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediosAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
