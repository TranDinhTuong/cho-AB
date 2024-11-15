package com.example.choAB.security.config;

import com.example.choAB.security.jwt.AuthTokenFilter;
import com.example.choAB.security.jwt.JwtAuthEntryPoint;
import com.example.choAB.security.user.ShopUserDetailsService;
import io.micrometer.common.lang.NonNull;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import java.util.List;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class ShopConfig {

    private final ShopUserDetailsService userDetailsService;
    private final JwtAuthEntryPoint authEntryPoint;

    //danh sách các URL được bảo vệ yêu cầu người dùng phải xác thực (ví dụ: các API liên quan đến giỏ hàng).
    private static final List<String> SECURED_URLS =
            List.of("/api/v1/carts/**", "/api/v1/cartItems/**");

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    //Trả về một PasswordEncoder sử dụng thuật toán BCryptPasswordEncoder để mã hóa mật khẩu người dùng trước khi lưu vào cơ sở dữ liệu.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    //Trả về một instance của AuthTokenFilter, một filter dùng để xác thực JWT và đảm bảo chỉ những yêu cầu có JWT hợp lệ mới được phép truy cập các tài nguyên bảo mật.
    @Bean
    public AuthTokenFilter authTokenFilter() {
        return new AuthTokenFilter();
    }


    //để xử lý quá trình xác thực người dùng dựa trên các thông tin được cấu hình trong Spring Security.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return  authConfig.getAuthenticationManager();

    }

    //một provider dùng để xác thực người dùng dựa trên thông tin từ userDetailsService và sử dụng passwordEncoder để kiểm tra mật khẩu.
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }


    //Cấu hình chính cho Spring Security:
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint)) //Sử dụng JwtAuthEntryPoint để xử lý các lỗi xác thực.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //Đặt chế độ quản lý phiên là STATELESS, nghĩa là không duy trì session trên server (phù hợp với JWT).
                //Những yêu cầu tới các URL trong danh sách SECURED_URLS yêu cầu phải được xác thực.
                //Các yêu cầu khác được phép truy cập mà không cần xác thực (permitAll()).
                .authorizeHttpRequests(auth ->auth.requestMatchers(SECURED_URLS.toArray(String[]::new))
                        .authenticated()
                        .anyRequest()
                            .permitAll() // cũng cho phép all
                );
        http.authenticationProvider(daoAuthenticationProvider()); //Thiết lập daoAuthenticationProvider() để xử lý xác thực người dùng.
        http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class); //Thêm authTokenFilter() vào trước filter UsernamePasswordAuthenticationFilter để xử lý JWT.
        return http.build();
    }

    //Cấu hình chính sách CORS (Cross-Origin Resource Sharing)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all endpoints
                        .allowedOrigins("http://localhost:3000") // Allow this origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // hỗ trợ gửi cookie
            }
        };
    }

}
