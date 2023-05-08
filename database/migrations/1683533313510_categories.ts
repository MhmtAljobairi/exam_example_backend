import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable();
      table.boolean('active').defaultTo(true);

      table.timestamps(true, true)
      table.timestamp('deleted_at').nullable();
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
