import { saveBoards } from "@/dataTransfer/api"
import type { Board } from "@/types.ts/boardTypes"

type BoardsOverviewAction =
  | {
      type: "ADD" | "DELETE"
      data: Board
    }
  | {
      type: "SET"
      data: Board[]
    }

export default function useBoardOverviewReducer(
  prevState: Board[],
  action: BoardsOverviewAction
) {
  let newState = prevState

  switch (action.type) {
    case "ADD": {
      newState = [...prevState, action.data]

      break
    }

    case "DELETE": {
      newState = prevState.filter((board) => board.id !== action.data.id)
      break
    }

    case "SET": {
      newState = action.data
      saveBoards(newState)
      break
    }

    default:
      break
  }

  return newState
}
