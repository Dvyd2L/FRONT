import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { addTokenToRequest } from 'src/app/helpers/addTokenToRequest';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { StorageKeyEnum } from 'src/app/interfaces/enums/chat';

/**
 * Interceptor de autenticación para agregar el token de autenticación a las solicitudes HTTP.
 * @param req - La solicitud HTTP entrante.
 * @param next - El siguiente controlador de solicitudes HTTP en la cadena de interceptores.
 * @returns La solicitud HTTP modificada con el token de autenticación agregado, o la solicitud original si no es necesario agregar el token.
 */
export const authInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.url.includes(environment.urlAPI)) {
    const token = StorageHelper.getItem<string | null>(StorageKeyEnum.Token);
    const authReq = addTokenToRequest(req, token);

    return next(authReq);
  }

  return next(req);
};
