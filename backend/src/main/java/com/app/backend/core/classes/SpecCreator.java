package com.app.backend.core.classes;

import org.springframework.data.jpa.domain.Specification;

public class SpecCreator<T> {
    public static <T> Specification<T> containsString(String columnName, String string) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(columnName)), "%" + string.toLowerCase() + "%");
    }

    public static <T> Specification<T> numberBetween(String columnName, long min, long max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get(columnName), min, max);
    }

    public static <T> Specification<T> numberGreaterThan(String columnName, long min) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get(columnName), min);
    }

    public static <T> Specification<T> numberLessThan(String columnName, long max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get(columnName), max);
    }

    public static <T, K> Specification<T> equals(String columnName, K value) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(columnName), value);
    }
}
