export interface Board {
  id: string
  title: string
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  column: "Todo" | "In Progress" | "Done"
  description?: string
  deadline?: string
}
