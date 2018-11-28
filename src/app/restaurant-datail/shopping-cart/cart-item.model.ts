import { MenuItem } from '../menu-item/menu-item.model'

export class CartItem {
    constructor(public menuItem: MenuItem,
    public quantity: number = 1){}

    value(): number {
        return this.menuItem.price * this.quantity
    }
    nome(): string {
        return this.menuItem.name
    }
}


// Essa classe representa cada item adicionado no carrinho de compras, devido
// a necessidade de realizar cálculos de acordo com a adição ou a remoção
//dos items

// O construtor vai receber um item do menu e a quantidade com o valor 1, pois a 
//cada click um elemento é adicionado

//O método value() irá retornar o valor da quantidade adicionada