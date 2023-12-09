/**
 * Módulo de testes para a classe LinkAndTrack.
 *
 * @module LinkAndTrackTests
 */

import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { LinkAndTrack } from '@/linkAndTrack';
import { AuthorizationError } from '@/errors/authorizationError';
import { Tracked } from '@/interface/tracked';

/**
 * Descreve e executa testes relacionados à inicialização da classe LinkAndTrack.
 */
describe('Testes de inicialização da classe LinkAndTrack', async (): Promise<void> => {
  const user: string = 'teste';
  const token: string =
    '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';

  /**
   * Testa se a classe lança um erro de autorização quando o usuário é uma string vazia.
   */
  it('Deve dar erro quando o usuário é uma string vazia', async (): Promise<void> => {
    expect(async (): Promise<void> => {
      new LinkAndTrack('', '');
    }).rejects.toThrowError(new AuthorizationError('Usuário inválido!'));
  });

  /**
   * Testa se a classe lança um erro de autorização quando o token é uma string vazia.
   */
  it('Deve dar erro quando o Token é uma string vazia', async (): Promise<void> => {
    expect(async (): Promise<void> => {
      new LinkAndTrack(user, '');
    }).rejects.toThrowError(new AuthorizationError('Token inválido!'));
  });

  /**
   * Testa se a classe retorna uma instância válida de LinkAndTrack quando fornecido um usuário e um token válidos.
   */
  it('Deve retornar uma instância válida de LinkAndTrack com um usuário e token válidos', async (): Promise<void> => {
    const linkAndTrack = new LinkAndTrack(user, token);
    expect(linkAndTrack).toBeDefined();
  });
});

/**
 * Conjunto de testes para a funcionalidade de rastreamento do LinkAndTrack.
 */
describe('LinkAndTrack - Rastreamento', async (): Promise<void> => {
  const user: string = process.env.LINKETRACK_USER || '';
  const token: string = process.env.LINKETRACK_TOKEN || '';

  const linkAndTrack = new LinkAndTrack(user, token);

  const validCode: string = 'RC281120210LD';
  const invalidCode: string = 'LUC45281121RC';

  /**
   * Testa o rastreamento de um código de rastreio inválido.
   */
  it('Deve retornar um objeto rastreado com valores padrão para código inválido', async (): Promise<void> => {
    const expectedValue: Tracked = {
      code: invalidCode,
      service: '',
      host: '',
      quantity: 0,
      lastEvent: expect.any(Date),
      events: [],
      time: 0,
    };

    await expect(linkAndTrack.track(invalidCode)).resolves.toMatchObject(
      expectedValue,
    );
  });

  /**
   * Testa o rastreamento de um código de rastreio válido.
   */
  it('Deve retornar um objeto rastreado com valores dinâmicos para um código válido', async (): Promise<void> => {
    const expectedValue: Partial<Tracked> = {
      code: validCode,
      lastEvent: expect.any(Date),
      events: [],
      quantity: 0,
    };

    await expect(linkAndTrack.track(validCode)).resolves.toMatchObject(
      expectedValue,
    );
  });
});

/**
 * Conjunto de testes para a funcionalidade de lançar um erro ao rastrear com autorização inválida.
 */
describe('LinkAndTrack - Rastreamento com Autorização Inválida', async (): Promise<void> => {
  const user: string = 'testes';
  const token: string =
    'mr0d605vt5ugfiho0jmp23f8h5lx9tr0lp5ael68283s5stxl6o86519uyzy3k7g';

  const linkAndTrack = new LinkAndTrack(user, token);

  const code: string = 'RC281120210LD';

  /**
   * Testa se um erro de autorização é lançado ao rastrear com código válido.
   */
  it('Deve lançar um erro de autorização ao rastrear com código válido', async (): Promise<void> => {
    await expect(linkAndTrack.trackOrThrow(code)).rejects.toThrowError(
      AuthorizationError,
    );
  });
});
