export type FETCH = <T>(url:string) => Promise<T>
export type FETCH_WITH_BODY = <T>(url:string, body:T) => Promise<T>