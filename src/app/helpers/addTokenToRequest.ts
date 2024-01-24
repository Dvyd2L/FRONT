import { HttpRequest } from '@angular/common/http';

/**
 * Añade el token a la solicitud
 * @param {HttpRequest} req - La solicitud a la que se añadirá el token
 * @param {string|null} token - El token que se añadirá a la solicitud
 * @returns {HttpRequest<unknown>} La solicitud con el token añadido
 */
export const addTokenToRequest = (
  req: HttpRequest<unknown>,
  token: string | null
): HttpRequest<unknown> =>
  req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

// /**
//  * BehaviorSubject para controlar si se está refrescando el token
//  */
// export const isRefreshingToken$ = new BehaviorSubject(false);
// /**
//  * Obtiene el estado actual de isRefreshingToken
//  * @returns {boolean} El estado actual de isRefreshingToken
//  */
// export const getIsRefreshingToken = (): boolean => isRefreshingToken$.getValue();
// /**
//  * Establece el estado de isRefreshingToken
//  * @param {boolean} value - El nuevo estado de isRefreshingToken
//  */
// export const setIsRefreshingToken = (value: boolean) =>
//   isRefreshingToken$.next(value);
// /**
//  *
//  */
// export const isRefreshingToken = isRefreshingToken$.asObservable();
// /**
//  * BehaviorSubject para controlar el token actual
//  */
// export const tokenSubject$ = new BehaviorSubject<string>(null!);
// /**
//  * Obtiene el token actual
//  * @returns {string} El token actual
//  */
// export const getTokenSubject = (): string => tokenSubject$.getValue();
// /**
//  * Establece el token actual
//  * @param {string} value - El nuevo token
//  */
// export const setTokenSubject = (value: string) => tokenSubject$.next(value);
// /**
//  * Observable para suscribirse a los cambios del token
//  */
// export const tokenSubject = tokenSubject$.asObservable();
// /**
//  * Comprueba si el error es un error de token
//  * @param {HttpRequest} request - La solicitud que causó el error
//  * @returns {boolean} Verdadero si el error es un error de token, falso en caso contrario
//  */
// export const isTokenError = (request: HttpRequest<unknown>): boolean =>
//   request.url.includes('refreshtoken') || request.url.includes('login');
// /**
//  * Maneja los errores de token
//  * @param {HttpRequest} request - La solicitud que causó el error
//  * @param {HttpErrorResponse} err - El error que se va a manejar
//  * @param {AuthService} authService - El servicio de autenticación
//  * @returns {Observable<never>} Un observable que emite el error
//  */
// export const handleTokenError = (
//   request: HttpRequest<unknown>,
//   err: HttpErrorResponse,
//   authService: AuthService = inject(AuthService)
// ): Observable<never> => {
//   if (request.url.includes('refreshtoken')) {
//     authService.clearStorage();
//     location.reload();
//   }

//   const errorData = {
//     error: err.error,
//     err: err,
//   };

//   return throwError(() => errorData);
// };
// /**
//  * Maneja los tokens expirados
//  * @param {HttpRequest} request - La solicitud que causó el error
//  * @param {HttpHandler} next - El siguiente manejador en la cadena de manejadores
//  * @param {AuthService} authService - El servicio de autenticación
//  * @returns {Observable<HttpEvent<any>>} Un observable que emite el resultado de manejar el token expirado
//  */
// export const handleExpiredToken = (
//   request: HttpRequest<unknown>,
//   next: HttpHandler,
//   authService: AuthService = inject(AuthService)
// ): Observable<HttpEvent<any>> => {
//   if (!getIsRefreshingToken()) {
//     setIsRefreshingToken(true);

//     return authService.refreshToken().pipe(
//       switchMap((user) => {
//         return next.handle(addTokenToRequest(request, user.token));
//       }),
//       finalize(() => {
//         setIsRefreshingToken(false);
//       })
//     );
//   } else {
//     return waitForTokenRefresh(request, next);
//   }
// };
// /**
//  * Espera a que se refresque el token
//  * @param {HttpRequest} request - La solicitud que está esperando a que se refresque el token
//  * @param {HttpHandler} next - El siguiente manejador en la cadena de manejadores
//  * @returns {Observable<HttpEvent<any>>} Un observable que emite el resultado de esperar a que se refresque el token
//  */
// export const waitForTokenRefresh = (
//   request: HttpRequest<unknown>,
//   next: HttpHandler
// ): Observable<HttpEvent<any>> => {
//   return tokenSubject$.pipe(
//     filter((token) => token !== null),
//     take(1),
//     switchMap((token) => {
//       return next.handle(addTokenToRequest(request, token));
//     })
//   );
// };
// /**
//  * Maneja los errores 401
//  * @param {HttpRequest} request - La solicitud que causó el error
//  * @param {HttpHandler} next - El siguiente manejador en la cadena de manejadores
//  * @param {HttpErrorResponse} err - El error que se va a manejar
//  * @param {AuthService} authService - El servicio de autenticación
//  * @returns {Observable<HttpEvent<any>>} Un observable que emite el resultado de manejar el error
//  */
// export const handle401Error = (
//   request: HttpRequest<any>,
//   next: HttpHandler,
//   err: HttpErrorResponse,
//   authService: AuthService = inject(AuthService)
// ): Observable<HttpEvent<any>> => {
//   if (isTokenError(request)) {
//     return handleTokenError(request, err);
//   }

//   if (err.headers.has('Token-Expired')) {
//     return handleExpiredToken(request, next);
//   }

//   authService.clearStorage();
//   location.reload();

//   return throwError(() => err);
// };
