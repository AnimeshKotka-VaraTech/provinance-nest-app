import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Provenance')
    .setDescription('Poc of Provenance Blockchain')
    .setVersion('1.0')
    .addTag('Endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
