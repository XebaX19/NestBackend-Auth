import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.enableCors(); //Para habilitar CORS y acceder desde cualquier dominio.
                    //Para hacer mas segura mi aplicación, sólo debería habilitar los dominios desde donde se que van a llamar al backend

  //Antes de usar esto: npm i class-validator class-transformer
  //Para poder tener validaciones por defecto en los "dtos"
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true, //Remueve todo lo que no está incluído en los DTOs
      forbidNonWhitelisted: true //Retorna bad request si hay propiedades en el objeto no requeridas
    })
   );

  await app.listen(port);
  console.log(`Servidor activo y ejecutando en puerto ${ port }...`)
}
bootstrap();
