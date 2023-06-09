import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {


    async getMe({ auth }: HttpContextContract) {
        var authObject = await auth.authenticate();
        var user = await User.findOrFail(authObject.id);
        return user;
    }
    async update({ auth, request, response }: HttpContextContract) {

        try {
            var authObject = await auth.authenticate();

            const createSchema = schema.create({
                email: schema.string([
                    rules.email(),
                ]),
                username: schema.string([
                    rules.minLength(2)
                ])
            });

            const payload = await request.validate({ schema: createSchema });
            const user = await User.findOrFail(authObject.id);
            user.username = payload.username;
            user.email = payload.email;
            if (request.input("password") && request.input("password").toString().length > 0) {
                user.password = request.input("password");
            }
            await user.save();
            return user;
        } catch (ex) {
            console.log(ex);
            return response.badRequest({ message: ex.toString() });
        }
    }
    async create({ auth, request, response }: HttpContextContract) {


        var image = request.file("image_file");
        const createSchema = schema.create({
            email: schema.string([
                rules.email(),
                rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string([
                rules.minLength(8)
            ]),
            username: schema.string([
                rules.minLength(2)
            ])
        });

        const payload = await request.validate({ schema: createSchema });
        var userImage;
        const user = new User();


        if (image) {
            await image.move(Application.publicPath("uploads"));
            userImage = "uploads/" + image!.fileName;
        }

        user.username = payload.username;
        user.image = userImage;
        user.password = payload.password;
        user.email = payload.email;
        var newUser = await user.save();
        const token = await auth.use('api').attempt(payload.email, payload.password);
        return token;
        // return { message: "Your account has been created!" };
    }

    async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password);
            return token
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    };
}
