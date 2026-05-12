import type { Board } from "@/types.ts/boardTypes"

const LOCAL_STORAGE_BOARDS_KEY = "boards"

export function getBoards(): Board[] {
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
