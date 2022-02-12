import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts';
import router from './routes/routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8080;

console.log(`Server running on port ${PORT} `);

await app.listen({ port: PORT });
