import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class OrderProduct extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column({ serializeAs: "order_id" })
    public orderId: number

    @column({ serializeAs: "product_id" })
    public productId: number

    @column({ serializeAs: "qty" })
    public qty: number

    @column({ serializeAs: "price" })
    public price: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

}