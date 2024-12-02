import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import moment from 'moment';

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

  salvarPedido(pedido: Pedido): Observable<Pedido> {
    return this._http.post<Pedido>(`${environment.api}/pedidos`, pedido).pipe(
      catchError((error) => {
        // Extrai a mensagem do erro
        const errorMessage =
          error.error?.message || 'Ocorreu um erro desconhecido.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  atualizarPedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this._http
      .put<Pedido>(`${environment.api}/pedidos/${id}`, pedido)
      .pipe(
        catchError((error) => {
          // Extrai a mensagem do erro
          const errorMessage =
            error.error?.message || 'Ocorreu um erro desconhecido.';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  listarPedidos(): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(`${environment.api}/pedidos`).pipe(
      tap((pedidos: Pedido[]) => {
        // Subtrai 3 horas da datahora de cada pedido usando JavaScript puro
        pedidos.forEach((pedido) => {
          if (pedido.datahora) {
            // Cria um novo objeto Date e subtrai 3 horas (1000 * 3600 * 3 ms)
            pedido.datahora = new Date(
              new Date(pedido.datahora).getTime() - 1000 * 3600 * 3
            );
          }
        });

        // Atualiza o BehaviorSubject com os pedidos ajustados
        this._pedidos.next(pedidos);
      }),
      catchError((error) => {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
      })
    );
  }

  buscarPedidoPorId(id: number): Observable<any> {
    return this._http.get<any>(`${environment.api}/pedidos/${id}`);
  }
}
