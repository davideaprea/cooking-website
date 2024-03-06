package com.app.backend.recipes.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Category {
    MEAT(true),
    FISH(true),
    VEGETABLE(false),
    FRUIT(false),
    DAIRY(true),
    EGG(true),
    SEASONING(false),
    LEGUME(false),
    SWEETENER(false),
    LEAVENER(false),
    ALCOHOLIC(false),
    CEREAL(false);

    private final boolean isAnimalBased;
}
