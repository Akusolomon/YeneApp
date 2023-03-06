
import { TypeOrmModule } from '@nestjs/typeorm';
export const TypeOrmConfig: TypeOrmModule = 
  

  {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'training',
    entities: [
      'dist/**/*.entity{.ts,.js}',
      'dist/**/data/models/*Entity{.ts,.js}',
    ],
    synchronize: true,
    logging: true,
  }


