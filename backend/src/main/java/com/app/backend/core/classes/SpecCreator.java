package com.app.backend.core.classes;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.app.backend.core.dto.SearchFilterDto;

public class SpecCreator<T> {
    public static <T> Specification<T> containsString(String columnName, String string) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get(columnName), "%" + string + "%");
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

    public static <T> Specification<T> filtersToSpecification(List<SearchFilterDto<T>> filters) {
        Specification<T> spec = Specification.where(null);

        for(SearchFilterDto<T> filter : filters) {
            String field = filter.getFieldName();
            T value = filter.getValue();
            
            switch (filter.getOperation()) {
                case CONTAINS:
                    spec.and(containsString(field, (String) value));
                    break;

                case GREATER_THAN:
                    spec.and(numberGreaterThan(field, (long) value));
                    break;

                case LESS_THAN:
                    spec.and(numberLessThan(field, (long) value));
                    break;

                case EQUAL:
                    spec.and(equals(field, value));

                default:
                    break;
            }
        }

        return spec;
    }
}
