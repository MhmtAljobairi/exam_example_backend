import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';
import OrderAddress from 'App/Models/OrderAddress';
import OrderProduct from 'App/Models/OrderProduct';

export default class OrdersController {


    async create({ request, response, auth }: HttpContextContract) {
        try {

            var authObject = await auth.authenticate();
            var data = request.all();

            var order = new Order();
            order.userId = authObject.id;
            order.taxAmount = data.tax_amount;
            order.subTotal = data.sub_total;
            order.total = data.total;
            order.paymentMethodId = data.payment_method_id;
            var newOrder = await order.save();

            var address = new OrderAddress();
            address.country = data.address.country;
            address.city = data.address.city;
            address.area = data.address.area;
            address.street = data.address.street;
            address.buildingNo = data.address.building_no;
            address.longitude = data.address.longitude;
            address.latitude = data.address.latitude;
            address.orderId = newOrder.id;
            await address.save();


            var orderProducts: OrderProduct[] = data.products.map((product) => {
                var orderProduct = new OrderProduct();
                orderProduct.orderId = newOrder.id;
                orderProduct.productId = product.product_id;
                orderProduct.qty = product.qty;
                orderProduct.price = product.price;
                return orderProduct;
            });

            await OrderProduct.createMany(orderProducts);
            return newOrder.toJSON();
        } catch (ex) {
            console.log(ex);
            return response.badRequest({ message: ex });
        }
    }



}