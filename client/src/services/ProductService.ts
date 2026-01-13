import { safeParse, parse } from 'valibot'
import * as v from 'valibot';
import axios from 'axios'
import { DraftProductSchema, ProductsSchema, ProductSchema } from "../types";
import type { Product } from "../types";
import { toBoolean } from '../utils';


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

export async function getProductsByID(id : Product['id']) {
    try {
        const url = `http://localhost:4000/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
   const NumberSchema = v.pipe(
    v.union([v.string(), v.number()]),
    v.transform((input) => Number(input)),
    v.number()
    );

    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        if(result.success) {
            const url = `http://localhost:4000/api/products/${id}`   
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}


export async function deleteProduct(id: Product['id']) {
    try {
        const url = `http://localhost:4000/api/products/${id}`
        await axios.delete(url)
    } catch(error) {
        console.log(error)
    }
}

export async function updateAvailability(id: Product['id']) {
    try {
        const url = `http://localhost:4000/api/products/${id}`
        await axios.patch(url)
    } catch(error) {
        console.log(error)
    }
}