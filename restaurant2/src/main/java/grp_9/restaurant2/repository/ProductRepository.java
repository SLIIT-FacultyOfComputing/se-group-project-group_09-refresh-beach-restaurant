package grp_9.restaurant2.repository;



import grp_9.restaurant2.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
