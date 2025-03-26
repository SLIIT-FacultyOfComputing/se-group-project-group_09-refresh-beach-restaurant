package grp_9.restaurant2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import grp_9.restaurant2.entity.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
