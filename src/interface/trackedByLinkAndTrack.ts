/**
 * Interface que representa um objeto de rastreamento de encomenda.
 */
export interface TrackedByLinkAndTrack {
  /**
   * Código de rastreio da encomenda.
   */
  codigo: string;

  /**
   * Serviço de entrega da encomenda.
   */
  servico: string;

  /**
   * Host de rastreio da encomenda.
   */
  host: string;

  /**
   * Quantidade de eventos que contêm a encomenda.
   */
  quantidade: number;

  /**
   * Lista de eventos associados à encomenda.
   */
  eventos: TrackedEventByLinkAndTrack[];

  time: number;
  ultimo?: Date;
}

/**
 * Interface que representa um evento associado a uma encomenda.
 */
export interface TrackedEventByLinkAndTrack {
  /**
   * Data em que o evento foi criado.
   */
  data: string;

  /**
   * Hora em que o evento foi criado.
   */
  hora: string;

  /**
   * Local em que o evento foi criado.
   */
  local: string;

  /**
   * Status do evento.
   */
  status: string;

  /**
   * Sub-status do evento (opcional).
   *
   * **Este campo será descontinuado no futuro!!**
   */
  subStatus?: string[];
}
