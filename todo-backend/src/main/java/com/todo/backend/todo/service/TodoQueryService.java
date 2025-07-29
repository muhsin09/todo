package com.todo.backend.todo.service;

import com.todo.backend.shared.exception.TodoNotFoundException;
import com.todo.backend.todo.model.Todo;
import com.todo.backend.todo.query.GetTodoByIdQuery;
import com.todo.backend.todo.query.GetTodosQuery;
import com.todo.backend.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoQueryService {

    private final TodoRepository todoRepository;

    public Todo getTodoById(GetTodoByIdQuery query) {
        return todoRepository.findByIdAndUser(query.getId(), query.getUser())
                .orElseThrow(() -> new TodoNotFoundException(query.getId()));
    }

    public Page<Todo> getTodos(GetTodosQuery query) {
        if (query.getCompleted() != null) {
            return todoRepository.findByUserAndCompleted(query.getUser(), query.getCompleted(), query.getPageable());
        }
        return todoRepository.findByUserOrderByPriorityAndDueDate(query.getUser(), query.getPageable());
    }

    public List<Todo> getAllTodosByUser(GetTodosQuery query) {
        return todoRepository.findByUser(query.getUser());
    }
} 