import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemediosEditPage } from './remedios-edit.page';

describe('RemediosEditPage', () => {
  let component: RemediosEditPage;
  let fixture: ComponentFixture<RemediosEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
