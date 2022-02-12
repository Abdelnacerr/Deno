import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts';

const app = new Application();
const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8080;

console.log(`Server running on port ${PORT} `);

router.get('/', ({ response }: { response: any }) => {
  response.body = 'Hello mate';
});

await app.listen({ port: PORT });
