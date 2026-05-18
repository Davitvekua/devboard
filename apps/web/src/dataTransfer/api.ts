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
