/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/api/users/', "UsersController.getMe");
Route.post('/api/users/', "UsersController.create");
Route.put('/api/users/', "UsersController.update");
Route.post('/api/users/login', "UsersController.login");


Route.get('/api/products', "ProductsController.getAll");
Route.post('/api/orders', "OrdersController.create");
Route.post('/api/storage', "ImageController.upload");