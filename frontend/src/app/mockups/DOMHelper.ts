import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
export class DOMHelper <T> {
  private fixture :ComponentFixture<T>;

  constructor(fixture : ComponentFixture<T>) {
    this.fixture = fixture;
  }

  singleTextFromTagName(tagName : string) : string {
    return  this.fixture.debugElement.query(By.css(tagName)).nativeElement.textContent;
  }

  countFromTagName(tagName: string) : number {
    return this.fixture.debugElement.queryAll(By.css(tagName)).length;
  }

  getSpecificElement(tagName: string, arrayNumber : number) {
    return this.fixture.debugElement.queryAll(By.css(tagName))[arrayNumber].nativeElement;
  }

}
