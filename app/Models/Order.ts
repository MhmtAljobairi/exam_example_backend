import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column({ serializeAs: "user_id" })
    public userId: number

    @column()
    public total: number

    @column({ serializeAs: "sub_total" })
    public subTotal: number

    @column({ serializeAs: "tax_amount" })
    public taxAmount: number


    @column({ serializeAs: "payment_method_id" })
    public paymentMethodId: number

    @column({ serializeAs: "status_id" })
    public statusId: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

}