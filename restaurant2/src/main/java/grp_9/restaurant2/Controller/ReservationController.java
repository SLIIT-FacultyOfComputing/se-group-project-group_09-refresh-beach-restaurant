package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.Reservation;
import grp_9.restaurant2.repository.ReservationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addReservation(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
        return ResponseEntity.ok("Reservation successful");
    }

    @GetMapping("/all")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
