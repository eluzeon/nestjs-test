import { Migration } from '@mikro-orm/migrations';

export class Migration20210207014646 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` integer not null primary key autoincrement, `username` varchar not null, `password` varchar not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table `user`');
  }
}
