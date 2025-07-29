package com.todo.backend.shared.exception;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(String message) {
        super(message);
    }

    public TodoNotFoundException(Long id) {
        super("Todo with id " + id + " not found");
    }
} 