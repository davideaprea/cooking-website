package com.app.backend.recipes.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.util.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.recipes.dto.RecipeDto;
import com.app.backend.recipes.entities.Recipe;
import com.app.backend.recipes.repositories.RecipeDAO;
import com.app.backend.recipes.repositories.RecipePageableDAO;
import com.app.backend.security.service.CustomUserDetailsService;

@Service
public class RecipeService {
    @Autowired private RecipeDAO recipeDao;
    @Autowired private RecipePageableDAO recipePageableDAO;
    @Autowired private CustomUserDetailsService userDetailsService;

    public Recipe save(RecipeDto recipeDto) {
        try {
            final String baseImageUrl = "http://localhost:8080/recipes/cover/";

            Recipe recipe = new Recipe(
                userDetailsService.getAuthenticatedUser(),
                recipeDto.getName(),
                recipeDto.getCourse(),
                baseImageUrl+saveFileOnFolder(recipeDto.getThumbnailImage()),
                recipeDto.getDifficulty(),
                recipeDto.getPreparationTime(),
                recipeDto.getCookingTime(),
                recipeDto.getServings(),
                recipeDto.getCaloriesPerServing(),
                recipeDto.getCountry(),
                recipeDto.getIngredients(),
                recipeDto.getPreparationSteps(),
                recipeDto.getStorage(),
                recipeDto.getTips()
            );

            return recipeDao.save(recipe);
        } catch (IOException e) {
            throw new DataIntegrityViolationException("Failed to upload cover image.");
        }
    }

    public Page<Recipe> getPage(Pageable pageable){
        return recipePageableDAO.findAll(pageable);
    }

    private String saveFileOnFolder(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String path = System.getProperty("user.home") + "/Desktop/Programming/Recipes covers";
        String coverImageName = UUID.randomUUID().toString() + "_" + fileName;
        Path coverImagePath = Path.of(path, coverImageName);
        if (!Files.exists(coverImagePath.getParent()))
            Files.createDirectories(coverImagePath.getParent());
        Files.copy(file.getInputStream(), coverImagePath, StandardCopyOption.REPLACE_EXISTING);
        return coverImageName;
    }
}
