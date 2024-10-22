import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemediosAddPage } from './remedios-add.page';

describe('RemediosAddPage', () => {
  let component: RemediosAddPage;
  let fixture: ComponentFixture<RemediosAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediosAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
