package com.todo.backend.shared.dto;

import com.todo.backend.todo.model.Todo;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TodoRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    private LocalDate dueDate;
    private Todo.Priority priority;
} 