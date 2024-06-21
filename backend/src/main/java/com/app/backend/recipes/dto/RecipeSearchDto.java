package com.app.backend.recipes.dto;

import java.time.Duration;

import com.app.backend.recipes.enums.Country;
import com.app.backend.recipes.enums.Course;
import com.app.backend.recipes.enums.Difficulty;
import com.app.backend.recipes.enums.RecipeType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSearchDto {
    private String name;

    private Difficulty difficulty;

    private Duration preparationTime;

    private Duration cookingTime;

    private Course course;

    private RecipeType recipeType;

    private boolean isDairyFree;

    private boolean isGlutenFree;

    private Country country;
}
