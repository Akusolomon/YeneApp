import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { GlobalFilter } from './util/Filter/Filter';
dotenv.config({ path: './config.env' });
async function bootstrap() {
  const DB = process.env.DATABASE_LOCAL;
  connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(() => console.log('DB Connected'));

  const app = await NestFactory.create(AppModule);
  // const limiter = rateLimit({
  //   max: 500,
  //   windowMs: 60 * 60 * 1000,
  //   message: 'To Many Requests From this Ip,Please Try Again In Hour!',
  // });
  // app.use(limiter);
  app.use(helmet());
  app.useGlobalFilters(new GlobalFilter());
  app.enableCors();
  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
