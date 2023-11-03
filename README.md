
## Vamos Começar!!

## Use o docker compose para criar a imagem do postgres
```bash
docker-compose up
```
Realize a instação das dependências do projeto:

```bash
npm run install
# ou
yarn 
```

Em seguida você pode startar o projeto:

```bash
npm run dev
# or
yarn dev
```

Em seguida suba as migrations para que as tabelas possam ser criadas no banco

```bash
npx prisma migrate dev
```
Caso tudo corra bem o projeto vai estar rodando na porta [http://localhost:3000]

Agora você já esta com seu ambiente configurado e pode realizar as requisições 
use um gerenciador de requisições de sua escolha ex:Postman,Insominia,ThunderClient

C[http://localhost:3000/user/create]        payload:{"name":string,"email":string} 
R[http://localhost:3000/user/:id]           params:{"id":string}
U[http://localhost:3000/user/update/:id]    payload:{"name":string,"email":string} params:{"id":string}
D[http://localhost:3000/user/delete/:id]    params:{"id":string}

C[http://localhost:3000/post/create]        payload:{
    "title":string,"content": string,"published":boolean,"authorId": number
    }

R[http://localhost:3000/post/:id]           params:{id:string}
U[http://localhost:3000/post/update/:id]     payload:{
    "title":string,"content": string,"published":boolean,"authorId": number
    }  params:{id:string}

D[http://localhost:3000/post/delete/:id]    params:{id:string}