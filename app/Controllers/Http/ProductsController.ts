import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {


    async getAll({ request }: HttpContextContract) {

        var query = Product.query().preload("category", (subQry) => {
            subQry.where("active", true);
        }).where("active", true);
        if (request.input("categoryId")) {
            query.where("categoryId", request.input("categoryId"));
        }
        var result = await query;
        var products: Product[] = [];
        result.map((product) => {
            if (product.category) {
                products.push(product);
            }
        });
        return products;
    }
}
