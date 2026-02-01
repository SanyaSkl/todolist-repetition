import {v1} from 'uuid';
import {expect, test} from 'vitest'
import type {Todolist} from '../App.tsx';
import {deleteTodolistAC, todolistsReducer} from './todolists-reducer.ts';


test('correct todolist should be deleted', () => {
    // Создание общего ID для каждого todolist-a
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // 2. Действие
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    // 3. Проверка, что действие изменило state соответствующим образомэ
    // в массиве останется один todolist
    expect(endState.length).toBe(1)
    // удалится нужный todolist, не любой
    expect(endState[0].id).toBe(todolistId2)
})