package com.nejragutic.tasktracker.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue
    private Integer id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, message = "Title must have at least 3 characters")
    @Column
    private String title;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Priority is required")
    private TaskPriority priority = TaskPriority.MEDIUM;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    private LocalDate dueDate;


    public Task(){

    }

    public Task(
            Integer id,
            String title,
            TaskStatus status,
            TaskPriority priority,
            String description,
            LocalDate dueDate
    ) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority = priority;
        this.description = description;
        this.dueDate = dueDate;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}



