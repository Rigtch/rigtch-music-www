export interface GraphqlError {
  client: string
  gqlErrors: unknown[]
  operationName: string
  operationType: string
  statusCode: number
}
