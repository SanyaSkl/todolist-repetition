import { beforeEach, expect, test } from "vitest"
import { changeTodolistFilterAC, todolistsSlice } from "../todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolist/api/todolistsApi.types.ts"

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0 },
  ]
})

test("correct todolist should be deleted", () => {
  // @ts-ignore
  const endState = todolistsSlice(startState, deleteTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const title = "New todolist"
  // @ts-ignore
  const endState = todolistsSlice(startState, createTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test("correct todolist should change its tittle", () => {
  const title = "New Title"
  // @ts-ignore
  const endState = todolistsSlice(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct todolist should change its filter", () => {
  const filter = "completed"
  // @ts-ignore
  const endState = todolistsSlice(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
