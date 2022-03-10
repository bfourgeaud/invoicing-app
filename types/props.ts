export interface FallbackProps<T> {
  fallback: {
    [key:string]: Array<T>
  }
}