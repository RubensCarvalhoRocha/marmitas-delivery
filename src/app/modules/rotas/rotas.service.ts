import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { DeliveryPoints } from '../../model/deliveryPoints';
@Injectable({
  providedIn: 'root',
})
export class RotasService {
  // Private BehaviorSubject para armazenar e gerenciar os pedidos
  private _pontosDeEntrega: BehaviorSubject<DeliveryPoints[]> =
    new BehaviorSubject<DeliveryPoints[]>([]);

  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Acessores
  // -----------------------------------------------------------------------------------------------------
  get pontosDeEntrega$(): Observable<DeliveryPoints[]> {
    return this._pontosDeEntrega.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos Públicos
  // -----------------------------------------------------------------------------------------------------

  listarPontosDeEntrega(
    pontosEntrega: DeliveryPoints[]
  ): Observable<DeliveryPoints[]> {
    return this._http
      .post<DeliveryPoints[]>(
        `${environment.api}/delivery/route`,
        pontosEntrega
      )
      .pipe(
        tap((pontosDeEntrega: DeliveryPoints[]) => {
          // Atualiza o BehaviorSubject com os pontosDeEntrega recebidos
          this._pontosDeEntrega.next(pontosDeEntrega);
        }),
        catchError((error) => {
          console.error('Erro ao buscar pontos de entrega:', error);
          throw error;
        })
      );
  }
}
