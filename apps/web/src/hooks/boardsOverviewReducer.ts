import { saveBoards } from "@/dataTransfer/api"
import type { Board } from "@/types.ts/boardTypes"

type BoardsOverviewAction = {
  type: "ADD" | "DELETE"
  data: Board
}

export default function useBoardOverviewReducer(
  prevState: Board[],
  action: BoardsOverviewAction
) {
  let newState = prevState

  switch (action.type) {
    case "ADD": {
      newState = [...prevState, action.data]
      saveBoards(newState)
      break
    }

    case "DELETE": {
      newState = prevState.filter((board) => board.id !== action.data.id)
      break
    }

    default: {
      break
    }
  }

  saveBoards(newState)
  return newState
}
