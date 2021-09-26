import { NestResponse } from './nest-response';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((response: NestResponse) => {
                if(response instanceof NestResponse) {
                    const contexto = context.switchToHttp();
                    const resposta = contexto.getResponse();
                    const { headers, status, body} = response;


                    const headersNames = Object.getOwnPropertyNames(headers);
                    headersNames.forEach(headerName => {
                        const headerValue = headers[headerName]
                        this.httpAdapter.setHeader(resposta, headerName, headerValue);
                    });

                    this.httpAdapter.status(resposta, status);
                    return body;
                }
                return response;
            })
        )
    }

}