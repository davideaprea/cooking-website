package com.app.backend.recipes.dto;

import java.time.Duration;

import org.springframework.web.multipart.MultipartFile;

import com.app.backend.recipes.enums.Country;
import com.app.backend.recipes.enums.Course;
import com.app.backend.recipes.enums.Difficulty;
import com.app.backend.recipes.enums.RecipeType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    private String ingredients;

    private String preparationSteps;

    @NotBlank
    private String storage;

    private String tips;

    @NotNull
    private RecipeType recipeType;

    private boolean isDairyFree;

    private boolean isGlutenFree;
}
