class Ingredient {
    constructor(ingredient) {
        this.ingredient = ingredient;
    }
    
    describe() {
        return `The price is ${this.ingredient}`;
    }
}

class Food {
    constructor(name) {
        this.name = name;
        this.foods = [];
    }

    describe() {
        return `The food listed is ${this.name}.`;
    }
}

class Menu {
    constructor() {
        this.foods = [];
        this.selectedFood = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while(selection != 0) {
            switch(selection) {
                case '1':
                    this.addFoodItem();
                    break;
                case '2':
                    this.deleteFoodItem();
                    break;
                case '3':
                    this.displayFoodItem();
                    break;
                case '4':
                    this.viewFoodItem();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            1 - Add a Food Item
            2 - Delete a Food Item
            3 - Display Food Item
            4 - View Food Item
            0 - Exit
        `);
    }

    addFoodItem() {
        let name = prompt('Enter the name of a food you want to add on the menu:');
        this.foods.push(new Food(name)); 
    }

    deleteFoodItem() {
        let index = prompt('Enter the index of the food you wish to delete on the menu:');
        if (index > -1 && index < this.foods.length) {
            this.foods.splice(index, 1);
        }
    }

    displayFoodItem() {
        let foodString = '';
        for (let i = 0; i < this.foods.length; i++) {
            foodString += i + ') ' + this.foods[i].name + '\n';
        }
        alert(foodString);
    }

    showFoodMenuOptions(foodInfo) {
        return prompt(`
            1) Add Ingredient
            2) Delete Ingredient
            0) Go Back
            ---------------
            ${foodInfo}
            Enter an index to add or delete an ingredient for the specified food.
        `);
    }

    viewFoodItem() {
        let index = prompt('Enter the index of the food you wish to view:');
        if (index > -1 && index < this.foods.length) {
            this.selectedFood = this.foods[index];
            let description = 'Food name: ' + this.selectedFood.name + '\n';

            for (let i = 0; i < this.selectedFood.foods.length; i++) {
                description += i + ') ' + this.selectedFood.foods[i].ingredient + '\n';
            }

            let selection = this.showFoodMenuOptions(description);
            switch(selection) {
                case '1':
                    this.addIngredient();
                    break;
                case '2':
                    this.deleteIngredient();
                    break;
                default:
                    selection = 0;
            }
        }
    }

    addIngredient() {
        let inVal = prompt('Enter the ingredients for making this food');
        this.selectedFood.foods.push(new Ingredient(inVal));
    }

    deleteIngredient() {
        let index = prompt('Delete the ingredient for the specified food');
        if (index > -1 && index < this.selectedFood.foods.length) {
            this.selectedFood.foods.splice(index, 1);        
        }
    }
}

let food = new Menu();
food.start();