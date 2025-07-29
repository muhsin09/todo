package com.todo.backend.user.command;

import com.todo.backend.shared.dto.AuthRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateUserCommand {
    private String email;
    private String password;

    public static AuthenticateUserCommand from(AuthRequest request) {
        return AuthenticateUserCommand.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }
} 