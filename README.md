<header>
<div align="center">

<a href="https://github.com/Diaszano">
    <img src=".github/assets/logo.svg" alt="logo" height="90" align="center">
</a>

<h1 align="center">linketrackjs</h1>

<p>Uma interface amigável para a API de rastreamento de encomendas dos Correios desenvolvida pela <a href="https://linketrack.com/">Link & Track.</a></p>

<a href="https://www.npmjs.com/package/linketrackjs">
    <img alt="npm" src="https://img.shields.io/npm/v/linketrackjs?color=orange">
</a>

<a href="https://www.npmjs.com/package/linketrackjs">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/linketrackjs?color=orange">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/linketrackjs?color=orange">
</a>

<a href="https://github.com/Diaszano/linketrackjs">
    <img alt="NPM" src="https://img.shields.io/npm/l/linketrackjs?color=orange">
</a>

<a href="https://github.com/Diaszano/linketrackjs">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/diaszano/linketrackjs?color=orange">
</a>

</div>
</header>

## Introdução

O projeto **linketrackjs** tem como objetivo principal criar uma interface mais amigável e intuitiva para a
utilização da API disponibilizada pelo [Linketrack](https://linketrack.com/), uma plataforma especializada em
rastreamento de encomendas.

A API do [Linketrack](https://linketrack.com/) oferece um conjunto de recursos poderosos para rastrear e obter
informações sobre pacotes e envios, permitindo que desenvolvedores integrem esses recursos em suas aplicações.

O **linketrackjs** busca fornecer uma camada intermediária entre a API e os usuários finais.
Através dessa camada intermediária, o projeto irá simplificar o processo de integração e fornecer uma experiência mais
amigável para os desenvolvedores que desejam incorporar os recursos de rastreamento em suas aplicações.

## Instalação

Para instalar a biblioteca, utilize o gerenciador de pacotes npm da seguinte maneira:

```shell
npm i linketrackjs
```

## Configuração

Para utilizar a plataforma, é necessário criar uma conta vinculada ao serviço [Link & Track](https://linketrack.com/).
Para proceder com esse registro, é imprescindível enviar um e-mail para [api@linketrack.com](mailto:api@linketrack.com),
solicitando a autorização de uso.

Por favor, considere que o envio do e-mail é um requisito obrigatório para acessar as funcionalidades disponíveis. Sua
solicitação será processada pela equipe responsável, que fornecerá as informações necessárias para que você possa
desfrutar de todas as vantagens oferecidas pelo serviço [Link & Track](https://linketrack.com/).

## Utilização

Para utilizar o cache em sua aplicação, é necessário importar a classe **linketrack** da biblioteca:

```typescript
import { LinkAndTrack } from 'linketrackjs';
```

Em seguida, é possível criar uma instância da classe **linkAndTrack** e utilizá-la:

```typescript
const linkAndTrack = new LinkAndTrack('user', 'token');

const track = await linkAndTrack.track('CODIGO');

console.log(track);
```
