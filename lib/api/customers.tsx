import { resolve } from "node:path"

const rows = [
  { id: 1, name: 'Luke Skywalker', email: 'luke@starwars.com' },
  { id: 2, name: 'R2-D2', email: 'r2d2@starwars.com' },
  { id: 3, name: 'Darth Vader', email: 'vader@starwars.com' },
  { id: 4, name: 'Leia Organa', email: 'leia@starwars.com' },
  { id: 5, name: 'Owen Lars', email: 'owen@starwars.com' },
]

export const getCustomers = (): Promise<
Array<{ id: number; name: string; email: string }>
> => {
  return new Promise((resolve) => {
    resolve(rows)
  })
}

export const getCustomersById = (
  id: number
): Promise<{id: number; name: string; email: string}> => {
  return new Promise((resolve) => {
    const result = rows.find((row) => row.id === id)
    resolve(result)
  })
}