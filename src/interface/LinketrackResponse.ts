/**
 * Interface que representa um evento de rastreamento.
 */
interface Evento {
  data: string;
  hora: string;
  local: string;
  status: string;
  subStatus: Array<string>;
}

/**
 * Interface que representa a resposta do rastreamento.
 */
export default interface LinketrackResponse {
  codigo: string;
  servico: string;
  host: string;
  quantidade: number;
  eventos: Array<Evento>;
  time: number;
  ultimo?: string;
}
