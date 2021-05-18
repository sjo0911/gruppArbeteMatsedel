import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMockup } from 'src/app/mockups/menu-mockup';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { WebReqService } from 'src/app/services/web-req.service';
import { HttpClientModule } from '@angular/common/http';
import { DeleteMenuComponent } from './delete-menu.component';

describe('DeleteMenuComponent', () => {
  let component: DeleteMenuComponent;
  let fixture: ComponentFixture<DeleteMenuComponent>;
  let mockup: MenuMockup=new MenuMockup();
  let menu: Menu=new Menu();
  let menuService:MenuService;

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

  it('should delete', () => {
    expect(component.deleteMenu).toBeTruthy();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should have same id', () => {
    component.updateDeleteMenuTitle(mockup.menu)
    expect(menu._id===mockup.menu._id)
  });
});
