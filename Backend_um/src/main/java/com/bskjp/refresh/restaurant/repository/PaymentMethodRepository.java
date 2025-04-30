package com.bskjp.refresh.restaurant.repository;



import com.bskjp.refresh.restaurant.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    List<PaymentMethod> findByUserId(Long userId);

    PaymentMethod findByUserIdAndIsDefault(Long userId, boolean isDefault);

    void deleteByIdAndUserId(Long id, Long userId);
}
