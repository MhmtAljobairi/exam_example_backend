import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class UsersController {

    async create({ auth, request, response }: HttpContextContract) {

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

        const user = new User();
        user.username = payload.username;
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
