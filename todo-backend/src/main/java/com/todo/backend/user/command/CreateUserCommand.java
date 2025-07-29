package com.todo.backend.user.command;

import com.todo.backend.shared.dto.RegisterRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserCommand {
    private String email;
    private String password;

    public static CreateUserCommand from(RegisterRequest request) {
        return CreateUserCommand.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }
} 