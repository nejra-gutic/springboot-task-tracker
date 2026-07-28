package com.nejragutic.tasktracker.exception;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(Integer id) {
        super("Task with id " + id + " was not found");
    }
}