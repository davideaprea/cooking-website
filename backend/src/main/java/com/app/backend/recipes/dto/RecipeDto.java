package com.app.backend.recipes.dto;

import java.time.Duration;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.app.backend.recipes.entities.RecipeIngredient;
import com.app.backend.recipes.enums.Country;
import com.app.backend.recipes.enums.Course;
import com.app.backend.recipes.enums.Difficulty;
import com.app.backend.recipes.enums.RecipeType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class RecipeDto {
    @NotBlank
    private String name;

    @NotNull
    private Course course;

    @NotNull
    private MultipartFile thumbnailImage;

    @NotNull
    private Difficulty difficulty;

    @NotNull
    private Duration preparationTime;

    @NotNull
    private Duration cookingTime;

    @Min(value = 1)
    private byte servings;

    @Min(value = 1)
    private Double caloriesPerServing;

    @NotNull
    private Country country;

    @Size(min = 1)
    private Set<RecipeIngredient> ingredients;

    @Size(min = 1)
    private LinkedHashSet<String> preparationSteps;

    @NotBlank
    private String storage;

    private String tips;

    private RecipeType recipeType;

    private boolean isDairyFree;

    private boolean isGlutenFree;

    public RecipeDto(String name, Course course, MultipartFile thumbnailImage, Difficulty difficulty,
            Duration preparationTime, Duration cookingTime, byte servings, Double caloriesPerServing,
            Country country, Set<RecipeIngredient> ingredients, LinkedHashSet<String> preparationSteps,
            String storage, String tips, RecipeType recipeType, boolean isDairyFree, boolean isGlutenFree) {
        System.out.println("Servings: "+servings);
        this.name = name;
        this.course = course;
        this.thumbnailImage = thumbnailImage;
        this.difficulty = difficulty;
        this.preparationTime = preparationTime;
        this.cookingTime = cookingTime;
        this.servings = servings;
        this.caloriesPerServing = caloriesPerServing;
        this.country = country;
        this.ingredients = ingredients;
        this.preparationSteps = preparationSteps;
        this.storage = storage;
        this.tips = tips;
        this.recipeType = recipeType;
        this.isDairyFree = isDairyFree;
        this.isGlutenFree = isGlutenFree;
    }
}
