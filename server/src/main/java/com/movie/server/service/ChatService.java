package com.movie.server.service;

import com.movie.server.dto.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    private final RestTemplate template;

    public String getResponse(String userMessage){
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        ChatRequest.Message message = new ChatRequest.Message("user",userMessage);
        ChatRequest request = new ChatRequest("llama-3.3-70b-versatile", List.of(message));

        HttpEntity<ChatRequest> entity = new HttpEntity<>(request,headers);

        try {
            return template.postForObject(apiUrl,entity,String.class);
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
