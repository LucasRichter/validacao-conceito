# Desafio técnico

## Instalação

```bash
yarn install
```

## Start
```bash
yarn start
```

A aplicação iniciara na url [http://localhost:3000](http://localhost:3000)

## Testes
```bash
yarn test
```
## Prova de conceito Problema 1:

Utilizando a biblioteca [rxjs](https://rxjs.dev/guide/overview) é possivel utilizar a função `debounceTime` para colocar um tempo minimo entre os eventos, ou seja, esperar um tempo necessário para não repetir a a mesma função em um curto intervalo de tempo. Com isso, podemos garantir que o minimo possivel de request seja feito repitadamente. Utilizando a função `filter`, podemos otimizar ainda mais o nosso `SearchInput`, ignorando inputs com menos de 2 caracteres.

Foram feito testes para os seguintes casos:
- Disparar o onChange com apenas dois caracters
- Não Disparar o onChange com apenas dois caracters
- Não disparar com o mesmo parametro em sequencia

## Prova de conceito Problema 2:

Utilizando a função `React.lazy` podemos fazer o chamado `Splitting Code` que divide em arquivos menores o arquivo `Javascript` final. Com isso, cada page pode ter seu próprio arquivo javascript, tornando o seu carregamento muito mais rápido, não carregando components e/ou arquivos desnecessários para aquela tela.

```javascript
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

Aqui temos um exemplo de importação no arquivo `App.js`.