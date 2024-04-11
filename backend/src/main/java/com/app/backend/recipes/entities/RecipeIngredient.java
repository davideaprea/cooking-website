package com.app.backend.recipes.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Embeddable
@AllArgsConstructor
@Getter
public class RecipeIngredient {
    @NotBlank
    @Column(nullable = false)
    private String ingredient;

    @Min(value = 1) @NotNull
    @Column(nullable = false)
    private short grams;
}
