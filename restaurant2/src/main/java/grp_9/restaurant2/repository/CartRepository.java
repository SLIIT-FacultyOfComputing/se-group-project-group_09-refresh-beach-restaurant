package grp_9.restaurant2.repository;

import grp_9.restaurant2.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByMenuItemId(Long menuItemId);
}

