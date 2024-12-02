export class DeliveryPoints {
  public cliente?: string; // string com nome + cpf
  public pedido?: string; // String concatenada com o valor total + quantidade + obs do pedido
  public pagamento?: string; // String concatenada do valor + forma de pagamento
  public obs?: string; // Observações da entrega
  public address?: string; // Endereço completo
  public latitude?: number;
  public longitude?: number;

  constructor(deliveryPoints?: Partial<DeliveryPoints>) {
    if (deliveryPoints) {
      Object.assign(this, deliveryPoints);
    }
  }
}
