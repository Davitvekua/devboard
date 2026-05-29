import type { Board } from "@/types.ts/boardTypes"
import supabase from "./db"

const LOCAL_STORAGE_BOARDS_KEY = "boards"

export async function getBoards(): Promise<Board[]> {
  const { data: boards, error } = await supabase
    .from("boards")
    .select("*, tasks(*)")

  if (error) {
    console.error("Error fetching boards:", error)
    return []
  }

  return boards
}

export function getBoardsFromLocaleStorage(): Board[] {
  const boardsStringified = localStorage.getItem(LOCAL_STORAGE_BOARDS_KEY) ?? ""
  if (boardsStringified) {
    const boards: Board[] = JSON.parse(boardsStringified) ?? []

    return boards
  }

  return []
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem(LOCAL_STORAGE_BOARDS_KEY, JSON.stringify(boards))
}

export function getBoardById(id: string): Board | undefined {
  const boards = getBoards()

  return boards.find((board) => board.id === id)
}

export function saveBoard(board: Board): void {
  const boards = getBoards()

  const updatedBoards = boards.map((b) => {
    if (b.id === board.id) {
      return board
    } else {
      return b
    }
  })

  saveBoards(updatedBoards)
}
