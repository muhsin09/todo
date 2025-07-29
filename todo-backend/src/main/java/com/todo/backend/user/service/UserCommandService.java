package com.todo.backend.user.service;

import com.todo.backend.shared.exception.UserAlreadyExistsException;
import com.todo.backend.user.command.AuthenticateUserCommand;
import com.todo.backend.user.command.CreateUserCommand;
import com.todo.backend.user.model.User;
import com.todo.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCommandService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User createUser(CreateUserCommand command) {
        if (userRepository.existsByEmail(command.getEmail())) {
            throw UserAlreadyExistsException.withEmail(command.getEmail());
        }

        User user = User.builder()
                .email(command.getEmail())
                .password(passwordEncoder.encode(command.getPassword()))
                .build();

        return userRepository.save(user);
    }

    public void authenticateUser(AuthenticateUserCommand command) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        command.getEmail(),
                        command.getPassword()
                )
        );
    }
} 