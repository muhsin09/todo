package com.todo.backend.todo.command;

import com.todo.backend.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ToggleTodoCompleteCommand {
    private Long id;
    private User user;
} 