# Api Open Meteo

## url:

`https://open-meteo.com/en/docs`

## Executar node

`npm init -y`

## Instalar biblioteca open-meteo

`npm install openmeteo`

## Adicionar linha no package.json

```json

  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "type": "module", <--- Adicionar essa linha
  "main": "clima-tempo.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Próximos passos:

- Preencher e marcar as opções desejadas na url do site
- Escolher no `API Response` a opção `Chart & URL`
- Copiar a url que será gerado e utilizar na aplicação para ser consumida.
