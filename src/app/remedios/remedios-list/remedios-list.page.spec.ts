import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemediosListPage } from './remedios-list.page';

describe('RemediosListPage', () => {
  let component: RemediosListPage;
  let fixture: ComponentFixture<RemediosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
