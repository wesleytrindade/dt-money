import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model, Response } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  routes() {
    this.namespace = "api";

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      schema.create('transaction', data);
      return new Response(201,{status:"Criado com sucesso"},data);
    });
  }
})
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

