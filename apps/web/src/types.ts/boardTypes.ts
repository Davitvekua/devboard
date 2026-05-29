import type { Database } from "./supabase"

export interface BoardLocalStorage {
  id: string
  title: string
  tasks: Task[]
}

export type Board = Database["public"]["Tables"]["boards"]["Row"] & {
  tasks: Database["public"]["Tables"]["tasks"]["Row"][]
}

export interface Task {
  id: string
  title: string
  column: "Todo" | "In Progress" | "Done"
  assignedTo?: string
  description?: string
  deadline?: string
}
