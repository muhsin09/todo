package com.todo.backend.shared.controller;

import com.todo.backend.shared.dto.TodoRequest;
import com.todo.backend.shared.dto.TodoResponse;
import com.todo.backend.todo.command.*;
import com.todo.backend.todo.model.Todo;
import com.todo.backend.todo.query.GetTodoByIdQuery;
import com.todo.backend.todo.query.GetTodosQuery;
import com.todo.backend.todo.service.TodoCommandService;
import com.todo.backend.todo.service.TodoQueryService;
import com.todo.backend.user.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@Tag(name = "Todo", description = "Todo management APIs")
@SecurityRequirement(name = "bearerAuth")
public class TodoController {

    private final TodoCommandService todoCommandService;
    private final TodoQueryService todoQueryService;

    @PostMapping
    @Operation(summary = "Create a new todo")
    public ResponseEntity<TodoResponse> createTodo(
            @Valid @RequestBody TodoRequest request,
            @AuthenticationPrincipal User user) {
        
        CreateTodoCommand command = CreateTodoCommand.from(request, user);
        Todo todo = todoCommandService.createTodo(command);
        
        return ResponseEntity.ok(TodoResponse.from(todo));
    }

    @GetMapping
    @Operation(summary = "Get all todos for the authenticated user")
    public ResponseEntity<List<TodoResponse>> getTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Boolean completed,
            @AuthenticationPrincipal User user) {
        
        Pageable pageable = PageRequest.of(page, size);
        GetTodosQuery query = GetTodosQuery.builder()
                .user(user)
                .completed(completed)
                .pageable(pageable)
                .build();
        
        Page<Todo> todos = todoQueryService.getTodos(query);
        List<TodoResponse> responses = todos.getContent().stream()
                .map(TodoResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a specific todo by ID")
    public ResponseEntity<TodoResponse> getTodoById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        GetTodoByIdQuery query = GetTodoByIdQuery.builder()
                .id(id)
                .user(user)
                .build();
        
        Todo todo = todoQueryService.getTodoById(query);
        return ResponseEntity.ok(TodoResponse.from(todo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a todo")
    public ResponseEntity<TodoResponse> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoRequest request,
            @AuthenticationPrincipal User user) {
        
        UpdateTodoCommand command = UpdateTodoCommand.from(id, request, user);
        Todo todo = todoCommandService.updateTodo(command);
        
        return ResponseEntity.ok(TodoResponse.from(todo));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a todo")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        DeleteTodoCommand command = DeleteTodoCommand.builder()
                .id(id)
                .user(user)
                .build();
        
        todoCommandService.deleteTodo(command);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/complete")
    @Operation(summary = "Toggle todo completion status")
    public ResponseEntity<TodoResponse> toggleTodoComplete(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        ToggleTodoCompleteCommand command = ToggleTodoCompleteCommand.builder()
                .id(id)
                .user(user)
                .build();
        
        Todo todo = todoCommandService.toggleTodoComplete(command);
        return ResponseEntity.ok(TodoResponse.from(todo));
    }
} 