package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.CartItem;
import grp_9.restaurant2.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:5173")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartItem> getCartItems() {
        return cartService.getAllCartItems();
    }

    @PostMapping("/add/{menuItemId}")
    public CartItem addToCart(@PathVariable Long menuItemId) {
        return cartService.addToCart(menuItemId);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
    }

    @DeleteMapping("/clear")
    public void clearCart() {
        cartService.clearCart();
    }
}

