package com.todo.backend.todo.service;

import com.todo.backend.shared.exception.TodoNotFoundException;
import com.todo.backend.todo.command.*;
import com.todo.backend.todo.model.Todo;
import com.todo.backend.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoCommandService {

    private final TodoRepository todoRepository;

    public Todo createTodo(CreateTodoCommand command) {
        Todo todo = Todo.builder()
                .title(command.getTitle())
                .description(command.getDescription())
                .dueDate(command.getDueDate())
                .priority(command.getPriority())
                .user(command.getUser())
                .build();

        return todoRepository.save(todo);
    }

    public Todo updateTodo(UpdateTodoCommand command) {
        Todo todo = todoRepository.findByIdAndUser(command.getId(), command.getUser())
                .orElseThrow(() -> new TodoNotFoundException(command.getId()));

        todo.setTitle(command.getTitle());
        todo.setDescription(command.getDescription());
        todo.setDueDate(command.getDueDate());
        todo.setPriority(command.getPriority());

        return todoRepository.save(todo);
    }

    public void deleteTodo(DeleteTodoCommand command) {
        if (!todoRepository.existsByIdAndUser(command.getId(), command.getUser())) {
            throw new TodoNotFoundException(command.getId());
        }
        todoRepository.deleteById(command.getId());
    }

    public Todo toggleTodoComplete(ToggleTodoCompleteCommand command) {
        Todo todo = todoRepository.findByIdAndUser(command.getId(), command.getUser())
                .orElseThrow(() -> new TodoNotFoundException(command.getId()));

        todo.toggleComplete();
        return todoRepository.save(todo);
    }
} 