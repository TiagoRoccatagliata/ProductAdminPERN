import { safeParse } from 'valibot'
import axios from 'axios'
import { DraftProductSchema } from "../types";


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
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}