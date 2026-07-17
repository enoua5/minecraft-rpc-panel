
export namespace MCSMP {
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
            [fieldName: string]: DiscoverPropertyValue;
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
                [schemaName: string]: DiscoverPropertyValue
            }
        };
        info: {
            title: string;
            version: string;
        };
        methods: DiscoverMethod[];
    }
}
