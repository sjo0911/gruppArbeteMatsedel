export class Meal {
  _id: string;
  mealName: string;
  mealDate: Date;
  foodSpecs: string[];

  // foodSpecsHTML = function() : string {
  //   let returnString : string = '';
  //   this.foodSpecs.forEach(foodSpec => {
  //     if(foodSpec === 'vego') {
  //       returnString += `<i class="fas fa-seedling"></i>`;
  //     } else if(foodSpec === 'gurka') {
  //       returnString += `<i class="fas fa-pepper-hot"></i>`;
  //     } else if(foodSpec === 'pig') {
  //       returnString += `<i class="fas fa-bacon"></i>`;
  //     }
  //   });
  //   return returnString;
  // }

  constructor(){
    this.foodSpecs = new Array();
  }

  foodSpecsHTML() : string{
    let returnString : string = '';
    this.foodSpecs.forEach(foodSpec => {
      if(foodSpec === 'vego') {
        returnString += `<i class="fas fa-seedling"></i>`;
      } else if(foodSpec === 'gurka') {
        returnString += `<i class="fas fa-pepper-hot"></i>`;
      } else if(foodSpec === 'pig') {
        returnString += `<i class="fas fa-bacon"></i>`;
      }
    });
    return returnString;
  }

}
