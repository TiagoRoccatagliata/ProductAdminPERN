import { Router } from "express"
import { body } from 'express-validator'
import { createProduct } from "./handlers/product"

const router = Router()

// Routing
router.get('/', (req, res) => {

    res.json('Desde GET')
})

router.post('/',

    // Validación
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre de Precio no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),

    createProduct

)

router.put('/', (req, res) => {

    res.json('Desde PUT')
})

router.patch('/', (req, res) => {

    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {

    res.json('Desde DELETE')
})

export default router