
export interface JsonRpcMessage {
    jsonrpc: "2.0";
    method?: string;
    id?: number;
    params?: unknown[];
    result?: unknown;
}

export namespace MCMP {
    export type DiscoverPropertyValue = {
        $ref: string;
    } | {
        type: "string";
        enum?: string[];
    } | {
        type: "array";
        items: DiscoverPropertyValue;
    } | {
        type: "boolean";
    } | {
        type: "integer";
    } | {
        type: "object";
        properties: {
            [field_name: string]: DiscoverPropertyValue;
        };
    }

    export type DiscoverMethod = {
        name: string;
        description: string;
        params: {
            name: string;
            schema: DiscoverPropertyValue;
            required: boolean;
        }[];
        result: {
            name: string;
            schema: DiscoverPropertyValue;
        }
    }

    export type DiscoverResponse = {
        components: {
            schemas: {
                [schema_name: string]: DiscoverPropertyValue
            }
        };
        info: {
            title: string;
            version: string;
        };
        methods: DiscoverMethod[];
    }
}
