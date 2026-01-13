import { safeParse } from 'valibot'
import axios from 'axios'
import { DraftProductSchema, ProductsSchema } from "../types";


type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = 'http://localhost:4000/api/products'
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = 'http://localhost:4000/api/products'
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}