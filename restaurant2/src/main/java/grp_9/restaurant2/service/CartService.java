package grp_9.restaurant2.service;

import org.springframework.stereotype.Service;
import grp_9.restaurant2.entity.CartItem;
import grp_9.restaurant2.entity.MenuItem;
import grp_9.restaurant2.repository.CartRepository;
import grp_9.restaurant2.repository.MenuItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final MenuItemRepository menuItemRepository;

    public CartService(CartRepository cartRepository, MenuItemRepository menuItemRepository) {
        this.cartRepository = cartRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<CartItem> getAllCartItems() {
        return cartRepository.findAll();
    }

    public CartItem addOrUpdateCartItem(CartItem item) {
        Optional<CartItem> existingCartItem = cartRepository.findByMenuItemId(item.getMenuItem().getId());

        if (existingCartItem.isPresent()) {
            // If item is already in cart, increase quantity
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            return cartRepository.save(cartItem);
        } else {
            // Fetch the actual MenuItem from the database
            MenuItem menuItem = menuItemRepository.findById(item.getMenuItem().getId())
                    .orElseThrow(() -> new RuntimeException("MenuItem not found"));

            item.setMenuItem(menuItem);
            item.setQuantity(1); // Default quantity 1 if new
            return cartRepository.save(item);
        }
    }

    public void removeCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart() {
        cartRepository.deleteAll();
    }
}
