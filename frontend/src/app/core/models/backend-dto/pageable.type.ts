export type Pageable = {
  pageNumber: number,
  pageSize: number,
  offset?:number,
  sortParams?: { name: string, order: "asc" | "desc" }[]
}
