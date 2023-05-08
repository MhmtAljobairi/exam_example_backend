import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('image').notNullable()
      table.string('price').notNullable()
      table.string('current_qty').notNullable()
      table.string('description').notNullable()

      table.dateTime("deleted_at").defaultTo(null);

      table.timestamps(true, true);
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
