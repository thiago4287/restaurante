
export class User {
    constructor(public email: string,
         public nome: string,
         private passsword: string){}

         matches(another: User): boolean {
             return another !== undefined &&
              another.email === this.email &&
              another.passsword === this.passsword 
         }
}

export const users = {
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "carlos@gmail.com": new User('carlos@gmail.com', 'Carlos', 'carlos12')
}