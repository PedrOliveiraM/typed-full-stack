import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import z from 'Zod'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  ZodTypeProvider
} from 'fastify-type-provider-zod'
import { routes } from "./route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: "*"
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Project typed full-stack",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(routes)

app.listen({ port: 3333 }).then(() => {
  console.log(`HTTP server is running PORT`)
})