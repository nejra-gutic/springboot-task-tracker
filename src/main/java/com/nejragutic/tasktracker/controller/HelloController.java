package com.nejragutic.tasktracker.controller;

import com.nejragutic.tasktracker.model.Task;
import com.nejragutic.tasktracker.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    private final TaskService taskService;

    public HelloController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return taskService.getTasks();
    }
}