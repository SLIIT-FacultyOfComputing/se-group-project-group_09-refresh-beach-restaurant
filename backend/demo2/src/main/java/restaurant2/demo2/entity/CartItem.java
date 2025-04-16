package restaurant2.demo2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_items")
@CrossOrigin
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String name;
    private double price;
    private int quantity;
    private String imageUrl;

}
