package com.app.backend.recipes.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.recipes.dto.RecipeDto;
import com.app.backend.recipes.entities.Recipe;
import com.app.backend.recipes.services.RecipeService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @PreAuthorize("hasRole('CREATOR')")
    @PostMapping
    public ResponseEntity<Recipe> create(@ModelAttribute RecipeDto recipe) {
        return ResponseEntity.ok(recipeService.save(recipe));
    }

    @GetMapping
    public ResponseEntity<Page<Recipe>> getPage(Pageable pageable, @RequestParam(required = false) String creatorUsername) {
        return ResponseEntity.ok(recipeService.getPage(pageable, creatorUsername));
    }

    @GetMapping("thumbnails/{coverName}")
    public ResponseEntity<?> getCover(@PathVariable String coverName) {
        String coverFolder = System.getProperty("user.home") + "/Desktop/Programming/Recipe covers";
        Path path = Paths.get(coverFolder, coverName).toAbsolutePath().normalize();

        try {
            Resource resource = new UrlResource(path.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/octet-stream"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + resource.getFilename())
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
