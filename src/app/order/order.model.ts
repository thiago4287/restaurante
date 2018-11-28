class Order {
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public id?: string
    ) {}
}

class OrderItem {
    constructor(public quantity: number, public menuId: string){}
    /*
     Esse construtor será necessário quando formos passar os valores para o back-end
     Antes de passar para o back-end transformaremos os items que estão como CartItem
     em OrderItem e para isso passaremos a quantidade e a id que estão no construtor
    */
}

export {Order, OrderItem}