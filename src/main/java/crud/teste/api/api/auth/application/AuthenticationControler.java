package crud.teste.api.api.auth.application;

import crud.teste.api.api.auth.domain.AuthenticationDTO;
import crud.teste.api.api.auth.domain.LoginResponseDTO;
import crud.teste.api.api.auth.domain.RegistroDTO;
import crud.teste.api.api.auth.domain.UserRepository;
import crud.teste.api.api.auth.domain.User;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationControler {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data  ) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User)auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping ("/registro")
    public ResponseEntity registro(@RequestBody @Valid RegistroDTO data  ) {
        if(userRepository.findByLogin(data.login())!= null){ return ResponseEntity.badRequest().build();}
        String password = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), password , data.role());
        userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }
}
