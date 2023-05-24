import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImageController {


    async upload({ request }: HttpContextContract) {

        var image = request.file("image_file");
        if (image) {
            await image.move(Application.publicPath("uploads"));
        }
        return { path:"uploads/"+ image!.fileName }
    }
}