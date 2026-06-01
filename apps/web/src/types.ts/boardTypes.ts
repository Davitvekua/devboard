import type { Database } from "./supabase"

export interface BoardLocalStorage {
  id: string
  title: string
  tasks: Task[]
}

export type Board = Database["public"]["Tables"]["boards"]["Row"] & {
  tasks: Task[]
}
export type UpdateBoard = Database["public"]["Tables"]["boards"]["Update"]

export type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  column: "Todo" | "In Progress" | "Done"
}

export type UpdateTask = Database["public"]["Tables"]["tasks"]["Update"]

export type CreateTask = Database["public"]["Tables"]["tasks"]["Insert"]

// export interface Task {
//   id: string
//   title: string
//   column: "Todo" | "In Progress" | "Done"
//   assignedTo?: string
//   description?: string
//   deadline?: string
// }
