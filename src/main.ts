import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import mongoose from 'mongoose';

async function bootstrap() {
  console.log('mongodb bdd!!!!!!!!!!!!!: ', process.env.MONGO_URI);
  const app = await NestFactory.create(AppModule);
  mongoose.connection.on('connected', () => {
    Logger.log('Connected to MongoDB', 'MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    Logger.error('MongoDB connection error:', err, 'MongoDB');
  });

  // Activer CORS pour toutes les origines (ajuster si nécessaire)
  app.enableCors({
    origin: 'http://localhost:8080',  // Permet l'accès depuis le frontend Vue
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
