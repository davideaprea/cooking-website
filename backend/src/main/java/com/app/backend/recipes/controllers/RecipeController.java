package com.app.backend.recipes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.recipes.dto.RecipeDto;
import com.app.backend.recipes.entities.Recipe;
import com.app.backend.recipes.services.RecipeService;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @Autowired private RecipeService recipeService;

    @PreAuthorize("hasRole('CREATOR')")
    @PostMapping
    public ResponseEntity<Recipe> create(RecipeDto recipe) {
        return ResponseEntity.ok(recipeService.save(recipe));
    }

    @GetMapping
    public ResponseEntity<Page<Recipe>> getPage(Pageable pageable){
        return ResponseEntity.ok(recipeService.getPage(pageable));
    }
}
