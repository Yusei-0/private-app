import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPhotoPage } from './edit-photo.page';

describe('EditPhotoPage', () => {
  let component: EditPhotoPage;
  let fixture: ComponentFixture<EditPhotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
