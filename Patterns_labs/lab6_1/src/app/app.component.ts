import { Component } from '@angular/core';
import { Item } from "src/app/model";     
import { template } from  "src/app/view";
 


@Component({
    selector: 'lab6_1',
    template: template
})
export class AppComponent { 
    text: string;
    price: number = 0;
     
    items: Item[] = 
    [
        { purchase: "Хлеб", done: false, price: 15.9 },
        { purchase: "Масло", done: false, price: 60 },
        { purchase: "Картофель", done: true, price: 22.6 },
        { purchase: "Сыр", done: false, price:310 }
    ];
    addItem(text: string, price: number): void {
         
        if(text==null || text.trim()=="" || price==null)
            return;
        this.items.push(new Item(text, price));
    }

    deleteItem(text: string, price: number): void {
        let count = 0;
        if(text==null || text.trim()=="" || price==null)
            return;
        for (let item in this.items){
            if (this.items[item].purchase == text && this.items[item].price){
                this.items.splice(count, 1);
                return
            }
            count += 1;
        }
    }
}