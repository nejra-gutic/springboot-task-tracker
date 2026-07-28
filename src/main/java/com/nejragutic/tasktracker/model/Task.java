package com.nejragutic.tasktracker.model;

public class Task {

    private Integer id;
    private String title;
    private String status;


    public Task(){

    }

    public Task(Integer id, String title, String status) {
        this.id = id;
        this.title = title;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}



