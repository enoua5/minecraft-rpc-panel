export interface JsonRpcRequest<
    M extends string = string,
    P extends unknown = unknown,
> {
    jsonrpc: "2.0";
    id: number;
    method: M;
    params?: P;
}

export interface JsonRpcSuccessResponse<R = unknown> {
    jsonrpc: "2.0";
    id: number;
    result: R;

    error?: never;
}

export interface JsonRpcErrorObject {
    code: number;
    message: string;
    data?: unknown;
}

export interface JsonRpcErrorResponse {
    jsonrpc: "2.0";
    id?: string | number | null;
    error: JsonRpcErrorObject;
}

export interface JsonRpcNotification<
    M extends string = string,
    P extends unknown[] | undefined = unknown[] | undefined,
> {
    jsonrpc: "2.0";
    method: M;
    params?: P;

    error?: never;
    id?: never;
}

export type JsonRpcMessage =
    JsonRpcSuccessResponse | JsonRpcErrorResponse | JsonRpcNotification;
