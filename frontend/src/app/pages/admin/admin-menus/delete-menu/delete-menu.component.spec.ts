import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DeleteMenuComponent } from './delete-menu.component';

describe('DeleteMenuComponent', () => {
  let component: DeleteMenuComponent;
  let fixture: ComponentFixture<DeleteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMenuComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
