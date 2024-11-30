import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  // Private BehaviorSubject para armazenar e gerenciar os pedidos
  private _pedidos: BehaviorSubject<Pedido[]> = new BehaviorSubject<Pedido[]>(
    []
  );

  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Acessores
  // -----------------------------------------------------------------------------------------------------
  get pedidos$(): Observable<Pedido[]> {
    return this._pedidos.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos Públicos
  // -----------------------------------------------------------------------------------------------------

  /**
   * Obter lista de pedidos do servidor
   */
  salvarPedido(pedido: Pedido): Observable<Pedido> {
    return this._http.post<Pedido>(`${environment.api}/pedidos`, pedido).pipe(
      catchError((error) => {
        // Extrai a mensagem do erro
        const errorMessage = error.error?.message || 'Ocorreu um erro desconhecido.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  listarPedidos(): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(`${environment.api}/pedidos`).pipe(
      tap((pedidos: Pedido[]) => {
        // Atualiza o BehaviorSubject com os pedidos recebidos
        this._pedidos.next(pedidos);
      }),
      catchError((error) => {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
      })
    );
  }
}
