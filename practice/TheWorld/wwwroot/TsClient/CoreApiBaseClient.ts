import * as generated from "apiclients";
export class CoreApiBaseClient {

    protected transformOptions(options: any) {
     
        return options;
    }

    protected transformResult(url: string, response: any, processor: (response: any) => any) {

        console.log("Service call: " + url);
        return processor(response);
    }
}
export class CoreApiConfig {

}