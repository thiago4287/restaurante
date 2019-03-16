// Aqui será criado uma interface  que representa um objeto restaurante, com as pro
//priedades que irão refletir os dados que estão no back-end

export interface Restaurant {

    id: string
    name: string
    category: string
    deliveryEstimate: string
    rating: number
    imagePath: string
    hours?: string
    about?: string
}