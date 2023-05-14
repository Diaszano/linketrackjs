import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import Linketrack from './linketrack';
import LinketrackResponse from './interface/LinketrackResponse';

describe('linketrack', async (): Promise<void> => {
  it('Deve dar erro de autorização', async (): Promise<void> => {
    const linketrack = new Linketrack('user', 'token');
    expect(linketrack.track('LX002249507BR')).rejects.toThrow(
      'Usuário não autorizado.',
    );
  });
  it('Deve rastrear uma encomenda', async (): Promise<void> => {
    const linketrack = new Linketrack(
      process.env.LINKETRACK_USER || '',
      process.env.LINKETRACK_TOKEN || '',
    );

    const expectedResponse: Partial<LinketrackResponse> = {
      codigo: 'LX002249507BR',
      servico: 'PAC - Encomenda Econômica',
      quantidade: 0,
      eventos: [],
    };

    expect(linketrack.track('LX002249507BR')).resolves.toMatchObject(
      expectedResponse,
    );
  });
});
