package com.todo.backend.todo.command;

import com.todo.backend.shared.dto.TodoRequest;
import com.todo.backend.todo.model.Todo;
import com.todo.backend.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateTodoCommand {
    private String title;
    private String description;
    private LocalDate dueDate;
    private Todo.Priority priority;
    private User user;

    public static CreateTodoCommand from(TodoRequest request, User user) {
        return CreateTodoCommand.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .priority(request.getPriority())
                .user(user)
                .build();
    }
} 