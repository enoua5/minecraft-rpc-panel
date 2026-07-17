
export interface JsonRpcResponse {
    jsonrpc: "2.0";
    id: number;
    result?: unknown;
    method?: undefined;
}

export interface JsonRpcNotification {
    jsonrpc: "2.0";
    method: string;
    params: unknown[];
    id?: undefined;
}

export type JsonRpcMessage = JsonRpcResponse | JsonRpcNotification;
