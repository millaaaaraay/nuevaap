import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemediosDetailPage } from './remedios-detail.page';

describe('RemediosDetailPage', () => {
  let component: RemediosDetailPage;
  let fixture: ComponentFixture<RemediosDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
