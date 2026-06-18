package crud.teste.api.api.repository;

import crud.teste.api.api.auth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


public interface UserRepository extends JpaRepository <User,Long>  {
    UserDetails findByLogin(String login) throws UsernameNotFoundException;
}
