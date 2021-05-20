import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
export class DOMHelper <T> {
  private fixture :ComponentFixture<T>;

  constructor(fixture : ComponentFixture<T>) {
    this.fixture = fixture;
  }

  singleTextFromTagName(tagName : string) : string {
    return  this.fixture.debugElement.query(By.css(tagName)).nativeElement.textContent.trim();
  }

  countFromTagName(tagName: string) : number {
    return this.fixture.debugElement.queryAll(By.css(tagName)).length;
  }

  getSpecificElement(tagName: string, arrayNumber : number) {
    return this.fixture.debugElement.queryAll(By.css(tagName))[arrayNumber].nativeElement;
  }

  //Använd bara om du vet att de bara finns en knapp med den text du skickar in. Annars klickas bara första knappen.
  clickButton(buttonText : string) {
    const buttons = this.fixture.debugElement.queryAll(By.css("button"));
    const button = buttons.filter(button => {
      return button.nativeElement.textContent.trim() === buttonText;
    })[0]
    console.log(button);
    button.nativeElement.click();
  }

  clickAllButtons(tagName: string) {
    const updateButtons = this.fixture.debugElement.queryAll(By.css(tagName));
    updateButtons.forEach((button) => {
      button.nativeElement.click();
    })
  }

}
