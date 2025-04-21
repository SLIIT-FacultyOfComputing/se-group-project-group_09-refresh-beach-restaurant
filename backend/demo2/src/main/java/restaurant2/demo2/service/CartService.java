package restaurant2.demo2.service;

import org.springframework.stereotype.Service;
import restaurant2.demo2.entity.CartItem;
import restaurant2.demo2.repository.CartRepository;

import java.util.List;

@Service
public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<CartItem> getAllCartItems() {
        return cartRepository.findAll();
    }

    public CartItem addCartItem(CartItem item) {
        return cartRepository.save(item);
    }

    public void removeCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart() {
        cartRepository.deleteAll();
    }
}
