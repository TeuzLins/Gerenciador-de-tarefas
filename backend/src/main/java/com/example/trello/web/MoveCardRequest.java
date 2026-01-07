package com.example.trello.web;

public record MoveCardRequest(Long destinationColumnId, int destinationIndex) {
}
