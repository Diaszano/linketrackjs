export interface Tracked {
  /**
   * Código de rastreio da encomenda.
   */
  code: string;

  /**
   * Serviço de entrega da encomenda.
   */
  service: string;

  /**
   * Host de rastreio da encomenda.
   */
  host: string;

  /**
   * Quantidade de eventos que contêm a encomenda.
   */
  quantity: number;

  /**
   * Lista de eventos associados à encomenda.
   */
  events: TrackedEvent[];

  /**
   * Carimbo de tempo do pedido.
   */
  time: number;

  /**
   * Data do último evento.
   */
  lastEvent: Date;
}

export interface TrackedEvent {
  /**
   * Data em que o evento foi criado.
   */
  date: Date;

  /**
   * Hora em que o evento foi criado.
   */
  location: string;

  /**
   * Local em que o evento foi criado.
   */
  status: string;
}
